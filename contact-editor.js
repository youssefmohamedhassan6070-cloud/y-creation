// =============================
// Contact Form → Save Messages
// =============================

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // يمنع الريفريش

    const nameInput = contactForm.querySelector("input[type='text']");
    const emailInput = contactForm.querySelector("input[type='email']");
    const msgInput = contactForm.querySelector("textarea");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = msgInput.value.trim();

    if (!name || !email || !message) {
        alert("Please fill all fields");
        return;
    }

    const messages =
        JSON.parse(localStorage.getItem("messages")) || [];

    messages.push({
        name,
        email,
        message,
        time: new Date().toLocaleString(),
        unread: true
    });

    localStorage.setItem("messages", JSON.stringify(messages));

    // Reset form
    nameInput.value = "";
    emailInput.value = "";
    msgInput.value = "";

    // Feedback
    alert("✔ Signal sent successfully");
});
