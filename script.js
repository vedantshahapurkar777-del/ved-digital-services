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
  function featureList(items){
    return `<ul class="feature-list">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
  }
  function renderServices(){
    $('#serviceGrid').innerHTML = cfg.services.map((s,i)=>`
      <article class="service-card reveal">
        <div class="card-top"><div class="service-icon">${['▦','🛎','₹','⌂','▥','✦'][i%6]}</div><span class="eyebrow">${String(i+1).padStart(2,'0')}</span></div>
        <h3>${esc(s.name)}</h3><p>${esc(s.short)}</p>
        <div class="price">${esc(s.price)}</div>${featureList(s.features)}
        ${s.note ? `<div class="note">${esc(s.note)}</div>` : ''}
        <div class="card-actions"><a class="btn btn-secondary btn-wide service-cta" href="#contact" data-service="${esc(s.name)}">Get This Service</a></div>
      </article>`).join('');
  }
  function renderPricing(){
    $('#pricingGrid').innerHTML = cfg.services.map((s,i)=>`
      <article class="price-card reveal">
        <div class="card-top"><span class="eyebrow">Package ${String(i+1).padStart(2,'0')}</span><span class="service-icon">${i===0?'▦':i===1?'🛎':i===2?'₹':i===3?'⌂':i===4?'▥':'✦'}</span></div>
        <h3>${esc(s.name)}</h3><p>${esc(s.short)}</p><div class="price">${esc(s.price)}</div>
        ${featureList(s.features)}${s.note ? `<div class="note">${esc(s.note)}</div>` : ''}
        <div class="card-actions"><a class="btn btn-primary btn-wide service-cta" href="#contact" data-service="${esc(s.name)}">Get This Service</a></div>
      </article>`).join('');
  }
  function renderMaintenance(){
    $('#maintenanceGrid').innerHTML = cfg.maintenance.map((m,i)=>`
      <article class="maintenance-card reveal"><div class="eyebrow">Plan ${i+1}</div><h3>${esc(m.name)}</h3><div class="price">${esc(m.monthly)}</div><div class="yearly">${esc(m.yearly)}</div>${featureList(m.features)}</article>`).join('');
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
    const io = new IntersectionObserver(entries=>entries.forEach(en=>en.isIntersecting && en.target.classList.add('in')),{threshold:.08});
    $$('.reveal').forEach(el=>io.observe(el));
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
