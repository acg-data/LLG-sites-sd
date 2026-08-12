document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdown = document.querySelector('.dropdown');

  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
    dropdown?.classList.remove('is-open');
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    nav?.classList.toggle('is-open', !isOpen);
  });

  dropdownToggle?.addEventListener('click', (event) => {
    event.preventDefault();
    const nextState = !dropdown?.classList.contains('is-open');
    dropdown?.classList.toggle('is-open', nextState);
    dropdownToggle.setAttribute('aria-expanded', String(nextState));
  });

  document.addEventListener('click', (event) => {
    if (dropdown && !dropdown.contains(event.target)) {
      dropdown.classList.remove('is-open');
      dropdownToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('.site-nav a:not(.dropdown-toggle)').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.querySelectorAll('a[href*="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const url = new URL(link.href, window.location.href);
      if (url.pathname === window.location.pathname && url.hash) {
        const target = document.querySelector(url.hash);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', url.hash);
        }
      }
    });
  });

  document.querySelectorAll('.estimate-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const firstName = new FormData(form).get('name')?.toString().trim();
      const message = form.querySelector('.form-status');
      if (message) {
        message.textContent = `${firstName ? `Thanks, ${firstName}. ` : ''}Your request is ready. Please call (412) 555-0100 for immediate assistance.`;
        message.hidden = false;
        message.focus();
      }
      form.reset();
    });
  });

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
});
