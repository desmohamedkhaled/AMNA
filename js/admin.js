// AMNA Shop Admin Dashboard JavaScript
// Comprehensive admin functionality for user management, orders, analytics, and system settings

// Initialize admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check admin authentication
    if (!checkAdminAuth()) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    // Initialize dashboard
    initializeAdminDashboard();
    
    // Initialize form handlers
    initializeAdminForms();
    
    // Load initial data
    loadAdminStats();
});

// Check admin authentication
function checkAdminAuth() {
    const currentUser = localStorage.getItem('currentUser');
    const isAdmin = localStorage.getItem('isAdmin');
    
    if (!currentUser || !isAdmin) {
        return false;
    }
    
    const user = JSON.parse(currentUser);
    return user.role === 'admin';
}

// Initialize admin dashboard
function initializeAdminDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Update welcome message
    const welcomeMessage = document.getElementById('adminWelcomeMessage');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${currentUser.name}!`;
    }
    
    // Update admin user name
    const adminUserName = document.getElementById('adminUserName');
    if (adminUserName) {
        adminUserName.textContent = currentUser.name;
    }
    
    // Initialize dark mode
    initializeDarkMode();
    
    // Initialize notifications
    initializeNotifications();
    
    // Check for new notifications
    checkForNewNotifications();
    
    // Auto-sync products on dashboard load
    setTimeout(() => {
        syncProductsToAdmin();
    }, 1000); // Wait 1 second for all scripts to load
}

// Initialize admin forms
function initializeAdminForms() {
    // Add user form
    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', handleAddUser);
    }
    
    // Add product form
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleAddProduct);
    }
    
    // Edit product form
    const editProductForm = document.getElementById('editProductForm');
    if (editProductForm) {
        editProductForm.addEventListener('submit', handleEditProduct);
    }
}

// Load admin statistics
function loadAdminStats() {
    // Load users
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    document.getElementById('totalUsers').textContent = users.length;
    
    // Load orders
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    document.getElementById('totalOrders').textContent = orders.length;
    
    // Calculate total revenue
    const totalRevenue = orders.reduce((total, order) => total + order.total, 0);
    document.getElementById('totalRevenue').textContent = `${totalRevenue.toFixed(2)} EGP`;
    
    // Load and sync products
    syncProductsToAdmin();
}

// Admin logout
function adminLogout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    alert('Admin logout successful!');
    window.location.href = 'admin-login.html';
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('admin-modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// User Management Functions
function openUserManagement() {
    openModal('userManagementModal');
    loadUserManagement();
}

function loadUserManagement() {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const content = document.getElementById('userManagementContent');
    
    if (users.length === 0) {
        content.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No users found.</p>';
        return;
    }
    
    let html = '<table class="admin-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Signup Date</th><th>Actions</th></tr></thead><tbody>';
    
    users.forEach(user => {
        const signupDate = new Date(user.signupDate).toLocaleDateString();
        const roleBadge = user.role === 'admin' ? '<span style="background: #dc3545; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">Admin</span>' : '<span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">User</span>';
        
        html += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${roleBadge}</td>
                <td>${signupDate}</td>
                <td>
                    <button class="admin-btn admin-btn-secondary" onclick="editUser('${user.email}')" style="padding: 5px 10px; font-size: 12px;">Edit</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteUser('${user.email}')" style="padding: 5px 10px; font-size: 12px;">Delete</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    content.innerHTML = html;
}

function searchUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#userManagementContent tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function openAddUserModal() {
    openModal('addUserModal');
}

function handleAddUser(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: formData.get('role'),
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
    
    alert('User added successfully!');
    e.target.reset();
    closeModal('addUserModal');
    loadAdminStats();
}

function editUser(email) {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) return;
    
    const newName = prompt('Enter new name:', user.name);
    if (newName && newName.trim() !== '') {
        user.name = newName.trim();
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        loadUserManagement();
        alert('User updated successfully!');
    }
}

function deleteUser(email) {
    if (confirm('Are you sure you want to delete this user?')) {
        let users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        users = users.filter(u => u.email !== email);
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        loadUserManagement();
        loadAdminStats();
        alert('User deleted successfully!');
    }
}

// Order Management Functions
function openOrderManagement() {
    openModal('orderManagementModal');
    loadOrderManagement();
}

function loadOrderManagement() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const content = document.getElementById('orderManagementContent');
    
    if (orders.length === 0) {
        content.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No orders found.</p>';
        return;
    }
    
    let html = '<table class="admin-table"><thead><tr><th>Order ID</th><th>Customer</th><th>Email</th><th>Total</th><th>Date</th><th>Items</th><th>Actions</th></tr></thead><tbody>';
    
    orders.forEach(order => {
        const orderDate = new Date(order.orderDate).toLocaleDateString();
        const itemCount = order.items ? order.items.length : 0;
        
        html += `
            <tr>
                <td>${order.orderId}</td>
                <td>${order.name}</td>
                <td>${order.email}</td>
                <td>${order.total.toFixed(2)} EGP</td>
                <td>${orderDate}</td>
                <td>${itemCount} items</td>
                <td>
                    <button class="admin-btn admin-btn-secondary" onclick="viewOrderDetails('${order.orderId}')" style="padding: 5px 10px; font-size: 12px;">View</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteOrder('${order.orderId}')" style="padding: 5px 10px; font-size: 12px;">Delete</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    content.innerHTML = html;
}

function searchOrders() {
    const searchTerm = document.getElementById('orderSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#orderManagementContent tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function viewOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.orderId === orderId);
    
    if (!order) return;
    
    let details = `Order Details for ${order.orderId}\n\n`;
    details += `Customer: ${order.name}\n`;
    details += `Email: ${order.email}\n`;
    details += `Phone: ${order.phone}\n`;
    details += `Address: ${order.address}\n`;
    details += `Total: ${order.total.toFixed(2)} EGP\n`;
    details += `Date: ${new Date(order.orderDate).toLocaleString()}\n\n`;
    details += `Items:\n`;
    
    if (order.items) {
        order.items.forEach(item => {
            details += `- ${item.name} x${item.quantity} - ${item.price.toFixed(2)} EGP\n`;
        });
    }
    
    alert(details);
}

function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders = orders.filter(o => o.orderId !== orderId);
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrderManagement();
        loadAdminStats();
        alert('Order deleted successfully!');
    }
}

function exportOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    if (orders.length === 0) {
        alert('No orders to export.');
        return;
    }
    
    let csv = 'Order ID,Customer Name,Email,Phone,Address,Total,Date,Items\n';
    
    orders.forEach(order => {
        const orderDate = new Date(order.orderDate).toLocaleDateString();
        const items = order.items ? order.items.map(item => `${item.name} x${item.quantity}`).join('; ') : '';
        
        csv += `${order.orderId},"${order.name}","${order.email}","${order.phone}","${order.address}",${order.total.toFixed(2)},${orderDate},"${items}"\n`;
    });
    
    // Create and download CSV file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Orders exported successfully!');
}

// ========================================
// PRODUCT SYNCHRONIZATION FUNCTIONS
// ========================================

// Sync products from mockdata.js to localStorage and admin dashboard
function syncProductsToAdmin() {
    if (typeof products !== 'undefined' && products.length > 0) {
        // Store products in localStorage for admin management
        localStorage.setItem('adminProducts', JSON.stringify(products));
        
        // Update product count in dashboard
        document.getElementById('totalProducts').textContent = products.length;
        
        // Add sync notification
        addNotification('system', 'Products Synced', 
            `${products.length} products have been synchronized to the admin dashboard`, 
            { productCount: products.length });
        
        // Update sync status in dashboard
        updateSyncStatus(true, products.length);
        
        console.log(`✅ Synced ${products.length} products to admin dashboard`);
    } else {
        // Fallback to localStorage if products array is not available
        const storedProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
        document.getElementById('totalProducts').textContent = storedProducts.length;
        console.log(`⚠️ Using ${storedProducts.length} products from localStorage`);
    }
}

// Get products for admin management (with fallback)
function getAdminProducts() {
    if (typeof products !== 'undefined' && products.length > 0) {
        return products;
    }
    return JSON.parse(localStorage.getItem('adminProducts') || '[]');
}

// Update products in both mockdata and localStorage
function updateProductsInStorage(updatedProducts) {
    // Update localStorage
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    
    // If products array exists, update it (for real-time sync)
    if (typeof products !== 'undefined') {
        products.length = 0; // Clear existing products
        products.push(...updatedProducts); // Add updated products
    }
    
    // Update dashboard stats
    document.getElementById('totalProducts').textContent = updatedProducts.length;
}

// Export products to CSV
function exportProducts() {
    const adminProducts = getAdminProducts();
    
    if (adminProducts.length === 0) {
        alert('No products to export.');
        return;
    }
    
    let csv = 'ID,Name,Category,Price,Stock,Rating,Description\n';
    
    adminProducts.forEach(product => {
        const description = (product.description || '').replace(/"/g, '""'); // Escape quotes
        csv += `${product.id},"${product.name}","${product.category}",${product.price},${product.stock || 'N/A'},${product.rating || 'N/A'},"${description}"\n`;
    });
    
    // Create and download CSV file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amna_products_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Add notification
    addNotification('system', 'Products Exported', 
        `${adminProducts.length} products have been exported to CSV`, 
        { productCount: adminProducts.length });
    
    alert(`Products exported successfully! ${adminProducts.length} products downloaded.`);
}

// Update sync status in dashboard
function updateSyncStatus(synced, productCount) {
    const syncStatus = document.getElementById('syncStatus');
    if (syncStatus) {
        syncStatus.innerHTML = synced ? 
            `<span style="color: #28a745;">✅ Synced (${productCount} products)</span>` : 
            `<span style="color: #dc3545;">⚠️ Not Synced</span>`;
    }
}

// Product Management Functions
function openProductManagement() {
    openModal('productManagementModal');
    loadProductManagement();
}

function loadProductManagement() {
    const adminProducts = getAdminProducts();
    const content = document.getElementById('productManagementContent');
    
    if (adminProducts.length === 0) {
        content.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <div style="font-size: 48px; margin-bottom: 20px;">📦</div>
                <h3>No Products Found</h3>
                <p>No products are currently available in the system.</p>
                <button class="admin-btn admin-btn-success" onclick="syncProductsToAdmin()" style="margin-top: 15px;">
                    🔄 Sync Products
                </button>
            </div>
        `;
        return;
    }
    
    let html = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: #333;">Product Catalog (${adminProducts.length} products)</h3>
            <div>
                <button class="admin-btn admin-btn-secondary" onclick="syncProductsToAdmin()" style="margin-right: 5px;">
                    🔄 Sync
                </button>
                <button class="admin-btn admin-btn-secondary" onclick="exportProducts()" style="margin-right: 5px;">
                    📊 Export
                </button>
                <button class="admin-btn admin-btn-success" onclick="openAddProductModal()">
                    ➕ Add Product
                </button>
            </div>
        </div>
        <div style="overflow-x: auto;">
            <table class="admin-table" style="min-width: 100%;">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Rating</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    adminProducts.forEach(product => {
        const productImage = product.image || product.img || 'https://via.placeholder.com/50x50?text=No+Image';
        const stock = product.stock || 'N/A';
        const rating = product.rating || 'N/A';
        
        html += `
            <tr>
                <td>${product.id}</td>
                <td style="font-weight: 600;">${product.name}</td>
                <td>
                    <span style="background: #e3f2fd; color: #1976d2; padding: 4px 8px; border-radius: 12px; font-size: 12px;">
                        ${product.category}
                    </span>
                </td>
                <td style="font-weight: bold; color: #2e7d32;">${product.price} EGP</td>
                <td>${stock}</td>
                <td>${rating}</td>
                <td>
                    <img src="${productImage}" alt="${product.name}" 
                         style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px; border: 1px solid #e0e0e0;">
                </td>
                <td>
                    <button class="admin-btn admin-btn-secondary" onclick="editProduct(${product.id})" 
                            style="padding: 5px 10px; font-size: 12px; margin-right: 5px;">
                        ✏️ Edit
                    </button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteProduct(${product.id})" 
                            style="padding: 5px 10px; font-size: 12px;">
                        🗑️ Delete
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table></div>';
    content.innerHTML = html;
}

function searchProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#productManagementContent tbody tr');
    
    if (!searchTerm.trim()) {
        // Show all rows if search is empty
        rows.forEach(row => {
            row.style.display = '';
        });
        return;
    }
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = text.includes(searchTerm);
        row.style.display = matches ? '' : 'none';
    });
    
    // Show search results count
    const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.textContent = `Found ${visibleRows.length} product(s) matching "${searchTerm}"`;
    }
}

function openAddProductModal() {
    openModal('addProductModal');
}

function handleAddProduct(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    // Parse specifications JSON
    let specifications = {};
    const specsText = formData.get('specifications').trim();
    if (specsText) {
        try {
            specifications = JSON.parse(specsText);
        } catch (error) {
            alert('Invalid JSON format in specifications. Please check your input.');
            return;
        }
    }
    
    const productData = {
        id: Date.now(), // Simple ID generation
        name: formData.get('name'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')) || 0,
        rating: parseFloat(formData.get('rating')) || 0,
        reviews: parseInt(formData.get('reviews')) || 0,
        img: formData.get('img'),
        image: formData.get('img'), // Also store as 'image' for consistency
        description: formData.get('description'),
        specifications: specifications
    };
    
    // Get current products and add new one
    const currentProducts = getAdminProducts();
    currentProducts.push(productData);
    
    // Update products in storage
    updateProductsInStorage(currentProducts);
    
    // Add notification
    addNotification('system', 'New Product Added', 
        `Product "${productData.name}" has been added to the catalog`, 
        { productId: productData.id, name: productData.name, category: productData.category });
    
    alert(`Product "${productData.name}" added successfully!`);
    
    e.target.reset();
    closeModal('addProductModal');
    loadProductManagement(); // Refresh the product list
    loadAdminStats();
}

function editProduct(productId) {
    const currentProducts = getAdminProducts();
    const product = currentProducts.find(p => p.id === productId);
    
    if (!product) {
        alert('Product not found!');
        return;
    }
    
    // Populate the edit form with current product data
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name || '';
    document.getElementById('editProductCategory').value = product.category || '';
    document.getElementById('editProductPrice').value = product.price || '';
    document.getElementById('editProductStock').value = product.stock || '';
    document.getElementById('editProductRating').value = product.rating || '';
    document.getElementById('editProductReviews').value = product.reviews || '';
    document.getElementById('editProductImage').value = product.image || product.img || '';
    document.getElementById('editProductDescription').value = product.description || '';
    
    // Handle specifications
    if (product.specifications && typeof product.specifications === 'object') {
        document.getElementById('editProductSpecifications').value = JSON.stringify(product.specifications, null, 2);
    } else {
        document.getElementById('editProductSpecifications').value = '';
    }
    
    // Open the edit modal
    openModal('editProductModal');
}

// Handle edit product form submission
function handleEditProduct(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const productId = parseInt(formData.get('id'));
    
    // Get current products
    const currentProducts = getAdminProducts();
    const productIndex = currentProducts.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
        alert('Product not found!');
        return;
    }
    
    // Parse specifications JSON
    let specifications = {};
    const specsText = formData.get('specifications').trim();
    if (specsText) {
        try {
            specifications = JSON.parse(specsText);
        } catch (error) {
            alert('Invalid JSON format in specifications. Please check your input.');
            return;
        }
    }
    
    // Update product data
    const updatedProduct = {
        ...currentProducts[productIndex],
        name: formData.get('name'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')) || 0,
        rating: parseFloat(formData.get('rating')) || 0,
        reviews: parseInt(formData.get('reviews')) || 0,
        img: formData.get('img'),
        image: formData.get('img'), // Also store as 'image' for consistency
        description: formData.get('description'),
        specifications: specifications
    };
    
    // Update the product in the array
    currentProducts[productIndex] = updatedProduct;
    
    // Update products in storage
    updateProductsInStorage(currentProducts);
    
    // Add notification
    addNotification('system', 'Product Updated', 
        `Product "${updatedProduct.name}" has been updated successfully`, 
        { productId: productId, name: updatedProduct.name });
    
    alert(`Product "${updatedProduct.name}" updated successfully!`);
    
    // Close modal and refresh
    closeModal('editProductModal');
    loadProductManagement();
    loadAdminStats();
}

function deleteProduct(productId) {
    const currentProducts = getAdminProducts();
    const product = currentProducts.find(p => p.id === productId);
    
    if (!product) {
        alert('Product not found!');
        return;
    }
    
    if (confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
        const updatedProducts = currentProducts.filter(p => p.id !== productId);
        
        // Update products in storage
        updateProductsInStorage(updatedProducts);
        
        // Add notification
        addNotification('system', 'Product Deleted', 
            `Product "${product.name}" has been removed from the catalog`, 
            { productId: productId, name: product.name });
        
        alert(`Product "${product.name}" deleted successfully!`);
        loadProductManagement();
    }
}

// Analytics Functions
function openAnalytics() {
    openModal('analyticsModal');
    loadAnalytics();
}

function loadAnalytics() {
    const content = document.getElementById('analyticsContent');
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Calculate analytics
    const totalUsers = users.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((total, order) => total + order.total, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Calculate orders by month (last 6 months)
    const ordersByMonth = {};
    const currentDate = new Date();
    
    for (let i = 5; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        ordersByMonth[monthKey] = 0;
    }
    
    orders.forEach(order => {
        const orderDate = new Date(order.orderDate);
        const monthKey = orderDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        if (ordersByMonth.hasOwnProperty(monthKey)) {
            ordersByMonth[monthKey]++;
        }
    });
    
    let html = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                <h3 style="color: #667eea; margin-bottom: 10px;">${totalUsers}</h3>
                <p style="color: #666;">Total Users</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                <h3 style="color: #28a745; margin-bottom: 10px;">${totalOrders}</h3>
                <p style="color: #666;">Total Orders</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                <h3 style="color: #dc3545; margin-bottom: 10px;">${totalRevenue.toFixed(2)} EGP</h3>
                <p style="color: #666;">Total Revenue</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                <h3 style="color: #ffc107; margin-bottom: 10px;">${averageOrderValue.toFixed(2)} EGP</h3>
                <p style="color: #666;">Average Order Value</p>
            </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
            <h3 style="color: #333; margin-bottom: 20px;">Orders by Month (Last 6 Months)</h3>
            <div style="display: flex; gap: 10px; align-items: end; height: 200px;">
    `;
    
    const maxOrders = Math.max(...Object.values(ordersByMonth));
    
    Object.entries(ordersByMonth).forEach(([month, count]) => {
        const height = maxOrders > 0 ? (count / maxOrders) * 150 : 0;
        html += `
            <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
                <div style="background: #667eea; width: 100%; height: ${height}px; border-radius: 5px 5px 0 0; margin-bottom: 10px;"></div>
                <div style="font-size: 12px; color: #666; text-align: center;">
                    <div>${count}</div>
                    <div>${month}</div>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <h3 style="color: #333; margin-bottom: 20px;">Top Customers by Orders</h3>
            <table class="admin-table">
                <thead>
                    <tr><th>Customer</th><th>Email</th><th>Orders</th><th>Total Spent</th></tr>
                </thead>
                <tbody>
    `;
    
    // Calculate customer statistics
    const customerStats = {};
    orders.forEach(order => {
        if (!customerStats[order.email]) {
            customerStats[order.email] = {
                name: order.name,
                email: order.email,
                orders: 0,
                totalSpent: 0
            };
        }
        customerStats[order.email].orders++;
        customerStats[order.email].totalSpent += order.total;
    });
    
    const topCustomers = Object.values(customerStats)
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 5);
    
    topCustomers.forEach(customer => {
        html += `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.orders}</td>
                <td>${customer.totalSpent.toFixed(2)} EGP</td>
            </tr>
        `;
    });
    
    html += '</tbody></table></div>';
    
    content.innerHTML = html;
}

function generateReport() {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    let report = `AMNA Shop Admin Report\n`;
    report += `Generated on: ${new Date().toLocaleString()}\n\n`;
    
    report += `SUMMARY:\n`;
    report += `- Total Users: ${users.length}\n`;
    report += `- Total Orders: ${orders.length}\n`;
    report += `- Total Revenue: ${orders.reduce((total, order) => total + order.total, 0).toFixed(2)} EGP\n`;
    report += `- Contact Messages: ${contactMessages.length}\n\n`;
    
    report += `RECENT ORDERS (Last 5):\n`;
    const recentOrders = orders.slice(-5);
    recentOrders.forEach(order => {
        report += `- ${order.orderId}: ${order.name} - ${order.total.toFixed(2)} EGP (${new Date(order.orderDate).toLocaleDateString()})\n`;
    });
    
    report += `\nRECENT USERS (Last 5):\n`;
    const recentUsers = users.slice(-5);
    recentUsers.forEach(user => {
        report += `- ${user.name} (${user.email}) - ${new Date(user.signupDate).toLocaleDateString()}\n`;
    });
    
    // Create and download report file
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Report generated and downloaded successfully!');
}

// Contact Messages Functions
function openContactMessages() {
    openModal('contactMessagesModal');
    loadContactMessages();
}

function loadContactMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const content = document.getElementById('contactMessagesContent');
    
    if (messages.length === 0) {
        content.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No contact messages found.</p>';
        return;
    }
    
    let html = '';
    messages.reverse().forEach((message, index) => {
        const messageDate = new Date(message.timestamp).toLocaleString();
        html += `
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="color: #333; margin: 0;">${message.name}</h4>
                    <span style="color: #666; font-size: 12px;">${messageDate}</span>
                </div>
                <p style="color: #667eea; margin-bottom: 10px; font-weight: 600;">${message.email}</p>
                <p style="color: #666; line-height: 1.5;">${message.message}</p>
                <div style="margin-top: 15px;">
                    <button class="admin-btn admin-btn-secondary" onclick="replyToMessage('${message.email}')" style="padding: 5px 10px; font-size: 12px;">Reply</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteMessage(${index})" style="padding: 5px 10px; font-size: 12px;">Delete</button>
                </div>
            </div>
        `;
    });
    
    content.innerHTML = html;
}

function replyToMessage(email) {
    const subject = prompt('Enter email subject:');
    if (subject) {
        alert(`Reply email would be sent to ${email} with subject: "${subject}"\n\nIn a real application, this would open an email client or send an email automatically.`);
    }
}

function deleteMessage(index) {
    if (confirm('Are you sure you want to delete this message?')) {
        let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.splice(messages.length - 1 - index, 1); // Reverse index since we reversed the display
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        loadContactMessages();
        alert('Message deleted successfully!');
    }
}

function markAllRead() {
    alert('All messages marked as read! (In a real application, this would update the read status in the database)');
}

// System Settings Functions
function openSystemSettings() {
    openModal('systemSettingsModal');
    loadSystemSettings();
}

function loadSystemSettings() {
    const content = document.getElementById('systemSettingsContent');
    
    let html = `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 15px;">Data Management</h3>
            <p style="color: #666; margin-bottom: 15px;">Manage system data and storage</p>
            <button class="admin-btn admin-btn-secondary" onclick="backupData()">Backup All Data</button>
            <button class="admin-btn admin-btn-secondary" onclick="restoreData()">Restore Data</button>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 15px;">System Information</h3>
            <p style="color: #666; margin-bottom: 10px;"><strong>Version:</strong> AMNA Shop v1.0</p>
            <p style="color: #666; margin-bottom: 10px;"><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
            <p style="color: #666; margin-bottom: 10px;"><strong>Storage Used:</strong> ${(JSON.stringify(localStorage).length / 1024).toFixed(2)} KB</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
            <h3 style="color: #333; margin-bottom: 15px;">Maintenance</h3>
            <p style="color: #666; margin-bottom: 15px;">System maintenance and cleanup operations</p>
            <button class="admin-btn admin-btn-secondary" onclick="clearOldData()">Clear Old Data</button>
            <button class="admin-btn admin-btn-secondary" onclick="optimizeStorage()">Optimize Storage</button>
        </div>
    `;
    
    content.innerHTML = html;
}

function backupData() {
    const data = {
        users: JSON.parse(localStorage.getItem('registeredUsers') || '[]'),
        orders: JSON.parse(localStorage.getItem('orders') || '[]'),
        contactMessages: JSON.parse(localStorage.getItem('contactMessages') || '[]'),
        cart: JSON.parse(localStorage.getItem('cart') || '[]'),
        wishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
        backupDate: new Date().toISOString()
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
    
    alert('Data backup created and downloaded successfully!');
}

function restoreData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    if (data.users) localStorage.setItem('registeredUsers', JSON.stringify(data.users));
                    if (data.orders) localStorage.setItem('orders', JSON.stringify(data.orders));
                    if (data.contactMessages) localStorage.setItem('contactMessages', JSON.stringify(data.contactMessages));
                    if (data.cart) localStorage.setItem('cart', JSON.stringify(data.cart));
                    if (data.wishlist) localStorage.setItem('wishlist', JSON.stringify(data.wishlist));
                    
                    alert('Data restored successfully!');
                    loadAdminStats();
                } catch (error) {
                    alert('Error restoring data: Invalid file format.');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function clearOldData() {
    if (confirm('Are you sure you want to clear old data? This will remove orders older than 30 days.')) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const filteredOrders = orders.filter(order => new Date(order.orderDate) > thirtyDaysAgo);
        localStorage.setItem('orders', JSON.stringify(filteredOrders));
        
        alert(`Cleared ${orders.length - filteredOrders.length} old orders.`);
        loadAdminStats();
    }
}

function optimizeStorage() {
    // Remove empty arrays and clean up localStorage
    const keys = ['registeredUsers', 'orders', 'contactMessages', 'cart', 'wishlist'];
    keys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data === '[]' || data === 'null') {
            localStorage.removeItem(key);
        }
    });
    
    alert('Storage optimized successfully!');
}

function clearAllData() {
    if (confirm('⚠️ WARNING: This will delete ALL data including users, orders, and messages. This action cannot be undone. Are you absolutely sure?')) {
        if (confirm('This is your final warning. All data will be permanently deleted. Continue?')) {
            localStorage.clear();
            alert('All data has been cleared. You will be redirected to the admin login page.');
            window.location.href = 'admin-login.html';
        }
    }
}

// ========================================
// DARK MODE FUNCTIONALITY
// ========================================

function initializeDarkMode() {
    const isDarkMode = localStorage.getItem('adminDarkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').textContent = '☀️';
    }
}

function toggleDarkMode() {
    const body = document.body;
    const toggle = document.getElementById('darkModeToggle');
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        toggle.textContent = '🌙';
        localStorage.setItem('adminDarkMode', 'false');
    } else {
        body.classList.add('dark-mode');
        toggle.textContent = '☀️';
        localStorage.setItem('adminDarkMode', 'true');
    }
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function initializeNotifications() {
    // Create notifications storage if it doesn't exist
    if (!localStorage.getItem('adminNotifications')) {
        localStorage.setItem('adminNotifications', JSON.stringify([]));
    }
}

function checkForNewNotifications() {
    const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    const unreadCount = notifications.filter(n => !n.read).length;
    
    const badge = document.getElementById('notificationBadge');
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

function addNotification(type, title, message, data = {}) {
    const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    
    const notification = {
        id: Date.now(),
        type: type, // 'order', 'user', 'message', 'system'
        title: title,
        message: message,
        data: data,
        timestamp: new Date().toISOString(),
        read: false
    };
    
    notifications.unshift(notification);
    
    // Keep only last 50 notifications
    if (notifications.length > 50) {
        notifications.splice(50);
    }
    
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
    checkForNewNotifications();
}

function openNotifications() {
    openModal('notificationsModal');
    loadNotifications();
}

function loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    const content = document.getElementById('notificationsContent');
    
    if (notifications.length === 0) {
        content.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No notifications found.</p>';
        return;
    }
    
    let html = '';
    notifications.forEach(notification => {
        const timeAgo = getTimeAgo(new Date(notification.timestamp));
        const icon = getNotificationIcon(notification.type);
        const readClass = notification.read ? 'style="opacity: 0.6;"' : '';
        
        html += `
            <div class="notification-item" ${readClass} onclick="markNotificationRead(${notification.id})">
                <div style="display: flex; align-items: center; gap: 15px; padding: 15px; border-bottom: 1px solid #e1e5e9;">
                    <div style="font-size: 24px;">${icon}</div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 5px 0; color: #333;">${notification.title}</h4>
                        <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">${notification.message}</p>
                        <span style="color: #999; font-size: 12px;">${timeAgo}</span>
                    </div>
                    ${!notification.read ? '<div style="width: 8px; height: 8px; background: #dc3545; border-radius: 50%;"></div>' : ''}
                </div>
            </div>
        `;
    });
    
    content.innerHTML = html;
}

function getNotificationIcon(type) {
    switch (type) {
        case 'order': return '📦';
        case 'user': return '👥';
        case 'message': return '💬';
        case 'system': return '⚙️';
        default: return '🔔';
    }
}

function getTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

function markNotificationRead(notificationId) {
    let notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    const notification = notifications.find(n => n.id === notificationId);
    
    if (notification && !notification.read) {
        notification.read = true;
        localStorage.setItem('adminNotifications', JSON.stringify(notifications));
        checkForNewNotifications();
        loadNotifications();
    }
}

function markAllNotificationsRead() {
    let notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    notifications.forEach(notification => {
        notification.read = true;
    });
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
    checkForNewNotifications();
    loadNotifications();
}

// ========================================
// ORDER STATUS MANAGEMENT
// ========================================

function updateOrderStatus(orderId, newStatus) {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.orderId === orderId);
    
    if (order) {
        const oldStatus = order.status || 'Pending';
        order.status = newStatus;
        order.statusUpdated = new Date().toISOString();
        
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Add notification
        addNotification('order', 'Order Status Updated', 
            `Order ${orderId} status changed from ${oldStatus} to ${newStatus}`, 
            { orderId: orderId, status: newStatus });
        
        alert(`Order ${orderId} status updated to ${newStatus}`);
        loadOrderManagement();
    }
}

function getOrderStatusBadge(status) {
    switch (status) {
        case 'Pending': return '<span style="background: #ffc107; color: #000; padding: 2px 8px; border-radius: 12px; font-size: 12px;">Pending</span>';
        case 'Confirmed': return '<span style="background: #17a2b8; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">Confirmed</span>';
        case 'Delivered': return '<span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">Delivered</span>';
        case 'Cancelled': return '<span style="background: #dc3545; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">Cancelled</span>';
        default: return '<span style="background: #6c757d; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">Pending</span>';
    }
}

// Enhanced order management with status
function loadOrderManagement() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const content = document.getElementById('orderManagementContent');
    
    if (orders.length === 0) {
        content.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No orders found.</p>';
        return;
    }
    
    let html = '<table class="admin-table"><thead><tr><th>Order ID</th><th>Customer</th><th>Email</th><th>Total</th><th>Status</th><th>Date</th><th>Items</th><th>Actions</th></tr></thead><tbody>';
    
    orders.forEach(order => {
        const orderDate = new Date(order.orderDate).toLocaleDateString();
        const itemCount = order.items ? order.items.length : 0;
        const status = order.status || 'Pending';
        
        html += `
            <tr>
                <td>${order.orderId}</td>
                <td>${order.name}</td>
                <td>${order.email}</td>
                <td>${order.total.toFixed(2)} EGP</td>
                <td>${getOrderStatusBadge(status)}</td>
                <td>${orderDate}</td>
                <td>${itemCount} items</td>
                <td>
                    <select onchange="updateOrderStatus('${order.orderId}', this.value)" style="padding: 5px; border-radius: 5px; margin-right: 5px;">
                        <option value="Pending" ${status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Confirmed" ${status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Delivered" ${status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="Cancelled" ${status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                    <button class="admin-btn admin-btn-secondary" onclick="viewOrderDetails('${order.orderId}')" style="padding: 5px 10px; font-size: 12px;">View</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteOrder('${order.orderId}')" style="padding: 5px 10px; font-size: 12px;">Delete</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    content.innerHTML = html;
}

// ========================================
// ENHANCED USER MANAGEMENT WITH NOTIFICATIONS
// ========================================

function handleAddUser(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: formData.get('role'),
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
    
    // Add notification
    addNotification('user', 'New User Added', 
        `New ${userData.role} user "${userData.name}" has been added to the system`, 
        { email: userData.email, role: userData.role });
    
    alert('User added successfully!');
    e.target.reset();
    closeModal('addUserModal');
    loadAdminStats();
}

function deleteUser(email) {
    if (confirm('Are you sure you want to delete this user?')) {
        let users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const user = users.find(u => u.email === email);
        users = users.filter(u => u.email !== email);
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        // Add notification
        if (user) {
            addNotification('user', 'User Deleted', 
                `User "${user.name}" (${user.email}) has been deleted from the system`, 
                { email: user.email, name: user.name });
        }
        
        loadUserManagement();
        loadAdminStats();
        alert('User deleted successfully!');
    }
}

// ========================================
// ENHANCED PRODUCT MANAGEMENT WITH NOTIFICATIONS
// ========================================

function handleAddProduct(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const productData = {
        id: Date.now(), // Simple ID generation
        name: formData.get('name'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        img: formData.get('img'),
        description: formData.get('description')
    };
    
    // Add to products array (this would need to be stored in localStorage in a real app)
    if (typeof products !== 'undefined') {
        products.push(productData);
        
        // Add notification
        addNotification('system', 'New Product Added', 
            `Product "${productData.name}" has been added to the catalog`, 
            { productId: productData.id, name: productData.name, category: productData.category });
        
        alert('Product added successfully! Note: In a real application, this would be saved to a database.');
    }
    
    e.target.reset();
    closeModal('addProductModal');
    loadAdminStats();
}

function deleteProduct(productId) {
    if (typeof products === 'undefined') return;
    
    if (confirm('Are you sure you want to delete this product?')) {
        const index = products.findIndex(p => p.id === productId);
        if (index > -1) {
            const product = products[index];
            products.splice(index, 1);
            
            // Add notification
            addNotification('system', 'Product Deleted', 
                `Product "${product.name}" has been removed from the catalog`, 
                { productId: productId, name: product.name });
            
            alert('Product deleted successfully! Note: In a real application, this would be saved to a database.');
            loadProductManagement();
        }
    }
}

// ========================================
// ENHANCED CONTACT MESSAGES WITH NOTIFICATIONS
// ========================================

function loadContactMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const content = document.getElementById('contactMessagesContent');
    
    if (messages.length === 0) {
        content.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No contact messages found.</p>';
        return;
    }
    
    let html = '';
    messages.reverse().forEach((message, index) => {
        const messageDate = new Date(message.timestamp).toLocaleString();
        html += `
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="color: #333; margin: 0;">${message.name}</h4>
                    <span style="color: #666; font-size: 12px;">${messageDate}</span>
                </div>
                <p style="color: #667eea; margin-bottom: 10px; font-weight: 600;">${message.email}</p>
                <p style="color: #666; line-height: 1.5;">${message.message}</p>
                <div style="margin-top: 15px;">
                    <button class="admin-btn admin-btn-secondary" onclick="replyToMessage('${message.email}')" style="padding: 5px 10px; font-size: 12px;">Reply</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteMessage(${index})" style="padding: 5px 10px; font-size: 12px;">Delete</button>
                </div>
            </div>
        `;
    });
    
    content.innerHTML = html;
}

function deleteMessage(index) {
    if (confirm('Are you sure you want to delete this message?')) {
        let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        const message = messages[messages.length - 1 - index]; // Reverse index since we reversed the display
        messages.splice(messages.length - 1 - index, 1);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Add notification
        if (message) {
            addNotification('message', 'Contact Message Deleted', 
                `Message from "${message.name}" has been deleted`, 
                { email: message.email, name: message.name });
        }
        
        loadContactMessages();
        alert('Message deleted successfully!');
    }
}

// ========================================
// AUTO-NOTIFICATION SYSTEM
// ========================================

// This function would be called when new orders are placed or users sign up
// In a real application, this would be triggered by backend events
function simulateNewOrder() {
    const orderId = 'ORD-' + Date.now();
    addNotification('order', 'New Order Received', 
        `New order ${orderId} has been placed and is pending confirmation`, 
        { orderId: orderId, status: 'Pending' });
}

function simulateNewUser() {
    addNotification('user', 'New User Registration', 
        'A new user has registered on the website', 
        { type: 'registration' });
}

function simulateNewMessage() {
    addNotification('message', 'New Contact Message', 
        'A new message has been received through the contact form', 
        { type: 'contact' });
}

// Simulate notifications for demo purposes
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every interval
        const types = ['order', 'user', 'message'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        switch (type) {
            case 'order':
                simulateNewOrder();
                break;
            case 'user':
                simulateNewUser();
                break;
            case 'message':
                simulateNewMessage();
                break;
        }
    }
}, 30000); // Check every 30 seconds
