function detectLanguage(text) {
    const pidginWords = ["go", "dem", "how", "I go", "make"];
    return pidginWords.some(word => text.toLowerCase().includes(word)) ? "Pidgin" : "English";
}

async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatWindow = document.getElementById("chat-window");
    const text = input.value.trim();
    if (!text) return;

    // Add user message
    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user-msg");
    userMsg.textContent = text;
    chatWindow.appendChild(userMsg);
    input.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Add AI container
    const aiMsg = document.createElement("div");
    aiMsg.classList.add("message", "ai-msg");
    chatWindow.appendChild(aiMsg);

    // Typing indicator
    const typing = document.createElement("div");
    typing.textContent = "ThinkCage is reasoning...";
    typing.style.fontStyle = "italic";
    aiMsg.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        const res = await fetch("/api/ask", {
            method: "POST",
            body: JSON.stringify({ question: text })
        });
        const data = await res.json();
        aiMsg.removeChild(typing);

        // Animate each step
        let i = 0;
        function showStep() {
            if (i >= data.steps.length) return;

            const stepDiv = document.createElement("div");
            stepDiv.classList.add("step-card");

            const icon = document.createElement("div");
            icon.classList.add("step-icon");

            const stepText = document.createElement("div");
            stepText.textContent = data.steps[i];

            stepDiv.appendChild(icon);
            stepDiv.appendChild(stepText);
            aiMsg.appendChild(stepDiv);

            chatWindow.scrollTop = chatWindow.scrollHeight;
            i++;
            setTimeout(showStep, 800);
        }

        showStep();
    } catch (err) {
        aiMsg.textContent = "Error: Could not reach AI.";
        console.error(err);
    }
}
