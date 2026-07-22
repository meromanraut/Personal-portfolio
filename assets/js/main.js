
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

const updateHeader = () => {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 14);
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('is-open', !isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
    });
  });
}

const currentPage = document.body.dataset.page;
if (currentPage) {
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === currentPage) link.setAttribute('aria-current', 'page');
  });
}

document.querySelectorAll('[data-current-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('is-visible'));
}

const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-category]');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove('is-active'));
    button.classList.add('is-active');
    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      card.classList.toggle('is-hidden', filter !== 'all' && !categories.includes(filter));
    });
  });
});

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name') || 'Portfolio visitor';
    const email = data.get('email') || '';
    const subject = encodeURIComponent(data.get('subject') || 'Portfolio enquiry');
    const message = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${data.get('message') || ''}`);
    window.location.href = `mailto:roman.raut@example.com?subject=${subject}&body=${message}`;
  });
}
