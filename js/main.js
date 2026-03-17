/* ==========================================================================
   Yari Casanova — Portfolio Web
   Main JavaScript
   Version: 3.0 (v15)
   ========================================================================== */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     CONFIG
     ----------------------------------------------------------------------- */
  var isTouch = 'ontouchstart' in window;

  var COLORS = [
    'rgba(230,57,70,.75)',
    'rgba(244,162,97,.75)',
    'rgba(233,196,106,.75)',
    'rgba(42,157,143,.75)',
    'rgba(155,93,229,.75)',
    'rgba(230,57,70,.6)',
    'rgba(244,162,97,.6)'
  ];

  var sectionOrder = [
    'hero', 'brk-e', 'gal-e', 'qb1',
    'brk-s', 'gal-s', 'about', 'contact'
  ];

  /* -----------------------------------------------------------------------
     LIGHTBOX DATA
     ----------------------------------------------------------------------- */
  var lbData = [
    { src: 'img/elegancia-oscura/hero-leon-goat.jpg', title: 'The G.O.A.T.', sub: 'El león que no necesita presentación', med: 'Acrílico sobre tela', dim: '120 x 100 cm', status: 'available', year: '2025' },
    { src: 'img/elegancia-oscura/leon-cigarro-vino.jpg', title: 'El Padrino', sub: 'El humo del cigarro, la mirada que lo dice todo', med: 'Acrílico sobre tela', dim: '100 x 80 cm', status: 'collection', year: '' },
    { src: 'img/elegancia-oscura/dalmata-sillon.jpg', title: 'El Heredero', sub: 'La elegancia no se enseña, se lleva en la piel', med: 'Acrílico sobre tela', dim: '120 x 100 cm', status: 'available', year: '2025' },
    { src: 'img/elegancia-oscura/bulldog-padrino.jpg', title: 'Don Corleone', sub: 'El poder se ejerce en silencio', med: 'Acrílico sobre tela', dim: '100 x 80 cm', status: 'collection', year: '2024' },
    { src: 'img/elegancia-oscura/tigre-blanco.jpg', title: 'El Gran Gatsby', sub: 'Traje blanco, alma salvaje', med: 'Acrílico sobre tela', dim: '150 x 110 cm', status: 'available', year: '' },
    { src: 'img/elegancia-oscura/braco-smoking.jpg', title: 'El Embajador', sub: 'Diplomacia con colmillos', med: 'Acrílico sobre tela', dim: '100 x 80 cm', status: 'available', year: '' },
    { src: 'img/leon-mate.jpg', title: 'El Caudillo', sub: 'Whiskey, cigarro y la mirada del que manda', med: 'Acrílico sobre tela', dim: '', status: 'available', year: '2021' },
    { src: 'img/oso-flores.jpg', title: 'El Magnate', sub: 'Champagne, smoking azul y el trono que le corresponde', med: 'Acrílico sobre tela', dim: '', status: 'available', year: '' },
    { src: 'img/rugido-urbano/leon-rugiendo.jpg', title: 'Art Is Not a Crime', sub: 'Donde el spray se encuentra con el óleo', med: 'Acrílico sobre tela', dim: '120 x 80 cm', status: 'available', year: '' },
    { src: 'img/rugido-urbano/leon-hoodie.jpg', title: 'Hood Life', sub: 'La calle como lienzo', med: 'Acrílico sobre tela', dim: '100 x 70 cm', status: 'collection', year: '2020' },
    { src: 'img/rugido-urbano/leon-dreads.jpg', title: 'Rebel Soul', sub: 'Cuero, spray y actitud', med: 'Acrílico sobre tela', dim: '100 x 70 cm', status: 'available', year: '2022' },
    { src: 'img/rugido-urbano/jabali-tiradores.jpg', title: 'El Outsider', sub: 'No encaja, y esa es su fuerza', med: 'Acrílico sobre tela', dim: '100 x 80 cm', status: 'available', year: '' }
  ];

  /* -----------------------------------------------------------------------
     DOM REFERENCES
     ----------------------------------------------------------------------- */
  var pf = document.getElementById('pf');
  var intro = document.getElementById('intro');
  var site = document.getElementById('site');
  var nav = document.getElementById('nav');
  var heroGlow = document.getElementById('heroGlow');
  var secNav = document.getElementById('secNav');
  var secPrev = document.getElementById('secPrev');
  var secNext = document.getElementById('secNext');
  var secLabel = document.getElementById('secLabel');
  var prog = document.getElementById('prog');
  var cv = document.getElementById('pcv');
  var ctx = cv.getContext('2d');
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbTitle = document.getElementById('lbTitle');
  var lbSub = document.getElementById('lbSub');
  var lbMed = document.getElementById('lbMed');
  var lbDim = document.getElementById('lbDim');
  var lbStatus = document.getElementById('lbStatus');

  /* -----------------------------------------------------------------------
     DYNAMIC COPYRIGHT YEAR
     ----------------------------------------------------------------------- */
  var cpYear = document.getElementById('cpYear');
  if (cpYear) cpYear.textContent = new Date().getFullYear();

  /* -----------------------------------------------------------------------
     LENIS SMOOTH SCROLL
     ----------------------------------------------------------------------- */
  var lenis = null;

  function initLenis() {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      touchMultiplier: 2,
      infinite: false
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  /* -----------------------------------------------------------------------
     SPLIT TEXT UTILITY
     ----------------------------------------------------------------------- */
  function splitIntoWords(el) {
    var html = el.innerHTML;
    var lines = html.split(/<br\s*\/?>/gi);
    var result = [];

    lines.forEach(function (line, li) {
      var words = line.trim().split(/\s+/);
      words.forEach(function (word) {
        if (word) {
          result.push('<span class="split-word">' + word + '</span>');
        }
      });
      if (li < lines.length - 1) result.push('<br>');
    });

    el.innerHTML = result.join(' ');
    return el.querySelectorAll('.split-word');
  }

  /* -----------------------------------------------------------------------
     GSAP SCROLL ANIMATIONS
     ----------------------------------------------------------------------- */
  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Split text for serie break titles
    document.querySelectorAll('[data-split]').forEach(function (el) {
      var words = splitIntoWords(el);

      ScrollTrigger.create({
        trigger: el.closest('.sb'),
        start: 'top 75%',
        once: true,
        onEnter: function () {
          el.closest('.sb').classList.add('vis');
          gsap.to(words, {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.08
          });
        }
      });
    });

    // Hero content — staggered reveal with translate
    gsap.from('.hero-top', {
      scrollTrigger: { trigger: '.hero', start: 'top center' },
      y: 30,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
      ease: 'power3.out'
    });

    // Quote breaks — enhanced reveal
    document.querySelectorAll('.qb').forEach(function (qb) {
      ScrollTrigger.create({
        trigger: qb,
        start: 'top 70%',
        once: true,
        onEnter: function () { qb.classList.add('vis'); }
      });

      gsap.to(qb.querySelector('.qb-glow'), {
        scrollTrigger: {
          trigger: qb,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        },
        y: -80,
        ease: 'none'
      });
    });

    // About section paragraphs — staggered from left
    gsap.utils.toArray('.about-p, .about-closing').forEach(function (el, i) {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: function () { el.classList.add('vis'); }
        },
        x: -30,
        duration: 1,
        delay: i * 0.12,
        ease: 'power3.out'
      });
    });

    // About left side — scale in
    gsap.from('.about-name', {
      scrollTrigger: { trigger: '.about', start: 'top 70%', once: true },
      y: 50,
      opacity: 0,
      duration: 1.4,
      ease: 'power4.out'
    });

    gsap.from('.about-divider', {
      scrollTrigger: { trigger: '.about', start: 'top 70%', once: true },
      scaleY: 0,
      duration: 1.2,
      delay: 0.3,
      ease: 'power3.inOut'
    });

    // About proof — fade in
    gsap.from('.about-proof', {
      scrollTrigger: { trigger: '.about-proof', start: 'top 85%', once: true },
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out'
    });

    // Contact section
    gsap.from('.contact-tag', {
      scrollTrigger: { trigger: '.contact', start: 'top 80%', once: true },
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.contact-title', {
      scrollTrigger: { trigger: '.contact', start: 'top 75%', once: true },
      y: 60,
      opacity: 0,
      duration: 1.4,
      ease: 'power4.out'
    });

    gsap.from('.contact-desc', {
      scrollTrigger: { trigger: '.contact', start: 'top 70%', once: true },
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });

    gsap.from('.contact-email', {
      scrollTrigger: { trigger: '.contact', start: 'top 65%', once: true },
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });

    gsap.from('.contact-social a', {
      scrollTrigger: { trigger: '.contact', start: 'top 65%', once: true },
      y: 15,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // Serie break lines and descriptions
    document.querySelectorAll('.sb').forEach(function (sb) {
      gsap.from(sb.querySelector('.sb-line'), {
        scrollTrigger: { trigger: sb, start: 'top 70%', once: true },
        scaleX: 0,
        duration: 1,
        delay: 0.4,
        ease: 'power3.inOut'
      });
    });

    // Progress bar via ScrollTrigger
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: function (self) {
        prog.style.width = (self.progress * 100) + '%';
      }
    });
  }

  /* -----------------------------------------------------------------------
     MOUSE TRACKING — TILT + SHINE ON SLIDE CARDS
     ----------------------------------------------------------------------- */
  function initMouseTracking() {
    if (isTouch) return;

    document.querySelectorAll('.slide-card').forEach(function (card) {
      var shine = card.querySelector('.slide-shine');
      var img = card.querySelector('img');
      var ticking = false;

      card.addEventListener('mousemove', function (e) {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(function () {
          var rect = card.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;
          var px = x / rect.width;
          var py = y / rect.height;

          var rotY = (px - 0.5) * 8;
          var rotX = (py - 0.5) * -8;

          card.style.transform = 'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(1.02)';

          var imgX = (px - 0.5) * -8;
          var imgY = (py - 0.5) * -8;
          img.style.transform = 'scale(1.08) translate(' + imgX + 'px, ' + imgY + 'px)';

          if (shine) {
            shine.style.setProperty('--mx', (px * 100) + '%');
            shine.style.setProperty('--my', (py * 100) + '%');
          }

          ticking = false;
        });
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        img.style.transform = '';
        card.style.transition = 'transform .5s cubic-bezier(.25,.1,.25,1)';
        img.style.transition = 'transform .5s cubic-bezier(.25,.1,.25,1)';

        setTimeout(function () {
          card.style.transition = '';
          img.style.transition = '';
        }, 500);
      });

      card.addEventListener('mouseenter', function () {
        card.style.transition = 'transform .15s ease-out, box-shadow .5s ease';
        img.style.transition = 'transform .15s ease-out';
      });
    });
  }

  /* -----------------------------------------------------------------------
     PRELOADER
     ----------------------------------------------------------------------- */
  pf.style.transform = 'scaleX(.3)';

  window.addEventListener('load', function () {
    pf.style.transform = 'scaleX(1)';
    setTimeout(function () {
      document.getElementById('pre').classList.add('done');
    }, 600);
  });

  /* -----------------------------------------------------------------------
     CUSTOM CURSOR (desktop only)
     ----------------------------------------------------------------------- */
  if (!isTouch) {
    var cd = document.getElementById('cd');
    var cr = document.getElementById('cr');
    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      cd.style.transform = 'translate(' + (mx - 5) + 'px,' + (my - 5) + 'px)';
    });

    (function animateRing() {
      rx += (mx - (rx + 21)) * .08;
      ry += (my - (ry + 21)) * .08;
      cr.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(animateRing);
    })();

    var hoverSel = '.slide-card,.nav-r a,.nav-l,.contact-email,.about-links a,.contact-social a,.sec-nav-btn,.lb-close,.lb-nav,.lb-cta';

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverSel)) {
        cd.classList.add('h');
        cr.classList.add('h');
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverSel)) {
        cd.classList.remove('h');
        cr.classList.remove('h');
      }
    });
  }

  /* -----------------------------------------------------------------------
     HERO GLOW + BACKGROUND IMAGE REVEAL
     ----------------------------------------------------------------------- */
  function startHeroGlow() {
    heroGlow.style.animation = 'heroGlowIn 2.5s ease forwards';
    setTimeout(function () {
      heroGlow.style.animation = 'breatheH 10s ease-in-out infinite';
    }, 2600);
  }

  function revealHeroBg() {
    var heroBgImg = document.querySelector('.hero-bg-img');
    if (heroBgImg) {
      if (heroBgImg.complete) {
        heroBgImg.classList.add('loaded');
      } else {
        heroBgImg.addEventListener('load', function () {
          heroBgImg.classList.add('loaded');
        });
      }
    }
  }

  var hs = document.querySelector('.hero-scroll');
  setTimeout(function () {
    if (hs) hs.style.animation = 'heroIn 1s ease 1.5s forwards, nudge2 3s ease 2.5s infinite';
  }, 100);

  /* -----------------------------------------------------------------------
     INTRO — PARTICLE EXPLOSION
     ----------------------------------------------------------------------- */
  cv.width = innerWidth;
  cv.height = innerHeight;
  addEventListener('resize', function () {
    cv.width = innerWidth;
    cv.height = innerHeight;
  });

  var splats = [];
  var trA = false;
  var trS = 0;

  function boom() {
    var cx = innerWidth / 2, cy = innerHeight / 2;
    var i, a, v;

    for (i = 0; i < 25; i++) {
      a = Math.random() * Math.PI * 2;
      v = 4 + Math.random() * 14;
      splats.push({
        x: cx + (Math.random() - .5) * 80,
        y: cy + (Math.random() - .5) * 40,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        r: 30 + Math.random() * 100,
        c: COLORS[i % COLORS.length],
        a: .8 + Math.random() * .2,
        g: 1.5 + Math.random() * 4
      });
    }

    for (i = 0; i < 40; i++) {
      a = Math.random() * Math.PI * 2;
      v = 6 + Math.random() * 18;
      splats.push({
        x: cx + (Math.random() - .5) * 160,
        y: cy + (Math.random() - .5) * 100,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        r: 15 + Math.random() * 50,
        c: COLORS[i % COLORS.length],
        a: .6 + Math.random() * .3,
        g: .8 + Math.random() * 2.5
      });
    }

    for (i = 0; i < 60; i++) {
      a = Math.random() * Math.PI * 2;
      v = 8 + Math.random() * 22;
      splats.push({
        x: cx + (Math.random() - .5) * 120,
        y: cy + (Math.random() - .5) * 80,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        r: 3 + Math.random() * 12,
        c: COLORS[i % COLORS.length],
        a: .4 + Math.random() * .4,
        g: .3 + Math.random() * 1
      });
    }

    for (i = 0; i < 15; i++) {
      a = -Math.PI / 2 + (Math.random() - .5) * 1.2;
      v = 2 + Math.random() * 6;
      splats.push({
        x: cx + (Math.random() - .5) * 400,
        y: cy - 50 - Math.random() * 200,
        vx: Math.cos(a) * v * .3,
        vy: Math.abs(Math.sin(a)) * v,
        r: 4 + Math.random() * 8,
        c: COLORS[i % COLORS.length],
        a: .5 + Math.random() * .3,
        g: .2 + Math.random() * .5,
        drip: true
      });
    }
  }

  /* -----------------------------------------------------------------------
     AMBIENT PARTICLES — Permanent floating after intro
     ----------------------------------------------------------------------- */
  var ambientParticles = [];
  var ambientActive = false;

  function initAmbient() {
    ambientActive = true;
    var count = Math.min(40, Math.floor(innerWidth / 45));
    for (var i = 0; i < count; i++) {
      ambientParticles.push({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        r: 1.5 + Math.random() * 4.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.1 - Math.random() * 0.35,
        a: 0.08 + Math.random() * 0.18,
        c: COLORS[i % COLORS.length].replace(/[\d.]+\)$/, ''),
        phase: Math.random() * Math.PI * 2,
        drift: 0.2 + Math.random() * 0.4
      });
    }
  }

  function drawAmbient(t) {
    if (!ambientActive) return;
    var w = cv.width, h = cv.height;

    ambientParticles.forEach(function (p) {
      p.x += p.vx + Math.sin(t * 0.0004 + p.phase) * p.drift;
      p.y += p.vy + Math.cos(t * 0.0003 + p.phase * 1.5) * 0.08;
      var pulse = 0.5 + 0.5 * Math.sin(t * 0.0008 + p.phase);

      // Wrap around
      if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w; }
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;

      var radius = p.r * (0.7 + pulse * 0.5);
      var alpha = p.a * (0.4 + pulse * 0.6);

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = p.c + alpha + ')';
      ctx.fill();
    });
  }

  /* -----------------------------------------------------------------------
     CANVAS RENDER LOOP — Intro explosion + ambient particles
     ----------------------------------------------------------------------- */
  function drawTransition(t) {
    if (!trA && !ambientActive) {
      requestAnimationFrame(drawTransition);
      return;
    }

    ctx.clearRect(0, 0, cv.width, cv.height);

    // Intro explosion
    if (trA) {
      var e = Date.now() - trS;

      if (e < 1200) {
        ctx.fillStyle = 'rgba(10,10,10,' + Math.max(0, 1 - (e / 1200) * .8) + ')';
        ctx.fillRect(0, 0, cv.width, cv.height);
        splats.forEach(function (s) {
          s.x += s.vx * .55;
          s.y += s.vy * .55;
          if (s.drip) s.vy += .15;
          s.r += s.g;
          s.vx *= .965;
          s.vy *= .965;
          ctx.beginPath();
          ctx.arc(s.x, s.y, Math.max(0, s.r), 0, Math.PI * 2);
          ctx.fillStyle = s.c;
          ctx.globalAlpha = s.a;
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      } else if (e < 2800) {
        var f = (e - 1200) / 1600;
        splats.forEach(function (s) {
          s.r += s.g * .15;
          if (s.drip) s.vy += .05;
          s.x += s.vx * .2;
          s.y += s.vy * .2;
          var aa = s.a * (1 - f);
          if (aa > 0.01) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, Math.max(0, s.r), 0, Math.PI * 2);
            ctx.fillStyle = s.c;
            ctx.globalAlpha = aa;
            ctx.fill();
          }
        });
        ctx.globalAlpha = 1;
      } else {
        trA = false;
        splats = [];
        if (!ambientActive) {
          cv.style.opacity = '0';
        }
      }
    }

    // Ambient particles (always after intro settles)
    if (ambientActive && !trA) {
      cv.style.opacity = '1';
      drawAmbient(t || 0);
    }

    requestAnimationFrame(drawTransition);
  }

  drawTransition();

  /* -----------------------------------------------------------------------
     INTRO — TRIGGER
     ----------------------------------------------------------------------- */
  var allL = intro.querySelectorAll('.i-n span, .i-s span');

  function triggerIntro() {
    if (!intro || intro.style.display === 'none' || intro.classList.contains('go')) return;

    intro.classList.add('go');

    allL.forEach(function (l, i) {
      var a = (Math.random() - .5) * 140;
      var d = 120 + Math.random() * 350;
      l.style.color = COLORS[i % COLORS.length].replace(/\.[0-9]+\)/, '.95)');
      l.style.transform = 'translate(' + Math.cos(a * Math.PI / 180) * d + 'px,' + (Math.sin(a * Math.PI / 180) * d - (60 + Math.random() * 120)) + 'px) rotate(' + ((Math.random() - .5) * 100) + 'deg) scale(' + (1.3 + Math.random() * .9) + ')';
      l.style.opacity = '0';
      l.style.transitionDelay = (i * 25) + 'ms';
    });

    setTimeout(function () {
      cv.style.opacity = '1';
      trA = true;
      trS = Date.now();
      boom();
    }, 250);

    setTimeout(function () {
      intro.style.display = 'none';
      site.style.display = 'block';
      document.body.style.background = 'var(--dark)';
      nav.classList.add('on');
      window.scrollTo(0, 0);
      startHeroGlow();
      revealHeroBg();

      // Initialize all enhancements after site is visible
      initLenis();
      initScrollAnimations();
      initMouseTracking();

      // Start ambient particles after explosion finishes
      setTimeout(function () {
        initAmbient();
      }, 2200);

      // Refresh ScrollTrigger after layout settles
      setTimeout(function () { ScrollTrigger.refresh(); }, 100);
    }, 900);
  }

  document.addEventListener('click', triggerIntro);
  if (isTouch) document.addEventListener('touchend', triggerIntro);

  // Auto-skip intro on mobile after 3.5s
  if (isTouch) {
    setTimeout(function () {
      if (!intro.classList.contains('go')) triggerIntro();
    }, 3500);
  }

  /* -----------------------------------------------------------------------
     NAVIGATION — HOME RESET
     ----------------------------------------------------------------------- */
  document.getElementById('goHome').addEventListener('click', function (e) {
    e.preventDefault();

    // Destroy Lenis and ScrollTrigger
    if (lenis) { lenis.destroy(); lenis = null; }
    ScrollTrigger.getAll().forEach(function (st) { st.kill(); });

    // Stop ambient particles
    ambientActive = false;
    ambientParticles = [];

    nav.classList.remove('on');
    site.style.display = 'none';
    intro.style.display = 'flex';
    intro.classList.remove('go');
    document.body.style.background = 'var(--dark)';
    window.scrollTo(0, 0);
    heroGlow.style.animation = 'none';
    heroGlow.style.opacity = '0';
    cv.style.opacity = '0';

    var sp = intro.querySelectorAll('.i-n span, .i-s span');
    sp.forEach(function (s) {
      s.style.transition = 'none';
      s.style.color = '';
      s.style.opacity = '0';
      s.style.transform = 'translateY(80%)';
      s.style.transitionDelay = '0ms';
    });

    requestAnimationFrame(function () {
      sp.forEach(function (s, i) {
        s.style.transition = 'transform 1.2s cubic-bezier(.25,.1,.25,1), opacity .9s ease';
        s.style.opacity = '1';
        s.style.transform = 'translateY(0)';
        s.style.transitionDelay = (i * 55) + 'ms';
      });
    });
  });

  /* -----------------------------------------------------------------------
     NAVIGATION — HAMBURGER MENU (mobile)
     ----------------------------------------------------------------------- */
  var navBurger = document.getElementById('navBurger');
  var navMenu = document.getElementById('navMenu');

  if (navBurger) {
    navBurger.addEventListener('click', function () {
      var isOpen = navBurger.classList.toggle('open');
      navMenu.classList.toggle('open');
      navBurger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navBurger.classList.remove('open');
        navMenu.classList.remove('open');
        navBurger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -----------------------------------------------------------------------
     NAVIGATION — TRANSITION OVERLAY
     ----------------------------------------------------------------------- */
  var navTrans = document.getElementById('navTrans');
  var navTransLabel = document.getElementById('navTransLabel');
  var navTransiting = false;

  var sectionNames = {
    'hero': 'Inicio',
    'gal-e': 'Obras',
    'about': 'Artista',
    'contact': 'Contacto'
  };

  function navigateToSection(href) {
    var target = document.querySelector(href);
    if (!target || navTransiting) return;

    var sectionId = href.replace('#', '');
    var label = sectionNames[sectionId] || '';

    var dist = Math.abs(target.getBoundingClientRect().top);
    if (dist < window.innerHeight * 1.5) {
      if (lenis) {
        lenis.scrollTo(target, { offset: 0, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Far jump — use transition overlay
    navTransiting = true;
    navTransLabel.textContent = label;
    navTrans.classList.add('active');

    setTimeout(function () {
      if (lenis) lenis.stop();
      window.scrollTo(0, target.offsetTop);
      if (lenis) {
        lenis.start();
        lenis.scrollTo(target, { immediate: true });
      }

      ScrollTrigger.refresh();
      tick();

      setTimeout(function () {
        navTrans.classList.remove('active');
        navTransiting = false;
      }, 350);
    }, 500);
  }

  document.querySelectorAll('.nav-r a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      navigateToSection(this.getAttribute('href'));
    });
  });

  /* -----------------------------------------------------------------------
     LIGHTBOX
     ----------------------------------------------------------------------- */
  var lbCur = 0;
  var lbOpen = false;

  var lbTrigger = null;

  function openLb(idx) {
    lbTrigger = document.activeElement;
    lbCur = idx;
    updLb();
    lb.classList.add('on');
    lbOpen = true;
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
    document.getElementById('lbClose').focus();
  }

  function closeLb() {
    lb.classList.remove('on');
    lbOpen = false;
    document.body.style.overflow = '';
    if (lenis) lenis.start();
    if (lbTrigger) { lbTrigger.focus(); lbTrigger = null; }
  }

  function updLb() {
    var d = lbData[lbCur];
    if (!d) return;
    var webpSrc = d.src.replace('.jpg', '.webp');
    var testImg = new Image();
    testImg.onload = function() { lbImg.src = webpSrc; };
    testImg.onerror = function() { lbImg.src = d.src; };
    testImg.src = webpSrc;
    lbImg.alt = d.title;
    lbTitle.textContent = d.title;
    lbSub.textContent = d.sub;
    lbMed.textContent = d.med + (d.year ? ' · ' + d.year : '');

    // Dimensions
    if (lbDim) {
      lbDim.textContent = d.dim || '';
    }

    // Status badge
    if (lbStatus) {
      lbStatus.className = 'lb-status';
      if (d.status === 'available') {
        lbStatus.textContent = 'Disponible';
        lbStatus.classList.add('available');
      } else if (d.status === 'collection') {
        lbStatus.textContent = 'En colección privada';
        lbStatus.classList.add('collection');
      } else {
        lbStatus.textContent = '';
      }
    }
  }

  document.getElementById('lbClose').addEventListener('click', closeLb);

  lb.addEventListener('click', function (e) {
    if (e.target === lb) closeLb();
  });

  document.getElementById('lbPrev').addEventListener('click', function () {
    lbCur = (lbCur - 1 + lbData.length) % lbData.length;
    updLb();
  });

  document.getElementById('lbNext').addEventListener('click', function () {
    lbCur = (lbCur + 1) % lbData.length;
    updLb();
  });

  document.addEventListener('keydown', function (e) {
    if (!lbOpen) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') { lbCur = (lbCur - 1 + lbData.length) % lbData.length; updLb(); }
    if (e.key === 'ArrowRight') { lbCur = (lbCur + 1) % lbData.length; updLb(); }
    if (e.key === 'Tab') {
      var focusable = lb.querySelectorAll('button, a[href]');
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
  });

  document.addEventListener('click', function (e) {
    var card = e.target.closest('.slide-card[data-lb]');
    if (card) openLb(parseInt(card.dataset.lb));
  });

  /* -----------------------------------------------------------------------
     SECTION NAVIGATION
     ----------------------------------------------------------------------- */
  var sectionLabels = {
    'hero': 'Inicio',
    'brk-e': 'Elegancia Oscura',
    'gal-e': 'Galería I',
    'qb1': 'Cita',
    'brk-s': 'Rugido Urbano',
    'gal-s': 'Galería II',
    'about': 'Artista',
    'contact': 'Contacto'
  };

  function getCurrentSection() {
    var wh = window.innerHeight;
    for (var i = sectionOrder.length - 1; i >= 0; i--) {
      var el = document.getElementById(sectionOrder[i]);
      if (!el) continue;
      if (el.getBoundingClientRect().top < wh * 0.5) return sectionOrder[i];
    }
    return sectionOrder[0];
  }

  function getCurrentSectionIndex() {
    var cur = getCurrentSection();
    return sectionOrder.indexOf(cur);
  }

  function getNextSection() {
    var idx = getCurrentSectionIndex();
    return idx < sectionOrder.length - 1 ? sectionOrder[idx + 1] : null;
  }

  function getPrevSection() {
    var idx = getCurrentSectionIndex();
    return idx > 0 ? sectionOrder[idx - 1] : null;
  }

  function scrollToSection(id) {
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.5 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  secNext.addEventListener('click', function (e) {
    e.preventDefault();
    scrollToSection(getNextSection());
  });

  secPrev.addEventListener('click', function (e) {
    e.preventDefault();
    scrollToSection(getPrevSection());
  });

  /* -----------------------------------------------------------------------
     GALLERY — SCROLL-DRIVEN SLIDESHOW
     ----------------------------------------------------------------------- */
  var gals = document.querySelectorAll('.gal');

  function updGal(g) {
    var vp = g.querySelector('.gal-vp');
    var sl = vp.querySelectorAll('.slide');
    var n = sl.length;
    if (!n) return;

    var r = g.getBoundingClientRect();
    var h = g.offsetHeight;
    var wh = window.innerHeight;
    var scrolled = -r.top;
    var total = h - wh;
    var t = total > 0 ? scrolled / total : 0;
    t = Math.max(0, Math.min(1, t));

    // Gallery hint — update counter and visibility
    var hint = vp.querySelector('.gal-hint');
    if (hint) {
      var isInView = r.top <= wh * 0.1 && r.bottom >= wh * 0.9;
      hint.classList.toggle('vis', isInView);
      var curNum = Math.floor(t * (n - 1)) + 1;
      var curEl = hint.querySelector('.gal-hint-cur');
      if (curEl) curEl.textContent = (curNum < 10 ? '0' : '') + curNum;
    }

    var sf = t * (n - 1);
    var cur = Math.floor(sf);
    var frac = sf - cur;
    var af;

    if (frac < 0.15) af = 0;
    else if (frac > 0.85) af = 1;
    else { af = (frac - 0.15) / 0.7; af = af * af * (3 - 2 * af); }

    sl.forEach(function (s, i) {
      var c = s.querySelector('.slide-card');
      var ci = s.querySelector('.slide-card img');
      var isA = false;

      if (i === cur && i === n - 1) {
        s.style.opacity = '1';
        if (!c.matches(':hover')) c.style.transform = 'scale(1)';
        isA = true;
      } else if (i === cur) {
        var op = 1 - af;
        s.style.opacity = String(op);
        if (!c.matches(':hover')) c.style.transform = 'scale(' + (1 - af * .04) + ') translateY(' + (af * -15) + 'px)';
        if (op > 0.5) isA = true;
      } else if (i === cur + 1) {
        s.style.opacity = String(af);
        if (!c.matches(':hover')) c.style.transform = 'scale(' + (0.96 + af * .04) + ') translateY(' + ((1 - af) * 20) + 'px)';
        if (af > 0.5) isA = true;
      } else {
        s.style.opacity = '0';
      }

      if (parseFloat(s.style.opacity) > 0.1 && !c.matches(':hover')) {
        ci.style.transform = 'scale(1.05) translateY(' + (r.top / wh * -6) + 'px)';
      }

      if (isA) s.classList.add('active');
      else s.classList.remove('active');
    });
  }

  /* -----------------------------------------------------------------------
     VISIBILITY — SECTION REVEALS
     ----------------------------------------------------------------------- */
  var brks = document.querySelectorAll('.sb, .qb');

  function chkVis() {
    brks.forEach(function (b) {
      var r = b.getBoundingClientRect();
      if (r.top < window.innerHeight * .7 && r.bottom > 0) {
        b.classList.add('vis');
      }
    });
  }

  /* -----------------------------------------------------------------------
     SCROLL LOOP — MAIN TICK
     ----------------------------------------------------------------------- */
  function tick() {
    gals.forEach(updGal);
    chkVis();

    var cur = getCurrentSection();
    var idx = sectionOrder.indexOf(cur);
    var show = site.style.display !== 'none';

    secNav.classList.toggle('on', show);

    if (show) {
      secLabel.textContent = sectionLabels[cur] || '';
      secPrev.disabled = idx <= 0;
      secNext.disabled = idx >= sectionOrder.length - 1;
    }
  }

  var tck = false;
  window.addEventListener('scroll', function () {
    if (!tck) {
      requestAnimationFrame(function () { tick(); tck = false; });
      tck = true;
    }
  }, { passive: true });

  window.addEventListener('resize', tick);

})();
