import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = "AIzaSyD_KfApr8OdYPSOMuSvyzU1LZX00VQoqEo";

// Gaming-only restriction
const systemPrompt = `
You are a gaming expert chatbot.
ONLY answer gaming-related questions (video games, esports, gaming hardware).
If the question is not gaming-related, reply:
"Sorry, I only answer gaming-related questions."
`;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt + "\nUser: " + userMessage }
              ]
            }
          ]
        }),
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({ reply });

  } catch (error) {
    res.status(500).send("Error");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));