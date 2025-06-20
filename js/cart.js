/**
 * ShopEase - Cart Page JavaScript
 * This file contains the functionality for the shopping cart page
 */

// Initialize the cart page
document.addEventListener("DOMContentLoaded", function () {
  // Load cart items
  loadCartItems();

  // Initialize promo code form
  initPromoCodeForm();

  // Load recommended products
  loadRecommendedProducts();
});

// Load cart items
function loadCartItems() {
  const cartContainer = document.getElementById("cart-container");
  const emptyCart = document.getElementById("empty-cart");
  const cartSummary = document.getElementById("cart-summary");

  if (!cartContainer || !emptyCart || !cartSummary) return;

  // Get cart items
  const cart = loadCart();

  // Check if cart is empty
  if (cart.length === 0) {
    cartContainer.style.display = "none";
    emptyCart.style.display = "flex";
    cartSummary.style.display = "none";
    return;
  }

  // Show cart container and summary, hide empty cart message
  cartContainer.style.display = "block";
  emptyCart.style.display = "none";
  cartSummary.style.display = "block";

  // Create cart HTML
  let cartHTML = `
        <div class="cart-header">
            <div class="cart-item-image"></div>
            <div class="cart-item-details">Product</div>
            <div class="cart-item-price">Price</div>
            <div class="cart-item-quantity">Quantity</div>
            <div class="cart-item-remove"></div>
        </div>
    `;

  // Add cart items
  cart.forEach((item, index) => {
    const product = getProductById(item.id);
    if (!product) return;

    // Format options display
    let optionsHTML = "";
    if (item.options) {
      for (const [key, value] of Object.entries(item.options)) {
        optionsHTML += `<div class="cart-item-attribute"><span>${key}:</span> ${value}</div>`;
      }
    }

    cartHTML += `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-image">
                    <a href="product-details.html?id=${item.id}">
                        <div class="image-placeholder">
                            <i class="fas ${getCategoryIcon(
                              item.category
                            )}"></i>
                        </div>
                    </a>
                </div>
                <div class="cart-item-details">
                    <h3><a href="product-details.html?id=${item.id}">${
      item.name
    }</a></h3>
                    <div class="cart-item-attributes">
                        ${optionsHTML}
                    </div>
                </div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-quantity">
                    <div class="quantity-input">
                        <button type="button" class="quantity-decrease" data-index="${index}">-</button>
                        <input type="number" min="1" value="${
                          item.quantity
                        }" data-index="${index}">
                        <button type="button" class="quantity-increase" data-index="${index}">+</button>
                    </div>
                </div>
                <div class="cart-item-total">${formatPrice(
                  item.price * item.quantity
                )}</div>
                <button class="cart-item-remove" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
  });

  // Set cart HTML
  cartContainer.innerHTML = cartHTML;

  // Update cart summary
  updateCartSummary();

  // Initialize quantity controls
  initQuantityControls();

  // Initialize remove buttons
  initRemoveButtons();
}

// Initialize quantity controls
function initQuantityControls() {
  // Decrease buttons
  const decreaseBtns = document.querySelectorAll(".quantity-decrease");
  decreaseBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.dataset.index);
      const cart = loadCart();

      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        saveCart(cart);
        updateCartItemUI(index, cart[index].quantity);
        updateCartSummary();
      }
    });
  });

  // Increase buttons
  const increaseBtns = document.querySelectorAll(".quantity-increase");
  increaseBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.dataset.index);
      const cart = loadCart();

      cart[index].quantity += 1;
      saveCart(cart);
      updateCartItemUI(index, cart[index].quantity);
      updateCartSummary();
    });
  });

  // Input fields
  const quantityInputs = document.querySelectorAll(".cart-item-quantity input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const index = parseInt(this.dataset.index);
      let quantity = parseInt(this.value);

      // Ensure quantity is at least 1
      if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
        this.value = 1;
      }

      const cart = loadCart();
      cart[index].quantity = quantity;
      saveCart(cart);
      updateCartItemUI(index, quantity);
      updateCartSummary();
    });
  });
}

// Initialize remove buttons
function initRemoveButtons() {
  const removeButtons = document.querySelectorAll(".cart-item-remove");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.dataset.index);

      // Remove item from cart
      removeFromCart(index);

      // Reload cart display
      loadCartItems();
    });
  });
}

// Update cart item UI with new quantity
function updateCartItemUI(index, quantity) {
  const cartItem = document.querySelector(`.cart-item[data-index="${index}"]`);
  if (!cartItem) return;

  // Update quantity input
  const quantityInput = cartItem.querySelector(".cart-item-quantity input");
  if (quantityInput) {
    quantityInput.value = quantity;
  }

  // Update total price
  const cart = loadCart();
  const item = cart[index];
  const totalElement = cartItem.querySelector(".cart-item-total");

  if (totalElement && item) {
    totalElement.textContent = formatPrice(item.price * quantity);
  }
}

// Update cart summary
function updateCartSummary() {
  const subtotalElement = document.getElementById("subtotal");
  const shippingElement = document.getElementById("shipping");
  const taxElement = document.getElementById("tax");
  const totalElement = document.getElementById("total");

  if (!subtotalElement || !shippingElement || !taxElement || !totalElement)
    return;

  // Calculate totals
  const { subtotal, shipping, tax, discount, total } = calculateCartTotals();

  // Update summary elements
  subtotalElement.textContent = formatPrice(subtotal);
  shippingElement.textContent = formatPrice(shipping);
  taxElement.textContent = formatPrice(tax);
  totalElement.textContent = formatPrice(total);

  // Update discount if applicable
  const promoMessage = document.getElementById("promo-message");
  if (discount > 0 && promoMessage) {
    const promoCode = localStorage.getItem("promoCode");
    promoMessage.textContent = `Promo code ${promoCode} applied: -${formatPrice(
      discount
    )}`;
    promoMessage.style.color = "var(--success-color)";
  }
}

// Initialize promo code form
function initPromoCodeForm() {
  const promoCodeInput = document.getElementById("promo-code");
  const applyPromoBtn = document.getElementById("apply-promo");
  const promoMessage = document.getElementById("promo-message");

  if (!promoCodeInput || !applyPromoBtn || !promoMessage) return;

  // Check if promo code already applied
  const existingPromoCode = localStorage.getItem("promoCode");
  const existingDiscount = parseFloat(
    localStorage.getItem("cartDiscount") || 0
  );

  if (existingPromoCode && existingDiscount > 0) {
    promoCodeInput.value = existingPromoCode;
    promoMessage.textContent = `Promo code ${existingPromoCode} applied: -${formatPrice(
      existingDiscount
    )}`;
    promoMessage.style.color = "var(--success-color)";
  }

  // Apply promo code button
  applyPromoBtn.addEventListener("click", function () {
    const code = promoCodeInput.value.trim();

    if (!code) {
      promoMessage.textContent = "Please enter a promo code.";
      promoMessage.style.color = "var(--error-color)";
      return;
    }

    // Apply promo code
    const result = applyPromoCode(code);

    if (result.success) {
      promoMessage.textContent = `${result.message}: -${formatPrice(
        result.discount
      )}`;
      promoMessage.style.color = "var(--success-color)";

      // Update cart summary
      updateCartSummary();
    } else {
      promoMessage.textContent = result.message;
      promoMessage.style.color = "var(--error-color)";
    }
  });
}

// Load recommended products
function loadRecommendedProducts() {
  const recommendedProductsContainer = document.getElementById(
    "recommended-products"
  );
  if (!recommendedProductsContainer) return;

  // Get cart items
  const cart = loadCart();

  // Get recommended products based on cart items
  let recommendedProducts = [];

  if (cart.length > 0) {
    // Get categories in cart
    const cartCategories = [
      ...new Set(
        cart
          .map((item) => {
            const product = getProductById(item.id);
            return product ? product.category : null;
          })
          .filter(Boolean)
      ),
    ];

    // Get products in same categories, excluding cart items
    const cartProductIds = cart.map((item) => item.id);
    const allProducts = getAllProducts();

    const categoryProducts = allProducts.filter(
      (product) =>
        cartCategories.includes(product.category) &&
        !cartProductIds.includes(product.id)
    );

    // Sort by rating and take top 4
    recommendedProducts = categoryProducts
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);

    // If we don't have enough products, add some best sellers
    if (recommendedProducts.length < 4) {
      const bestSellers = allProducts
        .filter(
          (product) =>
            !cartProductIds.includes(product.id) &&
            !recommendedProducts.some((p) => p.id === product.id)
        )
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4 - recommendedProducts.length);

      recommendedProducts = [...recommendedProducts, ...bestSellers];
    }
  } else {
    // If cart is empty, show best sellers
    recommendedProducts = getAllProducts()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }

  // Clear container
  recommendedProductsContainer.innerHTML = "";

  // Add product cards
  recommendedProducts.forEach((product) => {
    recommendedProductsContainer.innerHTML += createProductCardHTML(product);
  });

  // Initialize "Add to Cart" buttons
  initAddToCartButtons();
}
