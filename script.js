document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const typeSelect = document.getElementById('typeSelect');
  const propertyCards = Array.from(document.querySelectorAll('.property-card'));
  const contactForm = document.getElementById('contactForm');

  const filterProperties = () => {
    const query = searchInput.value.trim().toLowerCase();
    const selectedType = typeSelect.value;

    propertyCards.forEach((card) => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const location = card.querySelector('.property-location').textContent.toLowerCase();
      const description = card.querySelector('.property-meta').textContent.toLowerCase();
      const type = card.dataset.type;
      const matchesQuery = !query || title.includes(query) || location.includes(query) || description.includes(query);
      const matchesType = selectedType === 'all' || type === selectedType;
      card.style.display = matchesQuery && matchesType ? 'grid' : 'none';
    });
  };

  searchInput.addEventListener('input', filterProperties);
  typeSelect.addEventListener('change', filterProperties);

  propertyCards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const message = document.getElementById('messageInput').value.trim();

    if (!name || !email || !message) {
      alert('Molimo popunite sva polja pre slanja.');
      return;
    }

    alert(`Hvala ${name}! Vaša poruka je poslata. Javićemo se uskoro.`);
    contactForm.reset();
  });
});
