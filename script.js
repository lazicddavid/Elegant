const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

emailjs.init(EMAILJS_PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("nav-open");
      navToggle.classList.toggle("active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navList.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navList.classList.remove("nav-open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contact form with EmailJS
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("nameInput").value.trim();
      const email = document.getElementById("emailInput").value.trim();
      const category = document.getElementById("categoryInput").value;
      const message = document.getElementById("messageInput").value.trim();

      if (!name || !email || !category || !message) {
        alert("Molimo popunite sva obavezna polja!");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Molimo unesite validan email!");
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = "Slanje...";
      submitBtn.disabled = true;

      emailjs
        .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
        .then(() => {
          alert(`Hvala Vam, ${name}! Poruka je uspešno poslata.`);
          contactForm.reset();
        })
        .catch(() => {
          alert(
            "Greška pri slanju. Pokušajte ponovo ili nas kontaktirajte telefonom.",
          );
        })
        .finally(() => {
          submitBtn.textContent = "Pošalji poruku";
          submitBtn.disabled = false;
        });
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Scroll to top
  const scrollTopBtn = document.getElementById("scrollTop");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
    });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Fade-in on scroll
  const fadeEls = document.querySelectorAll(".fade-in-el");
  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    fadeEls.forEach((el) => fadeObserver.observe(el));
  }

  // Animated counters
  const counters = document.querySelectorAll(".stat-number");
  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = "true";
            animateCounter(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach((c) => counterObserver.observe(c));
  }

  // Scroll spy
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length && navLinks.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${entry.target.id}`,
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    sections.forEach((s) => spyObserver.observe(s));
  }
});

function animateCounter(el) {
  const text = el.textContent;
  const num = parseInt(text);
  const suffix = text.replace(/\d/g, "");
  const steps = 60;
  const increment = num / steps;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    el.textContent = Math.min(Math.round(increment * step), num) + suffix;
    if (step >= steps) clearInterval(timer);
  }, 2000 / steps);
}
