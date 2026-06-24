import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
query,
orderBy,
onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAj2Gb5XLs6XI3flD-EeTtDY2sPH-KSiIs",
authDomain: "raychat-21e11.firebaseapp.com",
projectId: "raychat-21e11",
storageBucket: "raychat-21e11.firebasestorage.app",
messagingSenderId: "407632322071",
appId: "1:407632322071:web:e9bdbb613ab34e46960652",
measurementId: "G-TM8S9TV6YV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

window.addEventListener("load", () => {
const savedUser = localStorage.getItem("raychat_username");

if (savedUser) {
usernameInput.value = savedUser;
}
});

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

roomDisplay.textContent = "Room: ${room}";

setupCard.classList.add("hidden");
chatCard.classList.remove("hidden");

loadMessages();
});

async function sendMessage() {

const text = messageInput.value.trim();

if (!text) return;

await addDoc(
collection(db, "rooms", currentRoom, "messages"),
{
username: currentUser,
text: text,
createdAt: Date.now()
}
);

messageInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", (e) => {
if (e.key === "Enter") {
sendMessage();
}
});

function loadMessages() {

const q = query(
collection(db, "rooms", currentRoom, "messages"),
orderBy("createdAt")
);

onSnapshot(q, (snapshot) => {

messages.innerHTML = "";

snapshot.forEach((doc) => {

  const data = doc.data();

  const div = document.createElement("div");

  div.classList.add("message");

  if (data.username === currentUser) {
    div.classList.add("me");
  } else {
    div.classList.add("other");
  }

  div.innerHTML = `
    <strong>${data.username}</strong>
    <p>${data.text}</p>
  `;

  messages.appendChild(div);
});

messages.scrollTop = messages.scrollHeight;

});
  }
