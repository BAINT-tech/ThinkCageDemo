function askAI() {
    const userInput = document.getElementById("userInput").value;
    const outputDiv = document.getElementById("output");

    // Simulated AI response for demo
    const demoSteps = [
        "Identify your goal: Build and post your demo.",
        "Choose platforms: Instagram and Twitter.",
        "Prepare content: Screenshot the AI interface and captions.",
        "Post demo: Watch reactions on social media.",
        "Observe and adjust: Improve your next demo."
    ];

    // Create HTML for each step with glowing brain icon
    outputDiv.innerHTML = demoSteps.map(step => `
        <div class='step'>
            <div class='step-icon'></div>
            ${step}
        </div>
    `).join('');
}
