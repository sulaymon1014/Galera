/* ==========================================
   GALERA — ABOUT "ART RIVER" WAVE
   Canvas ribbon of artwork cards drifting along
   a sine wave. Lazy-loads its images and only
   animates while the canvas is near the viewport.
========================================== */

(function() {
  const canvas = document.getElementById('cardWaveCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Reduced motion: render the ribbon once as a still image
  const prefersStill =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const imageURLs = [
    'Resources/Popular Artists Small/WLOP/5.jpg',
    'Resources/Popular Artists Small/Penguln322/3.jpg',
    'Resources/Popular Artists Small/Ghost Blade/6.jpg',
    'Resources/Popular Artists Small/Nizhan/4.jpg',
    'Resources/Popular Artists Small/Aeolian/5.jpg',
    'Resources/Popular Artists Small/WLOP/3.jpg',
    'Resources/Popular Artists Small/Ghost Blade/4.jpg',
    'Resources/Popular Artists Small/Penguln322/6.jpg',
    'Resources/Popular Artists Small/Nizhan/5.jpg',
    'Resources/Popular Artists Small/Aeolian/3.jpg'
  ];

  const images = [];
  let imagesLoaded = 0;
  let imagesRequested = false;
  let cardsReady = false;
  let waveVisible = false;
  let waveRunning = false;

  // Wave math config
  const wave = {
    amplitude: 75,     // Vertical peak height
    frequency: 0.0065, // Wave frequency width across the display
    yOffset: 260       // Center baseline position
  };

  // Card settings for the ribbon effect
  let cards = [];
  const cardWidth = 110;   // Scaling width matching portrait card layouts
  const cardHeight = 165;  // Aspect ratio scale
  const spacing = 50;      // Tight compression value to force heavy layering
  const speed = 1.3;       // Right-to-left animation drift speed

  // Only as many cards as the ribbon actually needs to span this canvas
  // (plus wrap-around slack). The old fixed 55 was sized for wide desktops
  // and made phones draw 3x more cards than their screen could show.
  function cardCountFor(width) {
    return Math.ceil((width + cardWidth * 4) / spacing);
  }

  // Handles sharp rendering on high-res / mobile retina displays.
  // Reads the CSS height so the wave stays centered when the canvas
  // shrinks on mobile/tablet.
  function resize() {
    // clientWidth can be 0 while the section is skipped by
    // content-visibility; initWaveAnimation re-measures before starting
    if (!canvas.clientWidth) return;

    // Cap pixel density: extra device pixels quadruple the fill work
    // for no visible gain on a constantly moving canvas
    const dpr = Math.min(window.devicePixelRatio, window.innerWidth <= 768 ? 1.5 : 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);
    wave.yOffset = canvas.clientHeight / 2;
    wave.amplitude = Math.min(75, canvas.clientHeight * 0.14);
  }
  window.addEventListener('resize', resize);
  resize();

  // Load the gallery before firing up the loop
  function loadImages() {
    if (imagesRequested) return;
    imagesRequested = true;

    imageURLs.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        // Pre-scale once to draw size (2x for sharpness) so the
        // animation loop never rescales the source bitmap per frame
        const off = document.createElement('canvas');
        off.width = cardWidth * 2;
        off.height = cardHeight * 2;
        off.getContext('2d').drawImage(img, 0, 0, off.width, off.height);
        images[i] = off;

        imagesLoaded++;
        if (imagesLoaded === imageURLs.length) {
          initWaveAnimation();
        }
      };
    });
  }

  // Lazy: download artwork and run the animation only while
  // the canvas is near the viewport. Margin kept tight so the loop
  // doesn't burn CPU while the user is still a whole section above.
  new IntersectionObserver(entries => {
    waveVisible = entries[0].isIntersecting;
    if (waveVisible) {
      loadImages();
      startWave();
    }
  }, { rootMargin: "120px" }).observe(canvas);

  function startWave() {
    if (!cardsReady || waveRunning) return;
    waveRunning = true;
    requestAnimationFrame(animateWave);
  }

  function getWaveY(x) {
    return wave.yOffset + Math.sin(x * wave.frequency) * wave.amplitude + Math.cos(x * 0.0016) * 30;
  }

  function initWaveAnimation() {
    // The section may have been display-skipped (content-visibility)
    // when resize() first ran; by now it is near the viewport, so
    // re-measure before building the ribbon
    resize();

    // Position the first card just past the right edge of the screen,
    // then stack the rest backwards (i * spacing) so the ribbon spans
    // the whole canvas instantly on first load.
    const startingRightEdge = canvas.clientWidth + cardWidth;
    const totalCards = cardCountFor(canvas.clientWidth);

    for (let i = 0; i < totalCards; i++) {
      cards.push({
        x: startingRightEdge - (i * spacing),
        img: images[i % images.length]
      });
    }
    cardsReady = true;
    startWave();
  }

  function animateWave() {
    // Stop the loop while the canvas is off screen; the
    // IntersectionObserver restarts it when it comes back
    if (!waveVisible) {
      waveRunning = false;
      return;
    }

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    cards.forEach(card => {
      card.x -= speed;

      // Loop point: places an exited card smoothly back into line position
      // on the right, locked to the same phase of the sine wave every loop
      if (card.x < -cardWidth * 2) {
        const waveLength = (Math.PI * 2) / wave.frequency;
        const maxX = Math.max(...cards.map(c => c.x));
        const targetX = maxX + spacing;
        card.x = targetX - (targetX % waveLength);
      }

      const y = getWaveY(card.x);

      ctx.save();

      // 1. Move the canvas origin to the card's position on the wave
      ctx.translate(card.x, y);

      // 2. STABLE WAVE TILT: calculated directly from a cosine wave so the
      // cards tilt smoothly but cannot flip backward
      const stableTilt = Math.cos(card.x * wave.frequency) * 0.25;
      ctx.rotate(stableTilt);

      // 3. 3D ISOMETRIC PERSPECTIVE: fixed 3D slant matrix over the tilt
      ctx.transform(0.85, 0.20, 0, 0.95, 0, 0);

      // 4. Render the image perfectly centered
      ctx.drawImage(card.img, -cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);

      ctx.restore();
    });

    if (prefersStill) {
      waveRunning = false;
      return;
    }

    requestAnimationFrame(animateWave);
  }
})();
