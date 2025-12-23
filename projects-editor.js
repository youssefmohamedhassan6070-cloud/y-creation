// =============================
// Projects Editor - FULL VERSION
// =============================
console.log("Projects editor loaded");

// =============================
// Detect Editor Mode
// =============================
const isEditor = localStorage.getItem("editorMode") === "true";

// =============================
// Elements
// =============================
const projectsContainer = document.getElementById("projectsContainer");
const editorPanel = document.getElementById("editorPanel2");
const newProjectInput = document.getElementById("newProject");

// =============================
// Storage Key
// =============================
const PROJECTS_KEY = "projectsHTML";

// =============================
// Initial Save (first time only)
// =============================
if (projectsContainer && !localStorage.getItem(PROJECTS_KEY)) {
    localStorage.setItem(
        PROJECTS_KEY,
        projectsContainer.innerHTML
    );
}

// =============================
// Load Projects from Storage
// =============================
if (projectsContainer && localStorage.getItem(PROJECTS_KEY)) {
    projectsContainer.innerHTML =
        localStorage.getItem(PROJECTS_KEY);
}

// =============================
// Editor Mode Handling
// =============================
if (isEditor) {
    if (editorPanel2) editorPanel2.style.display = "block";
    enableProjectEditorControls();
} else {
    removeEditorControls();
}

// =============================
// Add Project
// =============================
function addProject() {
    if (!isEditor || !projectsContainer) return;

    const name = newProjectInput.value.trim();
    if (!name) return;

    const card = document.createElement("div");
    card.className = "card";
    card.textContent = name;

    projectsContainer.appendChild(card);

    saveProjects();
    enableProjectEditorControls();

    newProjectInput.value = "";
}

// =============================
// Enable Edit / Save / Delete
// =============================
function enableProjectEditorControls() {
    if (!isEditor || !projectsContainer) return;

    const cards = projectsContainer.querySelectorAll(".card");

    cards.forEach(card => {

        // منع التكرار
        if (card.querySelector(".edit-btn")) return;

        // نص المشروع
        const textSpan = document.createElement("span");
        textSpan.textContent = card.textContent.trim();
        card.textContent = "";
        card.appendChild(textSpan);

        textSpan.onkeydown = e => {
            if (e.key === "Enter") e.preventDefault();
        };

        // ===== Edit =====
        const editBtn = document.createElement("span");
        editBtn.textContent = " ✏️";
        editBtn.className = "edit-btn";
        editBtn.style.cursor = "pointer";
        editBtn.style.marginLeft = "8px";

        // ===== Save =====
        const saveBtn = document.createElement("span");
        saveBtn.textContent = " 💾";
        saveBtn.className = "save-btn";
        saveBtn.style.cursor = "pointer";
        saveBtn.style.marginLeft = "6px";
        saveBtn.style.display = "none";

        editBtn.onclick = () => {
            textSpan.contentEditable = "true";
            textSpan.focus();
            textSpan.style.outline = "1px dashed #999";
            saveBtn.style.display = "inline";
        };

        saveBtn.onclick = () => {
            textSpan.contentEditable = "false";
            textSpan.style.outline = "none";
            saveBtn.style.display = "none";
            saveProjects();
        };

        // ===== Delete =====
        const delBtn = document.createElement("span");
        delBtn.textContent = " ✖";
        delBtn.className = "delete-btn";
        delBtn.style.cursor = "pointer";
        delBtn.style.color = "red";
        delBtn.style.marginLeft = "6px";

        delBtn.onclick = () => {
            card.remove();
            saveProjects();
        };

        card.appendChild(editBtn);
        card.appendChild(saveBtn);
        card.appendChild(delBtn);
    });
}

// =============================
// Save Projects
// =============================
function saveProjects() {
    if (!projectsContainer) return;

    localStorage.setItem(
        PROJECTS_KEY,
        projectsContainer.innerHTML
    );
}

// =============================
// Remove Editor Controls (USER)
// =============================
function removeEditorControls() {
    document.querySelectorAll(
        ".edit-btn, .save-btn, .delete-btn"
    ).forEach(btn => btn.remove());

    if (editorPanel2) editorPanel2.style.display = "none";
}

// =============================
// Expose Functions
// =============================
window.addProject = addProject;
