/* ============================================
   LCT — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Nav Toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      toggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggle.textContent = '☰';
      });
    });
  }

  // --- Counter Animation ---
  const counters = document.querySelectorAll('.counter-number[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);

      el.innerHTML = current.toLocaleString() + (suffix ? `<span class="suffix">${suffix}</span>` : '');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.innerHTML = target.toLocaleString() + (suffix ? `<span class="suffix">${suffix}</span>` : '');
      }
    }
    requestAnimationFrame(update);
  }

  // --- Scroll Fade-In ---
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => fadeObserver.observe(el));

  // --- Active Nav Link ---
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY + 100;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href*="${id}"]`);
        if (link) {
          if (scrollY >= top && scrollY < top + height) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        const targetPosition = target.offsetTop - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

});
