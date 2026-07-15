/* ==========================================
   GALERA — HEADER & MOBILE MENU
   Viewport height helper, header hide-on-scroll,
   hamburger menu, optional Lenis smooth scrolling
========================================== */

/* ==========================================
   MOBILE INITIAL VIEWPORT HEIGHT
========================================== */

// Save the initial visible browser height.
// This value does NOT change when the browser
// address bar hides while scrolling.

if (window.innerWidth <= 768) {
    document.documentElement.style.setProperty(
        "--initial-vh",
        `${window.innerHeight}px`
    );
}

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
const mobileMenu = document.querySelector(".mobile-menu");
const supportFab = document.querySelector(".support-fab");

// Toggle Mobile Menu
function toggleMenu(open) {
  hamburgerBtn.classList.toggle("active", open);
  mobileMenu.classList.toggle("active", open);
  header.classList.toggle("menu-open", open);
  document.body.classList.toggle("menu-open", open);
  if (supportFab) {
    supportFab.classList.toggle("menu-open", open);
  }
}

hamburgerBtn.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("active");
  toggleMenu(isOpen);
});

// Close Menu After Clicking a Link
document.querySelectorAll(".menu-item, .nav-item").forEach(link => {
  link.addEventListener("click", () => {
    toggleMenu(false);
  });
});

// Close on backdrop click
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) toggleMenu(false);
});

// ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
    toggleMenu(false);
  }
});

/* ==========================================
   LENIS SMOOTH SCROLLING (optional)
   Runs only if the Lenis library is included on the page
========================================== */

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
