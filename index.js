const menu = document.getElementById('menu');
const sidebarbox = document.getElementById('sidebarbox');
const vidbox = document.getElementById('vidbox');
menu.addEventListener('click', function(){
    sidebarbox.classList.toggle('sidebarwrap');
    vidbox.classList.toggle('videobox2')
});

// api to use ai chatbot
const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual API key
const chatBox = document.getElementById("chat");

async function sendMessage() {
  const input = document.getElementById("userInput");
  const userText = input.value;
  if (!userText.trim()) return;

  appendMessage("user", userText);
  input.value = "";

  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey;

  const requestBody = {
    contents: [{
      parts: [{ text: userText }]
    }]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't get that.";
    appendMessage("bot", botReply);
  } catch (error) {
    console.error("API Error:", error);
    appendMessage("bot", "Error: Could not get a response.");
  }
}

function appendMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message " + sender;
  msgDiv.textContent = `${sender === 'user' ? 'You' : 'Gemini'}: ${text}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

