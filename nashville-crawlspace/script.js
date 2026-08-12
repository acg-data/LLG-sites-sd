const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    menuButton.textContent = open ? '☰' : '×';
    siteNav.classList.toggle('open', !open);
    document.body.classList.toggle('menu-open', !open);
  });

  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.textContent = '☰';
    siteNav.classList.remove('open');
    document.body.classList.remove('menu-open');
  }));
}

document.querySelectorAll('.accordion-button').forEach((button) => {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    button.nextElementSibling?.classList.toggle('open', !open);
  });
});
