import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.js';

(() => {
  const mount = document.getElementById('threeHeroScene');
  if (!mount) return;

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch (error) {
    // Older devices/browsers without WebGL keep the CSS mockup and motion effects.
    mount.classList.add('three-fallback');
    console.warn('3D hero unavailable; CSS visual fallback is active.', error);
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.className = 'three-hero-canvas';
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 80);
  camera.position.set(0, 0, 9.8);

  scene.add(new THREE.AmbientLight(0x9da8ff, 1.65));
  const violetLight = new THREE.PointLight(0x8064ff, 34, 18, 2);
  violetLight.position.set(-3.3, 2.8, 4);
  scene.add(violetLight);
  const cyanLight = new THREE.PointLight(0x24e5c2, 25, 16, 2);
  cyanLight.position.set(3.5, -2.2, 3);
  scene.add(cyanLight);
  const whiteLight = new THREE.PointLight(0xffffff, 8, 14, 2);
  whiteLight.position.set(0.5, 1.5, 5);
  scene.add(whiteLight);

  const world = new THREE.Group();
  scene.add(world);
  const orbitGroup = new THREE.Group();
  world.add(orbitGroup);

  const makeRing = (radius, tube, color, opacity, rotation) => {
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false });
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 10, 220), mat);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    orbitGroup.add(mesh);
    return mesh;
  };
  const ringA = makeRing(2.82, 0.014, 0x8b73ff, 0.82, [0.9, 0.08, -0.28]);
  const ringB = makeRing(2.56, 0.009, 0x3ae4d0, 0.68, [0.38, 0.95, 0.42]);
  const ringC = makeRing(3.02, 0.006, 0x6a9dff, 0.46, [1.18, 0.54, 0.02]);

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x171b3b, metalness: 0.58, roughness: 0.24,
    emissive: 0x352276, emissiveIntensity: 0.42,
    transparent: true, opacity: 0.94, clearcoat: 0.9, clearcoatRoughness: 0.18
  });
  const tealMaterial = new THREE.MeshStandardMaterial({ color: 0x17dbc4, metalness: 0.55, roughness: 0.2, emissive: 0x087f7f, emissiveIntensity: 0.6 });
  const purpleMaterial = new THREE.MeshStandardMaterial({ color: 0x987bff, metalness: 0.65, roughness: 0.2, emissive: 0x4528c8, emissiveIntensity: 0.7 });
  const whiteWire = new THREE.MeshBasicMaterial({ color: 0xd9d6ff, wireframe: true, transparent: true, opacity: 0.75 });

  const floating = [];
  const addFloating = (mesh, position, scale, speed = 1, spin = 1) => {
    mesh.position.set(...position);
    mesh.scale.setScalar(scale);
    mesh.userData.baseY = position[1];
    mesh.userData.phase = Math.random() * Math.PI * 2;
    mesh.userData.speed = speed;
    mesh.userData.spin = spin;
    world.add(mesh);
    floating.push(mesh);
    return mesh;
  };

  addFloating(new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 1), purpleMaterial), [-3.12, 1.8, 0.55], 1, 0.85, 0.45);
  addFloating(new THREE.Mesh(new THREE.IcosahedronGeometry(0.24, 1), whiteWire), [3.12, 1.32, 0.65], 1, 1.1, -0.52);
  addFloating(new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), tealMaterial), [3.12, -1.72, 0.72], 1, 1.0, 0.65);
  addFloating(new THREE.Mesh(new THREE.DodecahedronGeometry(0.2, 0), purpleMaterial), [-3.1, -1.8, 0.8], 1, 0.72, -0.7);
  addFloating(new THREE.Mesh(new THREE.TorusKnotGeometry(0.19, 0.055, 80, 10, 2, 3), tealMaterial), [2.65, 2.18, -0.3], 1, 0.7, 0.4);

  // Small floating digital tokens with real depth and simple generated texture.
  function makeTokenTexture(kind = 'VDS') {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 320;
    const c = canvas.getContext('2d');
    const grad = c.createLinearGradient(0, 0, 512, 320);
    grad.addColorStop(0, '#201746'); grad.addColorStop(0.58, '#10182f'); grad.addColorStop(1, '#0c2634');
    c.fillStyle = grad; c.fillRect(0, 0, 512, 320);
    c.strokeStyle = 'rgba(171,158,255,.55)'; c.lineWidth = 3; c.strokeRect(14, 14, 484, 292);
    c.fillStyle = '#8d77ff'; c.beginPath(); c.arc(62, 61, 28, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#fff'; c.font = 'bold 23px Arial'; c.fillText(kind, 43, 69);
    c.fillStyle = '#f8f7ff'; c.font = 'bold 28px Arial'; c.fillText(kind === 'NFC' ? 'TAP TO CONNECT' : 'DIGITAL SERVICES', 34, 135);
    c.fillStyle = 'rgba(218,224,255,.72)'; c.font = '18px Arial'; c.fillText(kind === 'NFC' ? 'Website • Contact • Menu' : 'Web • Menu • Ordering', 34, 174);
    for (let i = 0; i < 4; i++) {
      c.fillStyle = i % 2 ? '#25ddc6' : '#8c75ff';
      c.fillRect(34 + i * 31, 222, 18, 5);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }
  function roundedShape(w, h, r) {
    const x = -w / 2, y = -h / 2;
    const sh = new THREE.Shape();
    sh.moveTo(x + r, y); sh.lineTo(x + w - r, y); sh.quadraticCurveTo(x + w, y, x + w, y + r);
    sh.lineTo(x + w, y + h - r); sh.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    sh.lineTo(x + r, y + h); sh.quadraticCurveTo(x, y + h, x, y + h - r);
    sh.lineTo(x, y + r); sh.quadraticCurveTo(x, y, x + r, y);
    return sh;
  }
  function addFloatingCard(label, position, rotation, scale, phase) {
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.ExtrudeGeometry(roundedShape(1.32, 0.82, 0.1), { depth: 0.075, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.025, bevelThickness: 0.025 }),
      glassMaterial
    );
    body.position.z = -0.035;
    group.add(body);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(1.29, 0.79), new THREE.MeshBasicMaterial({ map: makeTokenTexture(label), transparent: false, side: THREE.DoubleSide }));
    face.position.z = 0.055;
    group.add(face);
    group.position.set(...position);
    group.rotation.set(...rotation);
    group.scale.setScalar(scale);
    group.userData.baseY = position[1];
    group.userData.phase = phase;
    group.userData.speed = 0.72;
    group.userData.spin = 0.13;
    world.add(group);
    floating.push(group);
  }
  addFloatingCard('NFC', [-3.0, 0.72, 1.05], [0.18, 0.3, -0.21], 0.83, 1.2);
  addFloatingCard('VDS', [3.0, -0.48, 1.1], [-0.18, -0.3, 0.18], 0.78, 3.1);

  // Low-count star/particle field; geometry is reused every frame.
  const particleCount = Math.min(120, Math.max(54, Math.round(window.innerWidth / 9)));
  const particlePositions = new Float32Array(particleCount * 3);
  const particlePhases = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 8.2;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6.1;
    particlePositions[i * 3 + 2] = -1.3 + Math.random() * 2.7;
    particlePhases[i] = Math.random() * Math.PI * 2;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0xb7b0ff, size: 0.026, transparent: true, opacity: 0.76, sizeAttenuation: true, depthWrite: false }));
  world.add(particles);

  let pointerX = 0, pointerY = 0, visible = true, elapsed = 0;
  const onPointerMove = (event) => {
    const rect = mount.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
    pointerY = ((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
  };
  const onPointerLeave = () => { pointerX = 0; pointerY = 0; };
  mount.addEventListener('pointermove', onPointerMove, { passive: true });
  mount.addEventListener('pointerleave', onPointerLeave, { passive: true });

  function resize() {
    const width = Math.max(1, mount.clientWidth);
    const height = Math.max(1, mount.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = width < 420 ? 11.8 : width < 700 ? 10.9 : 9.8;
    camera.updateProjectionMatrix();
    const scale = width < 420 ? 0.72 : width < 700 ? 0.83 : 1;
    world.scale.setScalar(scale);
  }
  window.addEventListener('resize', resize, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(mount);
  resize();

  const clock = new THREE.Clock();
  function animate() {
    const dt = Math.min(clock.getDelta(), 0.05);
    elapsed += dt;
    if (!reducedMotion) {
      orbitGroup.rotation.y += dt * 0.11;
      orbitGroup.rotation.z = Math.sin(elapsed * 0.24) * 0.12;
      ringA.rotation.x += dt * 0.025;
      ringB.rotation.y -= dt * 0.04;
      world.rotation.y += ((pointerX * 0.055) - world.rotation.y) * 0.035;
      world.rotation.x += ((-pointerY * 0.035) - world.rotation.x) * 0.035;
      floating.forEach(obj => {
        obj.position.y = obj.userData.baseY + Math.sin(elapsed * obj.userData.speed + obj.userData.phase) * 0.12;
        obj.rotation.y += dt * obj.userData.spin;
        obj.rotation.x += dt * obj.userData.spin * 0.42;
      });
      const attr = particleGeometry.getAttribute('position');
      for (let i = 0; i < particleCount; i++) {
        attr.array[i * 3 + 1] += Math.sin(elapsed * 0.55 + particlePhases[i]) * dt * 0.009;
      }
      attr.needsUpdate = true;
      particles.rotation.z = Math.sin(elapsed * 0.11) * 0.035;
      violetLight.position.x = -3.2 + Math.sin(elapsed * 0.5) * 0.35;
      cyanLight.position.y = -2 + Math.cos(elapsed * 0.38) * 0.45;
    }
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(() => { if (visible && !document.hidden) animate(); });
  const visibilityObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
  }, { rootMargin: '100px' }) : null;
  if (visibilityObserver) visibilityObserver.observe(mount);
  if (reducedMotion) { renderer.setAnimationLoop(null); animate(); }

  // Keep the WebGL allocations tidy if this script ever gets dynamically removed.
  window.addEventListener('pagehide', () => {
    renderer.setAnimationLoop(null);
    visibilityObserver?.disconnect();
    mount.removeEventListener('pointermove', onPointerMove);
    mount.removeEventListener('pointerleave', onPointerLeave);
    scene.traverse(obj => { obj.geometry?.dispose?.(); if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose?.()); else obj.material?.dispose?.(); });
    renderer.dispose();
  }, { once: true });
})();
