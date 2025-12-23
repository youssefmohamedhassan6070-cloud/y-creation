console.log("About editor JS loaded");

// Check editor mode
const isEditor = localStorage.getItem("editorMode") === "true";

// Elements
const pageTitle = document.getElementById("pageTitle");
const pageDesc  = document.getElementById("pageDesc");

const editTitle = document.getElementById("editTitle");
const editDesc  = document.getElementById("editDesc");

const editorPanel = document.getElementById("editorPanel");
const saveBtn = document.getElementById("saveAboutBtn");

// Storage key
const ABOUT_KEY = "about_page";

// Load saved content
if (localStorage.getItem(ABOUT_KEY + "_title")) {
    pageTitle.innerText = localStorage.getItem(ABOUT_KEY + "_title");
}

if (localStorage.getItem(ABOUT_KEY + "_desc")) {
    pageDesc.innerText = localStorage.getItem(ABOUT_KEY + "_desc");
}

// Editor mode
if (isEditor) {
    editorPanel.style.display = "block";

    editTitle.value = pageTitle.innerText;
    editDesc.value  = pageDesc.innerText;
}

// ✅ EVENT LISTENER (الحل السحري)
if (saveBtn) {
    saveBtn.addEventListener("click", function () {

        if (!isEditor) return;

        pageTitle.innerText = editTitle.value;
        pageDesc.innerText  = editDesc.value;

        localStorage.setItem(ABOUT_KEY + "_title", editTitle.value);
        localStorage.setItem(ABOUT_KEY + "_desc", editDesc.value);

        alert("About page saved ✔");
    });
}
sendBtn.addEventListener("click", () => {

    const name  = document.getElementById("msgName").value.trim();
    const email = document.getElementById("msgEmail").value.trim();
    const text  = document.getElementById("msgText").value.trim();

    if (!name || !email || !text) {
        alert("Please fill all fields");
        return;
    }

    const to = emailSpan.innerText.trim();

    if (!to) {
        alert("Contact email not set");
        return;
    }

    const subject = encodeURIComponent("New message from " + name);

    const body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        text
    );

    window.location.href =
        `mailto:${to}?subject=${subject}&body=${body}`;
});

