const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const scrollLinks = document.querySelectorAll('a[href^="#"]');

// Mobile menu keeps navigation comfortable on small screens.
navToggle.addEventListener("click", () => {
  const isOpen = navToggle.classList.toggle("is-open");
  siteNav.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Smooth scroll is used by the header and main CTA buttons.
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (!section) {
    return;
  }

  const sectionOffset = 18;
  const sectionTop = Math.max(0, section.getBoundingClientRect().top + window.scrollY - sectionOffset);

  window.scrollTo({
    top: sectionTop,
    behavior: "smooth"
  });
}

scrollLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const sectionId = link.getAttribute("href").replace("#", "");

    if (!sectionId) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    scrollToSection(sectionId);

    siteNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Simple reveal animation for sections and cards without external libraries.
const revealItems = document.querySelectorAll(
  ".section-heading, .hero-note, .project-card, .build-list article, .build-note, .process-list article, .limits-card, .contact-cta"
);

revealItems.forEach((item) => {
  item.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.14
  });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
