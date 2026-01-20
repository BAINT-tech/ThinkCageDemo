// GLOBAL VARIABLES
const input = document.getElementById("userInput");
const chat = document.getElementById("chatArea");
const micBtn = document.getElementById("micBtn");
const langSelect = document.getElementById("languageSelect");

let userId = localStorage.getItem("thinkcageUserId") || "user_" + Math.floor(Math.random() * 100000);
localStorage.setItem("thinkcageUserId", userId);

// SEND MESSAGE FUNCTION
async function sendMessage(textInput = null, provider = "openai") {
  const text = textInput || input.value.trim();
  if (!text) return;

  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = text;
  chat.appendChild(userMsg);

  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch("http://localhost:3000/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, question: text, provider })
    });
    const data = await res.json();

    displayAIAnswer(data.answer);

  } catch (err) {
    console.error(err);
    displayAIAnswer("Omo, something no go well. Try again.");
  }
}

// DISPLAY AI ANSWER
function displayAIAnswer(answer) {
  const aiContainer = document.createElement("div");
  aiContainer.className = "ai-container";

  const stepCard = document.createElement("div");
  stepCard.className = "step-card";
  stepCard.textContent = answer;
  aiContainer.appendChild(stepCard);
  chat.appendChild(aiContainer);

  chat.scrollTop = chat.scrollHeight;

  const utterance = new SpeechSynthesisUtterance(answer);
  utterance.lang = langSelect.value === "pidgin" ? "en-NG" : "en-US";
  window.speechSynthesis.speak(utterance);
}

// MIC + LANGUAGE + AUTO SEND
function startMic(provider = "openai") {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Mic no dey supported for this browser");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = langSelect.value === "pidgin" ? "en-NG" : "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  micBtn.classList.add("listening");

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
  };

  recognition.onerror = function () { micBtn.classList.remove("listening"); };
  recognition.onend = function () {
    micBtn.classList.remove("listening");
    if (input.value.trim()) sendMessage(input.value.trim(), provider);
  };

  recognition.start();
}

// EVENT LISTENERS
micBtn.addEventListener("click", () => startMic("openai"));
input.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(input.value.trim(), "openai"); });
document.querySelectorAll(".provider-btn")?.forEach(btn => {
  btn.addEventListener("click", () => {
    const provider = btn.dataset.provider;
    if (input.value.trim()) sendMessage(input.value.trim(), provider);
  });
});
