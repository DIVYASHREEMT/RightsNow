const RELAY_WEBHOOK_URL = "https://relay.hidden/secure-url"; //Replace with your actual Relay URL

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  const chatBody = document.getElementById("chatBody");

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.className = "user-message message";
  userMsg.textContent = message;
  chatBody.appendChild(userMsg);

  // Show "typing" bot bubble while waiting
  const botMsg = document.createElement("div");
  botMsg.className = "bot-message message";
  botMsg.textContent = "Typing...";
  chatBody.appendChild(botMsg);

  chatBody.scrollTop = chatBody.scrollHeight;
  input.value = "";

  try {
    const response = await fetch(RELAY_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: message }), 
    });

    const replyText = await response.text(); 

    botMsg.textContent = replyText;
  } catch (error) {
    botMsg.textContent = "⚠️ Sorry, something went wrong. Please try again.";
    console.error("Error:", error);
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}
