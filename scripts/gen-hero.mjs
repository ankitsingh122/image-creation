import { GoogleGenAI } from "@google/genai";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const env = readFileSync(join(root, ".env.local"), "utf8");
const apiKey = env
  .split("\n")
  .find((l) => l.startsWith("GEMINI_API_KEY="))
  ?.split("=")[1]
  ?.trim();

if (!apiKey) {
  console.error("GEMINI_API_KEY missing in .env.local");
  process.exit(1);
}

const cards = [
  {
    name: "fantasy",
    prompt:
      "Epic high fantasy portrait of an elven warrior queen with glowing rune tattoos, ethereal magical atmosphere, swirling violet and gold mist, intricate ornate armor, painterly digital art, dramatic rim lighting, vertical composition.",
  },
  {
    name: "scifi",
    prompt:
      "Mechanical T-Rex with red glowing eyes roaring through a dystopian neon-lit cityscape at dusk, cinematic sci-fi concept art, volumetric atmosphere, magenta and orange lighting, vertical composition, hyperdetailed.",
  },
  {
    name: "portrait",
    prompt:
      "Striking close-up portrait of a woman with kaleidoscopic neon face paint in magenta, violet and cyan, intense direct gaze, studio lighting, futuristic editorial photography, vertical composition, high detail skin texture.",
  },
  {
    name: "cyberpunk",
    prompt:
      "Anime cyberpunk girl with cyan-blue hair and glowing neon implants, rain-slicked Tokyo street at night, holographic billboards reflecting in puddles, vibrant magenta and cyan palette, vertical composition, cinematic.",
  },
  {
    name: "abstract",
    prompt:
      "Cosmic abstract surreal landscape, floating violet planets, swirling purple and indigo nebulae, mysterious ethereal atmosphere, painterly digital art with deep shadows and glowing highlights, vertical composition.",
  },
];

const ai = new GoogleGenAI({ apiKey });

for (const card of cards) {
  process.stdout.write(`→ ${card.name} … `);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                card.prompt +
                "\n\nGenerate a single high-quality vertical (portrait) image, 3:4 aspect ratio.",
            },
          ],
        },
      ],
    });

    let saved = false;
    for (const cand of response.candidates ?? []) {
      for (const part of cand?.content?.parts ?? []) {
        if (part.inlineData?.data) {
          const buf = Buffer.from(part.inlineData.data, "base64");
          const out = join(root, "public", "hero", `${card.name}.png`);
          writeFileSync(out, buf);
          console.log(`saved (${(buf.length / 1024).toFixed(0)} KB)`);
          saved = true;
          break;
        }
      }
      if (saved) break;
    }
    if (!saved) console.log("no image returned");
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
}

console.log("\nDone.");
