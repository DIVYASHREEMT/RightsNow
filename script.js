const RELAY_WEBHOOK_URL = "https://hook.relay.app/api/v1/playbook/cmdyscoly0a9y0olzckvn44z2/trigger/zq5JI8d67CJri0e291s1hA"; // 🔁 Replace with your actual Relay URL

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
      body: JSON.stringify({ question: message }), // Relay expects { q: "..." }
    });

    const replyText = await response.text(); // Relay sends plain text if set in webhook

    botMsg.textContent = replyText;
  } catch (error) {
    botMsg.textContent = "⚠️ Sorry, something went wrong. Please try again.";
    console.error("Error:", error);
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}


function getRelayResponse(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("warrant")) {
    return "🚓 Police usually need a warrant unless it's an urgent or serious crime.";
  } else if (msg.includes("fired") || msg.includes("termination")) {
    return "💼 Most employees are entitled to a notice period or compensation before being fired.";
  } else if (msg.includes("salary") || msg.includes("not paid")) {
    return "💰 If your employer has not paid your salary, you can file a complaint with the Labour Commissioner.";
  } else if (msg.includes("women") || msg.includes("domestic violence") || msg.includes("harassment")) {
    return "📞 Women in distress can call helpline 181 or approach the nearest police station.";
  } else if (msg.includes("child") || msg.includes("minor")) {
    return "🧒 For child abuse or child labour cases, dial Childline 1098.";
  } else if (msg.includes("tenant") || msg.includes("eviction") || msg.includes("rent")) {
    return "🏠 Tenants cannot be forcefully evicted without a court order. You can approach the Rent Control Board.";
  } else if (msg.includes("marriage age")) {
    return "👰 The legal marriage age in India is 21 for men and 18 for women.";
  } else if (msg.includes("dowry")) {
    return "🚫 Giving or taking dowry is a punishable offence under the Dowry Prohibition Act.";
  } else if (msg.includes("cybercrime") || msg.includes("online scam")) {
    return "🖥️ You can report cybercrimes at cybercrime.gov.in or your nearest cyber police station.";
  } else if (msg.includes("arrest")) {
    return "⚖️ You have the right to know the reason for arrest and to meet a lawyer immediately.";
  } else {
    return "📘 Please contact a legal aid center or call a helpline for more information.";
  }
}
