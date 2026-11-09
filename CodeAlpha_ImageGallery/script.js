/**
 * CodeAlpha Frontend Internship — Task 1: Interactive Image Gallery
 * Dynamic Gallery Rendering, Category Filtering, Live Search & Accessible Lightbox
 */

// Curated high-resolution image dataset across diverse categories
const galleryData = [
  {
    id: 1,
    title: "Misty Alpine Peaks",
    category: "nature",
    description: "Dramatic sunrise illumination over snow-dusted alpine ridge lines with lingering morning fog.",
    author: "Luca Bravo",
    tags: ["mountains", "fog", "sunrise", "alps", "hiking"],
    thumb: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    full: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85"
  },
  {
    id: 2,
    title: "Cyberpunk Metropolis",
    category: "architecture",
    description: "Sleek geometric glass skyscraper piercing twilight sky with dynamic reflections.",
    author: "Victor Garcia",
    tags: ["architecture", "skyscraper", "city", "futuristic", "glass"],
    thumb: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    full: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85"
  },
  {
    id: 3,
    title: "Quantum Microchip Circuit",
    category: "technology",
    description: "Nanoscale semiconductor architecture glowing with cyan laser data transmission channels.",
    author: "Alexandre Debiève",
    tags: ["cpu", "chip", "tech", "hardware", "cyber", "ai"],
    thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    full: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85"
  },
  {
    id: 4,
    title: "Torii Gate at Miyajima",
    category: "travel",
    description: "Iconic floating shrine gate rising gracefully out of the tidal waters during golden hour.",
    author: "Sora Sagano",
    tags: ["japan", "travel", "culture", "sunset", "ocean"],
    thumb: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    full: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=85"
  },
  {
    id: 5,
    title: "Majestic Snow Leopard",
    category: "wildlife",
    description: "Elusive ghost cat keeping watch over rocky Himalayan cliffs in cold mountain terrain.",
    author: "Frédéric Dupont",
    tags: ["animal", "wildlife", "cat", "leopard", "predator"],
    thumb: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80",
    full: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1800&q=85"
  },
  {
    id: 6,
    title: "Emerald Forest Canopy",
    category: "nature",
    description: "Sun rays streaming through old-growth pine trees in lush Pacific Northwest wilderness.",
    author: "Casey Horner",
    tags: ["trees", "sunbeams", "forest", "nature", "woods"],
    thumb: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
    full: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=85"
  },
  {
    id: 7,
    title: "Spiral Museum Staircase",
    category: "architecture",
    description: "Breathtaking minimalist concrete vortex geometry viewed from top perspective.",
    author: "Daniel Von Appen",
    tags: ["architecture", "spiral", "stairs", "minimalist", "monochrome"],
    thumb: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    full: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1800&q=85"
  },
  {
    id: 8,
    title: "Neural Network Data Matrix",
    category: "technology",
    description: "Complex algorithmic data streams visualizing high-dimensional neural computations.",
    author: "Markus Spiske",
    tags: ["data", "code", "ai", "matrix", "network"],
    thumb: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    full: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1800&q=85"
  },
  {
    id: 9,
    title: "Hot Air Balloons in Cappadocia",
    category: "travel",
    description: "Hundreds of colorful hot air balloons floating over ancient volcanic fairy chimneys at dawn.",
    author: "Yonatan Anugerah",
    tags: ["balloons", "turkey", "travel", "cappadocia", "adventure"],
    thumb: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=600&q=80",
    full: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=1800&q=85"
  },
  {
    id: 10,
    title: "Red Fox in Winter",
    category: "wildlife",
    description: "Vibrant red fox hunting patiently through deep powdery snow in northern woodlands.",
    author: "Ray Hennessy",
    tags: ["fox", "winter", "snow", "wildlife", "animal"],
    thumb: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=600&q=80",
    full: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1800&q=85"
  },
  {
    id: 11,
    title: "Aurora Borealis over Fjord",
    category: "nature",
    description: "Electrifying emerald northern lights dancing across Arctic night skies reflected in fjord waters.",
    author: "Tobias Bjørkli",
    tags: ["aurora", "norway", "night", "stars", "fjord"],
    thumb: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80",
    full: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1800&q=85"
  },
  {
    id: 12,
    title: "Futuristic Glass Pavilion",
    category: "architecture",
    description: "Parametric curved canopy reflecting radiant ambient city lighting at nightfall.",
    author: "Chuttersnap",
    tags: ["pavilion", "design", "curves", "lighting", "modern"],
    thumb: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    full: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85"
  }
];

// State Management
let currentFilter = "all";
let currentSearchTerm = "";
let filteredImages = [...galleryData];
let currentLightboxIndex = 0;

// DOM Elements
const galleryGrid = document.getElementById("galleryGrid");
const emptyState = document.getElementById("emptyState");
const galleryCounter = document.getElementById("galleryCounter");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

// Lightbox Elements
const lightboxModal = document.getElementById("lightboxModal");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxSpinner = document.getElementById("lightboxSpinner");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDescription = document.getElementById("lightboxDescription");
const lightboxAuthor = document.getElementById("lightboxAuthor");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxIndex = document.getElementById("lightboxIndex");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
const lightboxDownloadBtn = document.getElementById("lightboxDownloadBtn");
const lightboxFullscreenBtn = document.getElementById("lightboxFullscreenBtn");
const thumbnailsStrip = document.getElementById("thumbnailsStrip");

/**
 * Initialize Gallery Application
 */
function initGallery() {
  renderGallery();
  setupFilterEvents();
  setupSearchEvents();
  setupLightboxEvents();
  setupKeyboardNavigation();
  setupTouchGestures();
}

/**
 * Filter & Search Pipeline
 */
function applyFilters() {
  filteredImages = galleryData.filter(item => {
    const matchesCategory = currentFilter === "all" || item.category === currentFilter;
    const searchLower = currentSearchTerm.toLowerCase().trim();
    const matchesSearch = !searchLower || 
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.author.toLowerCase().includes(searchLower) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  renderGallery();
}

/**
 * Render Gallery Cards to DOM
 */
function renderGallery() {
  galleryGrid.innerHTML = "";

  if (filteredImages.length === 0) {
    emptyState.classList.remove("hidden");
    galleryCounter.textContent = "Showing 0 photos";
    return;
  }

  emptyState.classList.add("hidden");
  galleryCounter.textContent = `Showing ${filteredImages.length} of ${galleryData.length} photos`;

  filteredImages.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View ${item.title}`);
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card-image-box">
        <span class="card-badge">${item.category}</span>
        <img src="${item.thumb}" alt="${item.title}" class="card-img" loading="lazy">
        <div class="card-overlay">
          <div class="overlay-icon">
            <i class="fa-solid fa-expand"></i>
          </div>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        <div class="card-footer-meta">
          <span class="card-author">
            <i class="fa-solid fa-camera"></i> ${item.author}
          </span>
          <span class="card-view-hint">Preview &rarr;</span>
        </div>
      </div>
    `;

    // Click & Keyboard Enter event
    card.addEventListener("click", () => openLightbox(index));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });

    galleryGrid.appendChild(card);
  });
}

/**
 * Setup Category Buttons Listener
 */
function setupFilterEvents() {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.category;
      applyFilters();
    });
  });

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      currentFilter = "all";
      currentSearchTerm = "";
      searchInput.value = "";
      clearSearchBtn.classList.remove("active");
      filterButtons.forEach(b => {
        b.classList.toggle("active", b.dataset.category === "all");
      });
      applyFilters();
    });
  }
}

/**
 * Setup Live Search Event Listeners
 */
function setupSearchEvents() {
  searchInput.addEventListener("input", (e) => {
    currentSearchTerm = e.target.value;
    clearSearchBtn.classList.toggle("active", currentSearchTerm.length > 0);
    applyFilters();
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    currentSearchTerm = "";
    clearSearchBtn.classList.remove("active");
    searchInput.focus();
    applyFilters();
  });
}

/**
 * Lightbox Core Logic
 */
function openLightbox(index) {
  if (filteredImages.length === 0) return;
  currentLightboxIndex = index;
  updateLightboxContent();
  renderThumbnails();

  lightboxModal.classList.add("active");
  lightboxModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeLightbox() {
  lightboxModal.classList.remove("active");
  lightboxModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}

function showNextImage() {
  if (filteredImages.length <= 1) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % filteredImages.length;
  updateLightboxContent();
}

function showPrevImage() {
  if (filteredImages.length <= 1) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + filteredImages.length) % filteredImages.length;
  updateLightboxContent();
}

/**
 * Update Image & Metadata inside Lightbox
 */
function updateLightboxContent() {
  const item = filteredImages[currentLightboxIndex];
  if (!item) return;

  // Show spinner while loading high-res image
  lightboxSpinner.classList.remove("hidden");
  lightboxImg.classList.remove("loaded");

  const highResImg = new Image();
  highResImg.src = item.full;
  highResImg.onload = () => {
    lightboxImg.src = item.full;
    lightboxImg.alt = item.title;
    lightboxSpinner.classList.add("hidden");
    lightboxImg.classList.add("loaded");
  };
  highResImg.onerror = () => {
    // Fallback to thumbnail if high-res fails
    lightboxImg.src = item.thumb;
    lightboxSpinner.classList.add("hidden");
    lightboxImg.classList.add("loaded");
  };

  // Update text elements
  lightboxTitle.textContent = item.title;
  lightboxDescription.textContent = item.description;
  lightboxAuthor.textContent = item.author;
  lightboxCategory.textContent = item.category;
  lightboxIndex.textContent = `${currentLightboxIndex + 1} of ${filteredImages.length}`;

  // Update active thumbnail
  updateActiveThumbnail();
}

/**
 * Render Lightbox Bottom Thumbnails
 */
function renderThumbnails() {
  thumbnailsStrip.innerHTML = "";
  filteredImages.forEach((item, idx) => {
    const thumb = document.createElement("div");
    thumb.className = `thumb-item ${idx === currentLightboxIndex ? "active" : ""}`;
    thumb.innerHTML = `<img src="${item.thumb}" alt="${item.title}">`;
    thumb.addEventListener("click", () => {
      currentLightboxIndex = idx;
      updateLightboxContent();
    });
    thumbnailsStrip.appendChild(thumb);
  });
}

function updateActiveThumbnail() {
  const thumbs = thumbnailsStrip.querySelectorAll(".thumb-item");
  thumbs.forEach((thumb, idx) => {
    const isActive = idx === currentLightboxIndex;
    thumb.classList.toggle("active", isActive);
    if (isActive) {
      thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  });
}

/**
 * Lightbox Button & Click Listeners
 */
function setupLightboxEvents() {
  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNextImage);
  prevBtn.addEventListener("click", showPrevImage);

  // Download handler
  lightboxDownloadBtn.addEventListener("click", () => {
    const currentItem = filteredImages[currentLightboxIndex];
    if (currentItem) {
      window.open(currentItem.full, "_blank");
    }
  });

  // Fullscreen handler
  lightboxFullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      lightboxModal.requestFullscreen().catch(() => {});
      lightboxFullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
    } else {
      document.exitFullscreen().catch(() => {});
      lightboxFullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
    }
  });
}

/**
 * Keyboard Navigation (Escape, Left, Right Arrow, Fullscreen)
 */
function setupKeyboardNavigation() {
  document.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("active")) return;

    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowRight":
        showNextImage();
        break;
      case "ArrowLeft":
        showPrevImage();
        break;
      case "f":
      case "F":
        lightboxFullscreenBtn.click();
        break;
    }
  });
}

/**
 * Mobile Touch Swipe Support
 */
function setupTouchGestures() {
  let touchStartX = 0;
  let touchEndX = 0;

  lightboxModal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxModal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff < 0) {
        showNextImage(); // Swiped left -> next
      } else {
        showPrevImage(); // Swiped right -> prev
      }
    }
  }
}

// Start application on page load
document.addEventListener("DOMContentLoaded", initGallery);
