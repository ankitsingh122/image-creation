import { GoogleGenAI } from "@google/genai";

const SYSTEM = `You are a senior visual director who rewrites short user image briefs into rich, evocative prompts for an AI image generator.

Rules:
- Output ONLY the enhanced prompt as a single paragraph. No preamble, no quotes, no explanation.
- Preserve the user's intent and any specific subjects, names, or constraints they mentioned.
- Add: subject details, environment, lighting, mood, color palette, lens/medium, composition.
- Stay concrete and visual — avoid abstract words like "beautiful" or "amazing".
- 2–4 sentences. Around 50–90 words.
- Don't invent text/captions to render in the image.`;

export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.startsWith("replace-with")) {
    return Response.json(
      { error: "GEMINI_API_KEY is not configured." },
      { status: 500 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { prompt, style = "none", context = "" } = body;
  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return Response.json({ error: "Prompt is required" }, { status: 400 });
  }

  const userMessage = [
    `User brief: ${prompt.trim()}`,
    style && style !== "none" && `Preferred style: ${style}`,
    context && `Additional context: ${context}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      config: {
        systemInstruction: SYSTEM,
        temperature: 0.85,
      },
    });

    const text =
      response?.text ??
      response?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text ?? "")
        .join(" ")
        .trim();

    if (!text) {
      return Response.json(
        { error: "Enhancer returned no text" },
        { status: 502 },
      );
    }

    return Response.json({ prompt: text.trim() });
  } catch (err) {
    console.error("Enhance error:", err);
    return Response.json(
      { error: err?.message ?? "Enhance failed" },
      { status: 500 },
    );
  }
}
