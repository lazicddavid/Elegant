document.addEventListener("DOMContentLoaded", () => {
  // Contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("nameInput").value.trim();
      const email = document.getElementById("emailInput").value.trim();
      const phone = document.getElementById("phoneInput").value.trim();
      const category = document.getElementById("categoryInput").value;
      const message = document.getElementById("messageInput").value.trim();

      // Validation
      if (!name || !email || !category || !message) {
        alert("Molimo popunite sva obavezna polja!");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Molimo unesite validan email!");
        return;
      }

      // Success message
      alert(
        `Hvala Vam, ${name}! Primili smo vašu poruku. Kontaktiraćemo vas na ${email} uskoro.`,
      );

      // Reset form
      contactForm.reset();

      // Log data for debugging (in real app, send to server)
      console.log({
        name: name,
        email: email,
        phone: phone,
        category: category,
        message: message,
        timestamp: new Date().toISOString(),
      });
    });
  }

  // Smooth scroll za linkove
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
