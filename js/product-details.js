/**
 * ShopEase - Product Details Page JavaScript
 * This file contains the functionality for the product details page
 */

let currentProduct = null;
let selectedOptions = {};

// Initialize the product details page
document.addEventListener("DOMContentLoaded", function () {
  // Load product based on URL parameter
  loadProductDetail();

  // Initialize tabs
  initTabs();

  // Track recently viewed products
  trackRecentlyViewed();
});

// Load product detail
function loadProductDetail() {
  // Get product ID from URL
  const urlParams = getUrlParams();
  const productId = urlParams.id;

  if (!productId) {
    showProductNotFound();
    return;
  }

  // Get product details
  currentProduct = getProductById(parseInt(productId));

  if (!currentProduct) {
    showProductNotFound();
    return;
  }

  // Display product details
  displayProductDetails();

  // Load related products
  loadRelatedProducts();

  // Load recently viewed products
  loadRecentlyViewedProducts();

  // Set page title
  document.title = `ShopEase - ${currentProduct.name}`;
}

// Show product not found message
function showProductNotFound() {
  const productDetailsContainer = document.getElementById("product-details");
  const productNotFoundContainer = document.getElementById("product-not-found");

  if (productDetailsContainer) {
    productDetailsContainer.style.display = "none";
  }

  if (productNotFoundContainer) {
    productNotFoundContainer.style.display = "block";
  }

  // Hide other sections
  const tabsSection = document.querySelector(".product-tabs-section");
  const relatedSection = document.querySelector(".related-products");
  const recentlyViewedSection = document.querySelector(".recently-viewed");

  if (tabsSection) tabsSection.style.display = "none";
  if (relatedSection) relatedSection.style.display = "none";
  if (recentlyViewedSection) recentlyViewedSection.style.display = "none";
}

// Display product details
function displayProductDetails() {
  const productDetailsContainer = document.getElementById("product-details");
  const breadcrumbSpan = document.getElementById("product-breadcrumb");

  if (!productDetailsContainer || !currentProduct) return;

  // Update breadcrumb
  if (breadcrumbSpan) {
    breadcrumbSpan.textContent = currentProduct.name;
  }

  // Generate product HTML
  const discountHTML =
    currentProduct.discount > 0
      ? `<span class="original-price">${formatPrice(
          currentProduct.originalPrice
        )}</span>
         <span class="discount">${currentProduct.discount}% OFF</span>`
      : "";

  const productHTML = `
        <div class="product-gallery">
            <div class="product-main-image">
                <div class="image-placeholder">
                    <i class="fas ${getCategoryIcon(
                      currentProduct.category
                    )} fa-4x"></i>
                </div>
            </div>
            <div class="product-thumbnails">
                <div class="product-thumbnail active">
                    <div class="image-placeholder">
                        <i class="fas ${getCategoryIcon(
                          currentProduct.category
                        )}"></i>
                    </div>
                </div>
                <div class="product-thumbnail">
                    <div class="image-placeholder">
                        <i class="fas ${getCategoryIcon(
                          currentProduct.category
                        )}"></i>
                    </div>
                </div>
                <div class="product-thumbnail">
                    <div class="image-placeholder">
                        <i class="fas ${getCategoryIcon(
                          currentProduct.category
                        )}"></i>
                    </div>
                </div>
                <div class="product-thumbnail">
                    <div class="image-placeholder">
                        <i class="fas ${getCategoryIcon(
                          currentProduct.category
                        )}"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-info">
            <h1>${currentProduct.name}</h1>
            <div class="product-meta">
                <div class="product-rating">
                    ${generateStarRatingHTML(currentProduct.rating)}
                    <span class="rating-count">(${
                      currentProduct.reviews
                    } reviews)</span>
                </div>
                <div class="product-category">
                    <i class="fas fa-tag"></i>
                    <span>Category: ${
                      currentProduct.category.charAt(0).toUpperCase() +
                      currentProduct.category.slice(1)
                    }</span>
                </div>
                <div class="product-stock">
                    <i class="fas fa-check-circle"></i>
                    <span>In Stock</span>
                </div>
            </div>
            <div class="product-price-detail">
                <span class="current-price">${formatPrice(
                  currentProduct.price
                )}</span>
                ${discountHTML}
            </div>
            <div class="product-description">
                <p>${currentProduct.description}</p>
            </div>
            ${generateOptionsHTML()}
            <div class="quantity-selector">
                <label for="quantity">Quantity:</label>
                <div class="quantity-input">
                    <button type="button" class="quantity-decrease">-</button>
                    <input type="number" id="quantity" name="quantity" min="1" value="1">
                    <button type="button" class="quantity-increase">+</button>
                </div>
            </div>
            <div class="product-actions-detail">
                <button class="btn primary-btn" id="add-to-cart-detail">Add to Cart</button>
                <button class="btn secondary-btn" id="buy-now">Buy Now</button>
                <button class="wishlist-btn" id="add-to-wishlist">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="product-share">
                <h3>Share This Product</h3>
                <div class="share-links">
                    <a href="#" class="share-link" data-platform="facebook">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="share-link" data-platform="twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="share-link" data-platform="pinterest">
                        <i class="fab fa-pinterest-p"></i>
                    </a>
                    <a href="#" class="share-link" data-platform="email">
                        <i class="far fa-envelope"></i>
                    </a>
                </div>
            </div>
        </div>
    `;

  // Set product details HTML
  productDetailsContainer.innerHTML = productHTML;

  // Initialize product thumbnails
  initProductThumbnails();

  // Initialize quantity selector
  initQuantitySelector();

  // Initialize options selectors
  initOptionsSelectors();

  // Initialize add to cart button
  initAddToCartDetailButton();

  // Initialize buy now button
  initBuyNowButton();

  // Initialize wishlist button
  initWishlistButton();

  // Initialize share links
  initShareLinks();

  // Initialize product tabs content
  initTabsContent();
}

// Generate options HTML (colors, sizes, etc.)
function generateOptionsHTML() {
  let optionsHTML = "";

  // Add color options if available
  if (currentProduct.colors && currentProduct.colors.length > 0) {
    const colorOptions = currentProduct.colors
      .map((color) => {
        // Convert color name to CSS color value
        const colorValue = color.toLowerCase().replace(" ", "");

        return `
                <div class="color-option" data-color="${color}" style="background-color: ${colorValue};">
                </div>
            `;
      })
      .join("");

    optionsHTML += `
            <div class="product-variation">
                <h3>Color:</h3>
                <div class="variation-options color-options">
                    ${colorOptions}
                </div>
                <p id="selected-color"></p>
            </div>
        `;
  }

  // Add size options if available
  if (currentProduct.sizes && currentProduct.sizes.length > 0) {
    const sizeOptions = currentProduct.sizes
      .map((size) => {
        return `
                <div class="variation-option" data-size="${size}">
                    ${size}
                </div>
            `;
      })
      .join("");

    optionsHTML += `
            <div class="product-variation">
                <h3>Size:</h3>
                <div class="variation-options size-options">
                    ${sizeOptions}
                </div>
                <p id="selected-size"></p>
            </div>
        `;
  }

  return optionsHTML;
}

// Initialize product thumbnails
function initProductThumbnails() {
  const thumbnails = document.querySelectorAll(".product-thumbnail");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked thumbnail
      this.classList.add("active");
    });
  });
}

// Initialize quantity selector
function initQuantitySelector() {
  const quantityInput = document.getElementById("quantity");
  const decreaseBtn = document.querySelector(".quantity-decrease");
  const increaseBtn = document.querySelector(".quantity-increase");

  if (!quantityInput || !decreaseBtn || !increaseBtn) return;

  // Decrease button
  decreaseBtn.addEventListener("click", function () {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantityInput.value = quantity - 1;
    }
  });

  // Increase button
  increaseBtn.addEventListener("click", function () {
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
  });

  // Validate input
  quantityInput.addEventListener("change", function () {
    let quantity = parseInt(this.value);
    if (isNaN(quantity) || quantity < 1) {
      this.value = 1;
    }
  });
}

// Initialize options selectors
function initOptionsSelectors() {
  // Color options
  const colorOptions = document.querySelectorAll(".color-option");
  const selectedColorText = document.getElementById("selected-color");

  if (colorOptions.length > 0 && selectedColorText) {
    // Set default selected color
    const defaultColor = colorOptions[0].dataset.color;
    colorOptions[0].classList.add("active");
    selectedColorText.textContent = `Selected: ${defaultColor}`;
    selectedOptions.color = defaultColor;

    colorOptions.forEach((option) => {
      option.addEventListener("click", function () {
        // Remove active class from all options
        colorOptions.forEach((o) => o.classList.remove("active"));

        // Add active class to clicked option
        this.classList.add("active");

        // Update selected color text
        const selectedColor = this.dataset.color;
        selectedColorText.textContent = `Selected: ${selectedColor}`;

        // Update selected options
        selectedOptions.color = selectedColor;
      });
    });
  }

  // Size options
  const sizeOptions = document.querySelectorAll(".variation-option[data-size]");
  const selectedSizeText = document.getElementById("selected-size");

  if (sizeOptions.length > 0 && selectedSizeText) {
    // Set default selected size
    const defaultSize = sizeOptions[0].dataset.size;
    sizeOptions[0].classList.add("active");
    selectedSizeText.textContent = `Selected: ${defaultSize}`;
    selectedOptions.size = defaultSize;

    sizeOptions.forEach((option) => {
      option.addEventListener("click", function () {
        // Remove active class from all options
        sizeOptions.forEach((o) => o.classList.remove("active"));

        // Add active class to clicked option
        this.classList.add("active");

        // Update selected size text
        const selectedSize = this.dataset.size;
        selectedSizeText.textContent = `Selected: ${selectedSize}`;

        // Update selected options
        selectedOptions.size = selectedSize;
      });
    });
  }
}

// Initialize add to cart button
function initAddToCartDetailButton() {
  const addToCartBtn = document.getElementById("add-to-cart-detail");

  if (!addToCartBtn) return;

  addToCartBtn.addEventListener("click", function () {
    // Get quantity
    const quantityInput = document.getElementById("quantity");
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    // Add to cart
    const added = addToCart(currentProduct.id, quantity, selectedOptions);

    if (added) {
      // Show notification
      showNotification("Product added to cart", "success");

      // Animate button
      addToCartBtn.classList.add("added");
      addToCartBtn.textContent = "Added to Cart";

      setTimeout(() => {
        addToCartBtn.classList.remove("added");
        addToCartBtn.textContent = "Add to Cart";
      }, 2000);
    }
  });
}

// Initialize buy now button
function initBuyNowButton() {
  const buyNowBtn = document.getElementById("buy-now");

  if (!buyNowBtn) return;

  buyNowBtn.addEventListener("click", function () {
    // Get quantity
    const quantityInput = document.getElementById("quantity");
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    // Add to cart
    const added = addToCart(currentProduct.id, quantity, selectedOptions);

    if (added) {
      // Redirect to checkout
      window.location.href = "checkout.html";
    }
  });
}

// Initialize wishlist button
function initWishlistButton() {
  const wishlistBtn = document.getElementById("add-to-wishlist");

  if (!wishlistBtn) return;

  // Check if product is in wishlist
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const isInWishlist = wishlist.some((item) => item.id === currentProduct.id);

  // Update button state
  if (isInWishlist) {
    wishlistBtn.classList.add("active");
    wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
  }

  wishlistBtn.addEventListener("click", function () {
    // Toggle wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const index = wishlist.findIndex((item) => item.id === currentProduct.id);

    if (index === -1) {
      // Add to wishlist
      wishlist.push({
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        category: currentProduct.category,
        dateAdded: new Date().toISOString(),
      });

      wishlistBtn.classList.add("active");
      wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
      showNotification("Product added to wishlist", "success");
    } else {
      // Remove from wishlist
      wishlist.splice(index, 1);

      wishlistBtn.classList.remove("active");
      wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
      showNotification("Product removed from wishlist", "info");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  });
}

// Initialize share links
function initShareLinks() {
  const shareLinks = document.querySelectorAll(".share-link");

  if (!shareLinks.length) return;

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(currentProduct.name);
  const shareDescription = encodeURIComponent(currentProduct.description);

  shareLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const platform = this.dataset.platform;
      let shareWindow;

      switch (platform) {
        case "facebook":
          shareWindow = window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
            "facebook-share",
            "width=580,height=520"
          );
          break;
        case "twitter":
          shareWindow = window.open(
            `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`,
            "twitter-share",
            "width=550,height=420"
          );
          break;
        case "pinterest":
          shareWindow = window.open(
            `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareTitle}`,
            "pinterest-share",
            "width=750,height=550"
          );
          break;
        case "email":
          window.location.href = `mailto:?subject=${shareTitle}&body=Check out this product: ${shareUrl}`;
          return;
      }

      if (shareWindow) {
        shareWindow.focus();
      }
    });
  });
}

// Initialize tabs
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and panels
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Show corresponding panel
      const tabId = this.dataset.tab;
      const tabPanel = document.getElementById(`${tabId}-tab`);

      if (tabPanel) {
        tabPanel.classList.add("active");
      }
    });
  });
}

// Initialize tabs content
function initTabsContent() {
  // Description tab
  const descriptionTab = document.getElementById("description-tab");
  if (descriptionTab) {
    descriptionTab.innerHTML = `
            <p>${currentProduct.details}</p>
        `;
  }

  // Specifications tab
  const specificationsTab = document.getElementById("specifications-tab");
  if (specificationsTab && currentProduct.specifications) {
    let specificationsHTML = '<table class="specification-table">';

    currentProduct.specifications.forEach((spec) => {
      specificationsHTML += `
                <tr>
                    <th>${spec.name}</th>
                    <td>${spec.value}</td>
                </tr>
            `;
    });

    specificationsHTML += "</table>";
    specificationsTab.innerHTML = specificationsHTML;
  }

  // Reviews tab
  initReviewsTab();
}

// Initialize reviews tab
function initReviewsTab() {
  const reviewsTab = document.getElementById("reviews-tab");
  if (!reviewsTab) return;

  // Update average rating display
  updateReviewSummary();

  // Load reviews
  loadReviews();

  // Initialize review form
  initReviewForm();
}

// Update review summary
function updateReviewSummary() {
  // Get reviews data
  const reviews = currentProduct.reviews_data || [];

  // Calculate counts for each rating
  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
  });

  // Update counts display
  document.getElementById("reviews-count").textContent = reviews.length;
  document.getElementById("five-star-count").textContent = ratingCounts[5];
  document.getElementById("four-star-count").textContent = ratingCounts[4];
  document.getElementById("three-star-count").textContent = ratingCounts[3];
  document.getElementById("two-star-count").textContent = ratingCounts[2];
  document.getElementById("one-star-count").textContent = ratingCounts[1];

  // Update rating bars
  const totalReviews = reviews.length;
  if (totalReviews > 0) {
    document.getElementById("five-star-bar").style.width = `${
      (ratingCounts[5] / totalReviews) * 100
    }%`;
    document.getElementById("four-star-bar").style.width = `${
      (ratingCounts[4] / totalReviews) * 100
    }%`;
    document.getElementById("three-star-bar").style.width = `${
      (ratingCounts[3] / totalReviews) * 100
    }%`;
    document.getElementById("two-star-bar").style.width = `${
      (ratingCounts[2] / totalReviews) * 100
    }%`;
    document.getElementById("one-star-bar").style.width = `${
      (ratingCounts[1] / totalReviews) * 100
    }%`;
  }

  // Update average rating
  document.getElementById("rating-value").textContent =
    currentProduct.rating.toFixed(1);
  document.getElementById("average-rating").innerHTML =
    generateStarRatingHTML(currentProduct.rating) +
    `<span id="rating-value">${currentProduct.rating.toFixed(1)}</span>`;
}

// Load reviews
function loadReviews() {
  const reviewsList = document.getElementById("reviews-list");
  if (!reviewsList) return;

  // Get reviews data
  const reviews = currentProduct.reviews_data || [];

  // Clear reviews list
  reviewsList.innerHTML = "";

  // Check if there are reviews
  if (reviews.length === 0) {
    reviewsList.innerHTML =
      '<p class="no-reviews">There are no reviews yet. Be the first to write a review!</p>';
    return;
  }

  // Add reviews
  reviews.forEach((review) => {
    const reviewHTML = `
            <div class="review">
                <div class="review-header">
                    <div class="reviewer-info">
                        <h4>${review.user}</h4>
                        <div class="rating">
                            ${generateStarRatingHTML(review.rating)}
                        </div>
                    </div>
                    <div class="review-date">
                        ${formatDate(review.date)}
                    </div>
                </div>
                <div class="review-content">
                    <h3 class="review-title">${review.title}</h3>
                    <p>${review.comment}</p>
                </div>
            </div>
        `;

    reviewsList.innerHTML += reviewHTML;
  });
}

// Initialize review form
function initReviewForm() {
  const writeReviewBtn = document.getElementById("write-review-btn");
  const reviewForm = document.getElementById("review-form");
  const cancelReviewBtn = document.getElementById("cancel-review");
  const reviewSubmissionForm = document.getElementById(
    "review-submission-form"
  );
  const starRating = document.querySelector(".star-rating");
  const ratingInput = document.getElementById("rating-input");

  if (
    !writeReviewBtn ||
    !reviewForm ||
    !cancelReviewBtn ||
    !reviewSubmissionForm
  )
    return;

  // Write review button
  writeReviewBtn.addEventListener("click", function () {
    reviewForm.style.display = "block";
    this.style.display = "none";
  });

  // Cancel review button
  cancelReviewBtn.addEventListener("click", function () {
    reviewForm.style.display = "none";
    writeReviewBtn.style.display = "block";
    reviewSubmissionForm.reset();

    // Reset star rating
    document.querySelectorAll(".star-rating i").forEach((star) => {
      star.className = "far fa-star";
    });
    ratingInput.value = 0;
  });

  // Star rating
  if (starRating && ratingInput) {
    const stars = starRating.querySelectorAll("i");

    stars.forEach((star) => {
      star.addEventListener("mouseover", function () {
        const rating = parseInt(this.dataset.rating);

        // Highlight stars on hover
        stars.forEach((s) => {
          const starRating = parseInt(s.dataset.rating);
          if (starRating <= rating) {
            s.className = "fas fa-star";
          } else {
            s.className = "far fa-star";
          }
        });
      });

      star.addEventListener("mouseout", function () {
        const selectedRating = parseInt(ratingInput.value);

        // Reset stars to selected rating on mouseout
        stars.forEach((s) => {
          const starRating = parseInt(s.dataset.rating);
          if (starRating <= selectedRating) {
            s.className = "fas fa-star";
          } else {
            s.className = "far fa-star";
          }
        });
      });

      star.addEventListener("click", function () {
        const rating = parseInt(this.dataset.rating);
        ratingInput.value = rating;

        // Set selected rating
        stars.forEach((s) => {
          const starRating = parseInt(s.dataset.rating);
          if (starRating <= rating) {
            s.className = "fas fa-star";
          } else {
            s.className = "far fa-star";
          }
        });
      });
    });
  }

  // Review submission form
  reviewSubmissionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const reviewerName = document.getElementById("reviewer-name").value.trim();
    const reviewerEmail = document
      .getElementById("reviewer-email")
      .value.trim();
    const rating = parseInt(ratingInput.value);
    const reviewTitle = document.getElementById("review-title").value.trim();
    const reviewContent = document
      .getElementById("review-content")
      .value.trim();

    // Validate form
    if (
      !reviewerName ||
      !reviewerEmail ||
      !rating ||
      !reviewTitle ||
      !reviewContent
    ) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    // Create new review
    const newReview = {
      id: Date.now(),
      user: reviewerName,
      rating: rating,
      title: reviewTitle,
      comment: reviewContent,
      date: new Date().toISOString(),
    };

    // Add review to product
    const products = getAllProducts();
    const productIndex = products.findIndex((p) => p.id === currentProduct.id);

    if (productIndex !== -1) {
      // Initialize reviews_data array if it doesn't exist
      if (!products[productIndex].reviews_data) {
        products[productIndex].reviews_data = [];
      }

      // Add review to product
      products[productIndex].reviews_data.push(newReview);

      // Update product rating
      const reviews = products[productIndex].reviews_data;
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      products[productIndex].rating = (totalRating / reviews.length).toFixed(1);
      products[productIndex].reviews = reviews.length;

      // Update localStorage
      localStorage.setItem("products", JSON.stringify(products));

      // Update current product
      currentProduct = products[productIndex];

      // Update reviews display
      updateReviewSummary();
      loadReviews();

      // Hide review form
      reviewForm.style.display = "none";
      writeReviewBtn.style.display = "block";

      // Reset form
      reviewSubmissionForm.reset();

      // Reset star rating
      document.querySelectorAll(".star-rating i").forEach((star) => {
        star.className = "far fa-star";
      });
      ratingInput.value = 0;

      // Show success notification
      showNotification(
        "Your review has been submitted successfully",
        "success"
      );
    }
  });
}

// Load related products
function loadRelatedProducts() {
  const relatedProductsContainer = document.getElementById("related-products");
  if (!relatedProductsContainer || !currentProduct) return;

  // Get related products
  const relatedProducts = getRelatedProducts(currentProduct.id, 4);

  // Clear container
  relatedProductsContainer.innerHTML = "";

  // Display products
  if (relatedProducts.length === 0) {
    relatedProductsContainer.innerHTML =
      '<p class="no-results">No related products available.</p>';
    return;
  }

  // Add product cards
  relatedProducts.forEach((product) => {
    relatedProductsContainer.innerHTML += createProductCardHTML(product);
  });

  // Initialize "Add to Cart" buttons
  initAddToCartButtons();
}

// Track recently viewed products
function trackRecentlyViewed() {
  if (!currentProduct) return;

  // Get recently viewed products from localStorage
  let recentlyViewed = JSON.parse(
    localStorage.getItem("recentlyViewed") || "[]"
  );

  // Remove current product if already in the list
  recentlyViewed = recentlyViewed.filter(
    (item) => item.id !== currentProduct.id
  );

  // Add current product to the beginning of the list
  recentlyViewed.unshift({
    id: currentProduct.id,
    name: currentProduct.name,
    price: currentProduct.price,
    category: currentProduct.category,
    rating: currentProduct.rating,
    reviews: currentProduct.reviews,
    viewedAt: new Date().toISOString(),
  });

  // Limit to 10 items
  if (recentlyViewed.length > 10) {
    recentlyViewed = recentlyViewed.slice(0, 10);
  }

  // Save to localStorage
  localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
}

// Load recently viewed products
function loadRecentlyViewedProducts() {
  const recentlyViewedContainer = document.getElementById(
    "recently-viewed-products"
  );
  if (!recentlyViewedContainer) return;

  // Get recently viewed products from localStorage
  let recentlyViewed = JSON.parse(
    localStorage.getItem("recentlyViewed") || "[]"
  );

  // Remove current product
  recentlyViewed = recentlyViewed.filter(
    (item) => item.id !== currentProduct.id
  );

  // Clear container
  recentlyViewedContainer.innerHTML = "";

  // Display products
  if (recentlyViewed.length === 0) {
    const recentlyViewedSection = document.querySelector(".recently-viewed");
    if (recentlyViewedSection) {
      recentlyViewedSection.style.display = "none";
    }
    return;
  }

  // Show only up to 4 products
  recentlyViewed = recentlyViewed.slice(0, 4);

  // Add product cards
  recentlyViewed.forEach((item) => {
    const product = getProductById(item.id);
    if (product) {
      recentlyViewedContainer.innerHTML += createProductCardHTML(product);
    }
  });

  // Initialize "Add to Cart" buttons
  initAddToCartButtons();
}
