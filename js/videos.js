/* ==========================================
   GALERA — BACKGROUND VIDEOS
   Hero and Featured section videos, with lazy
   loading and pause-when-off-screen behavior
========================================== */

const isMobile = window.innerWidth <= 768;

/* ==========================================
  HERO BACKGROUND VIDEO
========================================== */

const heroVideo = document.querySelector(".hero-video");

/* ===== Load Selected Video ===== */
heroVideo.src = isMobile
  ? "Resources/Vids/Lylian & Yan Haiqin Hero BG Mobile.mp4"
  : "Resources/Vids/Lylian & Yan Haiqin Hero BG Desktop.mp4";
heroVideo.load();

/* ===== Play When Ready ===== */
heroVideo.oncanplay = () => {
    heroVideo.playbackRate = 1;
    heroVideo.play();
};

/* ===== Pause When Scrolled Out of View ===== */
new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      heroVideo.play().catch(() => {});
    } else {
      heroVideo.pause();
    }
  });
}).observe(heroVideo);

/* ==========================================
  FEATURED BACKGROUND VIDEO (lazy)
========================================== */

/* The video is only downloaded once the section approaches
   the viewport, and it pauses whenever it scrolls out of view. */
const featuredVideo = document.querySelector(".featured-video");
const featuredSrc = isMobile
  ? "Resources/Vids/Nizhan Future Featured Artists BG Mobile.mp4"
  : "Resources/Vids/Nizhan Future Featured Artists BG Desktop.mp4";

featuredVideo.oncanplay = () => {
  featuredVideo.playbackRate = 1.1;
};

new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!featuredVideo.src) {
        featuredVideo.src = featuredSrc;
        featuredVideo.load();
      }
      featuredVideo.play().catch(() => {});
    } else {
      featuredVideo.pause();
    }
  });
}, { rootMargin: "200px" }).observe(featuredVideo);
