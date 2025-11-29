// AMNA Shop - Navigation Management
// Centralized navigation functionality for all pages

// ========================================
// NAVIGATION CONFIGURATION
// ========================================

const navigationConfig = {
    pages: [
        { name: "Home", url: "index.html", icon: "🏠" },
        { name: "About", url: "about.html", icon: "ℹ️" },
        { name: "Services", url: "services.html", icon: "🛠️" },
        { name: "Shop", url: "shop.html", icon: "🛍️" },
        { name: "Team", url: "team.html", icon: "👥" },
        { name: "Contact", url: "contact.html", icon: "📞" }
    ],
    authPages: [
        { name: "Login", url: "login.html", icon: "🔐" },
        { name: "Sign Up", url: "signup.html", icon: "📝" }
    ],
    userPages: [
        { name: "Dashboard", url: "dashboard.html", icon: "📊" },
        { name: "Admin Panel", url: "admin-dashboard.html", icon: "👨‍💼", adminOnly: true }
    ],
    // Additional pages for footer and navigation
    additionalPages: [
        { name: "Cart", url: "cart.html", icon: "🛒" },
        { name: "Checkout", url: "checkout.html", icon: "💳" },
        { name: "Wishlist", url: "wishlist.html", icon: "❤️" },
        { name: "Search", url: "search.html", icon: "🔍" },
        { name: "Compare", url: "compare.html", icon: "⚖️" },
        { name: "FAQ", url: "faq.html", icon: "❓" },
        { name: "Shipping", url: "shipping.html", icon: "🚚" },
        { name: "Returns", url: "returns.html", icon: "↩️" },
        { name: "Privacy", url: "privacy.html", icon: "🔒" }
    ]
};

// ========================================
// NAVIGATION FUNCTIONS
// ========================================

// Initialize navigation on page load
function initializeNavigation() {
    insertSkipLink();
    ensureMainWrapper();
    updateNavigation();
    updateActivePage();
    updateUserMenu();
    setupMenuToggle();
    setupHeaderScrollEffect();
}

// Insert a skip link at the top of the page for accessibility if not already present
function insertSkipLink() {
    if (!document.querySelector('.skip-link')) {
        const link = document.createElement('a');
        link.href = '#main-content';
        link.className = 'skip-link';
        link.textContent = 'Skip to main content';
        document.body.insertBefore(link, document.body.firstChild);
    }
}

// Ensure there is a <main id="main-content"> wrapper so skip-link has a proper anchor
function ensureMainWrapper() {
    if (!document.getElementById('main-content')) {
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        if (!footer || !header) return;

        const main = document.createElement('main');
        main.id = 'main-content';

        // Move all nodes between header and footer into main
        let node = header.nextSibling;
        while (node && node !== footer) {
            const next = node.nextSibling;
            main.appendChild(node);
            node = next;
        }

        // Insert main before footer
        footer.parentNode.insertBefore(main, footer);
    }
}

// Update navigation based on current page and user status
function updateNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    // Clear existing navigation items (except cart)
    const cartItem = navMenu.querySelector('.cart-button');
    navMenu.innerHTML = '';

    // Add main navigation pages
    navigationConfig.pages.forEach(page => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${page.url}">${page.name}</a>`;
        navMenu.appendChild(li);
    });

    // Add search form to navigation
    const searchLi = document.createElement('li');
    searchLi.className = 'nav-search';
    searchLi.innerHTML = `
        <form class="search-form" action="search.html" method="get" role="search" aria-label="Site search">
            <label class="sr-only" for="navSearch">Search</label>
            <input id="navSearch" class="search-input" type="search" name="q" placeholder="Search products" aria-label="Search products" />
            <button class="search-button" type="submit" aria-label="Search">🔍</button>
        </form>
    `;
    navMenu.appendChild(searchLi);

    // Add authentication or user menu based on login status
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        
        // Add user menu
        const userMenuLi = document.createElement('li');
        userMenuLi.id = 'userMenu';
        userMenuLi.style.display = 'block';
        
        let userMenuHTML = `
            <a href="dashboard.html">📊 Dashboard</a>
            <a href="wishlist.html">❤️ Wishlist <span id="wishlistCountNavSmall" class="badge" style="display:none;margin-left:8px;">0</span></a>
            <a href="cart.html">🛒 Cart</a>
        `;
        
        // Add admin panel if user is admin
        if (userData.role === 'admin') {
            userMenuHTML += `<a href="admin-dashboard.html">👨‍💼 Admin Panel</a>`;
        }
        
        userMenuHTML += `<a href="#" onclick="logout()">🚪 Logout</a>`;
        userMenuLi.innerHTML = userMenuHTML;
        navMenu.appendChild(userMenuLi);
    } else {
        // Add login and signup buttons
        const loginLi = document.createElement('li');
        loginLi.id = 'loginBtn';
        loginLi.innerHTML = `<a href="login.html">Login</a>`;
        navMenu.appendChild(loginLi);

        const signupLi = document.createElement('li');
        signupLi.id = 'signupBtn';
        signupLi.innerHTML = `<a href="signup.html">Sign Up</a>`;
        navMenu.appendChild(signupLi);
    }

    // Add wishlist button (nav)
    const wishlistLi = document.createElement('li');
    wishlistLi.innerHTML = `
        <a href="wishlist.html" class="wishlist-button">❤️ Wishlist <span id="wishlistCountNav" class="badge" style="display:none; margin-left:6px;">0</span></a>
    `;
    navMenu.appendChild(wishlistLi);

    // Add cart button
    if (cartItem) {
        navMenu.appendChild(cartItem);
    }

    // Close mobile menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.nav-menu');
            const toggle = document.querySelector('.menu-toggle');
            if (menu && menu.classList.contains('is-open')) {
                menu.classList.remove('is-open');
            }
            if (toggle) {
                toggle.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    // Update wishlist count badges (if available)
    if (typeof updateWishlistCount === 'function') {
        updateWishlistCount();
    }
}

// Update active page highlighting
function updateActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update user menu based on current user
function updateUserMenu() {
    const currentUser = localStorage.getItem('currentUser');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            
            let userMenuHTML = `
                <a href="dashboard.html">📊 Dashboard</a>
                <a href="wishlist.html">❤️ Wishlist</a>
                <a href="cart.html">🛒 Cart</a>
            `;
            
            // Add admin panel if user is admin
            if (userData.role === 'admin') {
                userMenuHTML += `<a href="admin-dashboard.html">👨‍💼 Admin Panel</a>`;
            }
            
            userMenuHTML += `<a href="#" onclick="logout()">🚪 Logout</a>`;
            userMenu.innerHTML = userMenuHTML;
        }
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (signupBtn) signupBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
    }
}

// Create and wire up a responsive hamburger toggle
function setupMenuToggle() {
    const navContainer = document.querySelector('.nav-container');
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu');
    if (!navContainer || !nav || !navMenu) return;

    // Ensure a single toggle exists
    let toggle = document.querySelector('.menu-toggle');
    if (!toggle) {
        toggle = document.createElement('button');
        toggle.className = 'menu-toggle';
        toggle.setAttribute('aria-label', 'Toggle navigation');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<span></span><span></span><span></span>';

        // Insert toggle between logo and nav
        navContainer.insertBefore(toggle, nav);
    }

    // Click handler
    toggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('is-open');
        toggle.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Allow opening/closing the menu with Enter or Space for keyboard users
    toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle.click();
        }
    });

    // Reset menu state on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('is-open');
            toggle.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Add subtle shadow/condensed header on scroll
function setupHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) return;

    const apply = () => {
        if (window.scrollY > 2) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    };

    apply();
    window.addEventListener('scroll', apply, { passive: true });
}

// ========================================
// FOOTER FUNCTIONS
// ========================================

// Generate a compact footer (smaller and cleaner)
function generateFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>AMNA Shop</h3>
                    <p>Quality products • Fast delivery • Secure payments</p>
                    <div class="social-links" aria-label="Social links">
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Twitter">🐦</a>
                        <a href="#" aria-label="Instagram">📷</a>
                    </div>
                </div>

                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="shop.html">Shop</a></li>
                        <li><a href="cart.html">Cart</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="faq.html">FAQ</a></li>
                        <li><a href="shipping.html">Shipping</a></li>
                        <li><a href="returns.html">Returns</a></li>
                        <li><a href="privacy.html">Privacy</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>This is a university project — prices shown in EGP.</p>
            </div>
        </div>
    `;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Show FAQ modal
function showFAQ() {
    alert(`Frequently Asked Questions:

Q: How long does delivery take?
A: We offer same-day delivery in Cairo and 2-3 days nationwide.

Q: What payment methods do you accept?
A: We accept cash on delivery, credit cards, and bank transfers.

Q: Can I return products?
A: Yes, we offer a 30-day return policy for unused items.

Q: Do you ship internationally?
A: Currently, we only ship within Egypt.

Q: How can I track my order?
A: You'll receive a tracking number via SMS and email.`);
}

// Show shipping information
function showShipping() {
    alert(`Shipping Information:

🚚 Same-day delivery in Cairo (orders before 2 PM)
🚚 2-3 business days nationwide
🚚 Free shipping on orders over 500 EGP
🚚 Standard shipping: 50 EGP
🚚 Express shipping: 100 EGP

We use trusted courier services to ensure your orders arrive safely and on time.`);
}

// Show returns policy
function showReturns() {
    alert(`Returns Policy:

✅ 30-day return policy
✅ Items must be unused and in original packaging
✅ Free return shipping for defective items
✅ Refunds processed within 5-7 business days
✅ Exchange available for different sizes/colors

Contact our support team to initiate a return.`);
}

// Show privacy policy
function showPrivacy() {
    alert(`Privacy Policy:

🔒 We respect your privacy and protect your personal information
🔒 Your data is encrypted and stored securely
🔒 We never share your information with third parties
🔒 You can request data deletion at any time
🔒 We use cookies to improve your shopping experience

For more details, contact us at privacy@amnashop.com`);
}

// ========================================
// INITIALIZATION
// ========================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    generateFooter();
});

// Re-initialize navigation when user logs in/out
window.addEventListener('storage', function(e) {
    if (e.key === 'currentUser') {
        updateUserMenu();
    }
});



