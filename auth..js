// =============================
// AUTH SYSTEM (Frontend)
// =============================

// الكود السري اللي معاك انت
const MASTER_INVITE_CODE = "YCREATION-2025";

// =============================
// Switch Forms
// =============================
function showRegister() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "block";
}

function showLogin() {
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

// =============================
// Register
// =============================
function register() {
    const user = regUser.value.trim();
    const pass = regPass.value.trim();
    const code = inviteCode.value.trim();

    if (!user || !pass || !code) {
        alert("Please fill all fields");
        return;
    }

    if (code !== MASTER_INVITE_CODE) {
        alert("Invalid invite code ❌");
        return;
    }

    const users = JSON.parse(localStorage.getItem("editors")) || {};

    if (users[user]) {
        alert("Username already exists");
        return;
    }

    users[user] = pass;
    localStorage.setItem("editors", JSON.stringify(users));

    alert("Account created successfully ✔");
    showLogin();
}

// =============================
// Login
// =============================
function login() {
    const user = loginUser.value.trim();
    const pass = loginPass.value.trim();

    const users = JSON.parse(localStorage.getItem("editors")) || {};

    if (!users[user] || users[user] !== pass) {
        alert("Wrong username or password");
        return;
    }

    localStorage.setItem("editorMode", "true");
    window.location.href = "index.html";
    
}
const editorBtn = document.getElementById("dashboardBtn");
const errorMsg  = document.getElementById("loginError");

// غيّر الكود براحتك
const EDITOR_PASSCODE = "Masterkey";

editorBtn.addEventListener("click", () => {
    const code = prompt("Enter Editor Passcode");

    if (code === null) return; // Cancel

    if (code === EDITOR_PASSCODE) {
        // تفعيل Editor Mode
        localStorage.setItem("editorMode", "true");

        // 👇 التحويل على الداشبورد (مش الصفحة الرئيسية)
        window.location.href = "dashboard.html";
    } else {
        if (errorMsg) errorMsg.style.display = "block";
    }
});

