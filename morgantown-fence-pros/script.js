(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const dropdowns = [...document.querySelectorAll('[data-dropdown]')];

  const closeMenu = () => {
    if (!menuToggle || !menu) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('open');
      dropdown.querySelector('button')?.setAttribute('aria-expanded', 'false');
    });
  };

  menuToggle?.addEventListener('click', () => {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menu?.classList.toggle('open', willOpen);
  });

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector('button');
    button?.addEventListener('click', () => {
      const willOpen = button.getAttribute('aria-expanded') !== 'true';
      dropdowns.forEach((other) => {
        if (other === dropdown) return;
        other.classList.remove('open');
        other.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });
      dropdown.classList.toggle('open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
    });
  });

  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 991.98px)').matches) closeMenu();
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-dropdown')) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove('open');
        dropdown.querySelector('button')?.setAttribute('aria-expanded', 'false');
      });
    }
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
    const subject = `Free Estimate Request – ${values.service}`;
    const body = [
      'Morgantown Fence Pros Estimate Request',
      '',
      `Name: ${values.firstName} ${values.lastName}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      `Desired service: ${values.service}`,
      '',
      'Message:',
      values.message || 'No additional message provided.'
    ].join('\n');
    return `mailto:tyler@morgantownfencepros.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
