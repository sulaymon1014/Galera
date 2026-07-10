/* ==========================================
  HERO BACKGROUND VIDEO
========================================== */

/* ===== Video Sources ===== */
const isMobile = window.innerWidth <= 768;

const sources = isMobile
  ? [
      "Resources/Vids/Lylian & Yan Haiqin Hero BG Mobile.mp4"
    ]
  : [
      "Resources/Vids/Lylian & Yan Haiqin Hero BG Desktop.mp4"
    ];

/* ===== Hero Video Element ===== */
const heroVideo = document.querySelector(".hero-video");

/* ===== Load Selected Video ===== */
heroVideo.src = sources[0];
heroVideo.load();

/* ===== Play When Ready ===== */
heroVideo.oncanplay = () => {
    heroVideo.playbackRate = 1;
    heroVideo.play();
};

/* ==========================================
  HEADER
========================================== */

const header = document.getElementById("header");

/* ===== Scroll Opacity ===== */
let lastScroll = 0;

function updateHeader(){

  const currentScroll = window.scrollY;

  // Keep visible at the top
  if(currentScroll < 80){
    header.classList.remove("header-hidden");
    header.style.backgroundColor = "rgba(0,0,0,.9)";
    lastScroll = currentScroll;
    return;
  }

  const scrollingDown = currentScroll > lastScroll;
  const scrollingUp = currentScroll < lastScroll;

  if(scrollingDown){
    header.classList.add("header-hidden");
  }
  else if(scrollingUp){
    header.classList.remove("header-hidden");
  }

  lastScroll = currentScroll;
}

updateHeader();
window.addEventListener("scroll", updateHeader);

/* ===== Hamburger Menu ===== */
const hamburgerBtn = document.getElementById("hamburgerBtn");

// Toggle Hamburger Animation
hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
});

/* ==========================================
  HERO
========================================== */

/* ===== Login Button Glow ===== */
const buttons = document.querySelectorAll(".login-btn");

buttons.forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    let x = e.clientX - rect.left;

    // Prevent the glow from leaving the button too much
    x = Math.max(0, Math.min(rect.width -0, x));
    btn.style.setProperty("--glow-x", `${x}px`);
  });
});

/* ==========================================
  FEATURED
========================================== */

/* ===== Featured Background Video ===== */
const featuredVideo = document.querySelector(".featured-video");
featuredVideo.src = isMobile
  ? "Resources/Vids/Nizhan Future Featured Artists BG Mobile.mp4"
  : "Resources/Vids/Nizhan Future Featured Artists BG Desktop.mp4";
featuredVideo.load();

featuredVideo.oncanplay = () => {
  featuredVideo.playbackRate = 1.1;
  featuredVideo.play();
};


/* ==========================================
  POPULAR ARTISTS
========================================== */

/* ===== Artist Artwork Library ===== */
const artworks = {
  penguln322: [
    "Resources/Popular Artists/Penguln322/2.png",
    "Resources/Popular Artists/Penguln322/3.png",
    "Resources/Popular Artists/Penguln322/4.png",
    "Resources/Popular Artists/Penguln322/5.png",
    "Resources/Popular Artists/Penguln322/6.png",
  ],

  nizhan: [
    "Resources/Popular Artists/Nizhan/2.png",
    "Resources/Popular Artists/Nizhan/3.png",
    "Resources/Popular Artists/Nizhan/4.png",
    "Resources/Popular Artists/Nizhan/5.png",
    "Resources/Popular Artists/Nizhan/6.png",
  ],

  wlop: [
    "Resources/Popular Artists/WLOP/2.png",
    "Resources/Popular Artists/WLOP/3.png",
    "Resources/Popular Artists/WLOP/4.png",
    "Resources/Popular Artists/WLOP/5.png",
    "Resources/Popular Artists/WLOP/6.png",
  ],
  
  aeolian: [
    "Resources/Popular Artists/Aeolian/2.png",
    "Resources/Popular Artists/Aeolian/3.png",
    "Resources/Popular Artists/Aeolian/4.png",
    "Resources/Popular Artists/Aeolian/5.png",
    "Resources/Popular Artists/Aeolian/6.png",
  ],

  ghostblade: [
    "Resources/Popular Artists/Ghost Blade/2.png",
    "Resources/Popular Artists/Ghost Blade/3.png",
    "Resources/Popular Artists/Ghost Blade/4.png",
    "Resources/Popular Artists/Ghost Blade/5.png",
    "Resources/Popular Artists/Ghost Blade/6.png",
  ],

};

/* ===== Artwork Hover Slideshow ===== */
document.querySelectorAll(".artist-card").forEach(card => {
  const img = card.querySelector("img");
  const artist = img.dataset.artist;
  const images = artworks[artist];
  console.log("Artist:", artist);
  console.log("Images:", images);
  const firstImage = img.src;
  let interval;
  let index = -1;

  card.addEventListener("mouseenter", () => {
    interval = setInterval(() => {
      index++;
      if(index < images.length){
        img.src = images[index];
      }else{
        clearInterval(interval);
      }
    }, 250);
  });

  card.addEventListener("mouseleave", () => {
    clearInterval(interval);
    img.src = firstImage;
    index = 0;
  });

});

/* ==========================================
   ABOUT
========================================== */

(function() {
  const canvas = document.getElementById('cardWaveCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Exact image source paths pulled directly from your original HTML layout
  const imageURLs = [
    'Resources/Popular Artists/WLOP/5.png',
    'Resources/Popular Artists/Penguln322/3.png',
    'Resources/Popular Artists/Ghost Blade/6.png',
    'Resources/Popular Artists/Nizhan/4.png',
    'Resources/Popular Artists/Aeolian/5.png',
    'Resources/Popular Artists/WLOP/3.png',
    'Resources/Popular Artists/Ghost Blade/4.png',
    'Resources/Popular Artists/Penguln322/6.png',
    'Resources/Popular Artists/Nizhan/5.png',
    'Resources/Popular Artists/Aeolian/3.png'
  ];
  
  const images = [];
  let imagesLoaded = 0;

  // Handles sharp rendering on high-res / mobile retina displays
  function resize() {
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = 550 * window.devicePixelRatio; 
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  window.addEventListener('resize', resize);
  resize();

  // Load the gallery before firing up the loop
  imageURLs.forEach(url => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === imageURLs.length) {
        initWaveAnimation();
      }
    };
    images.push(img);
  });

  // Math config to closely replicate the flow seen in image_ad9aeb.png
  const wave = {
    amplitude: 75,     // Vertical peak height
    frequency: 0.0065, // Wave frequency width across the display
    yOffset: 260       // Center baseline position
  };

  function getWaveY(x) {
    return wave.yOffset + Math.sin(x * wave.frequency) * wave.amplitude + Math.cos(x * 0.0016) * 30;
  }

    // 3. Card settings for the ribbon effect
  let cards = [];
  const cardWidth = 110;   // Scaling width matching portrait card layouts
  const cardHeight = 165;  // Aspect ratio scale 
  
  // INCREASED CARD COUNT: Ensure there are enough cards to stretch past the screen boundaries
  const totalCards = 55;   
  const spacing = 50;      // Tight compression value to force heavy layering
  const speed = 1.3;       // Right-to-left animation drift speed

  function initWaveAnimation() {
    // 1. Calculate the starting position for the VERY FIRST card.
    // We position it just past the right edge of the screen so it's ready to fly in.
    const startingRightEdge = canvas.clientWidth + cardWidth;
    
    for (let i = 0; i < totalCards; i++) {
      // 2. By subtracting (i * spacing), we stack the cards backwards.
      // Card 0 starts on the far right, Card 1 is slightly to its left, Card 2 further left, etc.
      // This spreads them out completely across the screen instantly on first load.
      cards.push({
        x: startingRightEdge - (i * spacing),
        img: images[i % images.length] 
      });
    }
    animateWave();
  }

  function animateWave() {
    ctx.clearRect(0, 0, canvas.clientWidth, 550);

    cards.forEach(card => {
      card.x -= speed;

      // Loop point: places an exited card smoothly back into line position on the right
      // Loop point: places an exited card smoothly back into line position on the right
      if (card.x < -cardWidth * 2) {
        // 1. Calculate the exact length of a single wave cycle
        const waveLength = (Math.PI * 2) / wave.frequency;
        
        // 2. Find the current rightmost card
        let maxX = Math.max(...cards.map(c => c.x));
        
        // 3. Round the placement to the nearest perfect wave interval
        // This locks the cards to the exact same phase of the sine wave every single loop
        let targetX = maxX + spacing;
        let remainder = targetX % waveLength;
        card.x = targetX - remainder;
      }

      const y = getWaveY(card.x);

      // Tangent/slope adjustments for continuous matching curve rotation
      const deltaX = 5;
      const y2 = getWaveY(card.x + deltaX);
      const angle = Math.atan2(y2 - y, deltaX);

      ctx.save();
      
      // 1. Move the canvas origin to the card's position on the wave
      ctx.translate(card.x, y);
      
      // 2. STABLE WAVE TILT: Instead of using unstable slope math (deltaX/deltaY),
      // we calculate the tilt directly from a cosine wave. 
      // This ensures the cards tilt smoothly but CANNOT flip backward.
      const stableTilt = Math.cos(card.x * wave.frequency) * 0.25;
      ctx.rotate(stableTilt); 
      
      // 3. 3D ISOMETRIC PERSPECTIVE: Apply the fixed 3D slant matrix over the tilt
      ctx.transform(0.85, 0.20, 0, 0.95, 0, 0); 

      // 4. Render the image perfectly centered
      ctx.drawImage(card.img, -cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);
      
      ctx.restore();
    });

    requestAnimationFrame(animateWave);
  }
})();

/* ==========================================
  LOG IN/SIGN UP POP UP WINDOW
========================================== */

/* ======= AUTHENTICATION MODAL ENGINE ====== */

(function() {
  // 1. Target all structural interface triggers
  const loginBtn = document.getElementById('loginTrigger');
  const signupBtn = document.getElementById('signupTrigger');
  const closeBtn = document.getElementById('closeModalTrigger');
  const overlay = document.getElementById('authModalOverlay');

  if (!overlay || !closeBtn) return;

  // 2. Core action functions
  function openModal(e) {
    if (e) e.preventDefault(); // Prevents accidental page jumps if using <a> tags
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Locks background page scrolling
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restores window scroll
  }

  // 3. Event Listeners binding
  if (loginBtn) {
    loginBtn.addEventListener('click', openModal);
  }
  
  if (signupBtn) {
    signupBtn.addEventListener('click', openModal);
  }

  // Close triggers
  closeBtn.addEventListener('click', closeModal);
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Global ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
})();

/* 
const authOverlay = document.getElementById("authModalOverlay");

const emailOverlay = document.getElementById("emailAuthOverlay");

document.getElementById("emailAuthTrigger").onclick = () => {
    authOverlay.classList.remove("active");
    emailOverlay.classList.add("active");
};

document.getElementById("backToAuth").onclick = () => {
    emailOverlay.classList.remove("active");
    authOverlay.classList.add("active");
};

const loginPage = document.getElementById("loginPage");
const signupPage = document.getElementById("signupPage");

document.getElementById("showSignup").onclick = e => {
    e.preventDefault();
    loginPage.classList.remove("active");
    signupPage.classList.add("active");
};

document.getElementById("showLogin").onclick = e => {
    e.preventDefault();
    signupPage.classList.remove("active");
    loginPage.classList.add("active");
};
*/


/* ==========================================
   SUPPORT POP UP WINDOW
========================================== */

const supportOverlay = document.getElementById("supportOverlay");
const supportPopup = document.querySelector(".support-popup");
const supportTrigger = document.getElementById("my-support-trigger");
const supportClose = document.getElementById("close-popup");

const tabButtons = document.querySelectorAll(".tab-btn");
const pages = document.querySelectorAll(".support-page");
const indicator = document.querySelector(".tab-indicator");

supportTrigger.addEventListener("click", () => {
	supportOverlay.classList.add("active");
  document.body.classList.add("support-open");
});

supportClose.addEventListener("click", () => {
    supportOverlay.classList.remove("active");
    document.body.classList.remove("support-open");
});

supportOverlay.addEventListener("click", e => {

	if(e.target === supportOverlay){
    supportOverlay.classList.remove("active");
    document.body.classList.remove("support-open");
  }

});

tabButtons.forEach(button => {

	button.addEventListener("click", () => {
		tabButtons.forEach(btn => btn.classList.remove("active"));
		pages.forEach(page => page.classList.remove("active"));
		button.classList.add("active");

		document
			.getElementById(button.dataset.tab)
			.classList.add("active");
		moveIndicator(button);
	});
});

function moveIndicator(button){
	indicator.style.width = `${button.offsetWidth}px`;
	indicator.style.left = `${button.offsetLeft}px`;
}

window.addEventListener("load", () => {
	const active = document.querySelector(".tab-btn.active");
	moveIndicator(active);
});

window.addEventListener("resize", () => {
	const active = document.querySelector(".tab-btn.active");
	moveIndicator(active);
});



















if (typeof Lenis !== "undefined") {

const lenis = new Lenis({
    duration: 2.0,
    smoothWheel: true,
    wheelMultiplier: 0.65,
    touchMultiplier: 1.2,
    infinite: false
});

function raf(time){
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

}