/* ==========================================
   GALERA — OVERLAYS
   Auth (Join Galera) modal, login button glow,
   support popup window and its tabs
========================================== */

/* ======= AUTHENTICATION MODAL ENGINE ====== */

(function() {
  const joinGaleraBtn = document.getElementById("joinGaleraBtn");
  const mobileJoinGaleraBtn = document.getElementById("mobileJoinGaleraBtn");

  const closeBtn = document.getElementById("closeModalTrigger");
  const overlay = document.getElementById("authModalOverlay");

  function openModal(e){
      if(e) e.preventDefault();
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";

      if (typeof toggleMenu === "function") {
          toggleMenu(false);
      }
  }

  function closeModal(){
      overlay.classList.remove("active");
      document.body.style.overflow = "";
  }

  joinGaleraBtn?.addEventListener("click", openModal);
  mobileJoinGaleraBtn?.addEventListener("click", openModal);

  closeBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", e => {
      if(e.target === overlay){
          closeModal();
      }
  });

  document.addEventListener("keydown", e => {
      if(e.key === "Escape"){
          closeModal();
      }
  });
})();

/* ===== Login Button Glow =====
   (no .login-btn in the DOM yet — kept for the planned login button,
   pairs with the .login-btn hotspot styles in css/sections.css) */
document.querySelectorAll(".login-btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    let x = e.clientX - rect.left;

    // Prevent the glow from leaving the button too much
    x = Math.max(0, Math.min(rect.width, x));
    btn.style.setProperty("--glow-x", `${x}px`);
  });
});

/* ==========================================
   SUPPORT POPUP WINDOW
========================================== */

const supportOverlay = document.getElementById("supportOverlay");
const supportTrigger = document.getElementById("my-support-trigger");
const supportClose = document.getElementById("close-popup");

const tabButtons = document.querySelectorAll(".tab-btn");
const pages = document.querySelectorAll(".support-page");
const indicator = document.querySelector(".tab-indicator");

function openSupport(){
  supportOverlay.classList.add("active");
  document.body.classList.add("support-open");
}

function closeSupport(){
  supportOverlay.classList.remove("active");
  document.body.classList.remove("support-open");
}

supportTrigger.addEventListener("click", openSupport);
supportClose.addEventListener("click", closeSupport);

supportOverlay.addEventListener("click", e => {
  if(e.target === supportOverlay){
    closeSupport();
  }
});

/* ===== Tabs ===== */

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
  moveIndicator(document.querySelector(".tab-btn.active"));
});

window.addEventListener("resize", () => {
  moveIndicator(document.querySelector(".tab-btn.active"));
});
