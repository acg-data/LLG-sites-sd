(() => {
  const nav = document.getElementById('nav');
  const menuButton = document.querySelector('.menu-toggle');
  const dropdownParent = document.querySelector('.has-dropdown');
  const servicesLink = dropdownParent?.querySelector(':scope > a');
  if (nav && menuButton) {
    const closeMenus = () => {
      nav.classList.remove('open');
      dropdownParent?.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      servicesLink?.setAttribute('aria-expanded', 'false');
    };
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    servicesLink?.addEventListener('click', (event) => {
      if (window.matchMedia('(hover: none)').matches || window.innerWidth <= 768) {
        event.preventDefault();
        const open = dropdownParent.classList.toggle('open');
        servicesLink.setAttribute('aria-expanded', String(open));
      }
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      if (link !== servicesLink) closeMenus();
    }));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenus(); });
  }

  const root = document.documentElement;
  const endpoint = root.dataset.leadEndpoint;
  const params = new URLSearchParams(location.search);
  const attribution = Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'].map(k => [k, params.get(k)]).filter(([,v]) => v));
  const requestedService = params.get('service');
  if (requestedService) {
    document.querySelectorAll('select[name="service"]').forEach((select) => {
      if ([...select.options].some((option) => option.value === requestedService)) select.value = requestedService;
    });
  }
  document.querySelectorAll('form[data-llg-lead-form]').forEach((form) => {
    const status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (!endpoint) { status.textContent = 'This preview is not connected to the lead service yet.'; return; }
      const submit = form.querySelector('[type="submit"]');
      submit.disabled = true;
      status.textContent = 'Sending your request…';
      const data = Object.fromEntries(new FormData(form).entries());
      const payload = {
        submissionId: crypto.randomUUID(), siteKey: root.dataset.siteKey, pagePath: location.pathname,
        firstName: data.firstName || '', lastName: data.lastName || '', phone: data.phone || '',
        email: data.email || '', zip: data.zip || '', service: data.service || '', message: data.message || '',
        smsConsent: data.smsConsent === 'on', company: data.company || '',
        turnstileToken: data['cf-turnstile-response'] || '', utm: attribution,
        referrer: document.referrer || null, landingPage: location.href
      };
      try {
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.message || 'We could not send the request.');
        status.textContent = `Request received. Reference ${result.leadId || payload.submissionId}.`;
        form.reset();
        if (window.turnstile) window.turnstile.reset();
      } catch (error) {
        status.textContent = error instanceof Error ? error.message : 'We could not send the request. Please try again.';
      } finally { submit.disabled = false; }
    });
  });
})();
