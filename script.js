let allProducts = [];

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const categoryButtons = document.querySelectorAll(".categories button");
const startBtn = document.getElementById("startShoppingBtn");
const categoryCards = document.querySelectorAll(".category-card");

// Load products
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts(allProducts);
  })
  .catch(err => console.error("Error loading products:", err));

// Render products
function renderProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="images/${p.id}.jpg" onerror="this.src='https://via.placeholder.com/150'">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
    `;

    // Toggle active on click
    div.addEventListener("click", () => {
      document.querySelectorAll(".product").forEach(prod => prod.classList.remove("active"));
      div.classList.add("active");
    });

    productsContainer.appendChild(div);
  });
}

// Start shopping scroll
startBtn.addEventListener("click", () => {
  productsContainer.scrollIntoView({ behavior: "smooth" });
});

// Search functionality
searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  renderProducts(
    allProducts.filter(p => p.name.toLowerCase().includes(q))
  );
});

// Category button filter
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.category;
    renderProducts(
      cat === "All"
        ? allProducts
        : allProducts.filter(p => p.category === cat)
    );

    // Also highlight first product automatically (optional)
    const firstProduct = document.querySelector(".product");
    if(firstProduct) {
      document.querySelectorAll(".product").forEach(prod => prod.classList.remove("active"));
      firstProduct.classList.add("active");
    }
  });
});

// Visual category cards click
categoryCards.forEach(card => {
  card.addEventListener("click", () => {
    const cat = card.dataset.category;
    renderProducts(allProducts.filter(p => p.category === cat));
    productsContainer.scrollIntoView({ behavior: "smooth" });

    categoryCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});
