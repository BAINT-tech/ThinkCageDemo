import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { question } = JSON.parse(req.body);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4-mini",
        messages: [
          {
            role: "system",
            content: "You are ThinkCage AI. Answer questions step by step, output 5 reasoning steps. Keep language in English or Pidgin depending on user input."
          },
          { role: "user", content: question }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();
    const aiText = data.choices[0].message.content;

    // Split into steps
    const steps = aiText.split(/\n\d*\. /).filter(s => s.trim() !== "");
    res.status(200).json({ steps });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
