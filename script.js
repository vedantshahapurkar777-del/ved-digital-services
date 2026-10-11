(() => {
  const cfg = SITE_CONFIG;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  document.documentElement.style.setProperty('--accent', cfg.theme.accent);
  document.documentElement.style.setProperty('--accent-2', cfg.theme.accent2);
  document.documentElement.style.setProperty('--bg', cfg.theme.dark);

  document.title = `${cfg.business.name} | ${cfg.business.tagline}`;
  $('#brandName').textContent = cfg.business.name;
  $('#footerBrandName').textContent = cfg.business.name;
  $('#brandMark').textContent = initials(cfg.business.name);
  $('#footerBrandMark').textContent = initials(cfg.business.name);
  $('#heroMessage').textContent = cfg.business.heroMessage;
  $('#emailText').textContent = cfg.business.email;
  $('#phoneText').textContent = cfg.business.phoneDisplay;
  $('#whatsappText').textContent = cfg.business.phoneDisplay;
  $('#instagramText').textContent = cfg.business.instagramDisplay;
  $('#locationText').textContent = cfg.business.location;
  $('#footerEmail').textContent = cfg.business.email;
  $('#footerPhone').textContent = cfg.business.phoneDisplay;
  $('#footerWhatsApp').textContent = cfg.business.phoneDisplay;
  $('#footerLocation').textContent = cfg.business.location;
  $('#copyright').textContent = `© ${cfg.year} ${cfg.business.name}. All rights reserved.`;

  const emailHref = `mailto:${cfg.business.email}`;
  const phoneHref = `tel:${cfg.business.phoneLink.replace(/\s/g,'')}`;
  const waHref = `https://wa.me/${cfg.business.whatsapp}?text=${encodeURIComponent('Hello, I am interested in your digital services. I would like to know more about your services and pricing.')}`;
  $('#emailLink').href = emailHref; $('#contactEmailBtn').href = emailHref; $('#footerEmail').href = emailHref;
  $('#phoneLink').href = phoneHref; $('#contactCallBtn').href = phoneHref; $('#footerPhone').href = phoneHref;
  $('#whatsappLink').href = waHref; $('#contactWhatsAppBtn').href = waHref; $('#footerWhatsApp').href = waHref; $('#floatingWhatsApp').href = waHref;
  $('#instagramLink').href = cfg.business.instagram;

  initMotionGraphics();
  renderServices();
  renderPricing();
  renderMaintenance();
  renderBenefits();
  renderSteps();
  renderPortfolio();
  renderFaq();
  populateServiceSelect();
  bindUi();

  function initials(name){
    const clean = name.replace(/[^a-zA-Z0-9 ]/g,' ').trim().split(/\s+/).filter(Boolean);
    if(!clean.length) return 'DS';
    return (clean[0][0] + (clean[1]?.[0] || '')).toUpperCase();
  }

  function esc(value){
    return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }
  function featureList(items, kind='included'){
    if(!items || !items.length) return '';
    const title = kind === 'excluded' ? 'Not included' : 'Included';
    return `<div class="scope-block ${kind}"><h4>${title}</h4><ul class="feature-list ${kind}-list">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`;
  }
  function renderServices(){
    $('#serviceGrid').innerHTML = cfg.services.map((s,i)=>`
      <article class="service-card reveal">
        <div class="card-top"><div class="service-icon">${['▦','🛎','₹','⌂','▥','✦'][i%6]}</div><span class="eyebrow">${String(i+1).padStart(2,'0')}</span></div>
        <h3>${esc(s.name)}</h3><p>${esc(s.short)}</p>
        <div class="price">${esc(s.price)}</div>${featureList(s.features, 'included')}${featureList(s.exclusions, 'excluded')}
        ${s.note ? `<div class="note">${esc(s.note)}</div>` : ''}
        <div class="card-actions"><a class="btn btn-secondary btn-wide service-cta" href="#contact" data-service="${esc(s.name)}">Get This Service</a></div>
      </article>`).join('');
  }
  function renderPricing(){
    $('#pricingGrid').innerHTML = cfg.services.map((s,i)=>`
      <article class="price-card reveal">
        <div class="card-top"><span class="eyebrow">Package ${String(i+1).padStart(2,'0')}</span><span class="service-icon">${i===0?'▦':i===1?'🛎':i===2?'₹':i===3?'⌂':i===4?'▥':'✦'}</span></div>
        <h3>${esc(s.name)}</h3><p>${esc(s.short)}</p><div class="price">${esc(s.price)}</div>
        ${featureList(s.features, 'included')}${featureList(s.exclusions, 'excluded')}${s.note ? `<div class="note">${esc(s.note)}</div>` : ''}
        <div class="card-actions"><a class="btn btn-primary btn-wide service-cta" href="#contact" data-service="${esc(s.name)}">Get This Service</a></div>
      </article>`).join('');
  }
  function renderMaintenance(){
    $('#maintenanceGrid').innerHTML = cfg.maintenance.map((m,i)=>`
      <article class="maintenance-card reveal"><div class="eyebrow">Plan ${i+1}</div><h3>${esc(m.name)}</h3><div class="price">${esc(m.monthly)}</div><div class="yearly">or ${esc(m.yearly)}</div>${featureList(m.features, 'included')}${featureList(m.exclusions, 'excluded')}</article>`).join('');
  }
  function renderBenefits(){
    $('#benefitGrid').innerHTML = cfg.benefits.map((b,i)=>`<div class="benefit-card reveal"><span class="benefit-icon">✓</span><span>${esc(b)}</span></div>`).join('');
  }
  function renderSteps(){
    $('#steps').innerHTML = cfg.steps.map((s,i)=>`<article class="step reveal"><div class="step-number">STEP ${String(i+1).padStart(2,'0')}</div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`).join('');
  }
  function renderPortfolio(){
    $('#portfolioGrid').innerHTML = cfg.portfolio.map(p=>`<article class="portfolio-card reveal"><div class="portfolio-art">${p.icon || '✦'}</div><div class="portfolio-info"><small>${esc(p.type)}</small><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><a class="text-link" href="#contact" data-service="Custom Requirement">View Demo →</a></div></article>`).join('');
  }
  function renderFaq(){
    $('#faqList').innerHTML = cfg.faq.map((f,i)=>`<article class="faq-item reveal"><button class="faq-q" type="button" aria-expanded="false"><span>${esc(f.q)}</span><span class="faq-plus">+</span></button><div class="faq-a"><p>${esc(f.a)}</p></div></article>`).join('');
  }
  function populateServiceSelect(){
    const options = cfg.services.map(s=>`<option value="${esc(s.name)}">${esc(s.name)}</option>`).join('') + '<option value="Maintenance">Maintenance</option><option value="Custom Requirement">Custom Requirement</option>';
    $('#serviceSelect').innerHTML = options;
  }
  function bindUi(){
    const toggle = $('.menu-toggle');
    toggle.addEventListener('click',()=>{
      const nav = $('#navLinks'); const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', open ? 'true':'false');
    });
    $$('#navLinks a').forEach(a=>a.addEventListener('click',()=>$('#navLinks').classList.remove('open')));
    $$('.faq-q').forEach(btn=>btn.addEventListener('click',()=>{
      const item=btn.parentElement; const open=item.classList.toggle('open'); btn.setAttribute('aria-expanded', open ? 'true':'false');
    }));
    document.addEventListener('click', e=>{
      const cta=e.target.closest('.service-cta,[data-service]');
      if(!cta) return;
      const service=cta.dataset.service;
      if(service){ $('#serviceSelect').value=service; }
    });
    $('#contactForm').addEventListener('submit', handleSubmit);
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = $$('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
      const io = new IntersectionObserver(entries=>entries.forEach(en=>{
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      }), {threshold:.08, rootMargin:'0px 0px -28px 0px'});
      revealItems.forEach((el, i)=>{
        if (el.classList.contains('service-card') || el.classList.contains('price-card') || el.classList.contains('maintenance-card')) {
          el.style.transitionDelay = `${(i % 3) * 65}ms`;
        }
        io.observe(el);
      });
    } else {
      revealItems.forEach(el=>el.classList.add('in'));
    }

    // Slim progress indicator gives long pages a polished, responsive feel.
    const progress = $('#scrollProgress');
    let scrollTicking = false;
    const updateProgress = () => {
      if (!progress) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress.style.width = `${ratio * 100}%`;
      scrollTicking = false;
    };
    window.addEventListener('scroll', () => {
      if (!scrollTicking) { window.requestAnimationFrame(updateProgress); scrollTicking = true; }
    }, {passive:true});
    updateProgress();

    // Cursor-following card light + gentle 3D perspective, desktop only.
    const finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (finePointer && !reduceMotion) {
      const interactiveCards = $$('.service-card, .price-card, .maintenance-card, .benefit-card, .step, .portfolio-card, .about-panel, .contact-form');
      interactiveCards.forEach(card => {
        card.addEventListener('pointermove', ev => {
          const rect = card.getBoundingClientRect();
          const px = (ev.clientX - rect.left) / rect.width;
          const py = (ev.clientY - rect.top) / rect.height;
          card.style.setProperty('--pointer-x', `${ev.clientX - rect.left}px`);
          card.style.setProperty('--pointer-y', `${ev.clientY - rect.top}px`);
          card.style.setProperty('--card-tilt-x', `${(0.5 - py) * 5}deg`);
          card.style.setProperty('--card-tilt-y', `${(px - 0.5) * 5}deg`);
        }, {passive:true});
        card.addEventListener('pointerleave', () => {
          card.style.setProperty('--pointer-x', '50%');
          card.style.setProperty('--pointer-y', '50%');
          card.style.setProperty('--card-tilt-x', '0deg');
          card.style.setProperty('--card-tilt-y', '0deg');
        }, {passive:true});
      });
      const heroVisual = $('.hero-visual');
      const dashboard = $('.dashboard-window');
      if (heroVisual && dashboard) {
        heroVisual.addEventListener('pointermove', ev => {
          const rect = heroVisual.getBoundingClientRect();
          const x = (ev.clientX - rect.left) / rect.width - .5;
          const y = (ev.clientY - rect.top) / rect.height - .5;
          dashboard.style.setProperty('--hero-tilt-x', `${x * 3.5}deg`);
          dashboard.style.setProperty('--hero-tilt-y', `${-y * 3.5}deg`);
        }, {passive:true});
        heroVisual.addEventListener('pointerleave', () => {
          dashboard.style.setProperty('--hero-tilt-x', '0deg');
          dashboard.style.setProperty('--hero-tilt-y', '0deg');
        }, {passive:true});
      }
    }
  }
  // Visible motion-graphics layer: animated particle field, linked nodes and neon wave trails.
  function initMotionGraphics(){
    const canvas = $('#motionCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    let w = 0, h = 0, dpr = 1, raf = 0, frame = 0;
    let points = [];
    const pointer = { x: -1000, y: -1000 };
    const rand = (min,max) => min + Math.random()*(max-min);
    function resize(){
      dpr = Math.min(window.devicePixelRatio || 1, 1.7);
      w = Math.max(1, window.innerWidth); h = Math.max(1, window.innerHeight);
      canvas.width = Math.round(w*dpr); canvas.height = Math.round(h*dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const amount = Math.min(94, Math.max(38, Math.round(w/15)));
      points = Array.from({length: amount}, (_,i)=>({
        x: rand(0,w), y: rand(0,h), ox: rand(-.22,.22), oy: rand(-.2,.2),
        r: rand(1.1,2.8), phase: rand(0,Math.PI*2), speed: rand(.25,.8),
        hue: Math.random() < .72 ? 252 : 171
      }));
      if (reduceMotion) draw(0, true);
    }
    function glowLine(x1,y1,x2,y2,alpha,hue=253,width=1){
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
      ctx.strokeStyle = `hsla(${hue}, 95%, 70%, ${alpha})`; ctx.lineWidth=width; ctx.stroke();
    }
    function draw(time, staticFrame=false){
      if (!ctx) return;
      const t = (time || 0) * .00022;
      ctx.clearRect(0,0,w,h);
      // Wide flowing ribbons give the page a more cinematic animated background.
      for (let band=0; band<3; band++){
        const baseY = h*(.20 + band*.29);
        ctx.beginPath();
        for(let x=-30; x<=w+30; x+=18){
          const y = baseY + Math.sin(x*.0042 + t*(1.15+band*.18) + band*1.9)* (h*(.045+band*.012)) + Math.cos(x*.008-t*1.4+band)*18;
          if(x===-30) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        const grad=ctx.createLinearGradient(0,baseY-h*.1,w,baseY+h*.1);
        grad.addColorStop(0,'rgba(124,92,255,0)'); grad.addColorStop(.28,`rgba(124,92,255,${staticFrame?.13:.17})`); grad.addColorStop(.63,`rgba(62,156,255,${staticFrame?.08:.12})`); grad.addColorStop(1,'rgba(32,211,162,0)');
        ctx.strokeStyle=grad; ctx.lineWidth=band===1?1.6:1; ctx.stroke();
      }
      points.forEach((p,i)=>{
        const x = p.x + Math.sin(t*7*p.speed+p.phase)*18 + p.ox*w*.1;
        const y = p.y + Math.cos(t*6*p.speed+p.phase)*15 + p.oy*h*.1;
        p._x=x; p._y=y;
        // Connect to a few nearby particles to create an animated digital network.
        for(let j=i+1;j<points.length;j++){
          const q=points[j];
          const qx=q.x+Math.sin(t*7*q.speed+q.phase)*18+q.ox*w*.1;
          const qy=q.y+Math.cos(t*6*q.speed+q.phase)*15+q.oy*h*.1;
          const dx=x-qx,dy=y-qy,dist=Math.hypot(dx,dy);
          const maxDist = Math.min(150, w*.14);
          if(dist<maxDist){
            const alpha=(1-dist/maxDist)* (staticFrame?.12:.22);
            glowLine(x,y,qx,qy,alpha,(p.hue+q.hue)/2,.7);
          }
        }
        const pulse = staticFrame ? 1 : .72 + .28*Math.sin(t*18+p.phase);
        ctx.beginPath(); ctx.arc(x,y,p.r*pulse,0,Math.PI*2);
        ctx.fillStyle=`hsla(${p.hue}, 100%, ${p.hue===171?70:76}%, ${staticFrame?.4:.74})`;
        ctx.shadowBlur=staticFrame?5:12; ctx.shadowColor=p.hue===171?'rgba(32,211,162,.9)':'rgba(124,92,255,.95)'; ctx.fill();
      });
      ctx.shadowBlur=0;
      // Cursor creates a small energy halo and draws nearby links.
      if(!coarse && pointer.x>-100){
        const halo=ctx.createRadialGradient(pointer.x,pointer.y,0,pointer.x,pointer.y,150);
        halo.addColorStop(0,'rgba(124,92,255,.16)'); halo.addColorStop(1,'rgba(124,92,255,0)');
        ctx.fillStyle=halo; ctx.fillRect(pointer.x-150,pointer.y-150,300,300);
        points.forEach(p=>{ const dx=p._x-pointer.x,dy=p._y-pointer.y,dist=Math.hypot(dx,dy); if(dist<180) glowLine(pointer.x,pointer.y,p._x,p._y,(1-dist/180)*.32,p.hue,1); });
      }
      if(!staticFrame){ frame++; raf = window.requestAnimationFrame(draw); }
    }
    window.addEventListener('pointermove',e=>{pointer.x=e.clientX;pointer.y=e.clientY;},{passive:true});
    document.documentElement.addEventListener('pointerleave',()=>{pointer.x=-1000;pointer.y=-1000;},{passive:true});
    window.addEventListener('resize', resize, {passive:true});
    resize();
    if(!reduceMotion){ raf=window.requestAnimationFrame(draw); }
    // Avoid spending frames while the tab is hidden.
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden && raf) { window.cancelAnimationFrame(raf); raf=0; }
      else if(!document.hidden && !reduceMotion && !raf) raf=window.requestAnimationFrame(draw);
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `New Service Enquiry — ${data.get('business') || 'Business'}`;
    const body = [
      `Name: ${data.get('name')}`,
      `Business Name: ${data.get('business')}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email') || 'Not provided'}`,
      `Business Type: ${data.get('type')}`,
      `Required Service: ${data.get('service')}`,
      `Budget Range: ${data.get('budget')}`,
      `Message: ${data.get('message') || 'Not provided'}`
    ].join('\n');
    window.location.href = `mailto:${cfg.business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $('#formSuccess').hidden = false;
  }
})();
