const RELAY_WEBHOOK_URL = "https://hook.relay.app/api/v1/playbook/cmdyscoly0a9y0olzckvn44z2/trigger/zq5JI8d67CJri0e291s1hA"; //Replace with your actual Relay URL

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
    // Set up a timeout controller for 20 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 40000); // 40s

    const response = await fetch(RELAY_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: message }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const replyText = await response.text();
    botMsg.textContent = replyText || "🤖 I couldn't understand. Please try again.";
  } catch (error) {
    if (error.name === 'AbortError') {
      botMsg.textContent = "⏱️ Sorry, the assistant took too long to respond.";
    } else {
      botMsg.textContent = "⚠️ Sorry, something went wrong. Please try again.";
    }
    console.error("Error:", error);
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}
