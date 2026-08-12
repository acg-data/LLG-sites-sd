const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav__links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    const image = item.querySelector('img');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
});

lightbox?.querySelector('.lightbox__close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialPrevious = document.querySelector('.testimonial-control--prev');
const testimonialNext = document.querySelector('.testimonial-control--next');

const moveTestimonials = (direction) => {
  if (!testimonialTrack) return;
  const card = testimonialTrack.querySelector('.testimonial-card');
  const gap = Number.parseFloat(getComputedStyle(testimonialTrack).columnGap) || 20;
  testimonialTrack.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || 360) + gap), behavior: 'smooth' });
};

testimonialPrevious?.addEventListener('click', () => moveTestimonials(-1));
testimonialNext?.addEventListener('click', () => moveTestimonials(1));
