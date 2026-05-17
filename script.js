// Gallery data – keyed by apartment ID
const GALLERIES = {
  apt510: {
    title: 'Apartman 510',
    items: [
      { type: 'image', src: '/apartman510/1778974304472489.jpg' },
      { type: 'image', src: '/apartman510/1778974304919865.jpg' },
      { type: 'image', src: '/apartman510/1778974305134771.jpg' },
      { type: 'image', src: '/apartman510/1778974305329195.jpg' },
      { type: 'image', src: '/apartman510/1778974305700839.jpg' },
      { type: 'image', src: '/apartman510/1778974305895175.jpg' },
      { type: 'image', src: '/apartman510/1778974306371886.jpg' },
      { type: 'image', src: '/apartman510/1778974307521643.jpg' },
      { type: 'image', src: '/apartman510/1778974308121705.jpg' },
      { type: 'image', src: '/apartman510/1778974308355764.jpg' },
      { type: 'video', src: '/apartman510/IMG_2947.MOV' },
    ],
  },
};

let lbGallery = null;
let lbIdx = 0;

window.openLightbox = function (galleryId, index) {
  lbGallery = GALLERIES[galleryId];
  if (!lbGallery) return;
  lbIdx = index;

  const lb = document.getElementById('lightbox');
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('lightboxTitle').textContent = lbGallery.title;

  const thumbsEl = document.getElementById('lightboxThumbs');
  thumbsEl.innerHTML = '';
  lbGallery.items.forEach((item, i) => {
    if (item.type === 'video') {
      const div = document.createElement('div');
      div.className = 'lightbox-thumb lightbox-thumb-video';
      div.setAttribute('role', 'button');
      div.setAttribute('tabindex', '0');
      div.setAttribute('aria-label', 'Video snimak');
      div.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>`;
      div.addEventListener('click', () => { lbIdx = i; renderLightbox(); });
      thumbsEl.appendChild(div);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = `Slika ${i + 1}`;
      img.className = 'lightbox-thumb';
      img.loading = 'lazy';
      img.addEventListener('click', () => { lbIdx = i; renderLightbox(); });
      thumbsEl.appendChild(img);
    }
  });

  renderLightbox();
};

window.closeLightbox = function () {
  const videoEl = document.getElementById('lightboxVideo');
  if (videoEl && !videoEl.paused) videoEl.pause();
  document.getElementById('lightbox').hidden = true;
  document.body.style.overflow = '';
};

window.lightboxNav = function (dir) {
  if (!lbGallery) return;
  const videoEl = document.getElementById('lightboxVideo');
  if (videoEl && !videoEl.paused) videoEl.pause();
  lbIdx = (lbIdx + dir + lbGallery.items.length) % lbGallery.items.length;
  renderLightbox();
};

function renderLightbox() {
  const item = lbGallery.items[lbIdx];
  const imgEl = document.getElementById('lightboxImg');
  const videoEl = document.getElementById('lightboxVideo');

  if (item.type === 'video') {
    imgEl.style.display = 'none';
    videoEl.style.display = 'block';
    if (videoEl.src !== location.origin + item.src) {
      videoEl.src = item.src;
      videoEl.load();
    }
  } else {
    videoEl.style.display = 'none';
    imgEl.style.display = 'block';
    imgEl.src = item.src;
  }

  document.getElementById('lightboxCounter').textContent =
    `${lbIdx + 1} / ${lbGallery.items.length}`;
  document.querySelectorAll('.lightbox-thumb').forEach((t, i) => {
    const active = i === lbIdx;
    t.classList.toggle('active', active);
    if (active) t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  });
}

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

  // Logo click scrolls to top
  const logoBrand = document.querySelector(".logo-brand");
  if (logoBrand) {
    logoBrand.style.cursor = "pointer";
    logoBrand.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Footer year
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll to top
  const scrollTopBtn = document.getElementById("scrollTop");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
    });
    scrollTopBtn.addEventListener("click", () => {
      if (navigator.vibrate) navigator.vibrate(22);
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

  // Lightbox keyboard & touch
  let lbTouchStartX = 0;

  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb || lb.hidden) return;
    if (e.key === 'Escape') window.closeLightbox();
    if (e.key === 'ArrowLeft') window.lightboxNav(-1);
    if (e.key === 'ArrowRight') window.lightboxNav(1);
  });

  document.addEventListener('touchstart', (e) => {
    if (document.getElementById('lightbox')?.hidden !== false) return;
    lbTouchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (document.getElementById('lightbox')?.hidden !== false) return;
    const dx = e.changedTouches[0].screenX - lbTouchStartX;
    if (Math.abs(dx) > 50) window.lightboxNav(dx < 0 ? 1 : -1);
  }, { passive: true });

  document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') window.closeLightbox();
  });

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
