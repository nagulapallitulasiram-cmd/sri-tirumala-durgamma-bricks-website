# Load Base64 mask string
$base64 = Get-Content -Path "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\scratch\logo_mask_base64.txt" -Raw
$base64 = $base64.Trim()

# Define the new viewer code block
$newFunc = @"
// Base64 N logo mask (128x128 pixel mask on white background)
const LOGO_MASK_BASE64 = 'data:image/png;base64,$base64';

function createProceduralClayCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Base terracotta color
  ctx.fillStyle = '#B04835';
  ctx.fillRect(0, 0, width, height);
  
  // Shading gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#C45741');
  grad.addColorStop(1, '#8C3423');
  ctx.fillStyle = grad;
  ctx.globalAlpha = 0.55;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1.0;
  
  // Clay noise grain simulation
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 18;
    data[i]     = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 0.95));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 0.85));
  }
  ctx.putImageData(imgData, 0, 0);
  
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
    // Draw 128x128 logo centered in 768x256 stretch canvas
    ctx.drawImage(logoImg, 384 - 64, 128 - 64, 128, 128);
    ctx.restore();
    texture.needsUpdate = true;
  };
  
  return texture;
}

function initInteractive3DViewer() {
  const wrappers = document.querySelectorAll('.product-visual-wrapper');
  if (wrappers.length === 0) return;
  
  const isThreeLoaded = typeof THREE !== 'undefined' && typeof THREE.OrbitControls !== 'undefined';
  
  wrappers.forEach(wrap => {
    const scene = wrap.querySelector('.product-3d-scene');
    if (!scene) return;
    
    const brick = scene.querySelector('.product-3d-brick');
    if (!brick) return;
    
    let webglSuccess = false;
    
    if (isThreeLoaded) {
      try {
        // Clear fallback CSS 3D elements
        scene.innerHTML = '';
        
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
        scene.appendChild(renderer.domElement);
        
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
        threeScene.add(ambientLight);
        
        const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
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
        
        let geometry;
        if (sizeType === 'large') {
          geometry = new THREE.BoxGeometry(2.4, 0.8, 1.6);
        } else {
          geometry = new THREE.BoxGeometry(2.4, 0.8, 1.07);
        }
        
        const brickMesh = new THREE.Mesh(geometry, materials);
        brickMesh.rotation.x = 0.22;
        brickMesh.rotation.y = -0.55;
        threeScene.add(brickMesh);
        
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = false; // Disable autoplay
        
        controls.minPolarAngle = Math.PI / 3;
        controls.maxPolarAngle = 2 * Math.PI / 3;
        
        const startTime = Date.now();
        
        function animate() {
          requestAnimationFrame(animate);
          const time = (Date.now() - startTime) * 0.0015;
          brickMesh.position.y = Math.sin(time) * 0.06;
          controls.update();
          renderer.render(threeScene, camera);
        }
        animate();
        
        window.addEventListener('resize', () => {
          const w = scene.clientWidth;
          const h = scene.clientHeight;
          camera.aspect = w / h;
          
          let camZ = 4.4;
          if (w / h < 1.0) {
            camZ = 4.4 / (w / h);
          }
          camera.position.z = Math.max(3.5, Math.min(camZ, 5.8));
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        });
        
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
"@

# Read app.js content
$appJsPath = "c:\Users\Tulasi Ram\OneDrive\Documents\Desktop\Bricks\app.js"
$content = Get-Content -Path $appJsPath -Raw

# Replace the viewer function using the anchors
$anchorStart = "function initInteractive3DViewer() {"
$anchorEnd = "function initCSS3DViewerFallback(wrap, scene, brick) {"

$startIndex = $content.IndexOf($anchorStart)
$endIndex = $content.IndexOf($anchorEnd)

if ($startIndex -ge 0 -and $endIndex -gt $startIndex) {
    $before = $content.Substring(0, $startIndex)
    $after = $content.Substring($endIndex)
    
    $newContent = $before + $newFunc + "`r`n`r`n" + $after
    
    # Save the updated file
    Set-Content -Path $appJsPath -Value $newContent -NoNewline
    Write-Output "Successfully updated app.js!"
} else {
    Write-Output "Error: Anchors not found in app.js. startIndex=$startIndex, endIndex=$endIndex"
}
