// Nav scroll behavior
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.querySelectorAll('a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Scroll reveal
function observeReveals(elements) {
  if (!elements.length) return;
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  elements.forEach(el => revealObserver.observe(el));
}
observeReveals(document.querySelectorAll('.reveal'));

// Contact form — Web3Forms async submit
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });
      const data = await res.json();

      if (res.ok && data.success) {
        contactForm.style.display = 'none';
        document.getElementById('form-success').hidden = false;
      } else {
        btn.disabled = false;
        btn.textContent = 'Send Message';
        alert('Something went wrong. Please try again or email kalib@kalibkoons.com directly.');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      alert('Something went wrong. Please try again or email kalib@kalibkoons.com directly.');
    }
  });
}

// Active Listings — render from listings-data.js + detail popup
const listingsGrid = document.getElementById('listingsGrid');

if (listingsGrid && typeof listingsData !== 'undefined') {
  listingsGrid.innerHTML = listingsData.map((listing, i) => `
    <div class="listing-card reveal" data-index="${i}" role="button" tabindex="0">
      <div class="listing-card__image">
        <img src="${listing.photo}" alt="${listing.title}">
        <span class="listing-badge${listing.status !== 'Available' ? ' listing-badge--muted' : ''}">${listing.status}</span>
      </div>
      <div class="listing-card__body">
        <p class="listing-card__type">${listing.category}</p>
        <h3 class="listing-card__address">${listing.title}</h3>
        <div class="listing-card__stats">
          ${listing.stats.map(s => `<span>${s}</span>`).join('')}
        </div>
        <span class="btn--text">View Details →</span>
      </div>
    </div>
  `).join('');

  observeReveals(listingsGrid.querySelectorAll('.reveal'));

  const listingModal = document.getElementById('listingModal');
  const listingModalOverlay = document.getElementById('listingModalOverlay');
  const listingModalClose = document.getElementById('listingModalClose');
  const listingModalImage = document.getElementById('listingModalImage');
  const listingModalBadge = document.getElementById('listingModalBadge');
  const listingModalType = document.getElementById('listingModalType');
  const listingModalTitle = document.getElementById('listingModalTitle');
  const listingModalStats = document.getElementById('listingModalStats');
  const listingModalDesc = document.getElementById('listingModalDesc');

  function openListingModal(listing) {
    listingModalImage.src = listing.photo;
    listingModalImage.alt = listing.title;
    listingModalBadge.textContent = listing.status;
    listingModalBadge.classList.toggle('listing-badge--muted', listing.status !== 'Available');
    listingModalType.textContent = listing.category;
    listingModalTitle.textContent = listing.title;
    listingModalStats.innerHTML = listing.stats.map(s => `<span>${s}</span>`).join('');
    listingModalDesc.textContent = listing.description;
    listingModal.classList.add('open');
    listingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeListingModal() {
    listingModal.classList.remove('open');
    listingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  listingsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.listing-card');
    if (!card) return;
    openListingModal(listingsData[card.dataset.index]);
  });

  listingsGrid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.listing-card');
    if (!card) return;
    e.preventDefault();
    openListingModal(listingsData[card.dataset.index]);
  });

  listingModalOverlay.addEventListener('click', closeListingModal);
  listingModalClose.addEventListener('click', closeListingModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && listingModal.classList.contains('open')) closeListingModal();
  });
}

// Portfolio filter (portfolio page only)
const filterBtns = document.querySelectorAll('.filter-btn');
const dealCards = document.querySelectorAll('.deal-card');

if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      dealCards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
