"use client";

import { useState } from "react";

const phone = "971-626-4112";
const services = [
  { number: "01", title: "Attic Insulation", image: "https://irp.cdn-website.com/3c60a0b2/dms3rep/multi/opt/insulation-contractor-tigard-or-26-1920w.png", text: "Keep conditioned air where it belongs with carefully installed attic insulation designed for Oregon homes." },
  { number: "02", title: "Crawl Space Insulation", image: "https://irp.cdn-website.com/3c60a0b2/dms3rep/multi/opt/insulation-contractor-tigard-or-33-f5e57591-1920w.png", text: "Create a healthier, more comfortable home by protecting the space beneath your floors from damp and drafts." },
  { number: "03", title: "Blown-In Insulation", image: "https://irp.cdn-website.com/3c60a0b2/dms3rep/multi/opt/insulation-contractor-tigard-or-7-1920w.jpeg", text: "Fill gaps and hard-to-reach areas with an efficient, even blanket of blown-in insulation." },
  { number: "04", title: "Insulation Removal", image: "https://irp.cdn-website.com/3c60a0b2/dms3rep/multi/opt/insulation-contractor-tigard-or-22-f8eeae7e-1920w.jpeg", text: "Remove damaged, contaminated, or underperforming insulation before starting fresh with the right system." },
];

const faqs = [
  ["How do I know if my attic needs insulation?", "Common signs include uneven temperatures, high energy bills, drafts, or insulation that looks thin, old, or damaged. We can assess the space and recommend the right next step."],
  ["What are the benefits of attic insulation?", "Proper attic insulation reduces heat loss in winter and heat gain in summer, helping your home feel more consistent while lowering heating and cooling demand."],
  ["Why insulate a crawl space?", "Crawl space insulation can reduce cold floors, help control moisture, improve indoor comfort, and support better energy efficiency throughout the home."],
  ["What is blown-in insulation?", "Blown-in insulation is loose-fill material installed with specialized equipment. It settles around framing and obstructions to create thorough, continuous coverage."],
];

function Logo() {
  return <a className="brand" href="#top" aria-label="Ulises Pro Insulation Contractor home"><img src="/ulises-pro-logo.png" alt="Ulises Pro Insulation Contractor" /></a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="site-header" id="top">
        <div className="nav-wrap">
          <Logo />
          <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
          <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
            <a href="#top">Home</a><a href="#services">Services</a><a href="#why-us">Why Us</a><a href="#areas">Service Areas</a><a className="nav-cta" href="#quote">Free Estimate</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-bg" />
          <div className="container hero-content">
            <p className="eyebrow gold">Serving Tigard & Greater Portland, Oregon</p>
            <h1 id="hero-title">Better insulation.<br />Lower bills.<br /><span>Greater comfort.</span></h1>
            <p className="script">Built to protect.</p>
            <p className="hero-copy">Professional attic, crawl space, and blown-in insulation for a quieter, healthier, more energy-efficient home.</p>
            <div className="button-row"><a className="button primary" href={`tel:${phone}`}>Call {phone}</a><a className="button outline" href="#quote">Get Free Estimate</a></div>
            <ul className="trust"><li>Local insulation experts</li><li>Quality materials</li><li>Professional installation</li></ul>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading"><p className="eyebrow dark">What We Do</p><h2>Insulation services<br />built for your home</h2><p>Practical, high-quality solutions tailored to the way your property is built.</p></div>
            <div className="service-grid">
              {services.map((service) => <article className="service-card" key={service.title}><div className="service-image"><img src={service.image} alt={`${service.title} project by Ulises Pro`} /></div><div className="service-body"><b>{service.number}</b><h3>{service.title}</h3><p>{service.text}</p><a href="#quote">Get an estimate <span>→</span></a></div></article>)}
            </div>
          </div>
        </section>

        <section className="ticker" aria-label="Benefits"><div>Warmer rooms <i>✦</i> Lower energy bills <i>✦</i> Quieter interiors <i>✦</i> Better air quality <i>✦</i> Year-round comfort <i>✦</i></div></section>

        <section className="section split" id="why-us">
          <div className="split-image"><img src="https://lirp.cdn-website.com/3c60a0b2/dms3rep/multi/opt/insulation-contractor-tigard-or-21-1920w.jpeg" alt="Ulises Pro insulation team at work" /></div>
          <div className="split-copy"><p className="eyebrow gold">Why Ulises Pro</p><h2>Comfort starts with work done right.</h2><p>We bring practical experience, careful installation, and a commitment to quality to every home. From the first assessment to the final walkthrough, you get a solution designed around your space—not a one-size-fits-all answer.</p><div className="commitments"><div><strong>01</strong><span><b>Experienced team</b><small>Skilled installers who respect your home.</small></span></div><div><strong>02</strong><span><b>Quality materials</b><small>Reliable products chosen for lasting performance.</small></span></div><div><strong>03</strong><span><b>Custom solutions</b><small>The right insulation plan for your property.</small></span></div></div><a className="text-link" href="#quote">Plan your project →</a></div>
        </section>

        <section className="section areas" id="areas"><div className="container area-grid"><div><p className="eyebrow dark">Service Area</p><h2>Proudly serving<br />Greater Tigard</h2><p>Residential and commercial insulation services across the southwest Portland area.</p></div><div className="city-list">{["Tigard", "Beaverton", "Sherwood", "Lake Oswego", "Wilsonville", "Hillsboro", "West Linn", "Oregon City", "Newberg"].map(city => <a href="#quote" key={city}>{city}<span>OR</span></a>)}</div></div></section>

        <section className="section testimonials"><div className="container"><div className="section-heading light"><p className="eyebrow gold">Customer Stories</p><h2>Trusted inside Oregon homes.</h2></div><div className="quote-grid"><blockquote><div className="stars">★★★★★</div><p>“Jonathan&apos;s team showed up on time and were done in 3 hours. Great install!”</p><footer>Barbara Sundstrom</footer></blockquote><blockquote><div className="stars">★★★★★</div><p>“His work passed the insulation inspection. He did a great job and had great customer service.”</p><footer>Jess B</footer></blockquote><blockquote><div className="stars">★★★★★</div><p>“Extremely professional, respectful of our home, and communicative. Competitive pricing and amazing service.”</p><footer>Eduardo Norell</footer></blockquote></div></div></section>

        <section className="section faq" id="faq"><div className="container faq-grid"><div className="faq-intro"><p className="eyebrow dark">Good to Know</p><h2>Frequently asked questions</h2><p>Still deciding what your home needs? Call us and tell us what you&apos;re noticing.</p><a className="phone-link" href={`tel:${phone}`}>{phone} →</a></div><div className="accordion">{faqs.map(([q,a], index) => <details key={q} open={index === 0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>

        <section className="section quote-section" id="quote"><div className="container quote-grid"><div className="quote-copy"><p className="eyebrow gold">Free Estimate</p><h2>Tell us about<br />your project.</h2><p>Share a few details and our local team will follow up to discuss the best way to improve your home&apos;s comfort and efficiency.</p><div className="contact-line"><small>Prefer to call?</small><a href={`tel:${phone}`}>{phone}</a></div></div><form className="estimate-form" onSubmit={(e) => e.preventDefault()}><div className="field-row"><label>First Name<input required name="firstName" autoComplete="given-name" /></label><label>Last Name<input required name="lastName" autoComplete="family-name" /></label></div><div className="field-row"><label>Phone<input required name="phone" type="tel" autoComplete="tel" /></label><label>Email<input required name="email" type="email" autoComplete="email" /></label></div><label>Desired Service<select required defaultValue=""><option value="" disabled>Select a service</option>{services.map(s => <option key={s.title}>{s.title}</option>)}</select></label><label>Message<textarea name="message" rows={4} placeholder="Tell us about your space and what you're noticing." /></label><button className="button primary" type="submit">Request Free Estimate</button></form></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div><Logo /><p>Better insulation. Lower bills. Greater comfort.</p></div><div><h2>Services</h2><a href="#services">Attic Insulation</a><a href="#services">Crawl Space Insulation</a><a href="#services">Blown-In Insulation</a></div><div><h2>Company</h2><a href="#why-us">Why Us</a><a href="#areas">Service Areas</a><a href="#faq">FAQ</a></div><div><h2>Get in touch</h2><a href={`tel:${phone}`}>{phone}</a><span>Tigard, Oregon</span><a href="#quote">Free Estimate →</a></div></div><div className="container footer-bottom"><span>© 2026 Ulises Pro Insulation Contractor.</span><a href="#top">Back to top ↑</a></div></footer>
    </>
  );
}
