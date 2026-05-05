import { GoogleGenAI } from "@google/genai";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
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

const brandAssets = [
  {
    out: "src/app/icon.png",
    prompt:
      "Professional minimal app icon, bold geometric letter 'A' mark made of intersecting glowing neon ribbons in vibrant magenta (#ff2d78) and electric violet (#9b5cff) with a touch of cyan (#00e5ff), rendered as a sharp vector-style logo on a deep dark purple-black (#0a0812) rounded square background, premium tech brand identity, ultra-clean edges, perfectly centered, high contrast, NO TEXT except the single letter A, square 1:1 composition, professional logo design, would look great as an app icon on a phone home screen.",
  },
  {
    out: "public/logo.png",
    prompt:
      "Bold premium logo mark for an AI image generation product called 'ACraft', stylized geometric letter 'A' formed by interweaving neon ribbons of vibrant magenta (#ff2d78), electric violet (#9b5cff), and cyan (#00e5ff), with a subtle glowing aura, deep dark purple-black (#0a0812) background, futuristic high-tech feel reminiscent of cutting-edge AI brands, vector-style precision, sharp clean edges, perfectly centered, square composition, NO additional text or words, just the iconic A mark, premium brand identity.",
  },
];

const ai = new GoogleGenAI({ apiKey });

for (const asset of brandAssets) {
  process.stdout.write(`→ ${asset.out} … `);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                asset.prompt +
                "\n\nGenerate a single high-resolution square (1:1) image.",
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
          const fullPath = join(root, asset.out);
          const dir = dirname(fullPath);
          if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
          writeFileSync(fullPath, buf);
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
