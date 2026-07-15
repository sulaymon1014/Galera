/* ==========================================
   GALERA — POPULAR ARTISTS
   Artwork library and hover slideshow
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
