(function () {
  'use strict';

  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');

  function closeMenu() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.remove('open');
    document.body.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      document.body.classList.toggle('nav-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    mobileNav.querySelectorAll('.has-sub > a').forEach(function (link) {
      link.addEventListener('click', function (event) {
        if (window.innerWidth <= 920) {
          event.preventDefault();
          this.parentElement.classList.toggle('open');
        }
      });
    });

    mobileNav.querySelectorAll('a:not(.has-sub > a)').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 920) closeMenu();
    });
  }

  if (window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.main-nav .has-dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (event) {
        if (!this.parentElement.classList.contains('open')) {
          event.preventDefault();
          document.querySelectorAll('.main-nav .has-dropdown.open').forEach(function (item) { item.classList.remove('open'); });
          this.parentElement.classList.add('open');
        }
      });
    });
  }

  document.querySelectorAll('.tabs').forEach(function (tabs) {
    var links = tabs.querySelectorAll('.tab-link');
    var panes = tabs.querySelectorAll('.tab-pane');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        links.forEach(function (item) { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
        panes.forEach(function (pane) { pane.classList.remove('active'); });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        var pane = tabs.querySelector(this.getAttribute('data-tab'));
        if (pane) pane.classList.add('active');
      });
    });
  });

  document.querySelectorAll('.accordion-head').forEach(function (head) {
    head.setAttribute('aria-expanded', head.parentElement.classList.contains('open') ? 'true' : 'false');
    head.addEventListener('click', function () {
      var item = this.parentElement;
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.accordion-item').forEach(function (sibling) {
        sibling.classList.remove('open');
        var button = sibling.querySelector('.accordion-head');
        if (button) button.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.querySelectorAll('form.est-form, form.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var success = form.querySelector('.form-success');
      if (success) success.style.display = 'block';
      form.reset();
    });
  });
})();
