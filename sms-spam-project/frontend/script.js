
document.getElementById("checkBtn").addEventListener("click", async () => {
  const message = document.getElementById("message").value.trim();
  const resultDiv = document.getElementById("result");
  const confidenceDiv = document.getElementById("confidence");

  if (!message) {
    resultDiv.innerHTML = "⚠️ Please enter a message.";
    resultDiv.style.color = "orange";
    confidenceDiv.innerHTML = "";
    return;
  }

  resultDiv.innerHTML = "⏳ Checking...";
  resultDiv.style.color = "#fff";
  confidenceDiv.innerHTML = "";

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: message })
    });

    const data = await response.json();

    if (data.prediction === "spam") {
      resultDiv.innerHTML = "🚨 This message is SPAM";
      resultDiv.style.color = "red";
    } else {
      resultDiv.innerHTML = "✅ This message is NOT Spam";
      resultDiv.style.color = "#22c55e";
    }

    confidenceDiv.innerHTML = `Confidence: ${data.confidence}%`;

  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = "❌ Server not running or API error.";
    resultDiv.style.color = "red";
  }
});
