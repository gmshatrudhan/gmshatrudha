/* ==========================================================================
   STUDYVERSE — 3D HERO SCENE (Three.js r128)
   A floating "study constellation": wireframe geometry + particles,
   gently reactive to the mouse. Falls back gracefully if WebGL is missing.
   ========================================================================== */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // Respect users who prefer reduced motion — render one static frame instead.
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    return; // no WebGL → the CSS glow background still looks great
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05080f, 0.028);

  const camera = new THREE.PerspectiveCamera(
    58,
    canvas.clientWidth / Math.max(canvas.clientHeight, 1),
    0.1,
    100
  );
  camera.position.set(0, 0, 13);

  /* ------------------------------ Lights -------------------------------- */
  const ambient = new THREE.AmbientLight(0x8899bb, 0.9);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xa78bfa, 0.9);
  rim.position.set(-5, -2, 4);
  scene.add(rim);

  /* ------------------------------ Group --------------------------------- */
  const group = new THREE.Group();
  scene.add(group);

  const colors = [0x22d3ee, 0xa78bfa, 0x818cf8, 0xf472b6, 0x4ade80, 0xfbbf24];

  /* Wireframe crystal cluster */
  const solids = [];
  const solidGeos = [
    new THREE.IcosahedronGeometry(1.5, 1),
    new THREE.OctahedronGeometry(1.25, 0),
    new THREE.TetrahedronGeometry(1.15, 0),
    new THREE.TorusKnotGeometry(0.72, 0.26, 110, 16),
    new THREE.DodecahedronGeometry(1.05, 0)
  ];
  const solidMats = [
    new THREE.MeshStandardMaterial({ color: 0x22d3ee, wireframe: true, roughness: 0.4, metalness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0xa78bfa, wireframe: true, roughness: 0.4, metalness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0xf472b6, wireframe: true, roughness: 0.4, metalness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0x818cf8, wireframe: true, roughness: 0.4, metalness: 0.3 }),
    new THREE.MeshStandardMaterial({ color: 0x4ade80, wireframe: true, roughness: 0.4, metalness: 0.3 })
  ];
  const solidMeta = [
    { x: -4.4, y: 0.9,  s: 1.15, spin: 0.22, tilt: 0.5 },
    { x: 4.3,  y: 1.1,  s: 0.95, spin: -0.18, tilt: -0.4 },
    { x: 5.6,  y: -1.3, s: 0.85, spin: 0.3,  tilt: 0.3 },
    { x: -5.2, y: -1.6, s: 0.8,  spin: -0.26, tilt: -0.25 },
    { x: 0.2,  y: -2.4, s: 0.9,  spin: 0.16, tilt: 0.15 }
  ];
  solidGeos.forEach((geo, i) => {
    const mesh = new THREE.Mesh(geo, solidMats[i]);
    const m = solidMeta[i];
    mesh.position.set(m.x, m.y, -2.5 + Math.random() * 1.5);
    mesh.scale.setScalar(m.s);
    mesh.rotation.set(m.tilt, Math.random() * Math.PI, m.tilt * 0.4);
    group.add(mesh);
    solids.push({ mesh, meta: m });
  });

  /* Soft glow core behind the title */
  const glowGeo = new THREE.IcosahedronGeometry(1.1, 3);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x3b5bdb,
    transparent: true,
    opacity: 0.5,
    depthWrite: false
  });
  const glowCore = new THREE.Mesh(glowGeo, glowMat);
  glowCore.position.set(0, 0.4, -4);
  scene.add(glowCore);

  /* Twinkling particles */
  let points;
  const PARTICLE_COUNT = 520;
  {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x9fd6ff,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    points = new THREE.Points(geo, mat);
    scene.add(points);
  }

  /* ------------------------------ Sizing -------------------------------- */
  function resize() {
    const w = canvas.clientWidth;
    const h = Math.max(canvas.clientHeight, 1);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  /* --------------------------- Mouse tracking --------------------------- */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  /* --------------------------- Render loop ------------------------------ */
  const clock = new THREE.Clock();
  let visible = true;

  // Only animate while the hero is on screen (saves battery).
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    });
    io.observe(canvas);
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!visible) return;

    const t = clock.getElapsedTime();

    // Smooth mouse easing
    mouse.x += (mouse.tx - mouse.x) * 0.045;
    mouse.y += (mouse.ty - mouse.y) * 0.045;

    camera.position.x += (mouse.x * 1.4 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.y * 0.9 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, -2);

    // Spin solids + gentle bob
    solids.forEach((s, i) => {
      s.mesh.rotation.x += s.meta.spin * 0.012;
      s.mesh.rotation.y += s.meta.spin * 0.018;
      s.mesh.position.y += Math.sin(t * 0.6 + i * 1.7) * 0.0016;
    });

    glowCore.rotation.y += 0.004;
    glowCore.scale.setScalar(1 + Math.sin(t * 1.4) * 0.06);
    glowCore.material.opacity = 0.42 + Math.sin(t * 1.2) * 0.12;

    points.rotation.y += 0.0012;
    points.rotation.x = Math.sin(t * 0.1) * 0.05;

    renderer.render(scene, camera);
  }

  if (REDUCED_MOTION) {
    renderer.render(scene, camera); // single static frame
  } else {
    animate();
  }
})();
