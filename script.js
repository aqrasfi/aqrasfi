const PRODUCTS = [
  {
    id: 1,
    title: "Moonlit Pearl Set",
    category: "Pearls",
    price: "₹399",
    badge: "Best Seller",
    image: "https://i.postimg.cc/RhTYzMHb/1.png",
    description:
      "Elegant layered pearl styling with a soft luxury finish made for standout occasions."
  },
  {
    id: 2,
    title: "Golden Aura Necklace",
    category: "Necklaces",
    price: "₹399",
    badge: "Signature",
    image: "https://i.postimg.cc/J73vXQ2Q/2.png",
    description:
      "A statement necklace concept with radiant curves and rich golden presence."
  },
  {
    id: 3,
    title: "Starlight Crystal Drops",
    category: "Earrings",
    price: "₹399",
    badge: "New",
    image: "https://i.postimg.cc/ZYP2NLM8/3.png",
    description:
      "Bright crystal-inspired earrings designed to feel glamorous and eye-catching."
  },
  {
    id: 4,
    title: "Earrings Combo Set",
    category: "Earrings combo",
    price: "₹499",
    badge: "Coming Soon",
    image: "https://i.postimg.cc/xqrw9sxT/5.png",
    description:
      "A romantic earrings concept with a soft toned mood and sculpted elegance."
  },
  {
    id: 5,
    title: "Earring Combo 12pc",
    category: "Earrings combo",
    price: "₹499",
    badge: "new collection",
    image: "https://i.postimg.cc/x1L0NmMW/4.png",
    description:
      "Minimal but luxurious Earrrings styling with a strong premium aesthetic."
  },
  {
    id: 6,
    title: "Cartier Bracelet Set",
    category: "Sets",
    price: "₹1,249",
    badge: "Adujustable",
    image: "https://i.postimg.cc/QNSWYHYr/Whats-App-Image-2026-02-15-at-7-45-46-PM.jpg",
    description:
      "A Adjustable cartier combo set."
  },

];

const productGrid = document.getElementById("productGrid");
const filterButtons = document.getElementById("filterButtons");
const searchInput = document.getElementById("searchInput");
const wishlistCount = document.getElementById("wishlistCount");

const modal = document.getElementById("productModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalImageWrap = document.getElementById("modalImageWrap");

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

let activeCategory = "All";
let wishlist = 0;

function getCategories() {
  return ["All", ...new Set(PRODUCTS.map((item) => item.category))];
}

function renderFilters() {
  const categories = getCategories();

  filterButtons.innerHTML = categories
    .map(
      (category) => `
        <button class="filter-btn ${category === activeCategory ? "active" : ""}" data-category="${category}">
          ${category}
        </button>
      `
    )
    .join("");

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderFilters();
      renderProducts();
    });
  });
}

function productMedia(product) {
  if (product.image && product.image.trim() !== "") {
    return `<img src="${product.image}" alt="${product.title}" />`;
  }

  return `
    <div class="placeholder-media">
      <span>AQRASFI</span>
    </div>
  `;
}

function renderProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filtered = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;

    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div class="glass" style="padding:24px;border-radius:24px;grid-column:1/-1;">
        <h3 style="margin-top:0;">No products found</h3>
        <p style="margin-bottom:0;color:#c9c2b8;">Try another search or category.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filtered
    .map(
      (product) => `
        <article class="product-card glass reveal visible">
          <div class="product-media">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
            ${productMedia(product)}
          </div>

          <div class="product-content">
            <div class="product-topline">
              <div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-category">${product.category}</p>
              </div>
              <div class="product-price">${product.price || "Price later"}</div>
            </div>

          <p class="product-desc">${product.description}</p>

                   <div class="product-actions">
                 <button class="quick-btn" data-quick="${product.id}">Quick View</button>

                <a class="order-btn"
                  target="_blank"
                    href="https://instagram.com/aqrasfi">
                    Order on Instagram
                </a>
              </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-quick]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.quick);
      const product = PRODUCTS.find((item) => item.id === id);
      openModal(product);
    });
  });

  document.querySelectorAll("[data-wish]").forEach((button) => {
    button.addEventListener("click", () => {
      wishlist += 1;
      wishlistCount.textContent = wishlist;
      button.textContent = "Saved ✓";
      button.disabled = true;
    });
  });
}

function openModal(product) {
  modalTitle.textContent = product.title;
  modalCategory.textContent = product.category;
  modalPrice.textContent = product.price || "Price will be added later";
  modalDescription.textContent = product.description;

  modalImageWrap.innerHTML =
    product.image && product.image.trim() !== ""
      ? `<img src="${product.image}" alt="${product.title}" />`
      : `<div class="placeholder-media"><span>AQRASFI</span></div>`;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalOverlay.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

searchInput.addEventListener("input", renderProducts);

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

renderFilters();
renderProducts();