/* ==========================================
   GALERA — POPULAR ARTISTS
   Artwork library and hover slideshow
========================================== */

/* ===== Artist Artwork Library =====
   Uses the downscaled copies in "Popular Artists Small" —
   the cards never render larger than ~460px, so the full-res
   originals only waste bandwidth and decode time. */
const artworks = {
  penguln322: [
    "Resources/Popular Artists Small/Penguln322/2.jpg",
    "Resources/Popular Artists Small/Penguln322/3.jpg",
    "Resources/Popular Artists Small/Penguln322/4.jpg",
    "Resources/Popular Artists Small/Penguln322/5.jpg",
    "Resources/Popular Artists Small/Penguln322/6.jpg",
  ],

  nizhan: [
    "Resources/Popular Artists Small/Nizhan/2.jpg",
    "Resources/Popular Artists Small/Nizhan/3.jpg",
    "Resources/Popular Artists Small/Nizhan/4.jpg",
    "Resources/Popular Artists Small/Nizhan/5.jpg",
    "Resources/Popular Artists Small/Nizhan/6.jpg",
  ],

  wlop: [
    "Resources/Popular Artists Small/WLOP/2.jpg",
    "Resources/Popular Artists Small/WLOP/3.jpg",
    "Resources/Popular Artists Small/WLOP/4.jpg",
    "Resources/Popular Artists Small/WLOP/5.jpg",
    "Resources/Popular Artists Small/WLOP/6.jpg",
  ],

  aeolian: [
    "Resources/Popular Artists Small/Aeolian/2.jpg",
    "Resources/Popular Artists Small/Aeolian/3.jpg",
    "Resources/Popular Artists Small/Aeolian/4.jpg",
    "Resources/Popular Artists Small/Aeolian/5.jpg",
    "Resources/Popular Artists Small/Aeolian/6.jpg",
  ],

  ghostblade: [
    "Resources/Popular Artists Small/Ghost Blade/2.jpg",
    "Resources/Popular Artists Small/Ghost Blade/3.jpg",
    "Resources/Popular Artists Small/Ghost Blade/4.jpg",
    "Resources/Popular Artists Small/Ghost Blade/5.jpg",
    "Resources/Popular Artists Small/Ghost Blade/6.jpg",
  ],
};

/* ===== Artwork Hover Slideshow ===== */
document.querySelectorAll(".artist-card").forEach(card => {
  const img = card.querySelector("img");
  const artist = img.dataset.artist;
  const images = artworks[artist];
  if (!images) return;
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
    index = -1;
  });
});
