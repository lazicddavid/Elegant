/* Podaci galerija — slike i video snimci za svaki apartman */
const GALLERIES = {
  apt510: {
    title: "Apartman 510",
    items: [
      { type: "image", src: "/apartman510/1778974304472489.jpg" },
      { type: "image", src: "/apartman510/1778974304919865.jpg" },
      { type: "image", src: "/apartman510/1778974305134771.jpg" },
      { type: "image", src: "/apartman510/1778974305329195.jpg" },
      { type: "image", src: "/apartman510/1778974305700839.jpg" },
      { type: "image", src: "/apartman510/1778974305895175.jpg" },
      { type: "image", src: "/apartman510/1778974306371886.jpg" },
      { type: "image", src: "/apartman510/1778974307521643.jpg" },
      { type: "image", src: "/apartman510/1778974308121705.jpg" },
      { type: "image", src: "/apartman510/1778974308355764.jpg" },
      { type: "video", src: "/apartman510/video.mp4" },
    ],
  },
  apt509: {
    title: "Apartman 509",
    items: [
      { type: "image", src: "/apartman509/1779018843368837.jpg" },
      { type: "image", src: "/apartman509/1779018843614114.jpg" },
      { type: "image", src: "/apartman509/1779018843807355.jpg" },
      { type: "image", src: "/apartman509/1779018844131464.jpg" },
      { type: "image", src: "/apartman509/1779018844716198.jpg" },
      { type: "image", src: "/apartman509/1779018844965055.jpg" },
      { type: "image", src: "/apartman509/1779018845199193.jpg" },
      { type: "image", src: "/apartman509/1779018845782670.jpg" },
      { type: "image", src: "/apartman509/1779018845996876.jpg" },
      { type: "video", src: "/apartman509/video.mp4" },
    ],
  },
  apt511: {
    title: "Apartman 511",
    items: [
      { type: "image", src: "/apartman511/1779021088585472.jpg" },
      { type: "image", src: "/apartman511/1779021088864320.jpg" },
      { type: "image", src: "/apartman511/1779021089131227.jpg" },
      { type: "image", src: "/apartman511/1779021089431671.jpg" },
      { type: "image", src: "/apartman511/1779021089782099.jpg" },
      { type: "image", src: "/apartman511/177902109015118.jpg" },
      { type: "image", src: "/apartman511/1779021090299031.jpg" },
      { type: "image", src: "/apartman511/1779021090567356.jpg" },
      { type: "image", src: "/apartman511/1779021090934849.jpg" },
      { type: "image", src: "/apartman511/1779021091184581.jpg" },
      { type: "video", src: "/apartman511/video.mp4" },
    ],
  },
};

/* Svi DOM elementi na jednom mestu */
const DOM = {
  lightbox: document.getElementById("lightbox"),
  lightboxTitle: document.getElementById("lightboxTitle"),
  lightboxThumbs: document.getElementById("lightboxThumbs"),
  lightboxImg: document.getElementById("lightboxImg"),
  lightboxVideo: document.getElementById("lightboxVideo"),
  lightboxCounter: document.getElementById("lightboxCounter"),
  navToggle: document.querySelector(".nav-toggle"),
  navList: document.querySelector(".nav-list"),
  contactForm: document.getElementById("contactForm"),
  scrollTopBtn: document.getElementById("scrollTop"),
  logoBrand: document.querySelector(".logo-brand"),
  logoElegant: document.querySelector(".logo-elegant"),
  footerYear: document.getElementById("footerYear"),
  fadeEls: document.querySelectorAll(".fade-in-el"),
  sections: document.querySelectorAll("section[id]"),
  navLinks: document.querySelectorAll('.nav-link[href^="#"]'),
  smoothLinks: document.querySelectorAll('a[href^="#"]'),
  statCounters: document.querySelectorAll(".stat-number"),
};

/* Stanje aplikacije — trenutna galerija, indeks slike, početak swipe-a */
const state = {
  gallery: null,
  index: 0,
  touchStartX: 0,
};

/* EmailJS konfiguracija za slanje kontakt forme */
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

emailjs.init(EMAILJS_PUBLIC_KEY);

// ─── Lightbox ────────────────────────────────────────────

/* Pauzira video ako je u reprodukciji */
function pauseVideo() {
  if (!DOM.lightboxVideo.paused) DOM.lightboxVideo.pause();
}

/* Ažurira brojač — prikazuje trenutnu poziciju u galeriji (npr. 3 / 10) */
function updateCounter() {
  DOM.lightboxCounter.textContent = `${state.index + 1} / ${state.gallery.items.length}`;
}

/* Označava aktivni thumbnail i skroluje do njega u traci */
function updateActiveThumbs() {
  DOM.lightboxThumbs.querySelectorAll(".lightbox-thumb").forEach((t, i) => {
    const active = i === state.index;
    t.classList.toggle("active", active);
    if (active)
      t.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
  });
}

/* Prikazuje sliku ili video na osnovu trenutnog state.index */
function applyMedia() {
  const item = state.gallery.items[state.index];

  if (item.type === "video") {
    DOM.lightboxImg.style.display = "none";
    DOM.lightboxVideo.style.display = "block";
    if (DOM.lightboxVideo.src !== location.origin + item.src) {
      DOM.lightboxVideo.src = item.src;
      DOM.lightboxVideo.load();
    }
    DOM.lightboxVideo.play().catch(() => {});
  } else {
    DOM.lightboxVideo.style.display = "none";
    DOM.lightboxImg.style.display = "block";
    DOM.lightboxImg.src = item.src;
  }

  updateCounter();
  updateActiveThumbs();
  DOM.lightboxImg.classList.remove("lb-fading");
  DOM.lightboxVideo.classList.remove("lb-fading");
}

/* Renderuje lightbox — sa fade animacijom ili bez (skipAnim = true pri otvaranju) */
function renderLightbox(skipAnim) {
  if (skipAnim) {
    applyMedia();
    return;
  }
  DOM.lightboxImg.classList.add("lb-fading");
  DOM.lightboxVideo.classList.add("lb-fading");
  setTimeout(applyMedia, 150);
}



 function  (params) {
  
 }
/* Kreira thumbnail dugme za video snimak */
function buildThumbVideo(i) {
  const div = document.createElement("div");
  div.className = "lightbox-thumb lightbox-thumb-video";
  div.setAttribute("role", "button");
  div.setAttribute("tabindex", "0");
  div.setAttribute("aria-label", "Video snimak");
  div.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>`;
  div.addEventListener("click", () => {
    state.index = i;
    renderLightbox();
  });
  div.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      state.index = i;
      renderLightbox();
    }
  });
  return div;
}

/* Kreira thumbnail element za jednu sliku */
function buildThumbImage(item, i) {
  const img = document.createElement("img");
  img.src = item.src;
  img.alt = `Slika ${i + 1}`;
  img.className = "lightbox-thumb";
  img.loading = "lazy";
  img.setAttribute("tabindex", "0");
  img.setAttribute("role", "button");
  img.addEventListener("click", () => {
    state.index = i;
    renderLightbox();
  });
  img.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      state.index = i;
      renderLightbox();
    }
  });
  return img;
}

/* Gradi celu traku thumbnailova za trenutnu galeriju */
function buildThumbs() {
  DOM.lightboxThumbs.innerHTML = "";
  state.gallery.items.forEach((item, i) => {
    const el =
      item.type === "video" ? buildThumbVideo(i) : buildThumbImage(item, i);
    DOM.lightboxThumbs.appendChild(el);
  });
}

/* Otvara lightbox za zadati apartman i indeks slike */
function openLightbox(galleryId, index) {
  state.gallery = GALLERIES[galleryId];
  if (!state.gallery) return;
  state.index = index;

  DOM.lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  DOM.lightboxTitle.textContent = state.gallery.title;

  buildThumbs();
  renderLightbox(true);
}

/* Zatvara lightbox i vraća scroll stranice */
function closeLightbox() {
  pauseVideo();
  DOM.lightbox.hidden = true;
  document.body.style.overflow = "";
}

/* Navigacija kroz galeriju — dir: 1 (sledeća) ili -1 (prethodna) */
function lightboxNav(dir) {
  if (!state.gallery) return;
  pauseVideo();
  state.index =
    (state.index + dir + state.gallery.items.length) %
    state.gallery.items.length;
  renderLightbox();
}

/* Izlaganje funkcija globalno — potrebno zbog onclick atributa u HTML-u */
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.lightboxNav = lightboxNav;

// ─── Nav ─────────────────────────────────────────────────

/* Zatvara mobilni meni */
function closeNav() {
  DOM.navList.classList.remove("nav-open");
  DOM.navToggle.classList.remove("active");
  DOM.navToggle.setAttribute("aria-expanded", "false");
}

/* Otvara ili zatvara mobilni meni (toggle) */
function toggleNav() {
  const isOpen = DOM.navList.classList.toggle("nav-open");
  DOM.navToggle.classList.toggle("active", isOpen);
  DOM.navToggle.setAttribute("aria-expanded", String(isOpen));
}

// ─── Kontakt forma ────────────────────────────────────────

/* Proverava da li je email adresa u ispravnom formatu */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* Čita i vraća popunjena polja iz kontakt forme */
function getFormData() {
  return {
    name: document.getElementById("nameInput").value.trim(),
    email: document.getElementById("emailInput").value.trim(),
    category: document.getElementById("categoryInput").value,
    message: document.getElementById("messageInput").value.trim(),
  };
}

/* Menja stanje dugmeta za slanje — blokira ga tokom slanja */
function setSubmitState(btn, sending) {
  btn.textContent = sending ? "Slanje..." : "Pošalji poruku";
  btn.disabled = sending;
}

/* Obrađuje submit kontakt forme — validacija, slanje i povratna poruka */
function handleFormSubmit(e) {
  e.preventDefault();
  const { name, email, category, message } = getFormData();

  if (!name || !email || !category || !message) {
    alert("Molimo popunite sva obavezna polja!");
    return;
  }
  if (!isValidEmail(email)) {
    alert("Molimo unesite validan email!");
    return;
  }

  const btn = DOM.contactForm.querySelector('button[type="submit"]');
  setSubmitState(btn, true);

  emailjs
    .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, DOM.contactForm)
    .then(() => {
      alert(`Hvala Vam, ${name}! Poruka je uspešno poslata.`);
      DOM.contactForm.reset();
    })
    .catch(() => {
      alert(
        "Greška pri slanju. Pokušajte ponovo ili nas kontaktirajte telefonom.",
      );
    })
    .finally(() => setSubmitState(btn, false));
}

// ─── Scroll i UI ─────────────────────────────────────────

/* Prikazuje ili skriva dugme "nazad na vrh" u zavisnosti od scroll pozicije */
function handleScrollTopVisibility() {
  DOM.scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
}

/* Skroluje stranicu na vrh uz haptički feedback na mobilnim uređajima */
function scrollToTop() {
  if (navigator.vibrate) navigator.vibrate(22);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Smooth scroll za sve interne linkove (npr. #kontakt, #prodaja) */
function handleSmoothLink(e) {
  const target = document.querySelector(e.currentTarget.getAttribute("href"));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth" });
}

// ─── Animacije ───────────────────────────────────────────

/* Animira brojač od 0 do zadane vrednosti u toku 2 sekunde */
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

/* Pokreće fade-in animaciju za elemente kada uđu u vidno polje */
function initFadeObserver() {
  if (!DOM.fadeEls.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  DOM.fadeEls.forEach((el) => observer.observe(el));
}

/* Pokreće animaciju brojača kada sekcija "O nama" uđe u vidno polje */
function initCounterObserver() {
  if (!DOM.statCounters.length) return;
  const observer = new IntersectionObserver(
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
  DOM.statCounters.forEach((el) => observer.observe(el));
}

/* Prati koja je sekcija aktivna i ažurira aktivan link u navigaciji */
function initScrollSpy() {
  if (!DOM.sections.length || !DOM.navLinks.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          DOM.navLinks.forEach((link) => {
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
  DOM.sections.forEach((s) => observer.observe(s));
}

/* Prati poziciju miša i ažurira glass sjaj na "Elegant" tekstu */
function initLogoShine() {
  if (!DOM.logoElegant) return;
  DOM.logoElegant.addEventListener("mousemove", (e) => {
    const rect = DOM.logoElegant.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    DOM.logoElegant.style.setProperty("--shine-x", `${x}%`);
    DOM.logoElegant.style.setProperty("--shine-y", `${y}%`);
  });
  DOM.logoElegant.addEventListener("mouseleave", () => {
    DOM.logoElegant.style.setProperty("--shine-x", "-40%");
    DOM.logoElegant.style.setProperty("--shine-y", "-40%");
  });
}

/* Dodaje event listenere za lightbox — tastatura, swipe i klik na pozadinu */
function initLightboxEvents() {
  document.addEventListener("keydown", (e) => {
    if (DOM.lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lightboxNav(-1);
    if (e.key === "ArrowRight") lightboxNav(1);
  });

  document.addEventListener(
    "touchstart",
    (e) => {
      if (DOM.lightbox.hidden) return;
      state.touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  document.addEventListener(
    "touchend",
    (e) => {
      if (DOM.lightbox.hidden) return;
      const dx = e.changedTouches[0].screenX - state.touchStartX;
      if (Math.abs(dx) > 50) lightboxNav(dx < 0 ? 1 : -1);
    },
    { passive: true },
  );

  DOM.lightbox.addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
}

// ─── Inicijalizacija ──────────────────────────────────────

/* Kači sve event listenere i pokreće observere kada se DOM učita */
document.addEventListener("DOMContentLoaded", () => {
  DOM.navToggle.addEventListener("click", toggleNav);
  DOM.navList.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  if (DOM.contactForm) {
    DOM.contactForm.addEventListener("submit", handleFormSubmit);
  }

  DOM.smoothLinks.forEach((link) =>
    link.addEventListener("click", handleSmoothLink),
  );

  if (DOM.logoBrand) {
    DOM.logoBrand.style.cursor = "pointer";
    DOM.logoBrand.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  if (DOM.footerYear) DOM.footerYear.textContent = new Date().getFullYear();

  if (DOM.scrollTopBtn) {
    window.addEventListener("scroll", handleScrollTopVisibility, {
      passive: true,
    });
    DOM.scrollTopBtn.addEventListener("click", scrollToTop);
  }

  initFadeObserver();
  initCounterObserver();
  initScrollSpy();
  initLightboxEvents();
  initLogoShine();
});
