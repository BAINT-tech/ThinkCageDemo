function sendMessage() {
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

    // Simulated AI response with step-by-step reasoning
    const steps = [
        "Identify your goal: Build and post your demo.",
        "Choose platforms: Instagram and Twitter.",
        "Prepare content: Screenshot the AI interface and captions.",
        "Post demo: Watch reactions on social media.",
        "Observe and adjust: Improve your next demo."
    ];

    const aiMsg = document.createElement("div");
    aiMsg.classList.add("message", "ai-msg");

    steps.forEach(step => {
        const stepDiv = document.createElement("div");
        stepDiv.classList.add("step-card");

        const icon = document.createElement("div");
        icon.classList.add("step-icon");

        const stepText = document.createElement("div");
        stepText.textContent = step;

        stepDiv.appendChild(icon);
        stepDiv.appendChild(stepText);

        aiMsg.appendChild(stepDiv);
    });

    chatWindow.appendChild(aiMsg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
