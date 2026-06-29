/* =========================================================
   HARIKARA SUTHAN — DIGITAL MIND PORTFOLIO
   Main script. Personal info lives in config.js, not here.
   ========================================================= */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;

  /* ---------- apply CONFIG to the DOM ---------- */
  function applyConfig(){
    if (typeof CONFIG === 'undefined') return;
    document.querySelectorAll('[data-social]').forEach(el => {
      const key = el.getAttribute('data-social');
      if (key === 'email') el.href = 'mailto:' + CONFIG.email;
      else if (CONFIG[key]) el.href = CONFIG[key];
    });
    document.querySelectorAll('[data-contact]').forEach(el => {
      const key = el.getAttribute('data-contact');
      if (!CONFIG[key]) return;
      if (key === 'github' || key === 'linkedin') {
        el.textContent = CONFIG[key].replace(/^https?:\/\//, '');
        el.closest('.contact-row').querySelector('.icon-link').outerHTML =
          `<a href="${CONFIG[key]}" target="_blank" rel="noopener" class="icon-link">${el.closest('.contact-row').querySelector('.icon-link').innerHTML}</a>`;
      } else {
        el.textContent = CONFIG[key];
      }
    });
    document.querySelectorAll('[data-contact-cta]').forEach(el => {
      el.href = 'mailto:' + CONFIG.email + '?subject=Hi%20Harikara';
    });
    document.querySelectorAll('img[src="assets/profile.png"]').forEach(el => el.src = CONFIG.profile);
    document.querySelectorAll('img[src="assets/logo.png"]').forEach(el => el.src = CONFIG.logo);
    document.querySelectorAll('a[href="assets/resume.pdf"]').forEach(el => el.href = CONFIG.resume);
  }

  /* ---------- BOOT SEQUENCE ---------- */
  function initBoot(){
    const lines = [
      "INITIALIZING NEURAL NETWORK...",
      "LOADING AI MODELS...",
      "CONNECTING DATA STREAMS...",
      "CALIBRATING DIGITAL MIND...",
      "ACCESS GRANTED."
    ];
    const wrap = document.getElementById('bootLines');
    const bar = document.getElementById('bootBar');
    const pct = document.getElementById('bootPct');
    const enterBtn = document.getElementById('enter-btn');
    const boot = document.getElementById('boot-screen');

    document.documentElement.style.overflow = 'hidden';

    if (reduceMotion){
      lines.forEach((l,i) => {
        const d = document.createElement('div');
        d.className = 'line show' + (i === lines.length-1 ? ' ok' : '');
        d.textContent = '> ' + l;
        wrap.appendChild(d);
      });
      bar.style.width = '100%';
      pct.textContent = '100%';
      enterBtn.classList.add('ready');
    } else {
      let i = 0;
      const step = () => {
        if (i >= lines.length){ enterBtn.classList.add('ready'); return; }
        const d = document.createElement('div');
        d.className = 'line';
        d.innerHTML = '> ' + lines[i] + (i === lines.length-1 ? '' : '<span class="boot-caret"></span>');
        wrap.appendChild(d);
        requestAnimationFrame(() => {
          d.classList.add('show');
          if (i === lines.length-1) d.classList.add('ok');
        });
        i++;
        setTimeout(step, 480);
      };
      step();

      let p = 0;
      const fill = setInterval(() => {
        p += Math.random()*9 + 4;
        if (p >= 100){ p = 100; clearInterval(fill); }
        bar.style.width = p + '%';
        pct.textContent = Math.floor(p) + '%';
      }, 160);
    }

    enterBtn.addEventListener('click', () => {
      unlockAudio();
      playStartup();
      boot.classList.add('hidden');
      document.documentElement.style.overflow = '';
      startPostBoot();
    }, { once:true });
  }

  function startPostBoot(){
    startRoleTyper();
    startCanvas();
  }

  /* ---------- CUSTOM CURSOR ---------- */
  function initCursor(){
    if (isCoarse || reduceMotion) return;
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;

    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });

    function loop(){
      rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    }
    loop();

    document.querySelectorAll('a, button, .skill-node, .project-card, input, .cert-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
  }

  /* ---------- MOUSE SPOTLIGHT ---------- */
  function initSpotlight(){
    if (isCoarse) return;
    const spot = document.getElementById('spotlight');
    window.addEventListener('mousemove', e => {
      spot.style.setProperty('--mx', e.clientX + 'px');
      spot.style.setProperty('--my', e.clientY + 'px');
    });
  }

  /* ---------- AMBIENT NEURAL CANVAS ---------- */
  let canvasStarted = false;
  function startCanvas(){
    if (canvasStarted) return; canvasStarted = true;
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let mouse = { x:-9999, y:-9999 };

    function resize(){
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w*dpr; canvas.height = h*dpr;
      canvas.style.width = w+'px'; canvas.style.height = h+'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const count = isCoarse || w < 700 ? 36 : 70;
      particles = Array.from({length: count}, () => ({
        x: Math.random()*w, y: Math.random()*h,
        vx: (Math.random()-0.5)*0.25, vy: (Math.random()-0.5)*0.25,
        r: Math.random()*1.6 + 0.6
      }));
    }
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    resize();

    function frame(){
      ctx.clearRect(0,0,w,h);
      for (const p of particles){
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      }
      for (let i=0; i<particles.length; i++){
        for (let j=i+1; j<particles.length; j++){
          const a = particles[i], b = particles[j];
          const dx = a.x-b.x, dy = a.y-b.y;
          const dist = Math.sqrt(dx*dx+dy*dy);
          const maxDist = 150;
          if (dist < maxDist){
            const mdx = (a.x+b.x)/2 - mouse.x, mdy = (a.y+b.y)/2 - mouse.y;
            const mDist = Math.sqrt(mdx*mdx + mdy*mdy);
            const boost = mDist < 220 ? (1 - mDist/220) * 0.5 : 0;
            const alpha = (1 - dist/maxDist) * 0.13 + boost;
            ctx.strokeStyle = `rgba(255,214,10,${Math.min(alpha,0.55)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }
      for (const p of particles){
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255,214,10,0.55)';
        ctx.fill();
      }
      if (!reduceMotion) requestAnimationFrame(frame);
    }
    frame();
  }

  /* ---------- NAVBAR show/hide + active link ---------- */
  function initNavbar(){
    const navbar = document.getElementById('navbar');
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > lastY && y > 140) navbar.classList.add('nav-hidden');
      else navbar.classList.remove('nav-hidden');
      lastY = y;
    });

    const sections = document.querySelectorAll('main section[id]');
    const navA = document.querySelectorAll('.nav-links a[data-nav]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting){
          navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(s => obs.observe(s));
  }

  /* ---------- MOBILE MENU + smooth nav ---------- */
  function initMobileMenu(){
    const burger = document.getElementById('navBurger');
    const menu = document.getElementById('mobileMenu');
    const close = document.getElementById('closeMenu');
    burger.addEventListener('click', () => menu.classList.add('open'));
    close.addEventListener('click', () => menu.classList.remove('open'));

    document.querySelectorAll('[data-nav]').forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        menu.classList.remove('open');
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  /* ---------- ROLE TYPER ---------- */
  function startRoleTyper(){
    const el = document.getElementById('roleTyper');
    const roles = ["AI Engineer", "Data Scientist", "Machine Learning Engineer", "Generative AI Engineer", "Problem Solver"];
    if (reduceMotion){ el.textContent = roles[0]; return; }
    let r = 0, c = 0, deleting = false;

    function tick(){
      const word = roles[r];
      if (!deleting){
        c++;
        el.textContent = word.slice(0, c);
        if (c === word.length){ deleting = true; setTimeout(tick, 1400); return; }
      } else {
        c--;
        el.textContent = word.slice(0, c);
        if (c === 0){ deleting = false; r = (r+1) % roles.length; setTimeout(tick, 250); return; }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  function initReveal(){
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting){ en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
  }

  /* ---------- COUNTERS ---------- */
  function initCounters(){
    const nums = document.querySelectorAll('.stat-num');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        obs.unobserve(en.target);
        const target = parseInt(en.target.getAttribute('data-count'), 10);
        if (reduceMotion){ en.target.textContent = target; return; }
        const dur = 1100;
        const start = performance.now();
        function step(now){
          const t = Math.min((now-start)/dur, 1);
          const eased = 1 - Math.pow(1-t, 3);
          en.target.textContent = Math.round(eased*target);
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    nums.forEach(n => obs.observe(n));
  }

  /* ---------- TIMELINE SCROLL FILL ---------- */
  function initTimeline(){
    const el = document.getElementById('timelineEl');
    const fill = document.getElementById('timelineFill');
    const rocket = document.getElementById('timelineRocket');
    if (!el) return;
    function update(){
      const rect = el.getBoundingClientRect();
      const total = rect.height;
      const visible = Math.min(Math.max(window.innerHeight*0.7 - rect.top, 0), total);
      const ratio = total ? Math.min(visible/total, 1) : 0;
      fill.style.height = (ratio*100) + '%';
      rocket.style.top = (ratio*100) + '%';
    }
    window.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- AUDIO (synth, no asset files needed) ---------- */
  let actx = null;
  let soundOn = localStorage.getItem('hs_sound') !== 'off';

  function unlockAudio(){
    if (!actx){
      try { actx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch(e){ actx = null; }
    }
  }
  function tone(freq, duration, type='sine', vol=0.05, glideTo=null){
    if (!soundOn || !actx) return;
    const osc = actx.createOscillator();
    const gain = actx.createGain();
    osc.type = type; osc.frequency.value = freq;
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, actx.currentTime + duration);
    gain.gain.value = vol;
    gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + duration);
    osc.connect(gain); gain.connect(actx.destination);
    osc.start(); osc.stop(actx.currentTime + duration);
  }
  function playStartup(){ tone(220, 0.5, 'sine', 0.07, 880); }
  function playTick(){ tone(700, 0.05, 'sine', 0.025); }

  function initSound(){
    const btn = document.getElementById('soundToggle');
    btn.innerHTML = soundOn ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
    btn.addEventListener('click', () => {
      soundOn = !soundOn;
      localStorage.setItem('hs_sound', soundOn ? 'on' : 'off');
      btn.innerHTML = soundOn ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
      if (soundOn){ unlockAudio(); playTick(); }
    });
    document.querySelectorAll('.btn, .nav-links a, .skill-node').forEach(el => {
      el.addEventListener('mouseenter', () => { unlockAudio(); playTick(); });
    });
  }

  /* ---------- PRINT RESUME ---------- */
  function initPrint(){
    const btn = document.getElementById('printResume');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const path = (typeof CONFIG !== 'undefined' && CONFIG.resume) || 'assets/resume.pdf';
      const ifr = document.createElement('iframe');
      ifr.style.position = 'fixed'; ifr.style.right = '0'; ifr.style.bottom = '0';
      ifr.style.width = '0'; ifr.style.height = '0'; ifr.style.border = '0';
      ifr.src = path;
      document.body.appendChild(ifr);
      ifr.onload = () => {
        try { ifr.contentWindow.focus(); ifr.contentWindow.print(); }
        catch(e){ window.open(path, '_blank'); }
        setTimeout(() => ifr.remove(), 4000);
      };
    });
  }

  /* ---------- AI ASSISTANT ---------- */
  function initAssistant(){
    const toggle = document.getElementById('ai-toggle');
    const panel = document.getElementById('ai-panel');
    const body = document.getElementById('aiBody');
    const input = document.getElementById('aiInput');
    const send = document.getElementById('aiSend');

    toggle.addEventListener('click', () => panel.classList.toggle('open'));

    function addMsg(text, who){
      const d = document.createElement('div');
      d.className = 'ai-msg ' + who;
      d.textContent = text;
      body.appendChild(d);
      body.scrollTop = body.scrollHeight;
    }

    function goTo(id){
      const target = document.querySelector(id);
      if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }

    const replies = {
      projects: () => { goTo('#projects'); return "Here's the Project Laboratory — real work in progress, nothing fabricated."; },
      skills:   () => { goTo('#skills'); return "Here's the Skill Galaxy — honest levels: comfortable, learning, or exploring."; },
      resume:   () => { goTo('#resume'); return "Here's the Resume Command Center — view, download, or print it."; },
      contact:  () => { goTo('#contact'); return "Here's how to reach Harikara directly."; },
      certifications: () => { goTo('#certifications'); return "Here's the Certification Vault — planned ones are marked honestly."; },
      timeline: () => { goTo('#timeline'); return "Here's the timeline of how this journey is unfolding."; }
    };

    function reply(raw){
      const text = raw.toLowerCase();
      for (const key of Object.keys(replies)){
        if (text.includes(key) || (key === 'certifications' && text.includes('cert'))) return replies[key]();
      }
      if (/(hi|hello|hey)/.test(text)) return "Hey! Try asking about projects, skills, resume, certifications, timeline, or contact.";
      return "I'm just a simple guide, not a real AI model — try: projects, skills, resume, certifications, timeline, or contact.";
    }

    document.querySelectorAll('.ai-quick button').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.getAttribute('data-q');
        addMsg(btn.textContent, 'user');
        setTimeout(() => addMsg(reply(q), 'bot'), 250);
      });
    });

    function submit(){
      const val = input.value.trim();
      if (!val) return;
      addMsg(val, 'user');
      input.value = '';
      setTimeout(() => addMsg(reply(val), 'bot'), 250);
    }
    send.addEventListener('click', submit);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
  }

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    applyConfig();
    initBoot();
    initCursor();
    initSpotlight();
    initNavbar();
    initMobileMenu();
    initReveal();
    initCounters();
    initTimeline();
    initSound();
    initPrint();
    initAssistant();
    if (reduceMotion) startCanvas();
  });
})();
