function askAI() {
    const userInput = document.getElementById("userInput").value.trim();
    const outputDiv = document.getElementById("output");

    if (!userInput) {
        alert("Please type a question for ThinkCage!");
        return;
    }

    // Simulated AI steps for demo (replace with real API later)
    const demoSteps = [
        "Identify your goal: Build and post your demo.",
        "Choose platforms: Instagram and Twitter.",
        "Prepare content: Screenshot the AI interface and captions.",
        "Post demo: Watch reactions on social media.",
        "Observe and adjust: Improve your next demo."
    ];

    // Generate HTML for each step
    outputDiv.innerHTML = demoSteps.map(step => `
        <div class="step">
            <div class="step-icon"></div>
            ${step}
        </div>
    `).join('');
}
