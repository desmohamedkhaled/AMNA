// AMNA Shop - Cart functionality
// Handle shopping cart operations and display

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    updateCartCount();
});

// Initialize cart functionality
function initializeCart() {
    loadCartItems();
    updateCartCount();
}

// Load and display cart items
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartContainer = document.getElementById('cartItemsContainer');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>It looks like you haven't added any items to your shopping cart yet.</p>
                <a href="shop.html" class="btn">Start Shopping</a>
            </div>
        `;
        cartSummary.style.display = 'none';
        return;
    }
    
    let cartHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-image">
                    <span>${item.name}</span>
                </div>
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">${item.price} EGP each</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               min="1" max="99" onchange="updateQuantityInput(${index}, this.value)">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div style="text-align: right; margin-left: auto;">
                    <div style="font-size: 20px; font-weight: bold; color: #667eea; margin-bottom: 10px;">
                        ${itemTotal} EGP
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartHTML;
    
    // Update total and show summary
    document.getElementById('cartTotal').textContent = total.toFixed(2);
    cartSummary.style.display = 'block';
    
    // Update cart count
    updateCartCount();
}

// Update quantity with buttons
function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
    }
}

// Update quantity with input field
function updateQuantityInput(index, value) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const quantity = parseInt(value);
    
    if (cart[index] && quantity > 0) {
        cart[index].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
    } else if (quantity <= 0) {
        removeFromCart(index);
    }
}

// Remove item from cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        
        // Show removal animation
        showNotification('Item removed from cart', 'success');
    }
}

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart count in all pages
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
        element.style.display = cartCount > 0 ? 'flex' : 'none';
    });
    
    // Update checkout button state
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        if (cartCount === 0) {
            checkoutBtn.style.opacity = '0.5';
            checkoutBtn.style.pointerEvents = 'none';
        } else {
            checkoutBtn.style.opacity = '1';
            checkoutBtn.style.pointerEvents = 'auto';
        }
    }
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your entire cart?')) {
        localStorage.removeItem('cart');
        loadCartItems();
        showNotification('Cart cleared', 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bg = type === 'success' ? '#27ae60' : '#3498db';
    notification.style.cssText = `position: fixed; top: 20px; right: 20px; background: ${bg}; color: white; padding: 15px 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); z-index:10000; font-weight:600; max-width:320px; opacity:0;`;
    notification.textContent = message;
    notification.style.transition = 'opacity 0.5s ease';
    document.body.appendChild(notification);
    void notification.offsetWidth;
    notification.style.opacity = '1';
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => { if (notification.parentNode) document.body.removeChild(notification); }, 500);
    }, 3000);
}

// Add CSS for notifications
// unified fade notifications handled inline; no keyframes required

// Export functions for use in other files
window.updateCartCount = updateCartCount;
window.loadCartItems = loadCartItems;
