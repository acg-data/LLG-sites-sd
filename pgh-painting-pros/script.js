(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  const closeMenu = () => {
    if (!menuToggle || !menu) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  };

  menuToggle?.addEventListener('click', () => {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menu?.classList.toggle('open', willOpen);
  });

  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 991.98px)').matches) closeMenu();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      menuToggle?.focus();
    }
  });

  document.querySelectorAll('.faq-item button').forEach((button) => {
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      const answer = document.getElementById(button.getAttribute('aria-controls'));
      button.setAttribute('aria-expanded', String(!isOpen));
      if (answer) answer.hidden = isOpen;
    });
  });

  const buildEstimateMailto = (values) => {
    const subject = `Free Estimate Request${values.service && values.service !== 'Not sure' ? ` – ${values.service}` : ''}`;
    const body = [
      'PGH Painting Pros Estimate Request',
      '',
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      `Service interested in: ${values.service}`,
      '',
      'Message:',
      values.message || 'No additional message provided.'
    ].join('\n');
    return `mailto:info@pghpaintingpros.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  window.buildEstimateMailto = buildEstimateMailto;

  const form = document.getElementById('estimate-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const error = form.querySelector('.form-error');
    if (!form.checkValidity()) {
      if (error) {
        error.hidden = false;
        error.textContent = 'Please complete every required field with valid contact information.';
      }
      form.reportValidity();
      return;
    }

    if (error) {
      error.hidden = true;
      error.textContent = '';
    }

    const data = Object.fromEntries(new FormData(form).entries());
    window.location.href = buildEstimateMailto(data);
  });

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
})();
