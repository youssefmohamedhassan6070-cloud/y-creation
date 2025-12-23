// =============================
// Editor JS - CLEAN VERSION
// =============================

// ===== Detect Editor Mode =====
const isEditor = localStorage.getItem("editorMode") === "true";

// ===== Detect Page Key =====
let CONTENT_KEY = "content_home";

if (location.pathname.includes("services")) {
    CONTENT_KEY = "content_services";
} else if (location.pathname.includes("projects")) {
    CONTENT_KEY = "content_projects";
}

// ===== Elements =====
const homeTitle   = document.getElementById("homeTitle");
const homeDesc    = document.getElementById("homeDesc");

const editTitle   = document.getElementById("editTitle");
const editDesc    = document.getElementById("editDesc");

const cardsContainer = document.querySelector(".cards");
const editorPanel    = document.getElementById("editorPanel");
const newService     = document.getElementById("newService");

// =============================
// INITIAL SAVE (CARDS)
// =============================
if (cardsContainer && !localStorage.getItem(CONTENT_KEY)) {
    localStorage.setItem(CONTENT_KEY, cardsContainer.innerHTML);
}

// =============================
// LOAD CONTENT
// =============================

// Load cards
if (cardsContainer && localStorage.getItem(CONTENT_KEY)) {
    cardsContainer.innerHTML = localStorage.getItem(CONTENT_KEY);
}

// Load home text
if (homeTitle && localStorage.getItem("homeTitle")) {
    homeTitle.innerText = localStorage.getItem("homeTitle");
}

if (homeDesc && localStorage.getItem("homeDesc")) {
    homeDesc.innerText = localStorage.getItem("homeDesc");
}

// =============================
// MODE HANDLING
// =============================
if (isEditor) {
    if (editorPanel) editorPanel.style.display = "block";

    if (editTitle && homeTitle) editTitle.value = homeTitle.innerText;
    if (editDesc && homeDesc) editDesc.value = homeDesc.innerText;

    enableEditorControls();
} else {
    hideEditorControls();
}

// =============================
// SAVE HOME TEXT
// =============================
function saveText() {
    if (!isEditor) return;

    if (homeTitle && editTitle) {
        homeTitle.innerText = editTitle.value;
        localStorage.setItem("homeTitle", editTitle.value);
    }

    if (homeDesc && editDesc) {
        homeDesc.innerText = editDesc.value;
        localStorage.setItem("homeDesc", editDesc.value);
    }

    alert("Saved ✔");
}

// =============================
// ADD SERVICE / PROJECT
// =============================
function addService() {
    if (!isEditor || !cardsContainer || !newService) return;
    if (!newService.value.trim()) return;

    const card = document.createElement("div");
    card.className = "card";
    card.textContent = newService.value;

    cardsContainer.appendChild(card);
    saveCards();
    enableEditorControls();

    newService.value = "";
}

// =============================
// ENABLE EDIT / DELETE
// =============================
function enableEditorControls() {
    if (!isEditor || !cardsContainer) return;

    const cards = cardsContainer.querySelectorAll(".card");

    cards.forEach(card => {

        if (card.dataset.ready === "true") return;
        card.dataset.ready = "true";

        const text = document.createElement("span");
        text.textContent = card.textContent;
        card.textContent = "";
        card.appendChild(text);

        // Edit
        const editBtn = document.createElement("span");
        editBtn.textContent = " ✏️";
        editBtn.style.cursor = "pointer";

        editBtn.onclick = () => {
            text.contentEditable = "true";
            text.focus();
        };

        // Save
        text.onblur = () => {
            text.contentEditable = "false";
            saveCards();
        };

        // Delete
        const delBtn = document.createElement("span");
        delBtn.textContent = " ✖";
        delBtn.style.cursor = "pointer";
        delBtn.style.color = "red";
        delBtn.style.marginLeft = "6px";

        delBtn.onclick = () => {
            card.remove();
            saveCards();
        };

        card.appendChild(editBtn);
        card.appendChild(delBtn);
    });
}

// =============================
// SAVE CARDS
// =============================
function saveCards() {
    if (!cardsContainer) return;
    localStorage.setItem(CONTENT_KEY, cardsContainer.innerHTML);
}

// =============================
// HIDE EDITOR (USER MODE)
// =============================
function hideEditorControls() {
    if (editorPanel) editorPanel.style.display = "none";
    document.querySelectorAll("[data-ready]").forEach(el => {
        el.dataset.ready = "";
    });
}

// =============================
// LOGOUT EDITOR
// =============================
function logout() {
    localStorage.removeItem("editorMode");
    window.location.href = "start.html";
}

// =============================
// SWITCH MODE
// =============================
function switchMode() {
    const confirmSwitch = confirm(
        isEditor
        ? "Switch to User mode?"
        : "Switch to Editor mode?"
    );

    if (!confirmSwitch) return;

    if (isEditor) {
        localStorage.removeItem("editorMode");
        window.location.href = "start.html";
    } else {
        window.location.href = "login.html";
    }
}

// =============================
// LOGIN (PASSCODE)
// =============================
const editorBtn = document.getElementById("editorLoginBtn");
const errorMsg  = document.getElementById("loginError");

const EDITOR_PASSCODE = "12345";

if (editorBtn) {
    editorBtn.onclick = () => {
        const code = prompt("Enter Editor Passcode");
        if (code === EDITOR_PASSCODE) {
            localStorage.setItem("editorMode", "true");
            window.location.href = "index.html";
        } else {
            if (errorMsg) errorMsg.style.display = "block";
        }
    };
}

// =============================
// EXPOSE FUNCTIONS
// =============================
window.addService = addService;
window.saveText   = saveText;
window.logout     = logout;
window.switchMode = switchMode;
