/**
 * ShopEase - Products Page JavaScript
 * This file contains the functionality for the products listing page
 */

let currentProducts = [];
let currentPage = 1;
const productsPerPage = 8;
let currentView = "grid"; // 'grid' or 'list'

// Initialize the products page
document.addEventListener("DOMContentLoaded", function () {
  // Initialize filters and sorting
  initFilters();

  // Initialize view toggles
  initViewToggles();

  // Load products based on URL parameters
  loadProductsFromURL();

  // Initialize search functionality
  initSearch();

  // Initialize pagination
  initPagination();

  // Load recommended products
  loadRecommendedProducts();
});

// Initialize filters
function initFilters() {
  // Category filters
  const categoryCheckboxes = document.querySelectorAll(
    ".category-filters input"
  );
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.value === "all") {
        // If "All Categories" is checked, uncheck others
        if (this.checked) {
          categoryCheckboxes.forEach((cb) => {
            if (cb.value !== "all") {
              cb.checked = false;
            }
          });
        }
      } else {
        // If a specific category is checked, uncheck "All Categories"
        const allCategoriesCheckbox = document.getElementById("category-all");
        if (allCategoriesCheckbox) {
          allCategoriesCheckbox.checked = false;
        }
      }

      // Apply filters
      applyFilters();
    });
  });

  // Price filter
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const applyPriceBtn = document.getElementById("apply-price");

  if (applyPriceBtn) {
    applyPriceBtn.addEventListener("click", function () {
      applyFilters();
    });
  }

  // Rating filters
  const ratingCheckboxes = document.querySelectorAll(".rating-filters input");
  ratingCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      applyFilters();
    });
  });

  // Special offers filters
  const offerCheckboxes = document.querySelectorAll(".offer-filters input");
  offerCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      applyFilters();
    });
  });

  // Sort by select
  const sortBySelect = document.getElementById("sort-by");
  if (sortBySelect) {
    sortBySelect.addEventListener("change", function () {
      applyFilters();
    });
  }

  // Clear filters button
  const clearFiltersBtn = document.getElementById("clear-filters");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", function () {
      // Reset all checkboxes
      document
        .querySelectorAll('.filters-sidebar input[type="checkbox"]')
        .forEach((cb) => {
          if (cb.id === "category-all") {
            cb.checked = true;
          } else {
            cb.checked = false;
          }
        });

      // Reset price inputs
      if (minPriceInput) minPriceInput.value = "";
      if (maxPriceInput) maxPriceInput.value = "";

      // Apply filters (reset)
      applyFilters();
    });
  }
}

// Initialize view toggles
function initViewToggles() {
  const gridViewBtn = document.querySelector(".grid-view");
  const listViewBtn = document.querySelector(".list-view");
  const productsGrid = document.getElementById("products-grid");

  if (gridViewBtn && listViewBtn && productsGrid) {
    // Set initial view
    if (localStorage.getItem("productView") === "list") {
      productsGrid.classList.add("list-view");
      gridViewBtn.classList.remove("active");
      listViewBtn.classList.add("active");
      currentView = "list";
    } else {
      productsGrid.classList.remove("list-view");
      gridViewBtn.classList.add("active");
      listViewBtn.classList.remove("active");
      currentView = "grid";
    }

    // Grid view button
    gridViewBtn.addEventListener("click", function () {
      productsGrid.classList.remove("list-view");
      gridViewBtn.classList.add("active");
      listViewBtn.classList.remove("active");
      currentView = "grid";
      localStorage.setItem("productView", "grid");
    });

    // List view button
    listViewBtn.addEventListener("click", function () {
      productsGrid.classList.add("list-view");
      gridViewBtn.classList.remove("active");
      listViewBtn.classList.add("active");
      currentView = "list";
      localStorage.setItem("productView", "list");
    });
  }
}

// Load products based on URL parameters
function loadProductsFromURL() {
  const urlParams = getUrlParams();

  // Check for category parameter
  if (urlParams.category) {
    // Uncheck "All Categories" checkbox
    const allCategoriesCheckbox = document.getElementById("category-all");
    if (allCategoriesCheckbox) {
      allCategoriesCheckbox.checked = false;
    }

    // Check the corresponding category checkbox
    const categoryCheckbox = document.querySelector(
      `.category-filters input[value="${urlParams.category}"]`
    );
    if (categoryCheckbox) {
      categoryCheckbox.checked = true;
    }
  }

  // Check for sale parameter
  if (urlParams.sale === "true") {
    const saleCheckbox = document.getElementById("sale-items");
    if (saleCheckbox) {
      saleCheckbox.checked = true;
    }
  }

  // Check for new parameter
  if (urlParams.new === "true") {
    const newCheckbox = document.getElementById("new-items");
    if (newCheckbox) {
      newCheckbox.checked = true;
    }
  }

  // Check for search parameter
  if (urlParams.search) {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.value = urlParams.search;
    }
  }

  // Apply filters to load products
  applyFilters();
}

// Initialize search functionality
function initSearch() {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const resetSearchBtn = document.getElementById("reset-search");

  if (searchInput && searchBtn) {
    // Search button click event
    searchBtn.addEventListener("click", function () {
      applyFilters();
    });

    // Search input enter key event
    searchInput.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        applyFilters();
      }
    });
  }

  if (resetSearchBtn) {
    resetSearchBtn.addEventListener("click", function () {
      if (searchInput) {
        searchInput.value = "";
      }

      // Reset all filters
      document
        .querySelectorAll('.filters-sidebar input[type="checkbox"]')
        .forEach((cb) => {
          if (cb.id === "category-all") {
            cb.checked = true;
          } else {
            cb.checked = false;
          }
        });

      const minPriceInput = document.getElementById("min-price");
      const maxPriceInput = document.getElementById("max-price");
      if (minPriceInput) minPriceInput.value = "";
      if (maxPriceInput) maxPriceInput.value = "";

      // Apply filters (reset)
      applyFilters();
    });
  }
}

// Apply filters and load products
function applyFilters() {
  // Get search query
  const searchInput = document.getElementById("search-input");
  const searchQuery = searchInput ? searchInput.value.trim() : "";

  // Get selected categories
  const selectedCategories = [];
  const categoryCheckboxes = document.querySelectorAll(
    ".category-filters input:checked"
  );
  categoryCheckboxes.forEach((checkbox) => {
    if (checkbox.value !== "all") {
      selectedCategories.push(checkbox.value);
    }
  });

  // Get price range
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const minPrice =
    minPriceInput && minPriceInput.value
      ? parseFloat(minPriceInput.value)
      : null;
  const maxPrice =
    maxPriceInput && maxPriceInput.value
      ? parseFloat(maxPriceInput.value)
      : null;

  // Get minimum rating
  let minRating = null;
  const ratingCheckboxes = document.querySelectorAll(
    ".rating-filters input:checked"
  );
  ratingCheckboxes.forEach((checkbox) => {
    const rating = parseInt(checkbox.value);
    if (minRating === null || rating < minRating) {
      minRating = rating;
    }
  });

  // Get special offers
  const saleCheckbox = document.getElementById("sale-items");
  const newCheckbox = document.getElementById("new-items");
  const onSale = saleCheckbox && saleCheckbox.checked;
  const isNew = newCheckbox && newCheckbox.checked;

  // Get sort option
  const sortBySelect = document.getElementById("sort-by");
  const sortBy = sortBySelect ? sortBySelect.value : "featured";

  // Filter products
  let filteredProducts = [];

  if (searchQuery) {
    // Search products
    filteredProducts = searchProducts(searchQuery);
  } else {
    // Apply category filter
    if (selectedCategories.length === 0) {
      // If no categories selected or "All Categories" is selected, get all products
      filteredProducts = getAllProducts();
    } else {
      // Get products for selected categories
      selectedCategories.forEach((category) => {
        filteredProducts = [
          ...filteredProducts,
          ...getProductsByCategory(category),
        ];
      });
    }
  }

  // Apply price filter
  if (minPrice !== null) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice
    );
  }

  if (maxPrice !== null) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= maxPrice
    );
  }

  // Apply rating filter
  if (minRating !== null) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= minRating
    );
  }

  // Apply special offers filters
  if (onSale) {
    filteredProducts = filteredProducts.filter((product) => product.isSale);
  }

  if (isNew) {
    filteredProducts = filteredProducts.filter((product) => product.isNew);
  }

  // Sort products
  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filteredProducts = filteredProducts.sort((a, b) => b.isNew - a.isNew);
      break;
    case "featured":
    default:
      // Mix of new and featured products first
      filteredProducts = filteredProducts.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return b.rating - a.rating;
      });
      break;
  }

  // Update current products
  currentProducts = filteredProducts;
  currentPage = 1;

  // Update product count
  updateProductCount();

  // Display products
  displayProducts();

  // Update pagination
  updatePagination();
}

// Update product count display
function updateProductCount() {
  const productCountElement = document.getElementById("product-count");
  if (productCountElement) {
    productCountElement.textContent = currentProducts.length;
  }
}

// Display products
function displayProducts() {
  const productsGrid = document.getElementById("products-grid");
  const noResults = document.getElementById("no-results");

  if (!productsGrid || !noResults) return;

  // Clear products grid
  productsGrid.innerHTML = "";

  // Check if there are products to display
  if (currentProducts.length === 0) {
    productsGrid.style.display = "none";
    noResults.style.display = "block";

    // Hide pagination
    const pagination = document.getElementById("pagination");
    if (pagination) {
      pagination.style.display = "none";
    }

    return;
  }

  // Show products grid, hide no results message
  productsGrid.style.display = "grid";
  noResults.style.display = "none";

  // Calculate pagination
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = currentProducts.slice(startIndex, endIndex);

  // Add product cards
  paginatedProducts.forEach((product) => {
    const productCardHTML = createProductCardHTML(product);

    // Add product description for list view
    const productCard = document.createElement("div");
    productCard.innerHTML = productCardHTML;

    // Add description for list view
    if (currentView === "list") {
      const productDetails = productCard.querySelector(".product-details");
      if (productDetails) {
        const productDescription = document.createElement("p");
        productDescription.className = "product-description";
        productDescription.textContent = product.description;
        productDetails.insertBefore(
          productDescription,
          productDetails.querySelector(".product-actions")
        );
      }
    }

    productsGrid.appendChild(productCard.firstElementChild);
  });

  // Show pagination
  const pagination = document.getElementById("pagination");
  if (pagination) {
    pagination.style.display = "flex";
  }

  // Initialize "Add to Cart" buttons
  initAddToCartButtons();
}

// Initialize pagination
function initPagination() {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  pagination.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const page = parseInt(e.target.dataset.page);
      if (!isNaN(page)) {
        currentPage = page;
        displayProducts();
        updatePagination();

        // Scroll to top of products
        const productsGrid = document.getElementById("products-grid");
        if (productsGrid) {
          productsGrid.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  });
}

// Update pagination buttons
function updatePagination() {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  // Clear pagination
  pagination.innerHTML = "";

  // Calculate total pages
  const totalPages = Math.ceil(currentProducts.length / productsPerPage);

  // Create pagination buttons
  if (totalPages > 1) {
    // Previous button
    if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prevButton.dataset.page = currentPage - 1;
      pagination.appendChild(prevButton);
    }

    // Page buttons
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.dataset.page = i;

      if (i === currentPage) {
        pageButton.classList.add("active");
      }

      pagination.appendChild(pageButton);
    }

    // Next button
    if (currentPage < totalPages) {
      const nextButton = document.createElement("button");
      nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
      nextButton.dataset.page = currentPage + 1;
      pagination.appendChild(nextButton);
    }
  }
}

// Load recommended products
function loadRecommendedProducts() {
  const recommendedProductsContainer = document.getElementById(
    "recommended-products"
  );
  if (!recommendedProductsContainer) return;

  // Get featured products (different from the current display)
  const recommendedProducts = getOnSaleProducts(4);

  // Display products
  recommendedProductsContainer.innerHTML = "";

  if (recommendedProducts.length === 0) {
    recommendedProductsContainer.innerHTML =
      '<p class="no-results">No recommended products available.</p>';
    return;
  }

  // Add product cards
  recommendedProducts.forEach((product) => {
    recommendedProductsContainer.innerHTML += createProductCardHTML(product);
  });

  // Initialize "Add to Cart" buttons
  initAddToCartButtons();
}
