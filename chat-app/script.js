const chatArea = document.getElementById('chatArea');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

const botResponses = [
  "Hello! 👋",
  "How can I assist you today?",
  "That’s interesting!",
  "Tell me more.",
  "I’m here to help."
];

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('bubble', sender);
  msg.textContent = text;
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight; // Auto scroll
}

function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage('user', text);
  userInput.value = "";

  setTimeout(() => {
    const response = botResponses[Math.floor(Math.random() * botResponses.length)];
    appendMessage('bot', response);
  }, 800); // Simulate delay
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});
