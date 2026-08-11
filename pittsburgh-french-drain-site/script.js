(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  const dropdowns = [...document.querySelectorAll('.nav-dropdown')];

  const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const closeDropdowns = (except = null) => {
    dropdowns.forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.classList.remove('is-open');
      dropdown.querySelector('button')?.setAttribute('aria-expanded', 'false');
    });
  };

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector('button');
    button?.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = !dropdown.classList.contains('is-open');
      closeDropdowns(dropdown);
      dropdown.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('click', () => closeDropdowns());

  const closeMobileMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
    mobileMenu.hidden = !willOpen;
    document.body.classList.toggle('menu-open', willOpen);
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeDropdowns();
    closeMobileMenu();
    menuButton?.focus();
  });

  const accordionButtons = [...document.querySelectorAll('.accordion-item button')];
  accordionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      button.setAttribute('aria-expanded', String(!open));
      button.querySelector('span').textContent = open ? '＋' : '−';
      if (panel) panel.hidden = open;
    });
  });

  const track = document.querySelector('[data-carousel]');
  const prev = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  const cards = track ? [...track.children] : [];
  let carouselIndex = 0;

  const cardStep = () => {
    if (!cards.length) return 0;
    const styles = getComputedStyle(track);
    return cards[0].getBoundingClientRect().width + Number.parseFloat(styles.gap || 0);
  };

  const maximumIndex = () => {
    const step = cardStep();
    if (!step) return 0;
    const visible = Math.max(1, Math.floor((window.innerWidth - 32) / step));
    return Math.max(0, cards.length - visible);
  };

  const updateCarousel = () => {
    if (!track) return;
    carouselIndex = Math.min(Math.max(carouselIndex, 0), maximumIndex());
    track.style.transform = `translate3d(${-carouselIndex * cardStep()}px, 0, 0)`;
    prev?.toggleAttribute('disabled', carouselIndex === 0);
    next?.toggleAttribute('disabled', carouselIndex === maximumIndex());
  };

  prev?.addEventListener('click', () => { carouselIndex -= 1; updateCarousel(); });
  next?.addEventListener('click', () => { carouselIndex += 1; updateCarousel(); });
  track?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); carouselIndex -= 1; updateCarousel(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); carouselIndex += 1; updateCarousel(); }
  });

  let touchStart = 0;
  track?.addEventListener('touchstart', (event) => { touchStart = event.touches[0].clientX; }, { passive: true });
  track?.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) < 45) return;
    carouselIndex += distance < 0 ? 1 : -1;
    updateCarousel();
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 850) closeMobileMenu();
    updateCarousel();
  });
  updateCarousel();
})();
