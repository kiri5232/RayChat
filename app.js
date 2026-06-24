const setupCard = document.getElementById("setupCard");
const chatCard = document.getElementById("chatCard");

const usernameInput = document.getElementById("username");
const roomInput = document.getElementById("roomCode");

const joinBtn = document.getElementById("joinBtn");

const roomDisplay = document.getElementById("roomDisplay");

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

let currentUser = "";
let currentRoom = "";

/* Load saved username */
window.addEventListener("load", () => {
const savedUser = localStorage.getItem("raychat_username");

if (savedUser) {
    usernameInput.value = savedUser;
}

});

/* Join Room */
joinBtn.addEventListener("click", () => {

const username = usernameInput.value.trim();
const room = roomInput.value.trim().toUpperCase();

if (!username || !room) {
    alert("Enter Username and Room Code");
    return;
}

currentUser = username;
currentRoom = room;

localStorage.setItem("raychat_username", username);

roomDisplay.textContent = `Room: ${room}`;

setupCard.classList.add("hidden");
chatCard.classList.remove("hidden");

});

/* Send Message */
sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", (e) => {
if (e.key === "Enter") {
sendMessage();
}
});

function sendMessage() {

const text = messageInput.value.trim();

if (!text) return;

const messageDiv = document.createElement("div");

messageDiv.classList.add("message");
messageDiv.classList.add("me");

messageDiv.innerHTML = `
    <strong>${currentUser}</strong>
    <p>${text}</p>
`;

messages.appendChild(messageDiv);

messages.scrollTop = messages.scrollHeight;

messageInput.value = "";

}
