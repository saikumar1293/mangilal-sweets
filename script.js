/* ===== M. Mangilal Sweets — Interactive Script ===== */

document.addEventListener('DOMContentLoaded', () => {
  // ── Header scroll effect ──
  const header = document.querySelector('.header');
  const backToTop = document.querySelector('.back-to-top');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header background
    if (scrollY > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    // Back to top visibility
    if (backToTop) {
      if (scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial check

  // ── Smooth scroll for nav links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        mobileNav?.classList.remove('active');
        menuToggle?.classList.remove('active');
      }
    });
  });

  // ── Mobile navigation ──
  const menuToggle = document.querySelector('.header__menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav__close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileNavClose?.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll reveal animations ──
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Animated counters ──
  const counterElements = document.querySelectorAll('[data-count]');

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const isDecimal = target % 1 !== 0;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterElements.forEach(el => counterObserver.observe(el));

  // ── Product card hover parallax ──
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const img = card.querySelector('img');
      if (img) {
        img.style.transform = `scale(1.06) translate(${x * 8}px, ${y * 8}px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('img');
      if (img) {
        img.style.transform = '';
      }
    });
  });

  // ── Form handling ──
  const form = document.querySelector('#inquiry-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => data[key] = value);

      // Construct WhatsApp message
      const message = `Hello M. Mangilal Sweets! 🙏\n\n`
        + `Name: ${data.name || 'N/A'}\n`
        + `Phone: ${data.phone || 'N/A'}\n`
        + `Inquiry: ${data.inquiry || 'General'}\n`
        + `Message: ${data.message || 'N/A'}`;

      const whatsappUrl = `https://wa.me/918523014445?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      // Visual feedback
      const btn = form.querySelector('.form-submit');
      const originalText = btn.textContent;
      btn.textContent = '✓ Sent!';
      btn.style.background = 'linear-gradient(135deg, #2E7D32, #43A047)';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        form.reset();
      }, 2500);
    });
  }

  // ── Star rating hover effect on review cards ──
  document.querySelectorAll('.review-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
  });

  // ── Parallax for hero decorative elements ──
  const heroDecorCircles = document.querySelectorAll('.hero__decor-circle');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroDecorCircles.forEach((circle, i) => {
        const speed = (i + 1) * 0.15;
        circle.style.transform = `rotate(${scrollY * speed}deg) translateY(${scrollY * speed * 0.3}px)`;
      });
    }
  }, { passive: true });

  // ── Typed text effect for hero badge ──
  const badge = document.querySelector('.hero__badge-text');
  if (badge) {
    const texts = [
      '65+ Years of Legacy — Since 1960',
      'Three Generations of Pure Ghee Sweets',
      '150+ Happy Customers & Counting',
      'Narsipatnam\'s Most Loved Sweets Since 1960'
    ];
    let textIndex = 0;

    setInterval(() => {
      textIndex = (textIndex + 1) % texts.length;
      badge.style.opacity = '0';
      badge.style.transform = 'translateY(8px)';
      setTimeout(() => {
        badge.textContent = texts[textIndex];
        badge.style.opacity = '1';
        badge.style.transform = 'translateY(0)';
      }, 300);
    }, 4000);
  }

  // ── Products Carousel ──
  const carousel = document.getElementById('products-carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel__track');
    const cards = track.querySelectorAll('.carousel__card');
    const prevBtn = carousel.querySelector('.carousel__btn--prev');
    const nextBtn = carousel.querySelector('.carousel__btn--next');
    const dotsContainer = document.getElementById('carousel-dots');

    let currentIndex = 0;
    let cardsPerView = 4;
    let autoPlayTimer;

    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 576) cardsPerView = 1;
      else if (width < 768) cardsPerView = 2;
      else if (width < 1024) cardsPerView = 3;
      else cardsPerView = 4;
    };

    const totalPages = () => Math.ceil(cards.length / cardsPerView);

    const buildDots = () => {
      dotsContainer.innerHTML = '';
      const pages = totalPages();
      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel__dot');
        if (i === 0) dot.classList.add('carousel__dot--active');
        dot.setAttribute('aria-label', `Go to slide group ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    };

    const updateDots = () => {
      const dots = dotsContainer.querySelectorAll('.carousel__dot');
      const page = Math.floor(currentIndex / cardsPerView);
      dots.forEach((dot, i) => {
        dot.classList.toggle('carousel__dot--active', i === page);
      });
    };

    const goTo = (page) => {
      const maxIndex = cards.length - cardsPerView;
      currentIndex = Math.min(page * cardsPerView, maxIndex);
      if (currentIndex < 0) currentIndex = 0;
      moveTrack();
      updateDots();
    };

    const moveTrack = () => {
      if (cards.length === 0) return;
      const card = cards[0];
      const gap = 24; // 1.5rem
      const cardWidth = card.offsetWidth + gap;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    };

    const next = () => {
      const maxIndex = cards.length - cardsPerView;
      currentIndex += cardsPerView;
      if (currentIndex > maxIndex) currentIndex = 0;
      moveTrack();
      updateDots();
    };

    const prev = () => {
      const maxIndex = cards.length - cardsPerView;
      currentIndex -= cardsPerView;
      if (currentIndex < 0) currentIndex = maxIndex;
      moveTrack();
      updateDots();
    };

    prevBtn.addEventListener('click', () => { prev(); resetAutoPlay(); });
    nextBtn.addEventListener('click', () => { next(); resetAutoPlay(); });

    // Auto-play
    const startAutoPlay = () => {
      autoPlayTimer = setInterval(next, 5000);
    };

    const resetAutoPlay = () => {
      clearInterval(autoPlayTimer);
      startAutoPlay();
    };

    // Touch / drag support
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      track.style.transition = 'none';
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const diff = e.pageX - startX;
      const card = cards[0];
      const cardWidth = card.offsetWidth + 24;
      track.style.transform = `translateX(${-currentIndex * cardWidth + diff}px)`;
    });

    track.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      const diff = e.pageX - startX;
      if (diff < -60) next();
      else if (diff > 60) prev();
      else moveTrack();
      resetAutoPlay();
    });

    track.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        moveTrack();
      }
    });

    // Touch events
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX;
      track.style.transition = 'none';
      clearInterval(autoPlayTimer);
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      const diff = e.touches[0].pageX - startX;
      const card = cards[0];
      const cardWidth = card.offsetWidth + 24;
      track.style.transform = `translateX(${-currentIndex * cardWidth + diff}px)`;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      const diff = e.changedTouches[0].pageX - startX;
      if (diff < -40) next();
      else if (diff > 40) prev();
      else moveTrack();
      resetAutoPlay();
    });

    // Init
    updateCardsPerView();
    buildDots();
    startAutoPlay();

    window.addEventListener('resize', () => {
      updateCardsPerView();
      buildDots();
      currentIndex = 0;
      moveTrack();
    });
  }
});
