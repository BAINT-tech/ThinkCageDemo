import fetch from "node-fetch";

export async function askOpenAI(question, apiKey) {
  return `OpenAI answered: "${question}"`; // Replace with real OpenAI call
}

export async function askGrok(question, grokConfig) {
  const res = await fetch(grokConfig.url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${grokConfig.key}` },
    body: JSON.stringify({ question })
  });
  const data = await res.json();
  return data.answer || "Grok response missing";
}
