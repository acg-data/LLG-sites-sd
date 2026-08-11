const mobileToggle = document.querySelector(".nav-mobile-toggle");
const navLinks = document.querySelector(".nav-links");
const dropdowns = [...document.querySelectorAll(".nav-dropdown")];

function closeMenu() {
  mobileToggle?.setAttribute("aria-expanded", "false");
  mobileToggle?.setAttribute("aria-label", "Open menu");
  navLinks?.classList.remove("open");
  document.body.classList.remove("menu-open");
  dropdowns.forEach((dropdown) => {
    dropdown.classList.remove("open");
    dropdown.querySelector("button")?.setAttribute("aria-expanded", "false");
  });
}

mobileToggle?.addEventListener("click", () => {
  const nextOpen = mobileToggle.getAttribute("aria-expanded") !== "true";
  mobileToggle.setAttribute("aria-expanded", String(nextOpen));
  mobileToggle.setAttribute("aria-label", nextOpen ? "Close menu" : "Open menu");
  navLinks.classList.toggle("open", nextOpen);
  document.body.classList.toggle("menu-open", nextOpen && window.innerWidth <= 760);
});

document.querySelectorAll(".nav-dropdown-toggle").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (window.innerWidth > 760) return;
    event.preventDefault();
    const dropdown = button.closest(".nav-dropdown");
    const nextOpen = !dropdown.classList.contains("open");
    dropdowns.forEach((item) => {
      item.classList.remove("open");
      item.querySelector("button")?.setAttribute("aria-expanded", "false");
    });
    dropdown.classList.toggle("open", nextOpen);
    button.setAttribute("aria-expanded", String(nextOpen));
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-nav")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq-list details[open]").forEach((openDetail) => {
      if (openDetail !== detail) openDetail.removeAttribute("open");
    });
  });
});
