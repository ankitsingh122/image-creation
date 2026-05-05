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

const examples = [
  {
    name: "astronaut-panda",
    style: "fantasy",
    prompt:
      "A red panda astronaut floating above a neon city at dusk, glowing helmet visor reflecting magenta lights, photorealistic, cinematic.",
  },
  {
    name: "samurai-cyber",
    style: "cyberpunk",
    prompt:
      "Lone samurai standing in a rainy neon Tokyo alleyway, cyan and pink reflections on wet pavement, holographic billboards, cinematic anamorphic shot.",
  },
  {
    name: "dragon-ice",
    style: "fantasy",
    prompt:
      "Majestic ice dragon perched on a frozen mountain peak, bioluminescent blue scales, swirling aurora behind, painterly fantasy art.",
  },
  {
    name: "retro-car",
    style: "cinematic",
    prompt:
      "Sleek 1980s sports car drifting through pink desert at sunset, motion blur, lens flare, Miami vice vibes, cinematic photography.",
  },
  {
    name: "mecha-portrait",
    style: "scifi",
    prompt:
      "Close-up cinematic shot of a mech pilot's face, half-illuminated by HUD reflections, beads of sweat, sharp focus, sci-fi epic.",
  },
  {
    name: "anime-witch",
    style: "anime",
    prompt:
      "Young anime witch with violet hair brewing a glowing potion, cozy cottage interior, candlelight, Studio Ghibli inspired warm illustration.",
  },
  {
    name: "underwater-temple",
    style: "fantasy",
    prompt:
      "Ancient submerged temple with shafts of golden sunlight piercing teal water, schools of bioluminescent fish, mysterious atmosphere, painterly.",
  },
  {
    name: "abstract-flow",
    style: "abstract",
    prompt:
      "Liquid metallic chrome shapes flowing through space, iridescent rainbow reflections on black void, ultra-glossy, abstract 3D render.",
  },
  {
    name: "wolf-spirit",
    style: "fantasy",
    prompt:
      "Spectral wolf made of swirling violet stardust howling at a blood-red moon, dark forest silhouette, dramatic painterly fantasy.",
  },
  {
    name: "neon-skater",
    style: "cyberpunk",
    prompt:
      "Skateboarder mid-trick in a neon-lit underpass, motion blur, magenta and cyan graffiti, gritty cinematic urban photography.",
  },
  {
    name: "luxury-watch",
    style: "product",
    prompt:
      "Premium black ceramic luxury watch on a velvet surface, dramatic studio lighting, subtle reflections, commercial product photography.",
  },
  {
    name: "fox-shrine",
    style: "anime",
    prompt:
      "White nine-tailed fox spirit beside a moonlit shrine, glowing pink lanterns, cherry blossom petals drifting, anime illustration.",
  },
  {
    name: "warrior-portrait",
    style: "portrait",
    prompt:
      "Editorial portrait of a fierce warrior woman with tribal face paint, wind blowing dark hair, golden hour lighting, 85mm lens, sharp focus.",
  },
  {
    name: "sky-whale",
    style: "fantasy",
    prompt:
      "Enormous whale floating through pink and lavender clouds at sunset, tiny hot air balloons drifting beneath, dreamy painterly fantasy.",
  },
  {
    name: "nebula-explorer",
    style: "abstract",
    prompt:
      "Lone astronaut silhouette gazing into a swirling psychedelic nebula of magenta, cyan, and gold, vast cosmic scale, surreal art.",
  },
];

const ai = new GoogleGenAI({ apiKey });
const manifest = [];

for (const ex of examples) {
  process.stdout.write(`→ ${ex.name} (${ex.style}) … `);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                ex.prompt +
                "\n\nGenerate a single high-quality square (1:1) image.",
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
          const out = join(root, "public", "examples", `${ex.name}.png`);
          writeFileSync(out, buf);
          manifest.push({
            src: `/examples/${ex.name}.png`,
            prompt: ex.prompt,
            style: ex.style,
          });
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

writeFileSync(
  join(root, "public", "examples", "manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log(`\nWrote manifest with ${manifest.length} entries.`);
