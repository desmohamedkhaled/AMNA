// AMNA Shop - Checkout functionality
// Handle checkout process and order confirmation

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    initializeCheckout();
});

// Initialize checkout functionality
function initializeCheckout() {
    // Load cart items and calculate total
    loadCartItems();
    
    // Initialize checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
    
    // Auto-fill user information if logged in
    autoFillUserInfo();
    
    // Initialize shipping method change handler
    const shippingMethod = document.getElementById('shippingMethod');
    if (shippingMethod) {
        shippingMethod.addEventListener('change', updateShippingCost);
    }
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize guest checkout options
    initializeGuestCheckout();
}

// Load cart items and display total
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartContainer = document.getElementById('cartItems');
    
    if (cartContainer) {
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            // Redirect to shop if cart is empty
            setTimeout(() => {
                window.location.href = 'shop.html';
            }, 2000);
            return;
        }
        
        let cartHTML = '<h3>Order Summary</h3>';
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            cartHTML += `
                <div class="cart-item">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Price: ${item.price} EGP each</p>
                    </div>
                    <div class="item-total">
                        ${itemTotal} EGP
                    </div>
                </div>
            `;
        });
        
        cartContainer.innerHTML = cartHTML;
    }
    
    // Update totals
    updateOrderTotals(subtotal);
    
    // Store subtotal for later use
    window.cartSubtotal = subtotal;
}

// Update order totals including shipping
function updateOrderTotals(subtotal) {
    const shippingCost = getShippingCost();
    const total = subtotal + shippingCost;
    
    // Update display
    document.getElementById('subtotal').textContent = `${subtotal} EGP`;
    document.getElementById('shippingCost').textContent = `${shippingCost} EGP`;
    document.getElementById('totalAmount').textContent = `${total} EGP`;
    
    // Store for form submission
    window.cartTotal = total;
    window.shippingCost = shippingCost;
}

// Get shipping cost based on selected method
function getShippingCost() {
    const shippingMethod = document.getElementById('shippingMethod');
    if (!shippingMethod) return 0;
    
    switch (shippingMethod.value) {
        case 'standard': return 0;
        case 'express': return 50;
        case 'same-day': return 100;
        default: return 0;
    }
}

// Update shipping cost when method changes
function updateShippingCost() {
    if (window.cartSubtotal !== undefined) {
        updateOrderTotals(window.cartSubtotal);
    }
}

// Auto-fill user information if logged in
function autoFillUserInfo() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        const userData = JSON.parse(user);
        const nameInput = document.querySelector('input[name="name"]');
        const emailInput = document.querySelector('input[name="email"]');
        
        if (nameInput) nameInput.value = userData.name;
        if (emailInput) emailInput.value = userData.email;
    }
}

// Handle checkout form submission
function handleCheckout(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        name: formData.get('name'),
        email: formData.get('email'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        paymentMethod: formData.get('paymentMethod'),
        shippingMethod: formData.get('shippingMethod'),
        notes: formData.get('notes'),
        termsAccepted: formData.get('termsAccepted'),
        subtotal: window.cartSubtotal || 0,
        shippingCost: window.shippingCost || 0,
        total: window.cartTotal || 0,
        items: JSON.parse(localStorage.getItem('cart') || '[]'),
        orderDate: new Date().toISOString(),
        orderId: generateOrderId(),
        status: 'pending'
    };
    
    // Validate form
    if (!validateCheckoutForm(orderData)) {
        return;
    }
    
    // Show loading state
    const checkoutBtn = document.getElementById('checkoutBtn');
    const originalText = checkoutBtn.textContent;
    checkoutBtn.textContent = 'Processing...';
    checkoutBtn.disabled = true;
    
    // Simulate processing delay
    setTimeout(() => {
        // Store order in localStorage
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart
        localStorage.removeItem('cart');
        
        // Send confirmation email (simulation)
        sendOrderConfirmationEmail(orderData);
        
        // Redirect to success page
        window.location.href = 'success.html';
    }, 2000);
}

// Validate checkout form
function validateCheckoutForm(orderData) {
    let isValid = true;
    let errorMessages = [];
    
    // Clear previous error messages
    clearErrorMessages();
    
    // Validate name
    if (!orderData.name || orderData.name.trim().length < 2) {
        showFieldError('name', 'Please enter a valid name (at least 2 characters)');
        errorMessages.push('Name is required');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!orderData.email || !emailRegex.test(orderData.email)) {
        showFieldError('email', 'Please enter a valid email address');
        errorMessages.push('Valid email is required');
        isValid = false;
    }
    
    // Validate address
    if (!orderData.address || orderData.address.trim().length < 10) {
        showFieldError('address', 'Please enter a complete address (at least 10 characters)');
        errorMessages.push('Complete address is required');
        isValid = false;
    }
    
    // Validate phone (Egyptian phone number format)
    const phoneRegex = /^(\+20|0)?1[0-9]{9}$/;
    if (!orderData.phone || !phoneRegex.test(orderData.phone.replace(/\s/g, ''))) {
        showFieldError('phone', 'Please enter a valid Egyptian phone number');
        errorMessages.push('Valid phone number is required');
        isValid = false;
    }
    
    // Validate payment method
    if (!orderData.paymentMethod) {
        showFieldError('paymentMethod', 'Please select a payment method');
        errorMessages.push('Payment method is required');
        isValid = false;
    }
    
    // Validate shipping method
    if (!orderData.shippingMethod) {
        showFieldError('shippingMethod', 'Please select a shipping method');
        errorMessages.push('Shipping method is required');
        isValid = false;
    }
    
    // Validate terms acceptance
    if (!orderData.termsAccepted) {
        showFieldError('termsAccepted', 'You must accept the terms and conditions');
        errorMessages.push('Terms and conditions must be accepted');
        isValid = false;
    }
    
    // Validate total (calculated from cart)
    if (!orderData.total || orderData.total <= 0) {
        errorMessages.push('Your cart is empty or has invalid items');
        isValid = false;
    }
    
    // Show error summary if validation fails
    if (!isValid) {
        showValidationSummary(errorMessages);
    }
    
    return isValid;
}

// Show field-specific error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.style.borderColor = '#e74c3c';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
}

// Clear all error messages
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const fields = document.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.style.borderColor = '#e1e5e9';
    });
}

// Show validation summary
function showValidationSummary(messages) {
    const summary = document.createElement('div');
    summary.className = 'validation-summary';
    summary.style.cssText = `
        background: #f8d7da;
        color: #721c24;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #f5c6cb;
    `;
    
    summary.innerHTML = `
        <h4 style="margin: 0 0 10px 0;">Please fix the following errors:</h4>
        <ul style="margin: 0; padding-left: 20px;">
            ${messages.map(msg => `<li>${msg}</li>`).join('')}
        </ul>
    `;
    
    const form = document.getElementById('checkoutForm');
    form.insertBefore(summary, form.firstChild);
    
    // Remove summary after 5 seconds
    setTimeout(() => {
        if (summary.parentNode) {
            summary.parentNode.removeChild(summary);
        }
    }, 5000);
}

// Initialize form validation
function initializeFormValidation() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(231, 76, 60)') {
                validateField(this);
            }
        });
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    switch (field.name) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                message = 'Name must be at least 2 characters';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
            break;
        case 'address':
            if (value.length < 10) {
                isValid = false;
                message = 'Address must be at least 10 characters';
            }
            break;
        case 'phone':
            const phoneRegex = /^(\+20|0)?1[0-9]{9}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                message = 'Please enter a valid Egyptian phone number';
            }
            break;
    }
    
    if (isValid) {
        field.style.borderColor = '#27ae60';
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    } else {
        showFieldError(field.name, message);
    }
}

// Generate unique order ID
function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `AMNA-${timestamp}-${random}`;
}

// Get order details for success page
function getLastOrder() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders[orders.length - 1];
}

// Display order confirmation on success page
function displayOrderConfirmation() {
    const order = getLastOrder();
    const orderDetails = document.getElementById('orderDetails');
    
    if (order && orderDetails) {
        const orderDate = new Date(order.orderDate);
        const estimatedDelivery = new Date(orderDate);
        
        // Calculate estimated delivery based on shipping method
        switch (order.shippingMethod) {
            case 'same-day':
                estimatedDelivery.setDate(estimatedDelivery.getDate() + 1);
                break;
            case 'express':
                estimatedDelivery.setDate(estimatedDelivery.getDate() + 2);
                break;
            default:
                estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
        }
        
        orderDetails.innerHTML = `
            <div class="order-info">
                <h3>Order Confirmation</h3>
                <div class="order-details-grid">
                    <div class="order-detail">
                        <strong>Order ID:</strong> ${order.orderId}
                    </div>
                    <div class="order-detail">
                        <strong>Customer:</strong> ${order.name}
                    </div>
                    <div class="order-detail">
                        <strong>Email:</strong> ${order.email}
                    </div>
                    <div class="order-detail">
                        <strong>Phone:</strong> ${order.phone}
                    </div>
                    <div class="order-detail">
                        <strong>Payment Method:</strong> ${getPaymentMethodText(order.paymentMethod)}
                    </div>
                    <div class="order-detail">
                        <strong>Shipping Method:</strong> ${getShippingMethodText(order.shippingMethod)}
                    </div>
                    <div class="order-detail">
                        <strong>Subtotal:</strong> ${order.subtotal} EGP
                    </div>
                    <div class="order-detail">
                        <strong>Shipping:</strong> ${order.shippingCost} EGP
                    </div>
                    <div class="order-detail total">
                        <strong>Total:</strong> ${order.total} EGP
                    </div>
                    <div class="order-detail">
                        <strong>Order Date:</strong> ${orderDate.toLocaleDateString('en-EG')}
                    </div>
                    <div class="order-detail">
                        <strong>Estimated Delivery:</strong> ${estimatedDelivery.toLocaleDateString('en-EG')}
                    </div>
                </div>
                
                <div class="order-items">
                    <h4>Order Items:</h4>
                    <ul>
                        ${order.items.map(item => `
                            <li>${item.name} - Quantity: ${item.quantity} - ${item.price * item.quantity} EGP</li>
                        `).join('')}
                    </ul>
                </div>
                
                ${order.notes ? `
                    <div class="order-notes">
                        <h4>Order Notes:</h4>
                        <p>${order.notes}</p>
                    </div>
                ` : ''}
                
                <div class="order-status">
                    <h4>Order Status: <span class="status-pending">Pending</span></h4>
                    <p>Your order has been received and is being processed. You will receive an email confirmation shortly.</p>
                </div>
            </div>
        `;
    }
}

// Get payment method display text
function getPaymentMethodText(method) {
    switch (method) {
        case 'credit-card': return 'Credit/Debit Card';
        case 'bank-transfer': return 'Bank Transfer';
        case 'cash-on-delivery': return 'Cash on Delivery';
        case 'mobile-payment': return 'Mobile Payment';
        default: return method;
    }
}

// Get shipping method display text
function getShippingMethodText(method) {
    switch (method) {
        case 'standard': return 'Standard Shipping (3-5 days)';
        case 'express': return 'Express Shipping (1-2 days)';
        case 'same-day': return 'Same Day Delivery';
        default: return method;
    }
}

// Send order confirmation email (simulation)
function sendOrderConfirmationEmail(orderData) {
    // Simulate email sending
    console.log('Sending confirmation email to:', orderData.email);
    
    // Store email in localStorage for demo purposes
    const emailData = {
        to: orderData.email,
        subject: `Order Confirmation - ${orderData.orderId}`,
        body: generateEmailBody(orderData),
        sentAt: new Date().toISOString()
    };
    
    let emails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    emails.push(emailData);
    localStorage.setItem('sentEmails', JSON.stringify(emails));
}

// Generate email body
function generateEmailBody(orderData) {
    return `
        Dear ${orderData.name},
        
        Thank you for your order! We have received your order and it is being processed.
        
        Order Details:
        - Order ID: ${orderData.orderId}
        - Total Amount: ${orderData.total} EGP
        - Payment Method: ${getPaymentMethodText(orderData.paymentMethod)}
        - Shipping Method: ${getShippingMethodText(orderData.shippingMethod)}
        
        Items Ordered:
        ${orderData.items.map(item => `- ${item.name} (Qty: ${item.quantity}) - ${item.price * item.quantity} EGP`).join('\n')}
        
        We will send you another email when your order ships.
        
        Thank you for choosing AMNA Shop!
        
        Best regards,
        AMNA Shop Team
    `;
}

// Show terms and conditions modal
function showTerms() {
    alert('Terms and Conditions:\n\n1. All sales are final.\n2. Returns accepted within 30 days.\n3. Customer is responsible for return shipping.\n4. Refunds processed within 5-7 business days.\n5. AMNA Shop reserves the right to refuse service.');
}

// Show privacy policy modal
function showPrivacy() {
    alert('Privacy Policy:\n\n1. We collect only necessary information for order processing.\n2. Your data is never shared with third parties.\n3. We use secure encryption for all transactions.\n4. You can request data deletion at any time.\n5. We comply with Egyptian data protection laws.');
}

// Initialize guest checkout functionality
function initializeGuestCheckout() {
    const checkoutTypeRadios = document.querySelectorAll('input[name="checkoutType"]');
    const loginPrompt = document.getElementById('loginPrompt');
    
    checkoutTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'account') {
                // Check if user is logged in
                const currentUser = localStorage.getItem('currentUser');
                if (!currentUser) {
                    loginPrompt.style.display = 'block';
                } else {
                    loginPrompt.style.display = 'none';
                    // Auto-fill user information
                    autoFillUserInfo();
                }
            } else {
                loginPrompt.style.display = 'none';
            }
        });
    });
    
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // Pre-select account checkout if user is logged in
        const accountRadio = document.querySelector('input[name="checkoutType"][value="account"]');
        if (accountRadio) {
            accountRadio.checked = true;
            loginPrompt.style.display = 'none';
            autoFillUserInfo();
        }
    }
}

// Enhanced auto-fill for logged-in users
function autoFillUserInfo() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        const userData = JSON.parse(user);
        const nameInput = document.querySelector('input[name="name"]');
        const emailInput = document.querySelector('input[name="email"]');
        
        if (nameInput) nameInput.value = userData.name;
        if (emailInput) emailInput.value = userData.email;
        
        // Show a notification that info was auto-filled
        showNotification('User information auto-filled from your account', 'info');
    }
}

// Show notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
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

// Add CSS for notifications
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
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
`;
document.head.appendChild(notificationStyle);
