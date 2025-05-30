const chatArea = document.getElementById('chatArea');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatHeaderName = document.getElementById('chatUserName');
const chatUsers = document.querySelectorAll('.chat-user');
const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
const sidebar = document.querySelector('.sidebar');
const darkModeToggle = document.getElementById('darkModeToggle');

let currentUser = "Alice";
const conversations = {
  Alice: [],
  Bob: [],
  Charlie: []
};

const botResponses = [
  "Hello! 👋",
  "How can I assist you today?",
  "That’s interesting!",
  "Tell me more.",
  "I’m here to help."
];

// Append message and optionally store it
function appendMessage(sender, text, status = null, save = true) {
  const msg = document.createElement('div');
  msg.classList.add('bubble', sender);
  msg.textContent = text;

  if (status) {
    const statusSpan = document.createElement('span');
    statusSpan.classList.add('status');
    statusSpan.textContent = status;
    msg.appendChild(statusSpan);
  }

  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;

  // Store message
  if (save) {
    conversations[currentUser].push({ sender, text, status });
  }
}

// Typing indicator
function showTypingIndicator(name) {
  const typing = document.createElement('div');
  typing.classList.add('typing-indicator');
  typing.id = 'typingIndicator';
  typing.textContent = `${name} is typing...`;
  chatArea.appendChild(typing);
  chatArea.scrollTop = chatArea.scrollHeight;
}
function removeTypingIndicator() {
  const typing = document.getElementById('typingIndicator');
  if (typing) typing.remove();
}

// Handle Send
function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage('user', text, 'Sent');
  userInput.value = "";

  showTypingIndicator("Bot");

  setTimeout(() => {
    removeTypingIndicator();

    // Update status to Delivered
    const bubbles = document.querySelectorAll('.bubble.user .status');
    if (bubbles.length > 0) {
      bubbles[bubbles.length - 1].textContent = 'Delivered';
    }

    const response = botResponses[Math.floor(Math.random() * botResponses.length)];
    appendMessage('bot', response);
  }, 1200);
}

// Events
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

// Switch user
chatUsers.forEach(user => {
  user.addEventListener('click', () => {
    chatUsers.forEach(u => u.classList.remove('active'));
    user.classList.add('active');

    const name = user.dataset.name;
    const online = user.dataset.online === "true";
    currentUser = name;

    // Update header (only name + avatar assumed in HTML)
    chatHeaderName.textContent = name;

    // Load previous conversation
    chatArea.innerHTML = '';
    conversations[name].forEach(msg => {
      appendMessage(msg.sender, msg.text, msg.status, false);
    });
  });
});

// Sidebar toggle
toggleSidebarBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Dark Mode Toggle
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}

// Simulate Real-Time Messaging
setInterval(() => {
  const otherUsers = Object.keys(conversations).filter(u => u !== currentUser);
  const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
  const msg = `Hello from ${randomUser}`;

  conversations[randomUser].push({ sender: 'bot', text: msg });

  // Show if currently selected
  if (randomUser === currentUser) {
    appendMessage('bot', msg);
  }
}, 15000); // every 15 seconds
