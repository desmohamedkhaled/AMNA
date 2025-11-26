// AMNA Shop - Form handling and validation
// Simple form validation and submission handling

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateName(name) {
    return name.trim().length >= 2;
}

// Show form error
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.textContent = message;
    } else {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = '#e74c3c';
        error.style.fontSize = '14px';
        error.style.marginTop = '5px';
        error.textContent = message;
        formGroup.appendChild(error);
    }
    
    input.style.borderColor = '#e74c3c';
}

// Clear form error
function clearError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.style.borderColor = '#e0e0e0';
}

// Validate contact form
function validateContactForm(form) {
    let isValid = true;
    
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');
    
    // Validate name
    if (!validateName(name.value)) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearError(name);
    }
    
    // Validate email
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(email);
    }
    
    // Validate message
    if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError(message);
    }
    
    return isValid;
}

// Validate login form
function validateLoginForm(form) {
    let isValid = true;
    
    const email = form.querySelector('input[name="email"]');
    const password = form.querySelector('input[name="password"]');
    
    // Validate email
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(email);
    }
    
    // Validate password
    if (!validatePassword(password.value)) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
    } else {
        clearError(password);
    }
    
    return isValid;
}

// Validate signup form
function validateSignupForm(form) {
    let isValid = true;
    
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const password = form.querySelector('input[name="password"]');
    const confirmPassword = form.querySelector('input[name="confirmPassword"]');
    
    // Validate name
    if (!validateName(name.value)) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearError(name);
    }
    
    // Validate email
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(email);
    }
    
    // Validate password
    if (!validatePassword(password.value)) {
        showError(password, 'Password must be at least 6 characters');
        isValid = false;
    } else {
        clearError(password);
    }
    
    // Validate password confirmation
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    } else {
        clearError(confirmPassword);
    }
    
    return isValid;
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', function() {
    // Add real-time validation to form inputs
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(input);
            });
            
            input.addEventListener('input', function() {
                clearError(input);
            });
        });
    });
});

// Validate individual input
function validateInput(input) {
    const value = input.value.trim();
    const name = input.name;
    
    switch (name) {
        case 'name':
            if (value && !validateName(value)) {
                showError(input, 'Name must be at least 2 characters');
            }
            break;
        case 'email':
            if (value && !validateEmail(value)) {
                showError(input, 'Please enter a valid email address');
            }
            break;
        case 'password':
            if (value && !validatePassword(value)) {
                showError(input, 'Password must be at least 6 characters');
            }
            break;
    }
}
