// =============================
// Dashboard Messages
// =============================

const container = document.getElementById("messagesContainer");
const logoutBtn = document.getElementById("logoutBtn");

// Load messages on page load
loadMessages();

function loadMessages() {
    const messages =
        JSON.parse(localStorage.getItem("messages")) || [];

    container.innerHTML = "";

    if (messages.length === 0) {
        container.innerHTML =
            "<p style='color:#aaa'>No messages yet</p>";
        return;
    }

    messages.forEach((msg, index) => {
        const card = document.createElement("div");
        card.className =
            "message-card" + (msg.unread ? " unread" : "");

        card.innerHTML = `
            <div class="msg-header">
                <span class="msg-name">${msg.name}</span>
                <span class="msg-time">${msg.time}</span>
            </div>

            <p class="msg-email">${msg.email}</p>
            <p class="msg-text">${msg.message}</p>

            <div class="msg-actions">
                <button class="read" onclick="markRead(${index})">
                    Mark Read
                </button>
                <button class="delete" onclick="deleteMsg(${index})">
                    Delete
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

function markRead(index) {
    const messages =
        JSON.parse(localStorage.getItem("messages")) || [];

    messages[index].unread = false;
    localStorage.setItem("messages", JSON.stringify(messages));
    loadMessages();
}

function deleteMsg(index) {
    const messages =
        JSON.parse(localStorage.getItem("messages")) || [];

    messages.splice(index, 1);
    localStorage.setItem("messages", JSON.stringify(messages));
    loadMessages();
}

logoutBtn.onclick = () => {
    localStorage.removeItem("editorMode");
    window.location.href = "login.html"; 
};

