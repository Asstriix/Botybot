const messagesEl = document.getElementById("messages");
const questionInput = document.getElementById("question");
const sendBtn = document.getElementById("sendBtn");

const appendMessage = (text, sender) => {
  const msgEl = document.createElement("div");
  msgEl.className = `message ${sender}`;
  msgEl.textContent = text;
  messagesEl.appendChild(msgEl);
  messagesEl.scrollTop = messagesEl.scrollHeight;
};

sendBtn.addEventListener("click", async () => {
  const question = questionInput.value.trim();
  if (!question) return;

  appendMessage(question, "user");
  questionInput.value = "";

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    appendMessage(data.answer, "bot");
  } catch (err) {
    appendMessage("Error al conectar con el bot.", "bot");
  }
});

// Enter key
questionInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
