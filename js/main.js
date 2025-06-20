/**
 * ShopEase - Main JavaScript
 * This file contains the main functionality for the ShopEase shopping website
 */

// Initialize the homepage
document.addEventListener("DOMContentLoaded", function () {
  // Load featured products
  loadFeaturedProducts();

  // Initialize newsletter form
  initNewsletterForm();

  // Initialize "Add to Cart" buttons
  initAddToCartButtons();
});

// Load featured products
function loadFeaturedProducts() {
  const featuredProductsContainer =
    document.getElementById("featured-products");
  if (!featuredProductsContainer) return;

  // Clear loading spinner
  featuredProductsContainer.innerHTML = "";

  // Get featured products
  const featuredProducts = getFeaturedProducts(4);

  // Display products
  if (featuredProducts.length === 0) {
    featuredProductsContainer.innerHTML =
      '<p class="no-results">No featured products available.</p>';
    return;
  }

  // Create product cards
  featuredProducts.forEach((product) => {
    featuredProductsContainer.innerHTML += createProductCardHTML(product);
  });

  // Initialize "Add to Cart" buttons for newly added products
  initAddToCartButtons();
}

// Initialize newsletter form
function initNewsletterForm() {
  const newsletterForm = document.getElementById("newsletter-form");
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    const formMessage = this.nextElementSibling;

    if (!emailInput || !formMessage) return;

    const email = emailInput.value.trim();

    // Simple email validation
    if (!email) {
      formMessage.textContent = "Please enter your email address.";
      formMessage.style.color = "var(--error-color)";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.style.color = "var(--error-color)";
      return;
    }

    // Simulate successful subscription
    formMessage.textContent = "Thank you for subscribing to our newsletter!";
    formMessage.style.color = "var(--success-color)";
    emailInput.value = "";

    // Store subscription in localStorage
    const subscriptions = JSON.parse(
      localStorage.getItem("newsletter_subscriptions") || "[]"
    );
    subscriptions.push({ email, date: new Date().toISOString() });
    localStorage.setItem(
      "newsletter_subscriptions",
      JSON.stringify(subscriptions)
    );
  });
}

// Initialize "Add to Cart" buttons
function initAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  addToCartButtons.forEach((button) => {
    // Remove any existing event listeners
    button.removeEventListener("click", handleAddToCart);

    // Add new event listener
    button.addEventListener("click", handleAddToCart);
  });
}

// Handle "Add to Cart" button click
function handleAddToCart(e) {
  const productId = e.currentTarget.dataset.productId;
  if (!productId) return;

  const added = addToCart(parseInt(productId));

  if (added) {
    // Show notification
    showNotification("Product added to cart", "success");

    // Animate button
    const button = e.currentTarget;
    button.classList.add("added");
    button.textContent = "Added to Cart";

    setTimeout(() => {
      button.classList.remove("added");
      button.textContent = "Add to Cart";
    }, 2000);
  }
}

// Handle search form
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.querySelector(".search-box");
  const searchInput = document.querySelector(".search-box input");
  const searchBtn = document.querySelector(".search-box button");

  if (searchForm && searchInput && searchBtn) {
    // Handle form submission
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const query = searchInput.value.trim();
      if (!query) return;

      // Redirect to products page with search query
      window.location.href = `products.html?search=${encodeURIComponent(
        query
      )}`;
    });

    // Handle button click
    searchBtn.addEventListener("click", function () {
      const query = searchInput.value.trim();
      if (!query) return;

      // Redirect to products page with search query
      window.location.href = `products.html?search=${encodeURIComponent(
        query
      )}`;
    });
  }
});

// Initialize category links
document.addEventListener("DOMContentLoaded", function () {
  const categoryLinks = document.querySelectorAll(".category-link");

  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const category = this.getAttribute("href").split("=")[1];

      // Store the selected category in localStorage
      if (category) {
        localStorage.setItem("selectedCategory", category);
      }
    });
  });
});
