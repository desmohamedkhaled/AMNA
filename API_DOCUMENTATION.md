# 🔧 AMNA Shop API Documentation

## Overview
This document provides comprehensive API documentation for all JavaScript modules and functions in the AMNA Shop e-commerce platform. The project uses vanilla JavaScript with modular architecture for maintainability and scalability.

## 📁 Module Structure

### Core Modules
- `main.js` - Main application logic and initialization
- `navigation.js` - Navigation management and UI updates
- `mockdata.js` - Mock data and utility functions
- `form.js` - Form handling and validation
- `cart.js` - Shopping cart functionality
- `checkout.js` - Checkout process management
- `admin.js` - Admin panel functionality
- `error-handler.js` - Error handling and logging
- `backup-system.js` - Data backup and restore

---

## 🚀 Main Module (`main.js`)

### Initialization Functions

#### `initializeApplication()`
**Purpose**: Main application initialization
**Parameters**: None
**Returns**: void
**Description**: Sets up the entire application on DOM load

```javascript
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initializeNavigation();
    initializeForms();
    initializeAnimations();
    initializeScrollEffects();
    updateCartCountOnLoad();
    initializeProductDisplay();
});
```

#### `checkLoginStatus()`
**Purpose**: Check user authentication status
**Parameters**: None
**Returns**: void
**Description**: Updates UI based on login state

**Local Storage Used**:
- `currentUser` - Stores logged-in user data

#### `updateCartCountOnLoad()`
**Purpose**: Update cart count display
**Parameters**: None
**Returns**: void
**Description**: Calculates and displays current cart item count

**Local Storage Used**:
- `cart` - Array of cart items

### Product Management Functions

#### `displayProducts(products, container)`
**Purpose**: Render products in a container
**Parameters**:
- `products` (Array) - Array of product objects
- `container` (HTMLElement) - DOM element to render products in
**Returns**: void
**Description**: Creates product cards with add to cart functionality

**Product Object Structure**:
```javascript
{
    id: number,
    name: string,
    price: number, // in EGP
    category: string,
    image: string,
    description: string,
    stock: number,
    rating: number,
    reviews: number
}
```

#### `addToCart(productId, quantity = 1)`
**Purpose**: Add product to shopping cart
**Parameters**:
- `productId` (number) - ID of product to add
- `quantity` (number) - Quantity to add (default: 1)
**Returns**: boolean - Success status
**Description**: Adds product to cart with validation

**Local Storage Used**:
- `cart` - Updates cart array
- `products` - Reads product data

#### `removeFromCart(productId)`
**Purpose**: Remove product from cart
**Parameters**:
- `productId` (number) - ID of product to remove
**Returns**: boolean - Success status
**Description**: Removes product from cart

#### `updateCartQuantity(productId, quantity)`
**Purpose**: Update product quantity in cart
**Parameters**:
- `productId` (number) - ID of product to update
- `quantity` (number) - New quantity
**Returns**: boolean - Success status
**Description**: Updates quantity with validation

### Wishlist Functions

#### `addToWishlist(productId)`
**Purpose**: Add product to wishlist
**Parameters**:
- `productId` (number) - ID of product to add
**Returns**: boolean - Success status
**Description**: Adds product to user's wishlist

**Local Storage Used**:
- `wishlist` - Array of wishlist items

#### `removeFromWishlist(productId)`
**Purpose**: Remove product from wishlist
**Parameters**:
- `productId` (number) - ID of product to remove
**Returns**: boolean - Success status

#### `isInWishlist(productId)`
**Purpose**: Check if product is in wishlist
**Parameters**:
- `productId` (number) - ID of product to check
**Returns**: boolean - Whether product is in wishlist

### Search Functions

#### `searchProducts(query, filters = {})`
**Purpose**: Search products with filters
**Parameters**:
- `query` (string) - Search query
- `filters` (object) - Filter options
**Returns**: Array - Filtered products

**Filter Object Structure**:
```javascript
{
    category: string,
    minPrice: number,
    maxPrice: number,
    minRating: number,
    sortBy: string // 'name', 'price', 'rating', 'reviews'
}
```

#### `getSearchSuggestions(query)`
**Purpose**: Get search suggestions
**Parameters**:
- `query` (string) - Partial search query
**Returns**: Array - Array of suggestion strings

### Utility Functions

#### `formatPrice(price)`
**Purpose**: Format price in EGP
**Parameters**:
- `price` (number) - Price value
**Returns**: string - Formatted price string

**Example**:
```javascript
formatPrice(1249) // Returns "1,249 EGP"
```

#### `showNotification(message, type = 'info')`
**Purpose**: Show user notification
**Parameters**:
- `message` (string) - Notification message
- `type` (string) - Notification type ('success', 'error', 'warning', 'info')
**Returns**: void

#### `debounce(func, wait)`
**Purpose**: Debounce function calls
**Parameters**:
- `func` (function) - Function to debounce
- `wait` (number) - Wait time in milliseconds
**Returns**: function - Debounced function

---

## 🧭 Navigation Module (`navigation.js`)

### Core Functions

#### `initializeNavigation()`
**Purpose**: Initialize navigation system
**Parameters**: None
**Returns**: void
**Description**: Sets up navigation, user menu, and footer

#### `updateUserMenu()`
**Purpose**: Update user menu based on login status
**Parameters**: None
**Returns**: void
**Description**: Shows/hides login buttons and user menu

#### `generateFooter()`
**Purpose**: Generate footer HTML
**Parameters**: None
**Returns**: void
**Description**: Creates comprehensive footer with links

#### `highlightActivePage()`
**Purpose**: Highlight current page in navigation
**Parameters**: None
**Returns**: void
**Description**: Adds active class to current page link

### Navigation Data

#### `navigationLinks`
**Type**: Array
**Description**: Main navigation links structure

```javascript
const navigationLinks = [
    { name: 'Home', url: 'index.html' },
    { name: 'About', url: 'about.html' },
    { name: 'Services', url: 'services.html' },
    { name: 'Shop', url: 'shop.html' },
    { name: 'Contact', url: 'contact.html' }
];
```

#### `footerSections`
**Type**: Object
**Description**: Footer sections and links

```javascript
const footerSections = {
    quickLinks: [...],
    categories: [...],
    support: [...],
    social: [...]
};
```

---

## 📊 Mock Data Module (`mockdata.js`)

### Data Collections

#### `products`
**Type**: Array
**Description**: Complete product catalog
**Count**: 25 products across 5 categories

**Categories**:
- Electronics (5 products)
- Fashion (5 products)
- Accessories (5 products)
- Home (5 products)
- Beauty (5 products)

#### `users`
**Type**: Array
**Description**: User accounts including admin
**Count**: 7 users

**User Roles**:
- `admin` - Full system access
- `user` - Regular user access

#### `orders`
**Type**: Array
**Description**: Sample order history
**Features**: Realistic order data with Egyptian context

#### `contactMessages`
**Type**: Array
**Description**: Contact form submissions
**Features**: Sample customer inquiries

### Utility Functions

#### `getProductsByCategory(category)`
**Purpose**: Get products by category
**Parameters**:
- `category` (string) - Category name
**Returns**: Array - Products in category

#### `getUserByEmail(email)`
**Purpose**: Find user by email
**Parameters**:
- `email` (string) - User email
**Returns**: Object|null - User object or null

#### `getProductById(id)`
**Purpose**: Find product by ID
**Parameters**:
- `id` (number) - Product ID
**Returns**: Object|null - Product object or null

#### `generateOrderId()`
**Purpose**: Generate unique order ID
**Parameters**: None
**Returns**: string - Unique order ID

---

## 🛒 Cart Module (`cart.js`)

### Core Functions

#### `loadCart()`
**Purpose**: Load cart from localStorage
**Parameters**: None
**Returns**: Array - Cart items

#### `saveCart(cart)`
**Purpose**: Save cart to localStorage
**Parameters**:
- `cart` (Array) - Cart items array
**Returns**: void

#### `addToCart(productId, quantity = 1)`
**Purpose**: Add item to cart
**Parameters**:
- `productId` (number) - Product ID
- `quantity` (number) - Quantity
**Returns**: boolean - Success status

#### `removeFromCart(productId)`
**Purpose**: Remove item from cart
**Parameters**:
- `productId` (number) - Product ID
**Returns**: boolean - Success status

#### `updateCartQuantity(productId, quantity)`
**Purpose**: Update item quantity
**Parameters**:
- `productId` (number) - Product ID
- `quantity` (number) - New quantity
**Returns**: boolean - Success status

#### `clearCart()`
**Purpose**: Clear all cart items
**Parameters**: None
**Returns**: void

#### `getCartTotal()`
**Purpose**: Calculate cart total
**Parameters**: None
**Returns**: number - Total price in EGP

#### `getCartCount()`
**Purpose**: Get total item count
**Parameters**: None
**Returns**: number - Total quantity

---

## 💳 Checkout Module (`checkout.js`)

### Core Functions

#### `initializeCheckout()`
**Purpose**: Initialize checkout process
**Parameters**: None
**Returns**: void
**Description**: Sets up checkout form and validation

#### `validateCheckoutForm()`
**Purpose**: Validate checkout form
**Parameters**: None
**Returns**: boolean - Validation status
**Description**: Validates all form fields

#### `processOrder()`
**Purpose**: Process the order
**Parameters**: None
**Returns**: boolean - Success status
**Description**: Creates order and redirects to success page

#### `calculateShipping(address)`
**Purpose**: Calculate shipping cost
**Parameters**:
- `address` (object) - Delivery address
**Returns**: number - Shipping cost in EGP

**Address Object Structure**:
```javascript
{
    street: string,
    city: string,
    governorate: string,
    postalCode: string
}
```

#### `calculateTax(subtotal)`
**Purpose**: Calculate tax amount
**Parameters**:
- `subtotal` (number) - Order subtotal
**Returns**: number - Tax amount in EGP

#### `generateOrderNumber()`
**Purpose**: Generate order number
**Parameters**: None
**Returns**: string - Unique order number

---

## 👨‍💼 Admin Module (`admin.js`)

### Authentication Functions

#### `adminLogin(email, password)`
**Purpose**: Authenticate admin user
**Parameters**:
- `email` (string) - Admin email
- `password` (string) - Admin password
**Returns**: boolean - Authentication status

#### `adminLogout()`
**Purpose**: Logout admin user
**Parameters**: None
**Returns**: void

#### `isAdminLoggedIn()`
**Purpose**: Check admin login status
**Parameters**: None
**Returns**: boolean - Login status

### User Management

#### `getAllUsers()`
**Purpose**: Get all registered users
**Parameters**: None
**Returns**: Array - All users

#### `addUser(userData)`
**Purpose**: Add new user
**Parameters**:
- `userData` (object) - User information
**Returns**: boolean - Success status

#### `updateUser(userId, userData)`
**Purpose**: Update user information
**Parameters**:
- `userId` (number) - User ID
- `userData` (object) - Updated user data
**Returns**: boolean - Success status

#### `deleteUser(userId)`
**Purpose**: Delete user
**Parameters**:
- `userId` (number) - User ID
**Returns**: boolean - Success status

### Order Management

#### `getAllOrders()`
**Purpose**: Get all orders
**Parameters**: None
**Returns**: Array - All orders

#### `updateOrderStatus(orderId, status)`
**Purpose**: Update order status
**Parameters**:
- `orderId` (string) - Order ID
- `status` (string) - New status
**Returns**: boolean - Success status

**Order Statuses**:
- `pending` - Order received
- `confirmed` - Order confirmed
- `shipped` - Order shipped
- `delivered` - Order delivered
- `cancelled` - Order cancelled

### Product Management

#### `addProduct(productData)`
**Purpose**: Add new product
**Parameters**:
- `productData` (object) - Product information
**Returns**: boolean - Success status

#### `updateProduct(productId, productData)`
**Purpose**: Update product
**Parameters**:
- `productId` (number) - Product ID
- `productData` (object) - Updated product data
**Returns**: boolean - Success status

#### `deleteProduct(productId)`
**Purpose**: Delete product
**Parameters**:
- `productId` (number) - Product ID
**Returns**: boolean - Success status

### Analytics Functions

#### `getSalesAnalytics()`
**Purpose**: Get sales analytics
**Parameters**: None
**Returns**: object - Sales data

#### `getUserAnalytics()`
**Purpose**: Get user analytics
**Parameters**: None
**Returns**: object - User data

#### `getOrderAnalytics()`
**Purpose**: Get order analytics
**Parameters**: None
**Returns**: object - Order data

---

## ⚠️ Error Handler Module (`error-handler.js`)

### Core Functions

#### `initializeErrorHandler()`
**Purpose**: Initialize global error handling
**Parameters**: None
**Returns**: void
**Description**: Sets up global error listeners

#### `handleError(error, context = '')`
**Purpose**: Handle application errors
**Parameters**:
- `error` (Error|string) - Error object or message
- `context` (string) - Error context
**Returns**: void
**Description**: Logs and displays errors

#### `logError(error, context)`
**Purpose**: Log error to console and storage
**Parameters**:
- `error` (Error|string) - Error to log
- `context` (string) - Error context
**Returns**: void

#### `showErrorNotification(message)`
**Purpose**: Show error notification to user
**Parameters**:
- `message` (string) - Error message
**Returns**: void

#### `getErrorLog()`
**Purpose**: Get error log
**Parameters**: None
**Returns**: Array - Error log entries

#### `clearErrorLog()`
**Purpose**: Clear error log
**Parameters**: None
**Returns**: void

---

## 💾 Backup System Module (`backup-system.js`)

### Core Functions

#### `createBackup()`
**Purpose**: Create system backup
**Parameters**: None
**Returns**: object - Backup data
**Description**: Exports all system data

#### `restoreBackup(backupData)`
**Purpose**: Restore from backup
**Parameters**:
- `backupData` (object) - Backup data
**Returns**: boolean - Success status

#### `exportData(format = 'json')`
**Purpose**: Export data in specified format
**Parameters**:
- `format` (string) - Export format ('json', 'csv')
**Returns**: string - Exported data

#### `importData(data, format = 'json')`
**Purpose**: Import data from file
**Parameters**:
- `data` (string) - Data to import
- `format` (string) - Data format
**Returns**: boolean - Success status

#### `validateBackup(backupData)`
**Purpose**: Validate backup data
**Parameters**:
- `backupData` (object) - Backup to validate
**Returns**: boolean - Validation status

---

## 📝 Form Module (`form.js`)

### Validation Functions

#### `validateEmail(email)`
**Purpose**: Validate email format
**Parameters**:
- `email` (string) - Email to validate
**Returns**: boolean - Validation status

#### `validatePassword(password)`
**Purpose**: Validate password strength
**Parameters**:
- `password` (string) - Password to validate
**Returns**: object - Validation result

**Validation Rules**:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

#### `validatePhone(phone)`
**Purpose**: Validate Egyptian phone number
**Parameters**:
- `phone` (string) - Phone number to validate
**Returns**: boolean - Validation status

**Egyptian Phone Format**:
- Starts with +20 or 0
- Followed by 10 digits
- Examples: +201234567890, 01234567890

#### `validateRequired(field)`
**Purpose**: Validate required field
**Parameters**:
- `field` (HTMLElement) - Field to validate
**Returns**: boolean - Validation status

### Form Handling

#### `handleFormSubmit(form, callback)`
**Purpose**: Handle form submission
**Parameters**:
- `form` (HTMLElement) - Form element
- `callback` (function) - Success callback
**Returns**: void

#### `showFieldError(field, message)`
**Purpose**: Show field error message
**Parameters**:
- `field` (HTMLElement) - Field element
- `message` (string) - Error message
**Returns**: void

#### `clearFieldError(field)`
**Purpose**: Clear field error
**Parameters**:
- `field` (HTMLElement) - Field element
**Returns**: void

---

## 🔧 Local Storage Schema

### Data Structure

#### Users
```javascript
localStorage.setItem('users', JSON.stringify([
    {
        id: number,
        username: string,
        email: string,
        password: string, // Hashed in production
        role: 'user' | 'admin',
        profile: {
            firstName: string,
            lastName: string,
            phone: string,
            address: object
        },
        createdAt: string, // ISO date
        lastLogin: string // ISO date
    }
]));
```

#### Products
```javascript
localStorage.setItem('products', JSON.stringify([
    {
        id: number,
        name: string,
        price: number, // EGP
        category: string,
        image: string,
        description: string,
        stock: number,
        rating: number,
        reviews: number,
        features: array,
        specifications: object
    }
]));
```

#### Cart
```javascript
localStorage.setItem('cart', JSON.stringify([
    {
        productId: number,
        quantity: number,
        addedAt: string // ISO date
    }
]));
```

#### Orders
```javascript
localStorage.setItem('orders', JSON.stringify([
    {
        id: string,
        userId: number,
        items: array,
        total: number, // EGP
        shipping: number, // EGP
        tax: number, // EGP
        status: string,
        shippingAddress: object,
        billingAddress: object,
        createdAt: string, // ISO date
        updatedAt: string // ISO date
    }
]));
```

#### Wishlist
```javascript
localStorage.setItem('wishlist', JSON.stringify([
    {
        productId: number,
        addedAt: string // ISO date
    }
]));
```

---

## 🚨 Error Codes

### Common Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| `AUTH_001` | Invalid credentials | Check email/password |
| `AUTH_002` | User not found | Verify email address |
| `AUTH_003` | Session expired | Re-login required |
| `CART_001` | Product not found | Check product ID |
| `CART_002` | Insufficient stock | Reduce quantity |
| `CART_003` | Cart is empty | Add items to cart |
| `ORDER_001` | Invalid order data | Check form fields |
| `ORDER_002` | Payment failed | Retry payment |
| `ADMIN_001` | Access denied | Admin login required |
| `ADMIN_002` | Invalid admin credentials | Check admin credentials |

---

## 🔄 Event System

### Custom Events

#### `cartUpdated`
**Triggered**: When cart is modified
**Data**: `{ cart: array, total: number }`

#### `userLoggedIn`
**Triggered**: When user logs in
**Data**: `{ user: object }`

#### `userLoggedOut`
**Triggered**: When user logs out
**Data**: `{}`

#### `orderPlaced`
**Triggered**: When order is placed
**Data**: `{ order: object }`

#### `productAdded`
**Triggered**: When product is added to cart
**Data**: `{ product: object, quantity: number }`

---

## 📱 Browser Compatibility

### Supported Browsers
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Required Features
- Local Storage API
- ES6+ JavaScript support
- CSS Grid and Flexbox
- Fetch API (for future backend integration)

---

## 🎯 Performance Considerations

### Optimization Tips
1. **Debounce search inputs** - Use `debounce()` function
2. **Lazy load images** - Implement lazy loading for product images
3. **Minimize DOM manipulation** - Use document fragments
4. **Cache frequently used data** - Store in variables
5. **Use event delegation** - Reduce event listeners

### Memory Management
- Clear unused data from localStorage
- Remove event listeners on page unload
- Use weak references where possible
- Implement proper cleanup functions

---

## 🔒 Security Considerations

### Data Protection
- Hash passwords before storage
- Validate all user inputs
- Sanitize data before display
- Use HTTPS in production
- Implement CSRF protection

### Best Practices
- Never store sensitive data in localStorage
- Validate data on both client and server
- Use secure authentication methods
- Implement proper session management
- Regular security audits

---

## 📚 Usage Examples

### Basic Product Display
```javascript
// Load products and display
const products = getProductsByCategory('Electronics');
displayProducts(products, document.getElementById('productContainer'));
```

### Add to Cart
```javascript
// Add product to cart
const success = addToCart(1, 2); // Product ID 1, quantity 2
if (success) {
    showNotification('Product added to cart!', 'success');
}
```

### Search Products
```javascript
// Search with filters
const results = searchProducts('headphones', {
    category: 'Electronics',
    minPrice: 500,
    maxPrice: 2000,
    minRating: 4.0
});
```

### Admin Operations
```javascript
// Admin login
const isAdmin = adminLogin('admin@amnashop.com', 'admin123');
if (isAdmin) {
    // Access admin dashboard
    window.location.href = 'admin-dashboard.html';
}
```

---

## 🆘 Troubleshooting

### Common Issues

#### Cart Not Updating
- Check if localStorage is enabled
- Verify product IDs exist
- Check for JavaScript errors in console

#### Login Issues
- Verify email format
- Check password requirements
- Ensure user exists in mock data

#### Search Not Working
- Check search query format
- Verify filter parameters
- Ensure products array is loaded

#### Admin Access Denied
- Use correct admin credentials
- Check if admin user exists
- Verify role assignment

---

## 🔮 Future Enhancements

### Planned API Improvements
- RESTful API endpoints
- Real-time data synchronization
- Advanced search with Elasticsearch
- Payment gateway integration
- Email notification system
- Push notification support

### Performance Optimizations
- Service Worker implementation
- Progressive Web App features
- Advanced caching strategies
- Image optimization
- Code splitting and lazy loading

---

**AMNA Shop API Documentation** - Comprehensive guide for developers

*All monetary amounts are in Egyptian Pounds (EGP) as per Egyptian business standards.*
