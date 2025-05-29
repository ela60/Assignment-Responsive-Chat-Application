// === Basic DOM Elements ===
const chatArea = document.getElementById('chatArea');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatHeaderName = document.getElementById('chatUserName');
const chatUsers = document.querySelectorAll('.chat-user');

// === Dummy Bot Responses ===
const botResponses = [
  "Hello! 👋",
  "How can I assist you today?",
  "That’s interesting!",
  "Tell me more.",
  "I’m here to help."
];

// === Append Chat Message ===
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('bubble', sender);
  msg.textContent = text;
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight; // Auto scroll
}

// === Send Message Handler ===
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

// === Event Listeners ===
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

// === Chat User Switching Logic ===
chatUsers.forEach(user => {
  user.addEventListener('click', () => {
    // Remove active from all users
    chatUsers.forEach(u => u.classList.remove('active'));
    user.classList.add('active');

    // Get user's name and online status
    const name = user.dataset.name;
    const online = user.dataset.online === "true";

    // Update chat header
    chatHeaderName.innerHTML = `Chat with ${name} ${online ? '<span class="online"></span>' : ''}`;

    // Clear chat area (simulate new conversation)
    chatArea.innerHTML = '';
    appendMessage('bot', `Hi, this is ${name}. How can I help you?`);
  });
});
