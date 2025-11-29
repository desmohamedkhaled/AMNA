// AMNA Shop - Enhanced Main JavaScript functionality
// Advanced DOM manipulation, animations, and localStorage usage

// Load mock data from external file
// Note: In a real application, this would be loaded from a server
// For now, we'll use the products array from mockdata.js

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkLoginStatus();
    
    // Initialize navigation
    initializeNavigation();
    // Init theme toggle for Chinese theme
    // Theme toggle removed - Chinese design is now the default
    
    // Initialize forms
    initializeForms();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize cart count
    updateCartCountOnLoad();
    // Initialize wishlist count
    updateWishlistCount();
    
    // Initialize product display
    initializeProductDisplay();
    // Render featured products if productGrid exists on homepage
    if (document.getElementById('productGrid')) {
        renderFeaturedProducts();
    }
    
});

// Theme handling moved to CSS: use `css/themes/china.css`.
// Legacy JS helpers for toggling themes have been removed to simplify runtime.

// Update cart count on page load
function updateCartCountOnLoad() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
        element.style.display = cartCount > 0 ? 'flex' : 'none';
    });
}

// Check if user is logged in and update UI accordingly
function checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (user) {
        const userData = JSON.parse(user);
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            
            // Check if user is admin
            if (userData.role === 'admin') {
                userMenu.innerHTML = `
                    <a href="dashboard.html">Dashboard</a>
                    <a href="admin-dashboard.html">Admin Panel</a>
                    <a href="#" onclick="logout()">Logout</a>
                `;
            } else {
                userMenu.innerHTML = `
                    <a href="dashboard.html">Dashboard</a>
                    <a href="#" onclick="logout()">Logout</a>
                `;
            }
        }
    }
}

// Initialize navigation functionality
function initializeNavigation() {
    // Mobile menu toggle (if needed)
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// Initialize form functionality
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Store contact message in localStorage
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(contactData);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Show success message
    alert('Thank you for your message! We will contact you soon.');
    e.target.reset();
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // First check mock data users
    const mockUser = users.find(u => u.email === email && u.password === password);
    
    if (mockUser) {
        // Store current user
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        alert('Login successful!');
        
        // Redirect based on role
        if (mockUser.role === 'admin') {
            localStorage.setItem('isAdmin', 'true');
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'dashboard.html';
        }
        return;
    }
    
    // Fallback to localStorage users
    const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = localUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Handle signup form submission
function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        signupDate: new Date().toISOString()
    };
    
    // Get existing users
    let users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
        alert('A user with this email already exists!');
        return;
    }
    
    // Add new user
    users.push(userData);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    alert('Logout successful!');
    window.location.href = 'index.html';
}

// Add to cart function (for product pages)
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingItem = cart.find(item => String(item.id) === String(productId));
    const prod = products.find(p => String(p.id) === String(productId));
    if (prod && prod.stock !== undefined && prod.stock === 0) {
        showNotification('This product is currently out of stock', 'warning');
        return;
    }
    
    if (existingItem) {
        if (prod && prod.stock !== undefined && existingItem.quantity >= prod.stock) {
            showNotification(`Only ${prod.stock} left in stock`, 'warning');
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
    
    showNotification(`${productName} has been added to cart!`, 'success');
}

// Get cart total
function getCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Clear cart
function clearCart() {
    localStorage.removeItem('cart');
}

// Utility function to format currency
function formatCurrency(amount) {
    return `${amount} EGP`;
}

// Initialize animations
function initializeAnimations() {
    // Add staggered animation to cards
    const cards = document.querySelectorAll('.product-card, .team-member, .gallery-item, .service-item, .dashboard-action');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add hover sound effect (visual feedback)
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'in-view' for reveal elements, otherwise use 'animate-in'
                if (entry.target.classList.contains('reveal')) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation and reveal
    document.querySelectorAll('.section-title, .product-card, .team-member, .service-item, .reveal, .testimonial').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced add to cart with animation
function addToCartWithAnimation(productId, productName, productPrice) {
    // Check stock before adding to cart
    const prod = products.find(p => String(p.id) === String(productId));
    if (prod && prod.stock !== undefined && prod.stock === 0) {
        showNotification('Cannot add to cart: Product is out of stock', 'warning');
        return;
    }
    // Add to cart
    addToCart(productId, productName, productPrice);
    
    // Create floating animation
    const button = event.target;
    const rect = button.getBoundingClientRect();
    
    const floatingText = document.createElement('div');
    floatingText.textContent = 'Added to cart!';
    floatingText.style.cssText = `
        position: fixed;
        top: ${rect.top}px;
        left: ${rect.left}px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
        z-index: 10000;
        pointer-events: none;
        animation: floatUp 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(floatingText);
    
    // Remove after animation
    setTimeout(() => {
        document.body.removeChild(floatingText);
    }, 1500);
}

// ========================================
// SHOP BY CATEGORY FUNCTIONALITY
// ========================================

// Initialize product display (enhanced)
function initializeProductDisplay() {
    // Show all products by default on shop page
    if (document.getElementById('productGrid')) {
        showAllProducts();
    }
    
    // Initialize gallery products if on gallery page
    if (document.getElementById('galleryProductGrid')) {
        initializeGalleryDisplay();
    }
    
    // Initialize enhanced shop features
    initializeEnhancedShopFeatures();
}

// Initialize enhanced shop features
function initializeEnhancedShopFeatures() {
    // Set up compare button click handler
    const compareBtn = document.getElementById('compareBtn');
    if (compareBtn) {
        compareBtn.addEventListener('click', openCompareModal);
    }
    
    // Initialize search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Initialize view mode
    const viewModeBtn = document.getElementById('viewModeBtn');
    if (viewModeBtn) {
        viewModeBtn.addEventListener('click', toggleViewMode);
    }
}


// Filter products with multiple criteria
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const priceFilter = document.getElementById('priceFilter')?.value || '';
    const sortFilter = document.getElementById('sortFilter')?.value || 'name';
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    // Filter by price range
    if (priceFilter) {
        filteredProducts = filteredProducts.filter(product => {
            const price = product.price;
            switch (priceFilter) {
                case '0-25': return price >= 0 && price <= 25;
                case '25-50': return price > 25 && price <= 50;
                case '50-100': return price > 50 && price <= 100;
                case '100+': return price > 100;
                default: return true;
            }
        });
    }
    
    // Sort products
    filteredProducts.sort((a, b) => {
        switch (sortFilter) {
            case 'name': return a.name.localeCompare(b.name);
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'category': return a.category.localeCompare(b.category);
            default: return 0;
        }
    });
    
    // Display filtered products
    const title = categoryFilter ? `Products in ${categoryFilter} Category` : 'All Products';
    displayProducts(filteredProducts, title);
    
    // Scroll to products section
    const productsSection = document.querySelector('#productsContainer');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Clear all filters (enhanced)
function clearFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    const availabilityFilter = document.getElementById('availabilityFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (categoryFilter) categoryFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    if (sortFilter) sortFilter.value = 'name';
    if (availabilityFilter) availabilityFilter.value = '';
    if (searchInput) searchInput.value = '';
    
    // Reset pagination
    currentPage = 1;
    
    showAllProducts();
}

// Show all products (enhanced)
function showAllProducts() {
    // Reset filters
    const searchInputEl = document.getElementById('searchInput');
    if (searchInputEl) searchInputEl.value = '';
    const categoryFilterEl = document.getElementById('categoryFilter');
    if (categoryFilterEl) categoryFilterEl.value = '';
    const priceFilterEl = document.getElementById('priceFilter');
    if (priceFilterEl) priceFilterEl.value = '';
    const availabilityFilterEl = document.getElementById('availabilityFilter');
    if (availabilityFilterEl) availabilityFilterEl.value = '';
    const sortFilterEl = document.getElementById('sortFilter');
    if (sortFilterEl) sortFilterEl.value = 'name';
    
    // Reset pagination
    currentPage = 1;
    
    // Show all products
    displayProductsWithPagination(products);
    updateResultsSummary(products.length);
    updateActiveFilters();
}

// Display products in the grid
function displayProducts(productsToShow, title) {
    const productGrid = document.getElementById('productGrid');
    const productsContainer = document.getElementById('productsContainer');
    
    if (!productGrid || !productsContainer) return;
    
    // Update section title
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.textContent = title;
    }
    
    // Clear existing products
    productGrid.innerHTML = '';
    
    // Add filter indicator if not showing all products
    let filterIndicator = document.querySelector('.filter-indicator');
    if (title !== 'All Products') {
        if (!filterIndicator) {
            filterIndicator = document.createElement('div');
            filterIndicator.className = 'filter-indicator';
            productsContainer.insertBefore(filterIndicator, productGrid);
        }
        filterIndicator.innerHTML = `
            <h3>Showing ${productsToShow.length} products in ${title.replace('Products in ', '').replace(' Category', '')}</h3>
            <p>Click "Show All Products" to view all available items</p>
        `;
    } else if (filterIndicator) {
        filterIndicator.remove();
    }
    
    // Display products
    productsToShow.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productGrid.appendChild(productCard);
    });
    
    // Add animation to new products
    animateProductCards();
}

// Render featured products for the homepage (top 6)
function renderFeaturedProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid || !products || products.length === 0) return;

    // Choose top 6 highest-rated products as featured
    const featured = [...products]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 6);

    productGrid.innerHTML = '';
    featured.forEach((product, index) => {
        const card = createProductCard(product, index);
        productGrid.appendChild(card);
    });
    // Animate product cards
    animateProductCards();
}

// Create a product card element
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.dataset.productId = product.id;
    
    // Use image from mock data (image property) or fallback to img
    const productImage = product.image || product.img;
    
    const inWishlist = isInWishlist(product.id);
    const outOfStock = (product.stock === 0);
    const lowStock = (product.stock > 0 && product.stock <= 5);
    const hasShipping = (product.price >= 1000);
    const isOnSale = Math.random() > 0.8;
    const originalPrice = product.price;
    const discountPercent = isOnSale ? Math.floor(Math.random() * 21) + 5 : 0; // 5% - 25%
    const salePrice = isOnSale ? Math.round(originalPrice * (1 - discountPercent / 100)) : originalPrice;

    card.innerHTML = `
        <div class="product-image">
            <button class="wishlist-btn ${inWishlist ? 'active' : ''}" title="Add to wishlist" aria-pressed="${inWishlist}" onclick="toggleWishlistFromCard('${product.id}', this)">
                <span class="heart">❤️</span>
            </button>
            <img loading="lazy" src="${productImage}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">
            <div class="product-overlay">
                <button class="btn btn-quick-view" onclick="openQuickView('${product.id}')">Quick View</button>
            </div>
            ${outOfStock ? '<div class=\"out-of-stock\">Out of stock</div>' : ''}
            ${lowStock ? `<div class=\"badge low-stock\">⚠️ Low stock (${product.stock} left)</div>` : ''}
            ${hasShipping ? '<div class=\"badge shipping\">🚚 Free Shipping</div>' : ''}
        </div>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-meta">
            <span class="product-category">${product.category}</span>
            <span class="product-reviews"> • (${product.reviews || 0})</span>
        </div>
        <p class="product-snippet">${product.description ? (product.description.length > 80 ? product.description.slice(0,80) + '...' : product.description) : ''}</p>
        <p class="product-price">${isOnSale ? salePrice + ' EGP' : product.price + ' EGP'} ${isOnSale ? `<span class="original-price">${originalPrice} EGP</span> <span class="discount-badge">-${discountPercent}%</span>` : ''}</p>
        <div class="product-rating" style="display: flex; align-items: center; gap: 5px; margin: 10px 0;" aria-label="Rating: ${product.rating || 4} out of 5">
            <span style="color: #ffc107;">${'⭐'.repeat(Math.floor(product.rating || 4))}</span>
            <span style="color: #666; font-size: 14px;">(${product.reviews || 0})</span>
        </div>
            <div class="product-card-cta" role="group" aria-label="Product actions">
            <button class="btn btn-primary" ${outOfStock ? 'aria-disabled="true" disabled' : ''} onclick="addToCartWithAnimation('${product.id}', '${product.name}', ${product.price})">${outOfStock ? 'Out of stock' : 'Add to Cart'}</button>
            <a href="product.html?id=${product.id}" class="btn btn-secondary" style="text-align: center; text-decoration: none;">View Details</a>
        </div>
    `;
    
    return card;
}

// Animate product cards
function animateProductCards() {
    const cards = document.querySelectorAll('#productGrid .product-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ========================================
// QUICK VIEW FUNCTIONALITY
// ========================================

// Open quick view modal
let lastFocusedElementBeforeModal = null;
function openQuickView(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;
    
    // Use images array or single image from mock data
    const images = (product.images && product.images.length) ? product.images : ((product.image || product.img) ? [product.image || product.img] : []);
    const productImage = images.length ? images[0] : (product.image || product.img);
    
    // Populate modal with product data
    document.getElementById('quickViewImage').src = productImage;
    document.getElementById('quickViewImage').alt = product.name;
    document.getElementById('quickViewTitle').textContent = product.name;
    const isOnSale = product.onSale || (Math.random() > 0.82);
    const originalPriceQV = product.price;
    const discountPercentQV = isOnSale ? Math.floor(Math.random() * 21) + 8 : 0; // 8% - 28%
    const salePriceQV = isOnSale ? Math.round(originalPriceQV * (1 - discountPercentQV / 100)) : originalPriceQV;
    document.getElementById('quickViewPrice').textContent = `${isOnSale ? salePriceQV : originalPriceQV} EGP`;
    const originalPriceEl = document.getElementById('quickViewOriginalPrice');
    const discountBadge = document.getElementById('discountBadge');
    if (isOnSale) {
        if (originalPriceEl) { originalPriceEl.textContent = `${originalPriceQV} EGP`; originalPriceEl.style.display = 'inline-block'; }
        if (discountBadge) { discountBadge.textContent = `-${discountPercentQV}%`; discountBadge.style.display = 'inline-block'; }
    } else {
        if (originalPriceEl) originalPriceEl.style.display = 'none';
        if (discountBadge) discountBadge.style.display = 'none';
    }
    document.getElementById('quickViewCategory').textContent = `Category: ${product.category}`;
    document.getElementById('quickViewDescription').textContent = product.description || 'A high-quality product from AMNA Shop. Perfect for your needs with excellent value and reliability.';
    
    // Populate thumbnails
    const thumbsContainer = document.getElementById('quickViewThumbs');
    if (thumbsContainer) {
        thumbsContainer.innerHTML = '';
        images.forEach((imgUrl, idx) => {
            const t = document.createElement('img');
            t.src = imgUrl;
            t.alt = `${product.name} thumbnail ${idx + 1}`;
            t.className = idx === 0 ? 'active' : '';
            t.tabIndex = 0;
            t.setAttribute('role', 'button');
            t.onclick = () => setQuickViewImage(imgUrl, idx);
            t.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setQuickViewImage(imgUrl, idx); } };
            thumbsContainer.appendChild(t);
        });
    }

    // Update product features with specifications if available
    const productFeatures = document.getElementById('productFeatures');
    if (productFeatures && product.specifications) {
        const featuresList = productFeatures.querySelector('ul');
        if (featuresList) {
            featuresList.innerHTML = '';
            // Show first 4 key specifications
            const keySpecs = Object.entries(product.specifications).slice(0, 4);
            keySpecs.forEach(([key, value]) => {
                const li = document.createElement('li');
                li.innerHTML = `✅ ${key}: ${value}`;
                featuresList.appendChild(li);
            });
        }
    }
    
    // Set up add to cart button
    const addToCartBtn = document.getElementById('quickViewAddToCart');
    // Track selected variant (color/storage)
    let selectedColor = null;
    let selectedStorage = null;

    addToCartBtn.onclick = () => {
        const quantity = parseInt(document.getElementById('quickViewQuantity').value) || 1;
        // Check stock
        if (product.stock === 0) {
            showNotification('This product is out of stock', 'warning');
            return;
        }
        for (let i = 0; i < quantity; i++) {
            addToCartWithAnimation(product.id, product.name, salePriceQV || product.price);
        }
        closeQuickView();
    };
    // disable if out of stock
    if (product.stock === 0) {
        addToCartBtn.disabled = true;
        addToCartBtn.setAttribute('aria-disabled', 'true');
    } else {
        addToCartBtn.disabled = false;
        addToCartBtn.setAttribute('aria-disabled', 'false');
    }
    
    // Set up view full details link
    const viewFullDetailsLink = document.getElementById('viewFullDetailsLink');
    if (viewFullDetailsLink) {
        viewFullDetailsLink.href = `product.html?id=${product.id}`;
        viewFullDetailsLink.onclick = (e) => {
            e.preventDefault();
            closeQuickView();
            let href = `product.html?id=${product.id}`;
            if (selectedColor) href += `&color=${encodeURIComponent(selectedColor)}`;
            window.location.href = href;
        };
    }

    // Update rating and reviews if available
    const productRatingEl = document.getElementById('productRating');
    if (productRatingEl) {
        const starsEl = productRatingEl.querySelector('.stars');
        const ratingText = productRatingEl.querySelector('.rating-text');
        if (starsEl) starsEl.textContent = '⭐'.repeat(Math.floor(product.rating || 4));
        if (ratingText) ratingText.textContent = `(${(product.rating || 4).toFixed(1)}/5) • ${product.reviews || 0} reviews`;
    }

    // Quick view share button (copy link)
    const quickViewShareBtn = document.getElementById('quickViewShare');
    if (quickViewShareBtn) {
        quickViewShareBtn.onclick = () => {
            const productUrl = `${window.location.origin}/product.html?id=${product.id}`;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(productUrl).then(() => {
                    showNotification('Product link copied to clipboard', 'success');
                }).catch(() => {
                    alert(`Product link: ${productUrl}`);
                });
            } else {
                alert(`Product link: ${productUrl}`);
            }
        };
    }
    
    // Availability
    const availabilityEl = document.getElementById('quickViewAvailability');
    if (availabilityEl) {
        if (product.stock === 0) {
            availabilityEl.textContent = 'Out of stock';
            availabilityEl.classList.add('out-of-stock');
        } else if (product.stock <= 5) {
            availabilityEl.textContent = `Only ${product.stock} left`;
            availabilityEl.classList.remove('out-of-stock');
        } else {
            availabilityEl.textContent = 'In stock';
            availabilityEl.classList.remove('out-of-stock');
        }
    }

    // Colors / variants
    const colorContainer = document.getElementById('quickViewColorOptions');
    if (colorContainer) {
        colorContainer.innerHTML = '';
        // Look for product.colors or specifications Colors key
        let colors = product.colors;
        if (!colors && product.specifications) {
            // try to find any key with 'color' substring (case-insensitive)
            const colorKey = Object.keys(product.specifications).find(k => /color/i.test(k));
            if (colorKey) {
                colors = String(product.specifications[colorKey]).split(/,\s*/).slice(0, 6);
            }
        }
        if (Array.isArray(colors) && colors.length) {
            colors.forEach((c, idx) => {
                const btn = document.createElement('button');
                btn.className = 'variant-swatch';
                btn.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
                btn.style.background = c.trim().toLowerCase();
                btn.title = c.trim();
                btn.onclick = () => {
                    selectedColor = c.trim();
                    // set active aria-pressed
                    colorContainer.querySelectorAll('.variant-swatch').forEach(s => s.setAttribute('aria-pressed', 'false'));
                    btn.setAttribute('aria-pressed', 'true');
                    // update image alt to include selected color
                    const qImg = document.getElementById('quickViewImage');
                    if (qImg) qImg.alt = `${product.name} - ${selectedColor}`;
                };
                colorContainer.appendChild(btn);
                if (idx === 0) selectedColor = c.trim();
            });
        }
    }

    // Show modal
    const modal = document.getElementById('quickViewModal');
    if (!modal) return;
    lastFocusedElementBeforeModal = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Add animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Focus trap and keyboard handling inside modal
    const focusableSelector = 'a[href], button:not([disabled]), textarea, input[type="text"], input[type="number"], select, [tabindex]:not([tabindex="-1"])';
    const focusableEls = modal.querySelectorAll(focusableSelector);
    let firstFocusable = focusableEls[0];
    let lastFocusable = focusableEls[focusableEls.length - 1];

    function quickViewKeyHandler(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // shift + tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else { // tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        } else if (e.key === 'Escape') {
            closeQuickView();
        }
    }
    document.addEventListener('keydown', quickViewKeyHandler);
    // Attach handler to modal so we can remove later
    modal._quickViewKeyHandler = quickViewKeyHandler;
    if (firstFocusable) firstFocusable.focus();

    // Set quantity max to available stock if present
    const quickQty = document.getElementById('quickViewQuantity');
    if (quickQty) {
        quickQty.max = product.stock || 10;
        if (Number(quickQty.value) > quickQty.max) quickQty.value = quickQty.max;
    }
}

// Close quick view modal
function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    setTimeout(() => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        // Remove key handler if set
        if (modal._quickViewKeyHandler) {
            document.removeEventListener('keydown', modal._quickViewKeyHandler);
            delete modal._quickViewKeyHandler;
        }
        // Return focus to the element that opened the modal
        try { if (lastFocusedElementBeforeModal) lastFocusedElementBeforeModal.focus(); } catch (err) {}
    }, 300);
}

// Helper to set main image in quick view and update active thumbnail
function setQuickViewImage(src, idx) {
    const img = document.getElementById('quickViewImage');
    if (!img) return;
    img.src = src;
    // Update active class on thumbnails
    const thumbContainer = document.getElementById('quickViewThumbs');
    if (thumbContainer) {
        thumbContainer.querySelectorAll('img').forEach((t, i) => t.classList.toggle('active', i === idx));
    }
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('quickViewModal');
    const closeBtn = document.querySelector('.quick-view-close');
    
    if (closeBtn) {
        closeBtn.onclick = closeQuickView;
    }
    
    if (modal) {
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeQuickView();
            }
        };
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeQuickView();
        }
    });
});

// ========================================
// GALLERY PAGE FUNCTIONALITY
// ========================================

// Initialize gallery display
function initializeGalleryDisplay() {
    // Show all products by default
    showAllGalleryProducts();
}

// Filter gallery products with multiple criteria
function filterGalleryProducts() {
    const categoryFilter = document.getElementById('galleryCategoryFilter')?.value || '';
    const priceFilter = document.getElementById('galleryPriceFilter')?.value || '';
    const sortFilter = document.getElementById('gallerySortFilter')?.value || 'name';
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    // Filter by price range
    if (priceFilter) {
        filteredProducts = filteredProducts.filter(product => {
            const price = product.price;
            switch (priceFilter) {
                case '0-25': return price >= 0 && price <= 25;
                case '25-50': return price > 25 && price <= 50;
                case '50-100': return price > 50 && price <= 100;
                case '100+': return price > 100;
                default: return true;
            }
        });
    }
    
    // Sort products
    filteredProducts.sort((a, b) => {
        switch (sortFilter) {
            case 'name': return a.name.localeCompare(b.name);
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'category': return a.category.localeCompare(b.category);
            default: return 0;
        }
    });
    
    // Display filtered products
    const title = categoryFilter ? `Products in ${categoryFilter} Category` : 'All Products';
    displayGalleryProducts(filteredProducts, title);
    
    // Scroll to products section
    const productsSection = document.querySelector('#galleryProductsContainer');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Clear all gallery filters
function clearGalleryFilters() {
    const categoryFilter = document.getElementById('galleryCategoryFilter');
    const priceFilter = document.getElementById('galleryPriceFilter');
    const sortFilter = document.getElementById('gallerySortFilter');
    
    if (categoryFilter) categoryFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    if (sortFilter) sortFilter.value = 'name';
    
    showAllGalleryProducts();
}

// Show all gallery products
function showAllGalleryProducts() {
    displayGalleryProducts(products, 'All Products');
}

// Display products in the gallery grid
function displayGalleryProducts(productsToShow, title) {
    const productGrid = document.getElementById('galleryProductGrid');
    const productsContainer = document.getElementById('galleryProductsContainer');
    
    if (!productGrid || !productsContainer) return;
    
    // Update section title
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.textContent = title;
    }
    
    // Clear existing products
    productGrid.innerHTML = '';
    
    // Add filter indicator if not showing all products
    let filterIndicator = document.querySelector('.filter-indicator');
    if (title !== 'All Products') {
        if (!filterIndicator) {
            filterIndicator = document.createElement('div');
            filterIndicator.className = 'filter-indicator';
            productsContainer.insertBefore(filterIndicator, productGrid);
        }
        filterIndicator.innerHTML = `
            <h3>Showing ${productsToShow.length} products in ${title.replace('Products in ', '').replace(' Category', '')}</h3>
            <p>Click "Show All Products" to view all available items</p>
        `;
    } else if (filterIndicator) {
        filterIndicator.remove();
    }
    
    // Display products
    productsToShow.forEach((product, index) => {
        const productCard = createGalleryProductCard(product, index);
        productGrid.appendChild(productCard);
    });
    
    // Add animation to new products
    animateGalleryProductCards();
}

// Create a gallery product card element
function createGalleryProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'gallery-item';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    card.innerHTML = `
        <div class="gallery-image">
            <img loading="lazy" src="${product.image || product.img}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="gallery-caption">
            <h3>${product.name}</h3>
            <p>High-quality ${product.category.toLowerCase()} product</p>
            <p style="color: #667eea; font-weight: bold; margin-top: 10px;">${product.price} EGP</p>
            <button class="btn btn-primary" onclick="addToCartWithAnimation('${product.id}', '${product.name}', ${product.price})" style="margin-top: 10px;">Add to Cart</button>
        </div>
    `;
    
    return card;
}

// Animate gallery product cards
function animateGalleryProductCards() {
    const cards = document.querySelectorAll('#galleryProductGrid .gallery-item');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ========================================
// ENHANCED SHOP FUNCTIONALITY
// ========================================

// Global variables for enhanced shop features
let currentPage = 1;
let itemsPerPage = 12;
let currentViewMode = 'grid'; // 'grid' or 'list'
let compareMode = false;
let selectedProducts = [];
let searchTimeout;

// Enhanced search functionality
function handleSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        if (searchTerm.length >= 2 || searchTerm.length === 0) {
            filterProducts();
        }
    }, 300);
}

// Enhanced filter products with search
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const priceFilter = document.getElementById('priceFilter')?.value || '';
    const sortFilter = document.getElementById('sortFilter')?.value || 'name';
    const availabilityFilter = document.getElementById('availabilityFilter')?.value || '';
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
    
    let filteredProducts = [...products];
    
    // Filter by search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm))
        );
    }
    
    // Filter by category
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    // Filter by price range
    if (priceFilter) {
        filteredProducts = filteredProducts.filter(product => {
            const price = product.price;
            switch (priceFilter) {
                case '0-25': return price >= 0 && price <= 25;
                case '25-50': return price > 25 && price <= 50;
                case '50-100': return price > 50 && price <= 100;
                case '100+': return price > 100;
                default: return true;
            }
        });
    }
    
    // Filter by availability (mock data)
    if (availabilityFilter) {
        filteredProducts = filteredProducts.filter(product => {
            // Mock availability logic
            switch (availabilityFilter) {
                case 'in-stock': return Math.random() > 0.1; // 90% in stock
                case 'low-stock': return Math.random() > 0.8; // 20% low stock
                case 'new-arrivals': return product.id > 15; // Last 5 products are new
                default: return true;
            }
        });
    }
    
    // Sort products
    filteredProducts.sort((a, b) => {
        switch (sortFilter) {
            case 'name': return a.name.localeCompare(b.name);
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'category': return a.category.localeCompare(b.category);
            case 'popularity': return Math.random() - 0.5; // Mock popularity
            default: return 0;
        }
    });
    
    // Update results summary
    updateResultsSummary(filteredProducts.length);
    
    // Update active filters display
    updateActiveFilters();
    
    // Display filtered products with pagination
    displayProductsWithPagination(filteredProducts);
    
    // Scroll to products section
    const productsSection = document.querySelector('#productsContainer');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update results summary
function updateResultsSummary(count) {
    const resultsCount = document.getElementById('resultsCount');
    const resultsTime = document.getElementById('resultsTime');
    
    if (resultsCount) {
        resultsCount.textContent = `${count} product${count !== 1 ? 's' : ''} found`;
    }
    
    if (resultsTime) {
        resultsTime.textContent = `Search completed in ${Math.random() * 100 + 50}ms`;
    }
}

// Update active filters display
function updateActiveFilters() {
    const activeFilters = document.getElementById('activeFilters');
    const filterTags = document.getElementById('filterTags');
    
    if (!activeFilters || !filterTags) return;
    
    const filters = [];
    const categoryFilter = document.getElementById('categoryFilter')?.value;
    const priceFilter = document.getElementById('priceFilter')?.value;
    const availabilityFilter = document.getElementById('availabilityFilter')?.value;
    const searchTerm = document.getElementById('searchInput')?.value.trim();
    
    if (categoryFilter) filters.push({ type: 'Category', value: categoryFilter });
    if (priceFilter) filters.push({ type: 'Price', value: getPriceRangeText(priceFilter) });
    if (availabilityFilter) filters.push({ type: 'Availability', value: availabilityFilter });
    if (searchTerm) filters.push({ type: 'Search', value: searchTerm });
    
    if (filters.length > 0) {
        activeFilters.style.display = 'block';
        filterTags.innerHTML = filters.map(filter => 
            `<span class="filter-tag">
                ${filter.type}: ${filter.value}
                <span class="remove" onclick="removeFilter('${filter.type}')">×</span>
            </span>`
        ).join('');
    } else {
        activeFilters.style.display = 'none';
    }
}

// Get price range text
function getPriceRangeText(priceFilter) {
    switch (priceFilter) {
        case '0-25': return '$0 - $25';
        case '25-50': return '$25 - $50';
        case '50-100': return '$50 - $100';
        case '100+': return '$100+';
        default: return priceFilter;
    }
}

// Remove specific filter
function removeFilter(filterType) {
    switch (filterType) {
        case 'Category':
            document.getElementById('categoryFilter').value = '';
            break;
        case 'Price':
            document.getElementById('priceFilter').value = '';
            break;
        case 'Availability':
            document.getElementById('availabilityFilter').value = '';
            break;
        case 'Search':
            document.getElementById('searchInput').value = '';
            break;
    }
    filterProducts();
}

// Display products with pagination
function displayProductsWithPagination(productsToShow) {
    const productGrid = document.getElementById('productGrid');
    const noResults = document.getElementById('noResults');
    const pagination = document.getElementById('pagination');
    
    if (!productGrid) return;
    
    // Show/hide no results
    if (productsToShow.length === 0) {
        productGrid.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        if (pagination) pagination.style.display = 'none';
        return;
    } else {
        productGrid.style.display = 'grid';
        if (noResults) noResults.style.display = 'none';
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(productsToShow.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = productsToShow.slice(startIndex, endIndex);
    
    // Clear existing products
    productGrid.innerHTML = '';
    
    // Display paginated products
    paginatedProducts.forEach((product, index) => {
        const productCard = createEnhancedProductCard(product, startIndex + index);
        productGrid.appendChild(productCard);
    });
    
    // Update pagination
    updatePagination(totalPages);
    
    // Add animation to new products
    animateProductCards();
}

// Create enhanced product card
function createEnhancedProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.dataset.productId = product.id;
    
    // Add product badges
    const badges = [];
    if (product.id > 15) badges.push(`<span class=\"badge new\">🆕 New</span>`);
    if (Math.random() > 0.7) badges.push(`<span class=\"badge popular\">⭐ Popular</span>`);
    const isOnSale = Math.random() > 0.8;
    if (isOnSale) badges.push(`<span class=\"badge sale\">🔥 Sale</span>`);
    // Low stock
    const lowStock = (product.stock > 0 && product.stock <= 5);
    if (lowStock) badges.push(`<span class=\"badge low-stock\">⚠️ Low stock (${product.stock} left)</span>`);
    if (product.stock === 0) badges.push(`<span class=\"badge out-of-stock\">⛔ Out</span>`);
    // Free shipping badge for higher priced items
    if (product.price >= 1000) badges.push(`<span class=\"badge shipping\">🚚 Free Shipping</span>`);
    
    // Sale price logic
    const originalPrice = product.price;
    const discountPercent = isOnSale ? Math.floor(Math.random() * 21) + 10 : 0; // 10% - 30%
    const salePrice = isOnSale ? Math.round(originalPrice * (1 - discountPercent / 100)) : originalPrice;

    card.innerHTML = `
        <div class="compare-checkbox" onclick="toggleProductComparison('${product.id}')" onkeydown="if(event.key==='Enter'||event.key===' ') toggleProductComparison('${product.id}')" role="checkbox" aria-checked="false" tabindex="0"></div>
        <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" title="Add to wishlist" aria-pressed="${isInWishlist(product.id)}" onclick="toggleWishlistFromCard('${product.id}', this)">
            <span class="heart">❤️</span>
        </button>
        <div class="product-image">
            <img loading="lazy" src="${product.image || product.img}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">
            <div class="product-overlay">
                    <button class="btn btn-quick-view" onclick="openQuickView('${product.id}')">Quick View</button>
            </div>
            ${product.stock === 0 ? '<div class="out-of-stock">Out of stock</div>' : ''}
        </div>
        <div class="product-badges">${badges.join('')}</div>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-meta">
            <span class="product-category">${product.category}</span>
            <span class="product-reviews"> • (${product.reviews || Math.floor(Math.random()*200)})</span>
        </div>
        <p class="product-snippet">${product.description ? (product.description.length > 80 ? product.description.slice(0,80) + '...' : product.description) : ''}</p>
        <p class="product-price">${isOnSale ? salePrice + ' EGP' : product.price + ' EGP'} ${isOnSale ? `<span class=\"original-price\">${originalPrice} EGP</span> <span class=\"discount-badge\">-${discountPercent}%</span>` : ''}</p>
        <div class="product-rating" aria-label="Rating: ${Math.floor(Math.random() * 2) + 4} out of 5">
            <div class="stars">${'⭐'.repeat(Math.floor(Math.random() * 2) + 4)}</div>
            <span class="rating-count">(${Math.floor(Math.random() * 200) + 10})</span>
        </div>
            <div class="product-card-cta" role="group" aria-label="Product actions">
            <button class="btn btn-primary" ${product.stock === 0 ? 'aria-disabled="true" disabled' : ''} onclick="addToCartWithAnimation('${product.id}', '${product.name}', ${product.price})">${product.stock === 0 ? 'Out of stock' : 'Add to Cart'}</button>
            <a href="product.html?id=${product.id}" class="btn btn-secondary" style="text-align: center; text-decoration: none;">View Details</a>
        </div>
    `;
    
    return card;
}

// Update pagination
function updatePagination(totalPages) {
    const pagination = document.getElementById('pagination');
    const pageInfo = document.getElementById('pageInfo');
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    
    if (!pagination || !pageInfo || !prevPage || !nextPage) return;
    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'flex';
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages;
}

// Change page
function changePage(direction) {
    const totalProducts = getFilteredProducts().length;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        filterProducts();
    }
}

// Get filtered products (helper function)
function getFilteredProducts() {
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const priceFilter = document.getElementById('priceFilter')?.value || '';
    const availabilityFilter = document.getElementById('availabilityFilter')?.value || '';
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
    
    let filteredProducts = [...products];
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    if (priceFilter) {
        filteredProducts = filteredProducts.filter(product => {
            const price = product.price;
            switch (priceFilter) {
                case '0-25': return price >= 0 && price <= 25;
                case '25-50': return price > 25 && price <= 50;
                case '50-100': return price > 50 && price <= 100;
                case '100+': return price > 100;
                default: return true;
            }
        });
    }
    
    if (availabilityFilter) {
        filteredProducts = filteredProducts.filter(product => {
            switch (availabilityFilter) {
                case 'in-stock': return Math.random() > 0.1;
                case 'low-stock': return Math.random() > 0.8;
                case 'new-arrivals': return product.id > 15;
                default: return true;
            }
        });
    }
    
    return filteredProducts;
}

// Toggle view mode
function toggleViewMode() {
    const viewModeBtn = document.getElementById('viewModeBtn');
    const productGrid = document.getElementById('productGrid');
    
    currentViewMode = currentViewMode === 'grid' ? 'list' : 'grid';
    
    if (currentViewMode === 'list') {
        productGrid.style.gridTemplateColumns = '1fr';
        productGrid.style.gap = '20px';
        viewModeBtn.innerHTML = '<span>⊞</span> Grid View';
    } else {
        productGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(320px, 1fr))';
        productGrid.style.gap = '32px';
        viewModeBtn.innerHTML = '<span>📋</span> List View';
    }
}

// Toggle compare mode
function toggleCompareMode() {
    compareMode = !compareMode;
    const productCards = document.querySelectorAll('.product-card');
    const compareBtn = document.getElementById('compareBtn');
    
    productCards.forEach(card => {
        if (compareMode) {
            card.classList.add('compare-mode');
        } else {
            card.classList.remove('compare-mode');
        }
    });
    
    if (compareMode) {
        compareBtn.style.display = 'flex';
    } else {
        compareBtn.style.display = 'none';
        selectedProducts = [];
        updateCompareCount();
    }
}

// Toggle product comparison
function toggleProductComparison(productId) {
    if (!compareMode) return;
    
    const index = selectedProducts.indexOf(productId);
    if (index > -1) {
        selectedProducts.splice(index, 1);
    } else {
        if (selectedProducts.length < 4) { // Max 4 products for comparison
            selectedProducts.push(productId);
        } else {
            alert('You can compare up to 4 products at a time.');
            return;
        }
    }
    
    updateCompareCount();
    updateCompareCheckboxes();
}

// Update compare count
function updateCompareCount() {
    const compareCount = document.getElementById('compareCount');
    if (compareCount) {
        compareCount.textContent = selectedProducts.length;
    }
}

// Update compare checkboxes
function updateCompareCheckboxes() {
    const checkboxes = document.querySelectorAll('.compare-checkbox');
    checkboxes.forEach(checkbox => {
        const productId = checkbox.closest('.product-card').dataset.productId;
        const checked = selectedProducts.includes(productId);
        checkbox.classList.toggle('checked', checked);
        checkbox.setAttribute('aria-checked', checked ? 'true' : 'false');
    });
}

// Open comparison modal
function openCompareModal() {
    if (selectedProducts.length < 2) {
        alert('Please select at least 2 products to compare.');
        return;
    }
    
    const modal = document.getElementById('compareModal');
    const compareBody = document.getElementById('compareBody');
    
    const productsToCompare = selectedProducts.map(id => 
        products.find(p => p.id == id)
    ).filter(Boolean);
    
    compareBody.innerHTML = createComparisonTable(productsToCompare);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Create comparison table
function createComparisonTable(products) {
    if (products.length === 0) return '<p>No products to compare.</p>';
    
    const features = ['Name', 'Price', 'Category', 'Rating', 'Availability'];
    
    let table = '<table class="compare-table"><thead><tr><th>Feature</th>';
    products.forEach(product => {
        table += `<th class="compare-product">
            <img src="${product.image || product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">${product.price} EGP</div>
        </th>`;
    });
    table += '</tr></thead><tbody>';
    
    features.forEach(feature => {
        table += `<tr><td>${feature}</td>`;
        products.forEach(product => {
            let value = '';
            switch (feature) {
                case 'Name': value = product.name; break;
                case 'Price': value = `${product.price} EGP`; break;
                case 'Category': value = product.category; break;
                case 'Rating': value = `${'⭐'.repeat(4)} (4.2/5)`; break;
                case 'Availability': value = Math.random() > 0.1 ? 'In Stock' : 'Low Stock'; break;
            }
            table += `<td>${value}</td>`;
        });
        table += '</tr>';
    });
    
    table += '</tbody></table>';
    return table;
}

// Close comparison modal
function closeCompareModal() {
    const modal = document.getElementById('compareModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Clear comparison
function clearComparison() {
    selectedProducts = [];
    updateCompareCount();
    updateCompareCheckboxes();
    closeCompareModal();
}

// Enhanced quick view with new features
function openQuickView(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;
    
    // Populate modal with enhanced product data
    document.getElementById('quickViewImage').src = product.image || product.img;
    document.getElementById('quickViewImage').alt = product.name;
    document.getElementById('quickViewTitle').textContent = product.name;
    document.getElementById('quickViewPrice').textContent = `${product.price} EGP`;
    document.getElementById('quickViewCategory').textContent = `Category: ${product.category}`;
    document.getElementById('quickViewDescription').textContent = 
        product.description || 'A high-quality product from AMNA Shop. Perfect for your needs with excellent value and reliability.';
    
    // Update product features with specifications if available
    const productFeatures = document.getElementById('productFeatures');
    if (productFeatures && product.specifications) {
        const featuresList = productFeatures.querySelector('ul');
        if (featuresList) {
            featuresList.innerHTML = '';
            // Show first 4 key specifications
            const keySpecs = Object.entries(product.specifications).slice(0, 4);
            keySpecs.forEach(([key, value]) => {
                const li = document.createElement('li');
                li.innerHTML = `✅ ${key}: ${value}`;
                featuresList.appendChild(li);
            });
        }
    }
    
    // Set up enhanced buttons
    const addToCartBtn = document.getElementById('quickViewAddToCart');
    const wishlistBtn = document.getElementById('quickViewWishlist');
    
    addToCartBtn.onclick = () => {
        const quantity = parseInt(document.getElementById('quickViewQuantity').value) || 1;
        for (let i = 0; i < quantity; i++) {
            addToCartWithAnimation(product.id, product.name, product.price);
        }
        closeQuickView();
    };
    
    if (wishlistBtn) {
        wishlistBtn.classList.toggle('active', isInWishlist(product.id));
        wishlistBtn.setAttribute('aria-pressed', isInWishlist(product.id));
    }
    wishlistBtn.onclick = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            showNotification(`${product.name} removed from wishlist`, 'info');
        } else {
            addToWishlist(product.id, product.name, product.price);
        }
        // Update wishlist button state
        if (wishlistBtn) {
            wishlistBtn.classList.toggle('active', isInWishlist(product.id));
            wishlistBtn.setAttribute('aria-pressed', isInWishlist(product.id));
        }
        updateWishlistCount();
        closeQuickView();
    };
    
    // Set up view full details link
    const viewFullDetailsLink = document.getElementById('viewFullDetailsLink');
    if (viewFullDetailsLink) {
        viewFullDetailsLink.href = `product.html?id=${product.id}`;
        viewFullDetailsLink.onclick = (e) => {
            e.preventDefault();
            closeQuickView();
            window.location.href = `product.html?id=${product.id}`;
        };
    }
    
    // Show modal
    const modal = document.getElementById('quickViewModal');
    if (!modal) return;
    lastFocusedElementBeforeModal = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Image zoom functionality
function zoomImage(factor) {
    const img = document.getElementById('quickViewImage');
    const currentScale = parseFloat(img.style.transform.replace('scale(', '').replace(')', '')) || 1;
    const newScale = Math.max(0.5, Math.min(3, currentScale * factor));
    img.style.transform = `scale(${newScale})`;
}

function resetZoom() {
    const img = document.getElementById('quickViewImage');
    img.style.transform = 'scale(1)';
}

// Quantity controls
function changeQuantity(delta) {
    const quantityInput = document.getElementById('quickViewQuantity');
    const currentValue = parseInt(quantityInput.value) || 1;
    const newValue = Math.max(1, Math.min(10, currentValue + delta));
    quantityInput.value = newValue;
}

// Add to wishlist
function addToWishlist(productId, productName, productPrice) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (!wishlist.find(item => String(item.id) === String(productId))) {
        wishlist.push({
            id: productId,
            name: productName,
            price: productPrice,
            addedDate: new Date().toISOString()
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showNotification(`${productName} has been added to wishlist!`, 'success');
        updateWishlistCount();
    } else {
        showNotification(`${productName} is already in your wishlist!`, 'info');
    }
}

// Update wishlist count in navigation
function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const wishlistCountElements = document.querySelectorAll('#wishlistCount');
    const wishlistNavBadge = document.getElementById('wishlistCountNav');
    const wishlistNavBadgeSmall = document.getElementById('wishlistCountNavSmall');
    wishlistCountElements.forEach(element => {
        element.textContent = wishlist.length;
        element.style.display = wishlist.length > 0 ? 'flex' : 'none';
    });
    if (wishlistNavBadge) {
        wishlistNavBadge.textContent = wishlist.length;
        wishlistNavBadge.style.display = wishlist.length > 0 ? 'inline-flex' : 'none';
    }
    if (wishlistNavBadgeSmall) {
        wishlistNavBadgeSmall.textContent = wishlist.length;
        wishlistNavBadgeSmall.style.display = wishlist.length > 0 ? 'inline-flex' : 'none';
    }
}

// Remove from wishlist
function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlist = wishlist.filter(item => String(item.id) !== String(productId));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    showNotification('Item removed from wishlist', 'success');
}

// Check if product is in wishlist
function isInWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return wishlist.find(item => String(item.id) === String(productId)) !== undefined;
}


// Toggle wishlist state from card button
function toggleWishlistFromCard(productId, btn) {
    const id = Number(productId);
    if (isInWishlist(id)) {
        removeFromWishlist(id);
        if (btn) {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
            btn.classList.add('pulse');
            setTimeout(() => { btn.classList.remove('pulse'); }, 700);
        }
    } else {
        // Ideally product name/price would be passed, but we can fetch product
        const product = products.find(p => p.id == id);
        addToWishlist(id, product ? product.name : 'Product', product ? product.price : 0);
        if (btn) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            btn.classList.add('pulse');
            setTimeout(() => { btn.classList.remove('pulse'); }, 700);
        }
    }
    updateWishlistCount();
}

// Show notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    notification.setAttribute('role', 'status');
    notification.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Global search function
function performGlobalSearch(query) {
    if (!query || query.trim().length < 2) {
        showNotification('Please enter at least 2 characters to search', 'warning');
        return;
    }
    
    // Redirect to search page with query
    window.location.href = `search.html?q=${encodeURIComponent(query.trim())}`;
}

// Initialize global search
function initializeGlobalSearch() {
    const searchInputs = document.querySelectorAll('#globalSearchInput');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performGlobalSearch(this.value);
            }
        });
    });
    
    const searchButtons = document.querySelectorAll('#globalSearchBtn');
    searchButtons.forEach(button => {
        button.addEventListener('click', function() {
            const searchInput = document.querySelector('#globalSearchInput');
            if (searchInput) {
                performGlobalSearch(searchInput.value);
            }
        });
    });
}

// Enhanced error handling
function handleError(error, context = '') {
    console.error(`Error in ${context}:`, error);
    showNotification(`An error occurred: ${error.message || error}`, 'error');
}

// Data persistence functions
function backupData() {
    const data = {
        users: JSON.parse(localStorage.getItem('registeredUsers') || '[]'),
        orders: JSON.parse(localStorage.getItem('orders') || '[]'),
        cart: JSON.parse(localStorage.getItem('cart') || '[]'),
        wishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
        contactMessages: JSON.parse(localStorage.getItem('contactMessages') || '[]'),
        backupDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amna_shop_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Data backup created successfully!', 'success');
}

function restoreData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.users) localStorage.setItem('registeredUsers', JSON.stringify(data.users));
            if (data.orders) localStorage.setItem('orders', JSON.stringify(data.orders));
            if (data.cart) localStorage.setItem('cart', JSON.stringify(data.cart));
            if (data.wishlist) localStorage.setItem('wishlist', JSON.stringify(data.wishlist));
            if (data.contactMessages) localStorage.setItem('contactMessages', JSON.stringify(data.contactMessages));
            
            showNotification('Data restored successfully!', 'success');
            location.reload();
        } catch (error) {
            handleError(error, 'Data Restore');
        }
    };
    reader.readAsText(file);
}

// Initialize all enhanced functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functionality
    checkLoginStatus();
    initializeNavigation();
    initializeForms();
    initializeAnimations();
    initializeScrollEffects();
    updateCartCountOnLoad();
    initializeProductDisplay();
    
    // Initialize new functionality
    initializeGlobalSearch();
    updateWishlistCount();
    
    // Initialize error handling and backup systems
    if (typeof window.errorHandler === 'undefined') {
        // Load error handler if not already loaded
        const errorScript = document.createElement('script');
        errorScript.src = 'js/error-handler.js';
        document.head.appendChild(errorScript);
    }
    
    if (typeof window.backupSystem === 'undefined') {
        // Load backup system if not already loaded
        const backupScript = document.createElement('script');
        backupScript.src = 'js/backup-system.js';
        document.head.appendChild(backupScript);
    }
    
    // Global search in navbar disabled on homepage request
    // If needed in future, enable by setting ENABLE_GLOBAL_SEARCH = true
    const ENABLE_GLOBAL_SEARCH = false;
    if (ENABLE_GLOBAL_SEARCH) {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && !document.querySelector('#globalSearchInput')) {
            const searchLi = document.createElement('li');
            searchLi.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px; padding: 5px 10px; background: #f8f9fa; border-radius: 20px;">
                    <input type="text" id="globalSearchInput" placeholder="Search products..." style="border: none; background: transparent; outline: none; width: 150px;">
                    <button id="globalSearchBtn" style="background: none; border: none; cursor: pointer; font-size: 16px;">🔍</button>
                </div>
            `;
            navMenu.insertBefore(searchLi, navMenu.firstChild);
            initializeGlobalSearch();
        }
    }
});

// Add CSS for floating animation and notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.8);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    .product-rating {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 10px 0;
        font-size: 14px;
    }
    
    .rating-count {
        color: #666;
        font-size: 12px;
    }
    
    .wishlist-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 20px;
        transition: transform 0.3s ease;
    }
    
    .wishlist-btn:hover {
        transform: scale(1.1);
    }
    
    .wishlist-btn.active {
        color: #e74c3c;
    }
    
    .wishlist-btn:not(.active) {
        color: #ccc;
    }
`;
document.head.appendChild(style);
