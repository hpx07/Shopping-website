/**
 * ShopEase - Utility Functions
 * This file contains common utility functions used across the shopping website
 */

// Format price with currency symbol
function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}

// Calculate discount percentage
function calculateDiscount(originalPrice, currentPrice) {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

// Generate star rating HTML
function generateStarRatingHTML(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let starsHTML = "";

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }

  // Half star
  if (halfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }

  return starsHTML;
}

// Get appropriate icon for product category
function getCategoryIcon(category) {
  switch (category) {
    case CATEGORIES.CLOTHING:
      return "fa-tshirt";
    case CATEGORIES.ELECTRONICS:
      return "fa-mobile-alt";
    case CATEGORIES.JEWELRY:
      return "fa-gem";
    case CATEGORIES.HOME:
      return "fa-home";
    default:
      return "fa-box";
  }
}

// Create a product card HTML
function createProductCardHTML(product) {
  const discountHTML =
    product.discount > 0
      ? `<span class="original-price">${formatPrice(
          product.originalPrice
        )}</span>
         <span class="discount">${product.discount}% OFF</span>`
      : "";

  const badgeHTML = product.isNew
    ? '<div class="product-badge">NEW</div>'
    : product.status === PRODUCT_STATUS.SALE
    ? '<div class="product-badge">SALE</div>'
    : "";

  return `
        <div class="product-card" data-product-id="${product.id}">
            ${badgeHTML}
            <div class="product-image">
                <div class="image-placeholder">
                    <i class="fas ${getCategoryIcon(product.category)}"></i>
                </div>
            </div>
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">${formatPrice(
                      product.price
                    )}</span>
                    ${discountHTML}
                </div>
                <div class="product-rating">
                    ${generateStarRatingHTML(product.rating)}
                    <span class="rating-count">(${product.reviews})</span>
                </div>
            </div>
            <div class="product-actions">
                <a href="product-details.html?id=${
                  product.id
                }" class="btn secondary-btn">View Details</a>
                <button class="btn primary-btn add-to-cart-btn" data-product-id="${
                  product.id
                }">Add to Cart</button>
            </div>
        </div>
    `;
}

// Toggle mobile menu
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", function () {
      mainNav.classList.toggle("active");

      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }
}

// Get URL parameters
function getUrlParams() {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }

  return params;
}

// Load cart from localStorage
function loadCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Update cart count in the header
function updateCartCount() {
  const cart = loadCart();
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const cartCountElements = document.querySelectorAll(".cart-count");
  cartCountElements.forEach((element) => {
    element.textContent = cartCount;
  });
}

// Add item to cart
function addToCart(productId, quantity = 1, options = {}) {
  const product = getProductById(productId);
  if (!product) return false;

  const cart = loadCart();

  // Check if the product is already in the cart with the same options
  const existingItemIndex = cart.findIndex((item) => {
    if (item.id !== product.id) return false;

    // Check if all options match
    for (const [key, value] of Object.entries(options)) {
      if (item.options && item.options[key] !== value) return false;
    }

    return true;
  });

  if (existingItemIndex !== -1) {
    // Update quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: quantity,
      options: Object.keys(options).length > 0 ? options : null,
    });
  }

  saveCart(cart);

  showNotification("Product added to cart");
  return true;
}

// Remove item from cart
function removeFromCart(index) {
  const cart = loadCart();

  if (index < 0 || index >= cart.length) return false;

  cart.splice(index, 1);
  saveCart(cart);

  showNotification("Product removed from cart");
  return true;
}

// Update cart item quantity
function updateCartItemQuantity(index, quantity) {
  const cart = loadCart();

  if (index < 0 || index >= cart.length) return false;
  if (quantity < 1) return false;

  cart[index].quantity = quantity;
  saveCart(cart);

  return true;
}

// Calculate cart totals
function calculateCartTotals() {
  const cart = loadCart();

  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  // Default shipping cost
  let shipping = cart.length > 0 ? 5.99 : 0;

  // Free shipping for orders over $100
  if (subtotal >= 100) {
    shipping = 0;
  }

  // Calculate tax (assume 8% tax rate)
  const taxRate = 0.08;
  const tax = subtotal * taxRate;

  // Get any discount from localStorage
  const discount = parseFloat(localStorage.getItem("cartDiscount") || 0);

  // Calculate total
  const total = subtotal + shipping + tax - discount;

  return {
    subtotal,
    shipping,
    tax,
    discount,
    total,
  };
}

// Show notification
function showNotification(message, type = "success", duration = 3000) {
  // Check if notification container exists
  let notificationContainer = document.querySelector(".notification-container");

  // Create notification container if it doesn't exist
  if (!notificationContainer) {
    notificationContainer = document.createElement("div");
    notificationContainer.className = "notification-container";
    document.body.appendChild(notificationContainer);

    // Add styles if not already in CSS
    const style = document.createElement("style");
    style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
            }
            .notification {
                background-color: white;
                color: #333;
                padding: 12px 20px;
                border-radius: 4px;
                margin-bottom: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                min-width: 250px;
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.3s ease;
            }
            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }
            .notification.success {
                border-left: 4px solid #2ecc71;
            }
            .notification.error {
                border-left: 4px solid #e74c3c;
            }
            .notification.info {
                border-left: 4px solid #3498db;
            }
            .notification i {
                margin-right: 10px;
                font-size: 1.2rem;
            }
            .notification.success i {
                color: #2ecc71;
            }
            .notification.error i {
                color: #e74c3c;
            }
            .notification.info i {
                color: #3498db;
            }
        `;
    document.head.appendChild(style);
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  // Set icon based on notification type
  let icon = "info-circle";
  if (type === "success") icon = "check-circle";
  if (type === "error") icon = "exclamation-circle";

  notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;

  // Add notification to container
  notificationContainer.appendChild(notification);

  // Show notification with animation
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Remove notification after duration
  setTimeout(() => {
    notification.classList.remove("show");

    // Remove element after animation
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, duration);
}

// Validate form fields
function validateField(field, rules) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  // Check required
  if (rules.required && value === "") {
    isValid = false;
    errorMessage = "This field is required";
  }

  // Check email format
  if (isValid && rules.email && value !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address";
    }
  }

  // Check minimum length
  if (isValid && rules.minLength && value.length < rules.minLength) {
    isValid = false;
    errorMessage = `Must be at least ${rules.minLength} characters`;
  }

  // Check for matching fields
  if (isValid && rules.match && document.getElementById(rules.match)) {
    const matchField = document.getElementById(rules.match);
    if (value !== matchField.value) {
      isValid = false;
      errorMessage = `Does not match ${rules.matchLabel || rules.match}`;
    }
  }

  // Custom validation
  if (isValid && rules.validate) {
    const customValidation = rules.validate(value);
    if (customValidation !== true) {
      isValid = false;
      errorMessage = customValidation;
    }
  }

  // Update UI
  const errorElement = field.parentElement.querySelector(".error-message");
  if (errorElement) {
    if (!isValid) {
      field.classList.add("error");
      errorElement.textContent = errorMessage;
    } else {
      field.classList.remove("error");
      errorElement.textContent = "";
    }
  }

  return isValid;
}

// Initialize event listeners when document is loaded
document.addEventListener("DOMContentLoaded", function () {
  initMobileMenu();
  updateCartCount();
});

// Apply promo code
function applyPromoCode(code) {
  // Available promo codes
  const promoCodes = {
    WELCOME10: { discount: 10, type: "percentage" },
    SAVE20: { discount: 20, type: "percentage" },
    FREESHIP: { discount: 5.99, type: "fixed", applyTo: "shipping" },
    "10OFF": { discount: 10, type: "fixed" },
  };

  code = code.toUpperCase();

  if (!promoCodes[code]) {
    return { success: false, message: "Invalid promo code" };
  }

  const promo = promoCodes[code];
  const cartTotals = calculateCartTotals();
  let discount = 0;

  if (promo.type === "percentage") {
    discount = (cartTotals.subtotal * promo.discount) / 100;
  } else if (promo.type === "fixed") {
    if (promo.applyTo === "shipping") {
      discount = Math.min(promo.discount, cartTotals.shipping);
    } else {
      discount = Math.min(promo.discount, cartTotals.subtotal);
    }
  }

  // Save discount to localStorage
  localStorage.setItem("cartDiscount", discount.toString());
  localStorage.setItem("promoCode", code);

  return {
    success: true,
    message: "Promo code applied successfully!",
    discount: discount,
    code: code,
  };
}

// Format date
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}
