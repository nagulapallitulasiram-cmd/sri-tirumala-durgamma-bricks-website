/**
 * Sri Tirumala Durgamma Bricks - Core Interactive Logic
 * Technologies: GSAP, ScrollTrigger, Lenis Smooth Scroll, Leaflet Map, HTML5 Canvas
 */

document.addEventListener('DOMContentLoaded', () => {
  try { initLenis(); } catch (e) { console.error("Lenis init failed:", e); }
  try { initNavbarScroll(); } catch (e) { console.error("NavbarScroll init failed:", e); }
  try { initMobileMenu(); } catch (e) { console.error("MobileMenu init failed:", e); }
  try { initCustomCursor(); } catch (e) { console.error("CustomCursor init failed:", e); }
  try { initCanvasParticles(); } catch (e) { console.error("CanvasParticles init failed:", e); }
  try { initProcessScroll(); } catch (e) { console.error("ProcessScroll init failed:", e); }
  try { initProductInteractions(); } catch (e) { console.error("ProductInteractions init failed:", e); }
  try { initInteractive3DViewer(); } catch (e) { console.error("Interactive3DViewer init failed:", e); }
  try { initQualityCounters(); } catch (e) { console.error("QualityCounters init failed:", e); }
  try { initDarkMap(); } catch (e) { console.error("DarkMap init failed:", e); }
  try { initScrollAnimations(); } catch (e) { console.error("ScrollAnimations init failed:", e); }
  try { initThemeSwitcher(); } catch (e) { console.error("ThemeSwitcher init failed:", e); }
  try { initQuotationForm(); } catch (e) { console.error("QuotationForm init failed:", e); }
  try { initExpandableProjects(); } catch (e) { console.error("ExpandableProjects init failed:", e); }
  try { initReviewSubmission(); } catch (e) { console.error("ReviewSubmission init failed:", e); }
});

/* ==========================================================================
   1. Lenis Smooth Scroll Integration
   ========================================================================== */
let lenis;
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom exponential easing
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Hook Hero Scroll button (with null safety check)
  const heroScrollTrigger = document.getElementById('hero-scroll-trigger');
  if (heroScrollTrigger) {
    heroScrollTrigger.addEventListener('click', () => {
      lenis.scrollTo('#process', { offset: window.innerWidth > 768 ? -90 : -120 });
    });
  }

  // Hook navigation links
  document.querySelectorAll('.nav-links a, .logo, .btn-contact, .footer-links-col a, .footer-logo').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const offsetValue = (targetId === '#hero') ? 0 : (window.innerWidth > 768 ? -90 : -120);
        lenis.scrollTo(targetId, { offset: offsetValue });
      }
    });
  });
}

/* ==========================================================================
   1b. Navbar Scroll Transparency & Spacing (with Auto-Hide)
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector('.header');
  const navContainer = document.querySelector('.nav-container');

  function checkScroll() {
    const currentScrollY = window.scrollY;
    const heroHeight = window.innerHeight;

    // Show/hide header based on scroll position relative to Hero section (ONLY on desktop/laptop!)
    const navLinks = document.querySelector('.nav-links');
    const isMobileActive = navLinks && navLinks.classList.contains('active');
    const isMobileViewport = window.innerWidth <= 768;

    if (currentScrollY > heroHeight * 0.85 && !isMobileActive && !isMobileViewport) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }

    // Toggle scrolled glassmorphism class
    if (currentScrollY > 50) {
      navContainer.classList.add('scrolled');
    } else {
      navContainer.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
}

function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksList = document.querySelectorAll('.nav-links a');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });

    // Close menu when clicking a link
    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}



/* ==========================================================================
   2. Custom Fluid Cursor
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');

  let mouseX = 0, mouseY = 0; // Actual mouse position
  let cursorX = 0, cursorY = 0; // Current cursor position (lerped)
  let followerX = 0, followerY = 0; // Current follower position (lerped)

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Update positions inside RAF loop for butter-smooth movement
  function updateCursor() {
    // Lerp formulas: current = current + (target - current) * ease
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    followerX += (mouseX - followerX) * 0.08;
    followerY += (mouseY - followerY) * 0.08;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Highlight cursor on links, inputs, and custom interactive components
  const hoverElements = document.querySelectorAll('.interactive-hover, a, button, input, textarea, .gallery-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '45px';
      cursor.style.height = '45px';
      cursor.style.backgroundColor = 'rgba(224, 83, 60, 0.1)';
      cursor.style.mixBlendMode = 'normal';
      cursor.style.border = '1.5px solid #E0533C';
      
      follower.style.width = '65px';
      follower.style.height = '65px';
      follower.style.borderColor = '#ff6a50';
    });

    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursor.style.backgroundColor = '#E0533C';
      cursor.style.mixBlendMode = 'difference';
      cursor.style.border = 'none';

      follower.style.width = '40px';
      follower.style.height = '40px';
      follower.style.borderColor = 'rgba(224, 83, 60, 0.4)';
    });
  });
}

/* ==========================================================================
   3. Canvas Particle Engine (Ambient kiln ash & embers)
   ========================================================================== */
function initCanvasParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  // Dynamically calculate particle count based on screen area (Clamped between 15 and 50 particles)
  let maxParticles = Math.max(15, Math.min(50, Math.floor((width * height) / 30000)));

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    maxParticles = Math.max(15, Math.min(50, Math.floor((width * height) / 30000)));
  });

  const particles = [];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initiallyOnScreen = false) {
      this.x = Math.random() * width;
      this.y = initiallyOnScreen ? Math.random() * height : height + 20;
      this.size = Math.random() * 2.0 + 0.5; // Small size: 0.5px to 2.5px
      this.speedY = -(Math.random() * 0.3 + 0.15); // Slow upward float
      this.speedX = Math.random() * 0.1 - 0.05; // Gentle horizontal drift seed
      this.opacity = Math.random() * 0.35 + 0.1; // Low opacity: 0.1 to 0.45
      this.seed = Math.random() * 100;
      
      const darkColorOptions = [
        { r: 255, g: 111, b: 67 },  // Soft glowing orange
        { r: 255, g: 159, b: 67 },  // Amber/gold spark
        { r: 224, g: 83,  b: 60 },  // Terracotta flame red
        { r: 255, g: 169, b: 64 }   // Light orange ember
      ];
      
      const lightColorOptions = [
        { r: 216, g: 125, b: 96 },  // Softer warm orange
        { r: 200, g: 138, b: 88 },  // Warm amber brown
        { r: 176, g: 112, b: 80 },  // Clay brown
        { r: 226, g: 141, b: 114 }  // Dusty terracotta-peach
      ];
      
      const idx = Math.floor(Math.random() * darkColorOptions.length);
      this.darkBase = darkColorOptions[idx];
      this.lightBase = lightColorOptions[idx];
    }

    update(time) {
      this.y += this.speedY;
      // Gentle horizontal wave drift
      this.x += this.speedX + Math.sin(time * 0.4 + this.seed) * 0.12;

      // Wrap around horizontal margins
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;

      // Slow down slightly near the top
      if (this.y < height * 0.15) {
        this.y += this.speedY * 0.5;
      }

      // Reset when fully out of bounds
      if (this.y < -20) {
        this.reset();
      }
    }

    draw(ctx, isLight) {
      let r, g, b;
      let alphaCore, alphaGlow;
      let glowRadiusMultiplier;
      
      if (isLight) {
        // Light Theme: softer warm orange/light brown, reduced opacity & glow
        ({ r, g, b } = this.lightBase);
        alphaCore = this.opacity * 0.7; // slightly softer
        alphaGlow = this.opacity * 0.08;
        glowRadiusMultiplier = 1.6;
      } else {
        // Dark Theme: soft glowing orange/red embers
        ({ r, g, b } = this.darkBase);
        alphaCore = this.opacity;
        alphaGlow = this.opacity * 0.22;
        glowRadiusMultiplier = 2.4;
      }
      
      // 1. Draw outer glow circle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * glowRadiusMultiplier, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alphaGlow})`;
      ctx.fill();
      
      // 2. Draw inner core
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alphaCore})`;
      ctx.fill();
    }
  }

  // Populate particles dynamically based on maxParticles
  function adjustParticleCount() {
    while (particles.length < maxParticles) {
      particles.push(new Particle());
    }
    while (particles.length > maxParticles) {
      particles.pop();
    }
  }

  const startTime = Date.now();
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    const time = (Date.now() - startTime) * 0.001;
    
    // Check if light theme is active
    const isLight = document.documentElement.classList.contains('light-theme');

    adjustParticleCount();

    particles.forEach(p => {
      p.update(time);
      p.draw(ctx, isLight);
    });

    requestAnimationFrame(animate);
  }
  animate();
}



function initProcessScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const rows = document.querySelectorAll('.timeline-row');

  rows.forEach((row) => {
    const imageCol = row.querySelector('.timeline-image-col');
    const textCol = row.querySelector('.timeline-text-col');

    const isAlternate = row.classList.contains('alternate');
    const imageStart = isAlternate ? 80 : -80;
    const textStart = isAlternate ? -80 : 80;

    gsap.fromTo(imageCol, 
      { opacity: 0, x: imageStart },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1.2, 
        ease: 'power4.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(textCol, 
      { opacity: 0, x: textStart },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1.2, 
        ease: 'power4.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/* ==========================================================================
   6. Product Cards 3D Interactive Tilts
   ========================================================================== */
function initProductInteractions() {
  const wrappers = document.querySelectorAll('.product-visual-wrapper');

  wrappers.forEach(wrap => {
    const isAnimated = !!wrap.querySelector('.product-animated-container') || !!wrap.querySelector('.product-3d-scene');

    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse x position within element
      const y = e.clientY - rect.top;  // Mouse y position within element

      // Compute percentages for spot highlight styling
      const pctX = (x / rect.width) * 100;
      const pctY = (y / rect.height) * 100;
      wrap.style.setProperty('--mouse-x', `${pctX}%`);
      wrap.style.setProperty('--mouse-y', `${pctY}%`);

      if (!isAnimated) {
        // 3D rotations based on coordinate offset from center (only for static wrappers)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = (centerY - y) / 10;
        const tiltY = (x - centerX) / 10;
        wrap.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
      }
    });

    wrap.addEventListener('mouseleave', () => {
      if (!isAnimated) {
        wrap.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
      }
      wrap.style.setProperty('--mouse-x', '50%');
      wrap.style.setProperty('--mouse-y', '50%');
    });
  });
}

// Base64 N logo mask (128x128 pixel mask on white background)
const LOGO_MASK_BASE64 = 'data:image/png;base64,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';

function strokeRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.stroke();
}

function createProceduralClayCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // 1. Base clay color (dark terracotta red)
  ctx.fillStyle = '#8f3e27';
  ctx.fillRect(0, 0, width, height);
  
  // 2. Kiln firing gradients (organic color variations)
  const grad = ctx.createRadialGradient(
    width * 0.3, height * 0.4, 10,
    width * 0.5, height * 0.5, Math.max(width, height)
  );
  grad.addColorStop(0, '#a54e35'); // warm highlighted spot
  grad.addColorStop(0.5, '#853721'); // standard clay body
  grad.addColorStop(1, '#662615'); // dark toasted corners
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  
  // 3. Fine grain noise
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 22;
    data[i]     = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 0.9));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 0.8));
  }
  ctx.putImageData(imgData, 0, 0);
  
  // 4. Mineral aggregate specks (iron inclusions & quartz sand)
  const speckCount = Math.floor((width * height) / 100);
  for (let i = 0; i < speckCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 1.5 + 0.5;
    
    if (Math.random() < 0.75) {
      // Dark iron specks
      ctx.fillStyle = 'rgba(74, 24, 13, ' + (Math.random() * 0.45 + 0.1) + ')';
    } else {
      // Light sand grains
      ctx.fillStyle = 'rgba(235, 175, 150, ' + (Math.random() * 0.35 + 0.15) + ')';
    }
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // 5. Wire-cut texture stripes
  ctx.strokeStyle = 'rgba(74, 24, 13, 0.08)';
  ctx.lineWidth = 1.0;
  for (let y = 2; y < height; y += Math.random() * 4 + 2) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y + (Math.random() - 0.5) * 1.5);
    ctx.stroke();
  }
  
  // 6. Soft edge border shading to simulate rounded/chamfered edges in 3D
  ctx.strokeStyle = 'rgba(40, 10, 5, 0.3)';
  ctx.lineWidth = 6;
  strokeRoundedRect(ctx, 3, 3, width - 6, height - 6, 8);
  
  ctx.strokeStyle = 'rgba(40, 10, 5, 0.15)';
  ctx.lineWidth = 12;
  strokeRoundedRect(ctx, 6, 6, width - 12, height - 12, 12);
  
  return canvas;
}

function createFrontFaceTexture() {
  const canvas = createProceduralClayCanvas(768, 256);
  const texture = new THREE.CanvasTexture(canvas);
  
  const logoImg = new Image();
  logoImg.src = LOGO_MASK_BASE64;
  logoImg.onload = () => {
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    // Draw logo at correct scale (width 168, height 200) matching the reference photo
    ctx.drawImage(logoImg, 384 - 84, 128 - 100, 168, 200);
    ctx.restore();
    
    // Re-apply edge shadow strokes on top of the logo for engraving blending at the borders
    ctx.strokeStyle = 'rgba(40, 10, 5, 0.3)';
    ctx.lineWidth = 6;
    strokeRoundedRect(ctx, 3, 3, 768 - 6, 256 - 6, 8);
    
    ctx.strokeStyle = 'rgba(40, 10, 5, 0.15)';
    ctx.lineWidth = 12;
    strokeRoundedRect(ctx, 6, 6, 768 - 12, 256 - 12, 12);
    
    texture.needsUpdate = true;
  };
  
  return texture;
}

function initInteractive3DViewer() {
  const wrappers = document.querySelectorAll('.product-visual-wrapper');
  if (wrappers.length === 0) return;
  
  const isThreeLoaded = typeof THREE !== 'undefined';
  
  wrappers.forEach(wrap => {
    const scene = wrap.querySelector('.product-3d-scene');
    if (!scene) return;
    
    const brick = scene.querySelector('.product-3d-brick');
    if (!brick) return;
    
    let webglSuccess = false;
    
    if (isThreeLoaded) {
      try {
        const sizeType = scene.classList.contains('large-scene') ? 'large' : 'standard';
        
        const width = scene.clientWidth || 300;
        const height = scene.clientHeight || 300;
        
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.domElement.style.outline = 'none';
        renderer.domElement.style.display = 'block';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        
        const threeScene = new THREE.Scene();
        
        const aspect = width / height;
        const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
        
        // Dynamically scale cameraZ to keep brick occupying 70-80% of width
        let cameraZ = 4.4;
        if (aspect < 1.0) {
          cameraZ = 4.4 / aspect;
        }
        cameraZ = Math.max(3.5, Math.min(cameraZ, 5.8));
        camera.position.set(0, 0, cameraZ);
        
        // High visibility studio lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        threeScene.add(ambientLight);
        
        const dirLight1 = new THREE.DirectionalLight(0xfff2e0, 1.2);
        dirLight1.position.set(5, 8, 5);
        threeScene.add(dirLight1);
        
        const dirLight2 = new THREE.DirectionalLight(0xffecd1, 0.45);
        dirLight2.position.set(-5, -3, -5);
        threeScene.add(dirLight2);
        
        const pointLight = new THREE.PointLight(0xffffff, 0.35, 10);
        pointLight.position.set(0, 2, 2);
        threeScene.add(pointLight);
        
        // Setup raw clay materials
        const rawCanvas = createProceduralClayCanvas(512, 512);
        const rawTexture = new THREE.CanvasTexture(rawCanvas);
        const rawMaterial = new THREE.MeshStandardMaterial({
          map: rawTexture,
          roughness: 0.8,
          metalness: 0.1
        });
        
        // Front face material with N logo mask
        const logoTexture = createFrontFaceTexture();
        const logoMaterial = new THREE.MeshStandardMaterial({
          map: logoTexture,
          roughness: 0.8,
          metalness: 0.1
        });
        
        const materials = [
          rawMaterial,  // +X (Right)
          rawMaterial,  // -X (Left)
          rawMaterial,  // +Y (Top)
          rawMaterial,  // -Y (Bottom)
          logoMaterial, // +Z (Front)
          rawMaterial   // -Z (Back)
        ];
        
        // Use the exact same geometry (Large size) for both standard and large brick videos to match the reference image
        const geometry = new THREE.BoxGeometry(2.4, 0.8, 1.6);
        
        const brickMesh = new THREE.Mesh(geometry, materials);
        brickMesh.rotation.x = 0.22;
        brickMesh.rotation.y = -0.55;
        threeScene.add(brickMesh);
        
        const startTime = Date.now();
        
        function animate() {
          requestAnimationFrame(animate);
          const time = (Date.now() - startTime) * 0.0015;
          
          // Continuous 360 rotation around vertical Y axis
          brickMesh.rotation.y = -0.55 + time * 0.4;
          
          // Oscillate around X axis to show front, back, top (+Y), and bottom (-Y) faces
          // Baseline tilt is 0.2, oscillation is +-0.42 radians
          brickMesh.rotation.x = 0.22 + Math.sin(time * 0.35) * 0.35;
          
          // Subtle vertical float animation
          brickMesh.position.y = Math.sin(time * 0.7) * 0.06;
          
          renderer.render(threeScene, camera);
        }
        animate();
        
        // Setup ResizeObserver for responsive dimension scaling
        if (typeof ResizeObserver !== 'undefined') {
          const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
              const w = entry.contentRect.width || scene.clientWidth || 300;
              const h = entry.contentRect.height || scene.clientHeight || 300;
              
              camera.aspect = w / h;
              let camZ = 4.4;
              if (w / h < 1.0) {
                camZ = 4.4 / (w / h);
              }
              camera.position.z = Math.max(3.5, Math.min(camZ, 5.8));
              camera.updateProjectionMatrix();
              renderer.setSize(w, h);
            }
          });
          resizeObserver.observe(scene);
        } else {
          window.addEventListener('resize', () => {
            const w = scene.clientWidth || 300;
            const h = scene.clientHeight || 300;
            camera.aspect = w / h;
            
            let camZ = 4.4;
            if (w / h < 1.0) {
              camZ = 4.4 / (w / h);
            }
            camera.position.z = Math.max(3.5, Math.min(camZ, 5.8));
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
          });
        }
        
        // WebGL initialized successfully: hide the CSS 3D fallback brick
        brick.style.display = 'none';
        
        // Append canvas
        scene.appendChild(renderer.domElement);
        
        webglSuccess = true;
      } catch (e) {
        console.warn("WebGL runtime error, fallback to CSS 3D:", e);
      }
    }
    
    if (!webglSuccess) {
      initCSS3DViewerFallback(wrap, scene, brick);
    }
  });
}

function initCSS3DViewerFallback(wrap, scene, brick) {
  // Ensure the fallback brick is visible
  brick.style.display = 'block';
  
  // Create soft shadow element dynamically if it doesn't exist
  let shadow = wrap.querySelector('.product-3d-shadow');
  if (!shadow) {
    shadow = document.createElement('div');
    shadow.className = 'product-3d-shadow';
    scene.parentNode.insertBefore(shadow, scene.nextSibling);
  }
  
  // Stop any CSS transitions on the brick
  brick.style.transition = 'none';
  
  const startTime = Date.now();
  
  // Smooth auto-rotation loop mimicking WebGL
  function updateAnimation() {
    const time = (Date.now() - startTime) * 0.0015;
    
    // Continuous rotation Y in degrees (starts at 45deg, spins by 23deg per unit of time)
    const rotateY = 45 + time * 23; 
    
    // Oscillation on X axis in degrees to show all faces (starts at -12deg, oscillate +-20deg)
    const rotateX = -12 + Math.sin(time * 0.35) * 20;
    
    // Subtle float animation using a sine wave
    const floatOffset = Math.sin(time * 0.7) * 5;
    
    // Apply transforms
    brick.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${floatOffset}px)`;
    
    // Update shadow properties based on vertical position
    if (shadow) {
      const normFloat = (floatOffset + 5) / 10; // 0 to 1 range
      const shadowScale = 0.85 + normFloat * 0.3;
      const shadowOpacity = 0.75 - normFloat * 0.35;
      const shadowBlur = 4 + normFloat * 6;
      
      shadow.style.transform = `translateX(-50%) scale(${shadowScale})`;
      shadow.style.opacity = shadowOpacity;
      shadow.style.filter = `blur(${shadowBlur}px)`;
    }
    
    requestAnimationFrame(updateAnimation);
  }
  
  // Start RAF loop
  updateAnimation();
}

/* ==========================================================================
   7. Quality Metrics Numeric Counters
   ========================================================================== */
function initQualityCounters() {
  const numbers = document.querySelectorAll('.quality-number');

  numbers.forEach(num => {
    const target = parseFloat(num.getAttribute('data-target'));
    
    // Create ScrollTrigger to animate numbers on approach
    ScrollTrigger.create({
      trigger: num,
      start: 'top 85%',
      onEnter: () => {
        let count = 0;
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepTime = duration / steps;
        const increment = target / steps;

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            num.innerText = target;
            clearInterval(timer);
          } else {
            // Display decimal fraction for size consistency
            if (target === 99) {
              num.innerText = Math.floor(count);
            } else {
              num.innerText = Math.round(count);
            }
          }
        }, stepTime);
      },
      once: true // Counter runs only once for premium load presentation
    });
  });
}



/* ==========================================================================
   9. Dark Themed Leaflet Map Installation
   ========================================================================== */
function initDarkMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  // Using Chodavaram Mandal / Gandhavaram coordinates in Anakapalli District, AP
  const coords = [17.8368, 82.9463]; 
  
  const map = L.map('map', {
    center: coords,
    zoom: 13,
    scrollWheelZoom: false, // Prevent interrupting scroll triggers
    zoomControl: false
  });

  // Adding zoom buttons custom aligned
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Dark Map styling tiles provided by CartoDB
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Custom visual icon colored to match branding orange/clay
  const clayIcon = L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="background-color:#E0533C;width:14px;height:14px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 15px #E0533C;"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });

  L.marker(coords, { icon: clayIcon })
    .addTo(map)
    .bindPopup(`<strong style="color:#E0533C;font-family:'Space Grotesk',sans-serif;">Sri Tirumala Durgamma Bricks</strong><br><span style="color:#333;font-size:0.8rem;">Gandhavaram Village, Chodavaram Mandal, Anakapalli District, Andhra Pradesh - 531032</span>`)
    .openPopup();
}

/* ==========================================================================
   10. ScrollTrigger Animations for Generic Fades
   ========================================================================== */
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Nav link active class toggle timeline based on sections
  const sections = ['hero', 'about', 'process', 'products', 'projects', 'location'];
  
  sections.forEach(id => {
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top 40%',
      end: 'bottom 40%',
      onEnter: () => activateNavLink(`link-${id}`),
      onEnterBack: () => activateNavLink(`link-${id}`)
    });
  });

  function activateNavLink(navLinkId) {
    document.querySelectorAll('.nav-links a').forEach(link => {
      if (link.id === navLinkId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Fade-up animation modules
  const revealElements = document.querySelectorAll('.product-row, .gallery-item, .quality-card, .contact-card, .contact-form, .section-header');
  
  revealElements.forEach(el => {
    gsap.fromTo(el, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

/* ==========================================================================
   11. Light/Dark Theme Switcher Logic
   ========================================================================== */
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

/* ==========================================================================
   12. Quotation Form WhatsApp Integration
   ========================================================================== */
function initQuotationForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const location = document.getElementById('form-location').value.trim();
    const requirement = document.getElementById('form-requirement').value;
    const quantity = document.getElementById('form-quantity').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Validate 10-digit phone number format (digits only)
    const phoneReg = /^[0-9]{10}$/;
    if (!phoneReg.test(phone)) {
      alert('Please enter a valid 10-digit phone number (e.g., 9705959299).');
      return;
    }

    // Format WhatsApp message template
    const whatsappMsg = `New Quotation Request

Customer Name: ${name}
Phone Number: ${phone}
Location: ${location}
Brick Type: ${requirement}
Quantity Required: ${quantity}
Message: ${message}`;

    // Encode for safe URL transport
    const encodedMsg = encodeURIComponent(whatsappMsg);
    const whatsappUrl = `https://wa.me/919705959299?text=${encodedMsg}`;

    // Open WhatsApp in a new tab automatically
    window.open(whatsappUrl, '_blank');
  });
}

/* ==========================================================================
   13. Expandable Projects Grid
   ========================================================================== */
function initExpandableProjects() {
  const seeMoreBtn = document.getElementById('see-more-btn');
  if (!seeMoreBtn) return;

  const extraCards = document.querySelectorAll('.extra-project');
  let isExpanded = false;

  seeMoreBtn.addEventListener('click', () => {
    if (!isExpanded) {
      // Expand: Show all hidden project cards
      isExpanded = true;
      seeMoreBtn.textContent = 'Show Less';

      extraCards.forEach((card, index) => {
        // Remove display: none first
        card.classList.remove('card-hidden-display');
        // Force DOM reflow to make sure the transition triggers
        void card.offsetHeight;
        // Start fade-in and slide-up animation
        card.classList.remove('card-hidden');

        // Refresh ScrollTrigger once the reveal transitions are complete
        if (index === extraCards.length - 1) {
          const handleExpandTransitionEnd = (e) => {
            if (e.propertyName === 'opacity' || e.propertyName === 'transform') {
              if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
              }
              card.removeEventListener('transitionend', handleExpandTransitionEnd);
            }
          };
          card.addEventListener('transitionend', handleExpandTransitionEnd);
        }
      });

      // Quick layout recalculation for immediate triggers
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    } else {
      // Collapse: Hide the extra project cards
      isExpanded = false;
      seeMoreBtn.textContent = 'Show More Projects';

      // Scroll smoothly back to projects section
      if (lenis) {
        lenis.scrollTo('#projects', { offset: window.innerWidth > 768 ? -90 : -120 });
      } else {
        const projectsSec = document.getElementById('projects');
        if (projectsSec) {
          projectsSec.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Hide extra cards with smooth transition
      extraCards.forEach((card, index) => {
        // Start fade-out and slide-down animation
        card.classList.add('card-hidden');

        // Robust layout hide after transition duration (600ms)
        // This handles cases where transitions are optimized away by the browser due to scrolling out of view.
        setTimeout(() => {
          card.classList.add('card-hidden-display');
          
          // Recalculate scroll triggers once all cards are display: none
          if (index === extraCards.length - 1) {
            if (typeof ScrollTrigger !== 'undefined') {
              ScrollTrigger.refresh();
            }
          }
        }, 600);
      });
    }
  });
}

/* ==========================================================================
   14. Give Your Review Feature
   ========================================================================== */
const REVIEW_MODERATION = false;

function initReviewSubmission() {
  const form = document.getElementById('review-form');
  if (!form) return;

  const starSelects = document.querySelectorAll('.star-select');
  const ratingInput = document.getElementById('review-rating');
  const reviewsList = document.getElementById('submitted-reviews-list');
  const noReviewsMsg = document.getElementById('no-reviews-msg');

  // Collapsible Wrapper Toggle logic
  const toggleBtnWrapper = document.getElementById('review-toggle-wrapper');
  const toggleBtn = document.getElementById('btn-toggle-review-form');
  const closeBtn = document.getElementById('btn-close-review-form');
  const collapsibleWrapper = document.getElementById('collapsible-review-wrapper');

  if (toggleBtn && closeBtn && collapsibleWrapper) {
    toggleBtn.addEventListener('click', () => {
      // Hide toggle button wrapper
      toggleBtnWrapper.style.display = 'none';
      
      // Show collapsible form wrapper
      collapsibleWrapper.style.display = 'block';
      void collapsibleWrapper.offsetHeight; // Force reflow
      
      // Animate expansion
      collapsibleWrapper.style.maxHeight = collapsibleWrapper.scrollHeight + 'px';
      collapsibleWrapper.style.opacity = '1';
      
      setTimeout(() => {
        // Set to none after transition so messages can append without layout clipping
        collapsibleWrapper.style.maxHeight = 'none';
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 600);
    });

    closeBtn.addEventListener('click', () => {
      // Reset maxHeight to actual height first so transition animates down to 0
      collapsibleWrapper.style.maxHeight = collapsibleWrapper.scrollHeight + 'px';
      void collapsibleWrapper.offsetHeight; // Force reflow
      
      // Animate collapse
      collapsibleWrapper.style.maxHeight = '0';
      collapsibleWrapper.style.opacity = '0';
      
      setTimeout(() => {
        collapsibleWrapper.style.display = 'none';
        toggleBtnWrapper.style.display = 'flex';
        
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 600);
    });
  }

  // Clean up any reviews submitted by "Tulasi Ram"
  try {
    const storedReviews = JSON.parse(localStorage.getItem('bricks_customer_reviews')) || [];
    const filteredReviews = storedReviews.filter(r => r.name && r.name.trim().toLowerCase() !== 'tulasi ram');
    if (storedReviews.length !== filteredReviews.length) {
      localStorage.setItem('bricks_customer_reviews', JSON.stringify(filteredReviews));
    }
  } catch (e) {
    console.error("Clean-up of Tulasi Ram review failed:", e);
  }

  // Interactive Visual Star Rating Logic
  starSelects.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.getAttribute('data-value'));
      highlightStars(val, 'hover');
    });

    star.addEventListener('mouseleave', () => {
      clearHoverStars();
      const currentRating = parseInt(ratingInput.value) || 0;
      highlightStars(currentRating, 'active');
    });

    star.addEventListener('click', () => {
      const val = parseInt(star.getAttribute('data-value'));
      ratingInput.value = val;
      highlightStars(val, 'active');
    });
  });

  function highlightStars(count, className) {
    starSelects.forEach(star => {
      const val = parseInt(star.getAttribute('data-value'));
      if (val <= count) {
        star.classList.add(className);
      } else {
        star.classList.remove(className);
      }
    });
  }

  function clearHoverStars() {
    starSelects.forEach(star => {
      star.classList.remove('hover');
    });
  }

  // Load and Render Saved Reviews from LocalStorage
  function loadAndRenderReviews() {
    const reviews = JSON.parse(localStorage.getItem('bricks_customer_reviews')) || [];
    const approvedReviews = reviews.filter(r => r.approved);

    // Render to submit section reviews list
    if (reviewsList) {
      const cardElements = reviewsList.querySelectorAll('.review-card');
      cardElements.forEach(card => card.remove());

      if (approvedReviews.length === 0) {
        if (noReviewsMsg) noReviewsMsg.style.display = 'block';
      } else {
        if (noReviewsMsg) noReviewsMsg.style.display = 'none';
        
        approvedReviews.forEach(review => {
          const card = createReviewCardElement(review);
          reviewsList.appendChild(card);
        });
      }
    }
    
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }

  function createReviewCardElement(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    
    const formattedDate = new Date(review.date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create rating stars HTML string
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= review.rating) {
        starsHtml += '<span class="star-filled">★</span>';
      } else {
        starsHtml += '<span class="star-empty">★</span>';
      }
    }

    card.innerHTML = `
      <div class="review-card-header">
        <div class="review-card-author-info">
          <span class="review-card-author">${escapeHTML(review.name)}</span>
          <span class="review-card-date">${formattedDate}</span>
        </div>
        <div class="review-card-rating" title="${review.rating} out of 5 stars">${starsHtml}</div>
      </div>
      <p class="review-card-message">${escapeHTML(review.message).replace(/\n/g, '<br>')}</p>
    `;
    return card;
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initial Load
  loadAndRenderReviews();

  // Form Submission Logic
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('review-name');
    const messageInput = document.getElementById('review-message');

    const name = nameInput.value.trim();
    const rating = parseInt(ratingInput.value);
    const message = messageInput.value.trim();

    if (!name) {
      alert('Please enter your name.');
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      alert('Please select a star rating between 1 and 5 stars by clicking on the stars.');
      return;
    }

    if (!message) {
      alert('Please enter your review message.');
      return;
    }

    // Save to LocalStorage
    const reviews = JSON.parse(localStorage.getItem('bricks_customer_reviews')) || [];
    
    const newReview = {
      id: 'rev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      name: name,
      rating: rating,
      message: message,
      date: new Date().toISOString(),
      approved: !REVIEW_MODERATION
    };

    // Prepend new review to the array
    reviews.unshift(newReview);
    localStorage.setItem('bricks_customer_reviews', JSON.stringify(reviews));

    // Form Reset
    form.reset();
    ratingInput.value = '';
    highlightStars(0, 'active');

    // Display confirmation
    const successMsg = document.createElement('div');
    successMsg.style.gridColumn = 'span 2';
    successMsg.style.padding = '14px 20px';
    successMsg.style.borderRadius = '10px';
    successMsg.style.fontSize = '0.95rem';
    successMsg.style.fontFamily = 'var(--font-heading)';
    successMsg.style.fontWeight = '500';
    successMsg.style.marginTop = '15px';
    successMsg.style.animation = 'reviewFadeInSlideUp 0.4s ease forwards';

    if (REVIEW_MODERATION) {
      successMsg.style.backgroundColor = 'rgba(255, 184, 0, 0.1)';
      successMsg.style.border = '1px solid rgba(255, 184, 0, 0.3)';
      successMsg.style.color = '#ffb800';
      successMsg.textContent = 'Thank you! Your review has been submitted and is pending moderation.';
    } else {
      successMsg.style.backgroundColor = 'rgba(37, 211, 102, 0.1)';
      successMsg.style.border = '1px solid rgba(37, 211, 102, 0.3)';
      successMsg.style.color = '#25d366';
      successMsg.textContent = 'Thank you! Your review has been submitted successfully.';
    }

    form.appendChild(successMsg);

    // Remove the message after 5 seconds
    setTimeout(() => {
      successMsg.style.opacity = '0';
      successMsg.style.transform = 'translateY(-10px)';
      successMsg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      setTimeout(() => successMsg.remove(), 400);
    }, 5000);

    // Re-render reviews
    loadAndRenderReviews();
  });
}



