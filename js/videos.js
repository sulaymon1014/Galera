/* ==========================================
   GALERA — BACKGROUND VIDEOS
   Hero and Featured section videos, with lazy
   loading and pause-when-off-screen behavior
========================================== */

const isMobile = window.innerWidth <= 768;

/* Respect the OS "reduce motion" setting: load the first frame
   as a still instead of playing */
const prefersStill =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    if (prefersStill) return;
    heroVideo.playbackRate = 1;
    heroVideo.play();
};

/* ===== Pause When Scrolled Out of View ===== */
new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (prefersStill) return;
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

/* Two observers on purpose:
   - a wide one (200px margin) starts the download early so the video
     is ready before the user reaches it;
   - a tight one (0px) gates play/pause, so the featured video never
     DECODES while the hero still owns the screen. Decoding two videos
     at once is what melts mid-range phones. */
const featuredVideo = document.querySelector(".featured-video");
const featuredSrc = isMobile
  ? "Resources/Vids/Nizhan Future Featured Artists BG Mobile.mp4"
  : "Resources/Vids/Nizhan Future Featured Artists BG Desktop.mp4";

featuredVideo.preload = "none";

let featuredVisible = false;

featuredVideo.oncanplay = () => {
  featuredVideo.playbackRate = 1.1;
  // Covers the race where the section became visible before the
  // download finished
  if (featuredVisible && !prefersStill) {
    featuredVideo.play().catch(() => {});
  }
};

/* Download ahead of arrival */
const featuredLoader = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !featuredVideo.src) {
      featuredVideo.src = featuredSrc;
      featuredVideo.load();
      featuredLoader.disconnect();
    }
  });
}, { rootMargin: "200px" });
featuredLoader.observe(featuredVideo);

/* Play only while actually on screen */
new IntersectionObserver(entries => {
  entries.forEach(entry => {
    featuredVisible = entry.isIntersecting;
    if (prefersStill) return;
    if (featuredVisible && featuredVideo.src) {
      featuredVideo.play().catch(() => {});
    } else {
      featuredVideo.pause();
    }
  });
}).observe(featuredVideo);
