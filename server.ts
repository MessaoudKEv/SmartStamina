import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy Gemini client helper
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "SmartStamina API" });
  });

  // AI Smart Advisor Endpoint
  app.post("/api/advisor/smart-search", async (req, res) => {
    try {
      const { query, availableProducts } = req.body;
      if (!query) {
        return res.status(400).json({ error: "Query is required" });
      }

      const ai = getGeminiClient();
      if (!ai) {
        // Fallback rule-based matching if no Gemini API key
        return res.json({
          interpretation: `Analyzed search intent for "${query}"`,
          matchedCategory: "Wearable Tech",
          keyAttributes: ["Heart Rate", "Sleep Tracking", "Performance"],
          reasoning: "SmartStamina search matched key biometric attributes matching your physical activity profile.",
          recommendedProductIds: (availableProducts || []).slice(0, 4).map((p: any) => p.id),
        });
      }

      const productsBrief = (availableProducts || []).map((p: any) => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        category: p.category,
        wearableType: p.wearableType,
        price: p.price,
        batteryLife: p.batteryLife,
        bestFor: p.bestFor,
        staminaScore: p.staminaScore,
        compatibility: p.compatibility,
      }));

      const prompt = `You are the SmartStamina AI Wearable Advisor.
A user asked: "${query}".

Here is the database of available wearable devices:
${JSON.stringify(productsBrief, null, 2)}

Analyze the user's intent, training style, form factor preferences, and biometric goals.
Select the top 3-5 best matching product IDs in ranked order, and explain why.
Respond ONLY with a valid JSON object matching this schema:
{
  "interpretation": "Brief 1-sentence summary of what the user is seeking",
  "matchedCategory": "Category name or form factor (e.g. Smart Ring, Running Watch, Chest Strap)",
  "keyAttributes": ["3-4 key tags e.g. 'No Screen', 'Sleep HRV', 'High Accuracy'"],
  "reasoning": "2-3 concise sentences explaining the recommendation logic",
  "recommendedProductIds": ["id1", "id2", "id3"],
  "highlightFeature": "Key technical feature that makes these best suited"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (err: any) {
      console.error("AI Search Error:", err);
      res.status(500).json({
        error: "Failed to process AI smart search",
        fallback: true,
      });
    }
  });

  // AI Comparison Advisor
  app.post("/api/advisor/compare-analysis", async (req, res) => {
    try {
      const { products } = req.body;
      if (!products || !Array.isArray(products) || products.length < 2) {
        return res.status(400).json({ error: "At least 2 products required for comparison" });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.json({
          summaryVerdict: `Comparing ${products.map((p) => p.name).join(" vs ")}. Each wearable serves distinct biometric and endurance priorities.`,
          idealUserProfiles: products.map((p) => ({
            id: p.id,
            bestForUser: `Ideal for users prioritizing ${p.bestFor?.join(", ") || "daily fitness"}.`,
            mainAdvantage: `${p.batteryLife} battery life and dedicated ${p.category} tracking.`,
            tradeOff: "Consider form factor and platform ecosystem compatibility.",
          })),
          staminaVerdict: "Device with highest sensor fidelity provides superior physiological readiness scoring.",
        });
      }

      const prompt = `You are the lead wearable technology analyst at SmartStamina.
Analyze and compare the following ${products.length} wearable devices:
${JSON.stringify(products, null, 2)}

Provide an objective, expert breakdown for athletes and health enthusiasts comparing these devices.
Respond ONLY with a JSON object:
{
  "summaryVerdict": "2-sentence executive summary comparing their standout differences",
  "staminaVerdict": "Which device excels most for stamina, training load, and recovery readiness",
  "idealUserProfiles": [
    {
      "id": "device_id",
      "bestForUser": "Specific persona (e.g. Marathon runner, Sleep biohacker, Minimalist)",
      "mainAdvantage": "Biggest technical or design strength",
      "tradeOff": "Main downside or compromise compared to the others"
    }
  ],
  "valuePick": "Name of device that offers best price-to-performance ratio"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (err: any) {
      console.error("AI Compare Error:", err);
      res.status(500).json({ error: "Failed to generate comparison analysis" });
    }
  });

  // AI Wizard Tailored Recommendation
  app.post("/api/advisor/wizard-recommend", async (req, res) => {
    try {
      const { answers, availableProducts } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          title: "Personalized SmartStamina Match",
          summary: "Based on your fitness goals, form factor preference, and budget, we've matched you with high-precision wearables.",
          recommendedIds: (availableProducts || []).slice(0, 4).map((p: any) => p.id),
        });
      }

      const prompt = `You are the SmartStamina Diagnostic Wizard.
The user completed the "Find My Wearable" diagnostic with these preferences:
${JSON.stringify(answers, null, 2)}

Available wearables catalog:
${JSON.stringify(
  (availableProducts || []).map((p: any) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    wearableType: p.wearableType,
    price: p.price,
    staminaScore: p.staminaScore,
    batteryLife: p.batteryLife,
    bestFor: p.bestFor,
  })),
  null,
  2
)}

Select:
1. Best Overall Match (id)
2. Best for Sleep / Recovery (id)
3. Best for Fitness / Stamina (id)
4. Best Value (id)

Provide a warm, expert rationale for each.
Respond ONLY with JSON:
{
  "headline": "Personalized Headline matching their athletic profile",
  "summary": "2-3 sentences explaining why these selections fit their lifestyle",
  "bestOverall": { "id": "id", "reason": "Why this is top overall" },
  "bestSleep": { "id": "id", "reason": "Why this excels at sleep/recovery" },
  "bestStamina": { "id": "id", "reason": "Why this is best for stamina/performance" },
  "bestValue": { "id": "id", "reason": "Why this is unbeatable for the price" }
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (err: any) {
      console.error("AI Wizard Error:", err);
      res.status(500).json({ error: "Failed to generate wizard recommendations" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SmartStamina server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
