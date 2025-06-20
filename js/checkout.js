/**
 * ShopEase - Checkout Page JavaScript
 * This file contains the functionality for the checkout process
 */

// Current checkout step (1: Shipping, 2: Payment, 3: Review)
let currentStep = 1;

// User information
const userInfo = {
  shipping: {},
  payment: {},
  billing: {},
};

// Initialize the checkout page
document.addEventListener("DOMContentLoaded", function () {
  // Check if cart is empty
  checkCartEmpty();

  // Load order summary
  loadOrderSummary();

  // Initialize checkout forms
  initCheckoutForms();

  // Initialize checkout navigation
  initCheckoutNavigation();
});

// Check if cart is empty
function checkCartEmpty() {
  const cart = loadCart();

  if (cart.length === 0) {
    // Show empty cart message
    const emptyCartCheckout = document.getElementById("empty-cart-checkout");
    const checkoutForms = document.getElementById("checkout-forms");
    const orderSummary = document.getElementById("order-summary");

    if (emptyCartCheckout && checkoutForms && orderSummary) {
      emptyCartCheckout.style.display = "block";
      checkoutForms.style.display = "none";
      orderSummary.style.display = "none";
    }

    // Hide checkout steps
    const checkoutSteps = document.querySelector(".checkout-steps");
    if (checkoutSteps) {
      checkoutSteps.style.display = "none";
    }
  }
}

// Load order summary
function loadOrderSummary() {
  // Get cart items
  const cart = loadCart();
  const orderItemsContainer = document.getElementById("order-items");

  if (!orderItemsContainer) return;

  // Clear container
  orderItemsContainer.innerHTML = "";

  // Add order items
  cart.forEach((item) => {
    const product = getProductById(item.id);
    if (!product) return;

    let optionsText = "";
    if (item.options) {
      for (const [key, value] of Object.entries(item.options)) {
        optionsText += `${key}: ${value}, `;
      }
      optionsText = optionsText.slice(0, -2); // Remove trailing comma and space
    }

    const itemHTML = `
            <div class="order-item">
                <div class="item-image">
                    <div class="image-placeholder">
                        <i class="fas ${getCategoryIcon(item.category)}"></i>
                    </div>
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-info">
                        <span class="item-price">${formatPrice(
                          item.price
                        )}</span>
                        <span class="item-quantity">Qty: ${item.quantity}</span>
                        ${
                          optionsText
                            ? `<span class="item-options">${optionsText}</span>`
                            : ""
                        }
                    </p>
                </div>
                <div class="item-total">
                    ${formatPrice(item.price * item.quantity)}
                </div>
            </div>
        `;

    orderItemsContainer.innerHTML += itemHTML;
  });

  // Update order summary
  updateOrderSummary();
}

// Update order summary
function updateOrderSummary() {
  const subtotalElement = document.getElementById("checkout-subtotal");
  const shippingElement = document.getElementById("checkout-shipping");
  const taxElement = document.getElementById("checkout-tax");
  const discountElement = document.getElementById("checkout-discount");
  const totalElement = document.getElementById("checkout-total");

  if (
    !subtotalElement ||
    !shippingElement ||
    !taxElement ||
    !discountElement ||
    !totalElement
  )
    return;

  // Calculate totals
  const { subtotal, shipping, tax, discount, total } = calculateCartTotals();

  // Update summary elements
  subtotalElement.textContent = formatPrice(subtotal);
  shippingElement.textContent = formatPrice(shipping);
  taxElement.textContent = formatPrice(tax);
  discountElement.textContent = formatPrice(discount);
  totalElement.textContent = formatPrice(total);

  // Store order summary for success page
  localStorage.setItem(
    "orderSummary",
    JSON.stringify({
      subtotal,
      shipping,
      tax,
      discount,
      total,
    })
  );

  // Update promo code display
  const promoMessage = document.getElementById("checkout-promo-message");
  if (discount > 0 && promoMessage) {
    const promoCode = localStorage.getItem("promoCode");
    promoMessage.textContent = `Promo code ${promoCode} applied: -${formatPrice(
      discount
    )}`;
    promoMessage.style.color = "var(--success-color)";
  }
}

// Initialize checkout forms
function initCheckoutForms() {
  // Initialize shipping form
  initShippingForm();

  // Initialize payment form
  initPaymentForm();

  // Initialize shipping method selection
  initShippingMethods();

  // Initialize payment method selection
  initPaymentMethods();

  // Initialize promo code
  initCheckoutPromoCode();
}

// Initialize shipping form
function initShippingForm() {
  const shippingForm = document.getElementById("shipping-form");

  if (!shippingForm) return;

  // Form submission
  shippingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate form
    if (!validateShippingForm()) {
      return;
    }

    // Save shipping information
    saveShippingInfo();

    // Go to payment step
    goToStep(2);
  });

  // Load saved shipping info if available
  loadSavedShippingInfo();
}

// Validate shipping form
function validateShippingForm() {
  const firstNameField = document.getElementById("first-name");
  const lastNameField = document.getElementById("last-name");
  const emailField = document.getElementById("email");
  const phoneField = document.getElementById("phone");
  const addressField = document.getElementById("address");
  const cityField = document.getElementById("city");
  const stateField = document.getElementById("state");
  const zipField = document.getElementById("zip");
  const countryField = document.getElementById("country");

  let isValid = true;

  // Validate required fields
  if (!validateField(firstNameField, { required: true })) isValid = false;
  if (!validateField(lastNameField, { required: true })) isValid = false;
  if (!validateField(emailField, { required: true, email: true }))
    isValid = false;
  if (!validateField(phoneField, { required: true })) isValid = false;
  if (!validateField(addressField, { required: true })) isValid = false;
  if (!validateField(cityField, { required: true })) isValid = false;
  if (!validateField(stateField, { required: true })) isValid = false;
  if (!validateField(zipField, { required: true })) isValid = false;
  if (!validateField(countryField, { required: true })) isValid = false;

  return isValid;
}

// Save shipping information
function saveShippingInfo() {
  userInfo.shipping = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    apartment: document.getElementById("apartment").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    zip: document.getElementById("zip").value,
    country: document.getElementById("country").value,
    shippingMethod: document.querySelector(
      'input[name="shipping-method"]:checked'
    ).value,
  };

  // Save shipping info to localStorage
  localStorage.setItem("shippingInfo", JSON.stringify(userInfo.shipping));
}

// Load saved shipping information
function loadSavedShippingInfo() {
  const savedInfo = JSON.parse(localStorage.getItem("shippingInfo") || "{}");

  if (Object.keys(savedInfo).length === 0) return;

  // Fill form fields
  document.getElementById("first-name").value = savedInfo.firstName || "";
  document.getElementById("last-name").value = savedInfo.lastName || "";
  document.getElementById("email").value = savedInfo.email || "";
  document.getElementById("phone").value = savedInfo.phone || "";
  document.getElementById("address").value = savedInfo.address || "";
  document.getElementById("apartment").value = savedInfo.apartment || "";
  document.getElementById("city").value = savedInfo.city || "";
  document.getElementById("state").value = savedInfo.state || "";
  document.getElementById("zip").value = savedInfo.zip || "";
  document.getElementById("country").value = savedInfo.country || "";

  // Select shipping method
  if (savedInfo.shippingMethod) {
    const shippingMethod = document.querySelector(
      `input[name="shipping-method"][value="${savedInfo.shippingMethod}"]`
    );
    if (shippingMethod) {
      shippingMethod.checked = true;
    }
  }

  // Save to user info
  userInfo.shipping = savedInfo;
}

// Initialize payment form
function initPaymentForm() {
  const paymentForm = document.getElementById("payment-form");

  if (!paymentForm) return;

  // Form submission
  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get payment method
    const paymentMethod = document.querySelector(
      'input[name="payment-method"]:checked'
    ).value;

    // Validate form based on payment method
    if (paymentMethod === "credit-card") {
      if (!validateCreditCardForm()) {
        return;
      }
    }

    // Validate billing address if different from shipping
    if (!document.getElementById("same-address").checked) {
      if (!validateBillingForm()) {
        return;
      }
    }

    // Save payment information
    savePaymentInfo();

    // Go to review step
    goToStep(3);

    // Update review information
    updateReviewInfo();
  });

  // Toggle billing address form
  const sameAddressCheckbox = document.getElementById("same-address");
  const differentBillingAddress = document.getElementById(
    "different-billing-address"
  );

  if (sameAddressCheckbox && differentBillingAddress) {
    sameAddressCheckbox.addEventListener("change", function () {
      differentBillingAddress.style.display = this.checked ? "none" : "block";
    });
  }

  // Toggle payment methods
  const paymentMethodRadios = document.querySelectorAll(
    'input[name="payment-method"]'
  );
  const creditCardForm = document.getElementById("credit-card-form");
  const paypalForm = document.getElementById("paypal-form");

  if (paymentMethodRadios.length && creditCardForm && paypalForm) {
    paymentMethodRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
        if (this.value === "credit-card") {
          creditCardForm.style.display = "block";
          paypalForm.style.display = "none";
        } else if (this.value === "paypal") {
          creditCardForm.style.display = "none";
          paypalForm.style.display = "block";
        }
      });
    });
  }

  // Load saved payment info if available
  loadSavedPaymentInfo();
}

// Validate credit card form
function validateCreditCardForm() {
  const cardNameField = document.getElementById("card-name");
  const cardNumberField = document.getElementById("card-number");
  const expiryDateField = document.getElementById("expiry-date");
  const cvvField = document.getElementById("cvv");

  let isValid = true;

  // Validate required fields
  if (!validateField(cardNameField, { required: true })) isValid = false;
  if (
    !validateField(cardNumberField, {
      required: true,
      validate: (value) => {
        // Basic credit card validation
        const digits = value.replace(/\D/g, "");
        return digits.length >= 13 && digits.length <= 19
          ? true
          : "Invalid card number";
      },
    })
  )
    isValid = false;

  if (
    !validateField(expiryDateField, {
      required: true,
      validate: (value) => {
        // Check MM/YY format
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!regex.test(value)) return "Use MM/YY format";

        // Check if not expired
        const [month, year] = value.split("/");
        const expiryDate = new Date(
          2000 + parseInt(year),
          parseInt(month) - 1,
          1
        );
        const today = new Date();

        return expiryDate > today ? true : "Card is expired";
      },
    })
  )
    isValid = false;

  if (
    !validateField(cvvField, {
      required: true,
      validate: (value) => {
        // Check 3-4 digit CVV
        const digits = value.replace(/\D/g, "");
        return digits.length >= 3 && digits.length <= 4
          ? true
          : "CVV must be 3-4 digits";
      },
    })
  )
    isValid = false;

  return isValid;
}

// Validate billing form
function validateBillingForm() {
  const billingFirstNameField = document.getElementById("billing-first-name");
  const billingLastNameField = document.getElementById("billing-last-name");
  const billingAddressField = document.getElementById("billing-address");
  const billingCityField = document.getElementById("billing-city");
  const billingStateField = document.getElementById("billing-state");
  const billingZipField = document.getElementById("billing-zip");
  const billingCountryField = document.getElementById("billing-country");

  let isValid = true;

  // Validate required fields
  if (!validateField(billingFirstNameField, { required: true }))
    isValid = false;
  if (!validateField(billingLastNameField, { required: true })) isValid = false;
  if (!validateField(billingAddressField, { required: true })) isValid = false;
  if (!validateField(billingCityField, { required: true })) isValid = false;
  if (!validateField(billingStateField, { required: true })) isValid = false;
  if (!validateField(billingZipField, { required: true })) isValid = false;
  if (!validateField(billingCountryField, { required: true })) isValid = false;

  return isValid;
}

// Save payment information
function savePaymentInfo() {
  const paymentMethod = document.querySelector(
    'input[name="payment-method"]:checked'
  ).value;

  userInfo.payment = {
    method: paymentMethod,
  };

  if (paymentMethod === "credit-card") {
    userInfo.payment.cardName = document.getElementById("card-name").value;
    userInfo.payment.cardNumber = document.getElementById("card-number").value;
    userInfo.payment.expiryDate = document.getElementById("expiry-date").value;
    userInfo.payment.cvv = document.getElementById("cvv").value;
  }

  const sameAddress = document.getElementById("same-address").checked;
  userInfo.payment.sameAsShipping = sameAddress;

  if (!sameAddress) {
    userInfo.billing = {
      firstName: document.getElementById("billing-first-name").value,
      lastName: document.getElementById("billing-last-name").value,
      address: document.getElementById("billing-address").value,
      apartment: document.getElementById("billing-apartment").value,
      city: document.getElementById("billing-city").value,
      state: document.getElementById("billing-state").value,
      zip: document.getElementById("billing-zip").value,
      country: document.getElementById("billing-country").value,
    };
  } else {
    userInfo.billing = { ...userInfo.shipping };
  }

  // Save payment info to localStorage
  localStorage.setItem(
    "paymentInfo",
    JSON.stringify({
      ...userInfo.payment,
      sameAsShipping: sameAddress,
    })
  );

  // Save billing info to localStorage
  localStorage.setItem("billingInfo", JSON.stringify(userInfo.billing));
}

// Load saved payment information
function loadSavedPaymentInfo() {
  const savedPaymentInfo = JSON.parse(
    localStorage.getItem("paymentInfo") || "{}"
  );
  const savedBillingInfo = JSON.parse(
    localStorage.getItem("billingInfo") || "{}"
  );

  if (Object.keys(savedPaymentInfo).length === 0) return;

  // Set payment method
  if (savedPaymentInfo.method) {
    const paymentMethod = document.querySelector(
      `input[name="payment-method"][value="${savedPaymentInfo.method}"]`
    );
    if (paymentMethod) {
      paymentMethod.checked = true;

      // Show appropriate form
      const creditCardForm = document.getElementById("credit-card-form");
      const paypalForm = document.getElementById("paypal-form");

      if (creditCardForm && paypalForm) {
        if (savedPaymentInfo.method === "credit-card") {
          creditCardForm.style.display = "block";
          paypalForm.style.display = "none";
        } else if (savedPaymentInfo.method === "paypal") {
          creditCardForm.style.display = "none";
          paypalForm.style.display = "block";
        }
      }
    }
  }

  // Fill credit card fields
  if (savedPaymentInfo.method === "credit-card") {
    document.getElementById("card-name").value =
      savedPaymentInfo.cardName || "";
    document.getElementById("card-number").value =
      savedPaymentInfo.cardNumber || "";
    document.getElementById("expiry-date").value =
      savedPaymentInfo.expiryDate || "";
    document.getElementById("cvv").value = savedPaymentInfo.cvv || "";
  }

  // Set billing address
  const sameAddressCheckbox = document.getElementById("same-address");
  const differentBillingAddress = document.getElementById(
    "different-billing-address"
  );

  if (sameAddressCheckbox && differentBillingAddress) {
    sameAddressCheckbox.checked = savedPaymentInfo.sameAsShipping !== false;
    differentBillingAddress.style.display = sameAddressCheckbox.checked
      ? "none"
      : "block";
  }

  // Fill billing address fields
  if (
    !savedPaymentInfo.sameAsShipping &&
    Object.keys(savedBillingInfo).length > 0
  ) {
    document.getElementById("billing-first-name").value =
      savedBillingInfo.firstName || "";
    document.getElementById("billing-last-name").value =
      savedBillingInfo.lastName || "";
    document.getElementById("billing-address").value =
      savedBillingInfo.address || "";
    document.getElementById("billing-apartment").value =
      savedBillingInfo.apartment || "";
    document.getElementById("billing-city").value = savedBillingInfo.city || "";
    document.getElementById("billing-state").value =
      savedBillingInfo.state || "";
    document.getElementById("billing-zip").value = savedBillingInfo.zip || "";
    document.getElementById("billing-country").value =
      savedBillingInfo.country || "";
  }

  // Save to user info
  userInfo.payment = savedPaymentInfo;
  userInfo.billing = savedBillingInfo;
}

// Initialize shipping methods
function initShippingMethods() {
  const shippingMethodRadios = document.querySelectorAll(
    'input[name="shipping-method"]'
  );

  if (!shippingMethodRadios.length) return;

  shippingMethodRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      // Update order summary with new shipping cost
      if (this.value === "standard") {
        localStorage.setItem("shippingCost", "5.99");
      } else if (this.value === "express") {
        localStorage.setItem("shippingCost", "12.99");
      } else if (this.value === "free") {
        localStorage.setItem("shippingCost", "0");
      }

      updateOrderSummary();
    });
  });
}

// Initialize payment methods
function initPaymentMethods() {
  // This function is for any additional payment method initialization
  // Currently handled in initPaymentForm
}

// Initialize checkout promo code
function initCheckoutPromoCode() {
  const promoCodeInput = document.getElementById("checkout-promo-code");
  const applyPromoBtn = document.getElementById("checkout-apply-promo");
  const promoMessage = document.getElementById("checkout-promo-message");

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

      // Update order summary
      updateOrderSummary();
    } else {
      promoMessage.textContent = result.message;
      promoMessage.style.color = "var(--error-color)";
    }
  });
}

// Initialize checkout navigation
function initCheckoutNavigation() {
  // Back to shipping button
  const backToShippingBtn = document.getElementById("back-to-shipping");
  if (backToShippingBtn) {
    backToShippingBtn.addEventListener("click", function () {
      goToStep(1);
    });
  }

  // Back to payment button
  const backToPaymentBtn = document.getElementById("back-to-payment");
  if (backToPaymentBtn) {
    backToPaymentBtn.addEventListener("click", function () {
      goToStep(2);
    });
  }

  // Edit shipping button
  const editShippingBtn = document.getElementById("edit-shipping");
  if (editShippingBtn) {
    editShippingBtn.addEventListener("click", function () {
      goToStep(1);
    });
  }

  // Edit payment button
  const editPaymentBtn = document.getElementById("edit-payment");
  if (editPaymentBtn) {
    editPaymentBtn.addEventListener("click", function () {
      goToStep(2);
    });
  }

  // Place order button
  const placeOrderBtn = document.getElementById("place-order-btn");
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", function () {
      placeOrder();
    });
  }
}

// Go to checkout step
function goToStep(step) {
  currentStep = step;

  // Hide all steps
  document.querySelectorAll(".checkout-step").forEach((element) => {
    element.style.display = "none";
  });

  // Show current step
  const currentStepElement = document.getElementById(
    `${getStepName(step)}-step`
  );
  if (currentStepElement) {
    currentStepElement.style.display = "block";
  }

  // Update step indicators
  updateStepIndicators();
}

// Get step name
function getStepName(step) {
  switch (step) {
    case 1:
      return "shipping";
    case 2:
      return "payment";
    case 3:
      return "review";
    default:
      return "shipping";
  }
}

// Update step indicators
function updateStepIndicators() {
  const steps = document.querySelectorAll(".step");
  const stepLines = document.querySelectorAll(".step-line");

  if (!steps.length) return;

  steps.forEach((step, index) => {
    const stepNumber = index + 1;

    if (stepNumber < currentStep) {
      step.classList.add("completed");
      step.classList.remove("active");
    } else if (stepNumber === currentStep) {
      step.classList.add("active");
      step.classList.remove("completed");
    } else {
      step.classList.remove("active");
      step.classList.remove("completed");
    }
  });

  stepLines.forEach((line, index) => {
    if (index + 1 < currentStep) {
      line.classList.add("active");
    } else {
      line.classList.remove("active");
    }
  });
}

// Update review information
function updateReviewInfo() {
  // Update shipping review
  const shippingReview = document.getElementById("shipping-review");
  if (shippingReview && userInfo.shipping) {
    const shipping = userInfo.shipping;
    const shippingMethodName = getShippingMethodName(shipping.shippingMethod);

    shippingReview.innerHTML = `
            <div class="review-item">
                <span class="review-label">Name:</span>
                <span class="review-value">${shipping.firstName} ${
      shipping.lastName
    }</span>
            </div>
            <div class="review-item">
                <span class="review-label">Email:</span>
                <span class="review-value">${shipping.email}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Phone:</span>
                <span class="review-value">${shipping.phone}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Address:</span>
                <span class="review-value">
                    ${shipping.address}
                    ${shipping.apartment ? `, ${shipping.apartment}` : ""}
                    <br>${shipping.city}, ${shipping.state} ${shipping.zip}
                    <br>${shipping.country}
                </span>
            </div>
            <div class="review-item">
                <span class="review-label">Shipping Method:</span>
                <span class="review-value">${shippingMethodName}</span>
            </div>
        `;
  }

  // Update payment review
  const paymentReview = document.getElementById("payment-review");
  if (paymentReview && userInfo.payment) {
    const payment = userInfo.payment;
    const billing = userInfo.billing;

    let paymentDetails = "";
    if (payment.method === "credit-card") {
      // Mask card number for security
      const maskedCardNumber = payment.cardNumber
        .replace(/\s/g, "")
        .replace(/^(\d{4}).+(\d{4})$/, "$1 •••• •••• $2");

      paymentDetails = `
                <div class="review-item">
                    <span class="review-label">Payment Method:</span>
                    <span class="review-value">Credit Card</span>
                </div>
                <div class="review-item">
                    <span class="review-label">Card Number:</span>
                    <span class="review-value">${maskedCardNumber}</span>
                </div>
                <div class="review-item">
                    <span class="review-label">Card Holder:</span>
                    <span class="review-value">${payment.cardName}</span>
                </div>
                <div class="review-item">
                    <span class="review-label">Expiry Date:</span>
                    <span class="review-value">${payment.expiryDate}</span>
                </div>
            `;
    } else if (payment.method === "paypal") {
      paymentDetails = `
                <div class="review-item">
                    <span class="review-label">Payment Method:</span>
                    <span class="review-value">PayPal</span>
                </div>
                <div class="review-item">
                    <span class="review-label">PayPal Email:</span>
                    <span class="review-value">${userInfo.shipping.email}</span>
                </div>
            `;
    }

    // Add billing address
    if (!payment.sameAsShipping && billing) {
      paymentDetails += `
                <div class="review-item">
                    <span class="review-label">Billing Address:</span>
                    <span class="review-value">
                        ${billing.firstName} ${billing.lastName}
                        <br>${billing.address}
                        ${billing.apartment ? `, ${billing.apartment}` : ""}
                        <br>${billing.city}, ${billing.state} ${billing.zip}
                        <br>${billing.country}
                    </span>
                </div>
            `;
    } else {
      paymentDetails += `
                <div class="review-item">
                    <span class="review-label">Billing Address:</span>
                    <span class="review-value">Same as shipping address</span>
                </div>
            `;
    }

    paymentReview.innerHTML = paymentDetails;
  }

  // Update order items review
  const orderItemsReview = document.getElementById("order-items-review");
  if (orderItemsReview) {
    const cart = loadCart();

    let orderItemsHTML = "";

    cart.forEach((item) => {
      const product = getProductById(item.id);
      if (!product) return;

      let optionsText = "";
      if (item.options) {
        for (const [key, value] of Object.entries(item.options)) {
          optionsText += `${key}: ${value}, `;
        }
        optionsText = optionsText.slice(0, -2); // Remove trailing comma and space
      }

      orderItemsHTML += `
                <div class="review-order-item">
                    <div class="review-item-image">
                        <div class="image-placeholder">
                            <i class="fas ${getCategoryIcon(
                              item.category
                            )}"></i>
                        </div>
                    </div>
                    <div class="review-item-details">
                        <h4>${item.name}</h4>
                        <p class="review-item-meta">
                            Quantity: ${item.quantity}
                            ${optionsText ? `<br>${optionsText}` : ""}
                        </p>
                    </div>
                    <div class="review-item-price">
                        ${formatPrice(item.price * item.quantity)}
                    </div>
                </div>
            `;
    });

    orderItemsReview.innerHTML = orderItemsHTML;
  }
}

// Get shipping method name
function getShippingMethodName(method) {
  switch (method) {
    case "standard":
      return "Standard Shipping (3-5 business days)";
    case "express":
      return "Express Shipping (1-2 business days)";
    case "free":
      return "Free Shipping (5-7 business days)";
    default:
      return "Standard Shipping";
  }
}

// Place order
function placeOrder() {
  // Check terms agreement
  const termsAgreement = document.getElementById("terms-agreement");
  const termsError = document.getElementById("terms-error");

  if (!termsAgreement.checked) {
    termsError.textContent = "You must agree to the terms and conditions";
    return;
  } else {
    termsError.textContent = "";
  }

  // Show loading state
  const placeOrderBtn = document.getElementById("place-order-btn");
  placeOrderBtn.textContent = "Processing...";
  placeOrderBtn.disabled = true;

  // Simulate order processing
  setTimeout(() => {
    // Set order completed flag for success page
    localStorage.setItem("orderCompleted", "true");

    // Generate order ID and store in localStorage
    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("orderId", orderId);

    // Generate order date
    const orderDate = new Date().toISOString();
    localStorage.setItem("orderDate", orderDate);

    // Redirect to success page
    window.location.href = "success.html";
  }, 1500);
}
