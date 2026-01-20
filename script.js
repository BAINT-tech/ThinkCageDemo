function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chatArea");
  const text = input.value.trim();
  if (!text) return;

  // USER MESSAGE
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = text;
  chat.appendChild(userMsg);

  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  // AI CONTAINER
  const ai = document.createElement("div");
  ai.className = "ai-container";
  chat.appendChild(ai);

  const intro = document.createElement("div");
  intro.className = "ai-intro";
  intro.textContent =
    "Sure! Make we reason together, here’s how you go plan your project:";
  ai.appendChild(intro);

  const steps = [
    {
      title: "Step 1: Identify Your Goal",
      content: "Wetin you wan achieve? Build and post demo"
    },
    {
      title: "Step 2: Select Distribution Channel",
      content: ["Instagram", "Twitter"]
    },
    {
      title: "Step 3: Post One Demo",
      content: "Post demo first, see how pipo go react"
    },
    {
      title: "Step 4: Observe, Learn, Repeat",
      content: "Watch reaction, adjust next demo, repeat winning move"
    }
  ];

  steps.forEach((step, i) => {
    setTimeout(() => {
      const card = document.createElement("div");
      card.className = "step-card";

      const h3 = document.createElement("h3");
      h3.textContent = step.title;
      card.appendChild(h3);

      if (Array.isArray(step.content)) {
        const ul = document.createElement("ul");
        step.content.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          ul.appendChild(li);
        });
        card.appendChild(ul);
      } else {
        const p = document.createElement("p");
        p.textContent = step.content;
        card.appendChild(p);
      }

      ai.appendChild(card);
      chat.scrollTop = chat.scrollHeight;
    }, i * 350);
  });
}
