import { GoogleGenAI } from "@google/genai";

const STYLE_PRESETS = {
  none: "",
  cinematic:
    "cinematic photography, dramatic lighting, film grain, anamorphic lens, shallow depth of field, moody atmosphere",
  portrait:
    "professional portrait photography, studio lighting, sharp focus on eyes, 85mm lens, beautiful bokeh, editorial quality",
  anime:
    "anime illustration, studio ghibli inspired, vibrant colors, expressive eyes, detailed line art, soft shading",
  cyberpunk:
    "cyberpunk neon-lit cityscape, vibrant magenta and cyan lighting, holographic UI, futuristic, rain-slicked streets",
  fantasy:
    "high fantasy art, ethereal lighting, magical atmosphere, intricate details, painterly, epic scale",
  abstract:
    "abstract digital art, fluid shapes, vibrant gradient colors, conceptual, surreal composition",
  product:
    "minimal product photography, soft studio lighting, neutral background, sharp detail, commercial quality",
};

export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.startsWith("replace-with")) {
    return Response.json(
      { error: "GEMINI_API_KEY is not configured. Set it in .env.local." },
      { status: 500 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    prompt,
    style = "none",
    referenceImages = [],
    context = "",
    mode = "create",
    sourceImage = null,
  } = body;

  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return Response.json({ error: "Prompt is required" }, { status: 400 });
  }

  if (mode === "edit" && (!sourceImage?.data || !sourceImage?.mimeType)) {
    return Response.json(
      { error: "Edit mode requires a source image." },
      { status: 400 },
    );
  }

  const styleSuffix = STYLE_PRESETS[style] ?? "";
  const instruction =
    mode === "edit"
      ? `Edit the provided image. ${prompt.trim()}\nKeep the overall composition and identity of the original; apply only the requested changes.`
      : `Create an image: ${prompt.trim()}`;

  const finalPrompt = [
    context && `Context: ${context}`,
    instruction,
    styleSuffix && `Style: ${styleSuffix}`,
    "Generate a single high-quality image.",
  ]
    .filter(Boolean)
    .join("\n\n");

  const parts = [{ text: finalPrompt }];

  if (mode === "edit") {
    parts.push({
      inlineData: {
        data: sourceImage.data,
        mimeType: sourceImage.mimeType,
      },
    });
  }

  for (const ref of referenceImages) {
    if (ref?.data && ref?.mimeType) {
      parts.push({
        inlineData: { data: ref.data, mimeType: ref.mimeType },
      });
    }
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [{ role: "user", parts }],
    });

    const candidates = response?.candidates ?? [];
    const out = { images: [], text: "" };
    for (const cand of candidates) {
      for (const part of cand?.content?.parts ?? []) {
        if (part.inlineData?.data) {
          out.images.push({
            data: part.inlineData.data,
            mimeType: part.inlineData.mimeType ?? "image/png",
          });
        } else if (part.text) {
          out.text += part.text;
        }
      }
    }

    if (out.images.length === 0) {
      return Response.json(
        {
          error:
            "No image was returned. The model may have refused the prompt. " +
            (out.text ? `Model said: ${out.text}` : ""),
        },
        { status: 502 },
      );
    }

    return Response.json(out);
  } catch (err) {
    console.error("Gemini error:", err);
    return Response.json(
      { error: err?.message ?? "Image generation failed" },
      { status: 500 },
    );
  }
}
