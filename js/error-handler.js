// AMNA Shop - Error Handling and User Feedback System
// Comprehensive error handling and user feedback functionality

// ========================================
// ERROR TYPES AND CONFIGURATION
// ========================================

const ERROR_TYPES = {
    NETWORK: 'network',
    VALIDATION: 'validation',
    AUTHENTICATION: 'authentication',
    PERMISSION: 'permission',
    DATA: 'data',
    SYSTEM: 'system',
    UNKNOWN: 'unknown'
};

const ERROR_MESSAGES = {
    [ERROR_TYPES.NETWORK]: {
        title: 'Connection Error',
        message: 'Unable to connect to the server. Please check your internet connection and try again.',
        icon: '🌐',
        action: 'Retry'
    },
    [ERROR_TYPES.VALIDATION]: {
        title: 'Invalid Input',
        message: 'Please check your input and try again.',
        icon: '⚠️',
        action: 'Fix'
    },
    [ERROR_TYPES.AUTHENTICATION]: {
        title: 'Authentication Required',
        message: 'Please log in to continue.',
        icon: '🔐',
        action: 'Login'
    },
    [ERROR_TYPES.PERMISSION]: {
        title: 'Access Denied',
        message: 'You do not have permission to perform this action.',
        icon: '🚫',
        action: 'OK'
    },
    [ERROR_TYPES.DATA]: {
        title: 'Data Error',
        message: 'There was an error processing your data.',
        icon: '📊',
        action: 'Retry'
    },
    [ERROR_TYPES.SYSTEM]: {
        title: 'System Error',
        message: 'An unexpected error occurred. Please try again later.',
        icon: '⚙️',
        action: 'OK'
    },
    [ERROR_TYPES.UNKNOWN]: {
        title: 'Unknown Error',
        message: 'An unexpected error occurred.',
        icon: '❓',
        action: 'OK'
    }
};

// ========================================
// ERROR HANDLER CLASS
// ========================================

class ErrorHandler {
    constructor() {
        this.errorLog = [];
        this.maxLogSize = 100;
        this.initializeErrorHandling();
    }

    // Initialize global error handling
    initializeErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.handleError({
                type: ERROR_TYPES.SYSTEM,
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack
            });
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                type: ERROR_TYPES.SYSTEM,
                message: event.reason?.message || 'Unhandled Promise Rejection',
                stack: event.reason?.stack
            });
        });

        // Network error handler
        this.setupNetworkErrorHandling();
    }

    // Setup network error handling
    setupNetworkErrorHandling() {
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response;
            } catch (error) {
                this.handleError({
                    type: ERROR_TYPES.NETWORK,
                    message: error.message,
                    url: args[0]
                });
                throw error;
            }
        };
    }

    // Handle error with context
    handleError(error, context = {}) {
        const errorInfo = {
            id: this.generateErrorId(),
            timestamp: new Date().toISOString(),
            type: error.type || ERROR_TYPES.UNKNOWN,
            message: error.message || 'Unknown error',
            context: context,
            userAgent: navigator.userAgent,
            url: window.location.href,
            stack: error.stack
        };

        // Log error
        this.logError(errorInfo);

        // Show user-friendly error message
        this.showErrorToUser(errorInfo);

        // Report error if critical
        if (this.isCriticalError(errorInfo)) {
            this.reportError(errorInfo);
        }

        return errorInfo;
    }

    // Generate unique error ID
    generateErrorId() {
        return 'ERR_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Log error to local storage
    logError(errorInfo) {
        this.errorLog.push(errorInfo);
        
        // Keep only recent errors
        if (this.errorLog.length > this.maxLogSize) {
            this.errorLog = this.errorLog.slice(-this.maxLogSize);
        }

        // Store in localStorage
        try {
            localStorage.setItem('errorLog', JSON.stringify(this.errorLog));
        } catch (e) {
            console.warn('Could not save error log:', e);
        }
    }

    // Show error to user
    showErrorToUser(errorInfo) {
        const errorConfig = ERROR_MESSAGES[errorInfo.type] || ERROR_MESSAGES[ERROR_TYPES.UNKNOWN];
        
        this.showNotification({
            title: errorConfig.title,
            message: errorConfig.message,
            type: 'error',
            icon: errorConfig.icon,
            action: errorConfig.action,
            errorId: errorInfo.id
        });
    }

    // Show notification with error details
    showNotification({ title, message, type = 'info', icon = 'ℹ️', action = 'OK', errorId = null }) {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        const bg = this.getNotificationColor(type);
        const border = this.getNotificationBorderColor(type);
        notification.style.cssText = `position: fixed; top: 20px; right: 20px; background: ${bg}; color: white; padding: 20px; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); z-index:10000; font-weight:600; max-width:400px; border-left:4px solid ${border}; opacity:0;`;

        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="font-size: 24px;">${icon}</div>
                <div style="flex: 1;">
                    <div style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">${title}</div>
                    <div style="font-size: 14px; opacity: 0.95; margin-bottom: 15px;">${message}</div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <button class="error-action-btn" style="background: rgba(255,255,255,0.12); border: none; color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold;">
                            ${action}
                        </button>
                        ${errorId ? `<span style="font-size: 10px; opacity: 0.7;">ID: ${errorId}</span>` : ''}
                    </div>
                </div>
            </div>
        `;

        // add fade transition
        notification.style.transition = 'opacity 0.5s ease';
        document.body.appendChild(notification);
        // show
        void notification.offsetWidth;
        notification.style.opacity = '1';

        // hook action button to close
        const btn = notification.querySelector('.error-action-btn');
        if (btn) btn.addEventListener('click', () => {
            notification.style.opacity = '0';
            setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 500);
        });

        // Auto-remove after 8 seconds (fade-out)
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 500);
            }
        }, 8000);
    }

    // Get notification color based on type
    getNotificationColor(type) {
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        return colors[type] || colors.info;
    }

    // Get notification border color
    getNotificationBorderColor(type) {
        const colors = {
            success: '#2ecc71',
            error: '#c0392b',
            warning: '#e67e22',
            info: '#2980b9'
        };
        return colors[type] || colors.info;
    }

    // Check if error is critical
    isCriticalError(errorInfo) {
        const criticalTypes = [ERROR_TYPES.SYSTEM, ERROR_TYPES.DATA];
        return criticalTypes.includes(errorInfo.type) || 
               errorInfo.message.includes('Critical') ||
               errorInfo.message.includes('Fatal');
    }

    // Report error to external service (placeholder)
    reportError(errorInfo) {
        // In a real application, this would send the error to a logging service
        console.error('Critical error reported:', errorInfo);
        
        // For demo purposes, we'll just log it
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: errorInfo.message,
                fatal: this.isCriticalError(errorInfo)
            });
        }
    }

    // Get error statistics
    getErrorStats() {
        const stats = {
            total: this.errorLog.length,
            byType: {},
            recent: this.errorLog.slice(-10),
            critical: this.errorLog.filter(e => this.isCriticalError(e)).length
        };

        this.errorLog.forEach(error => {
            stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
        });

        return stats;
    }

    // Clear error log
    clearErrorLog() {
        this.errorLog = [];
        localStorage.removeItem('errorLog');
    }

    // Export error log
    exportErrorLog() {
        const data = {
            errors: this.errorLog,
            stats: this.getErrorStats(),
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `error_log_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}

// ========================================
// VALIDATION HELPERS
// ========================================

class ValidationHelper {
    // Validate email
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate phone number
    static validatePhone(phone) {
        const phoneRegex = /^(\+20|0)?1[0-9]{9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // Validate password strength
    static validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
            strength: this.calculatePasswordStrength(password),
            requirements: {
                minLength: password.length >= minLength,
                hasUpperCase,
                hasLowerCase,
                hasNumbers,
                hasSpecialChar
            }
        };
    }

    // Calculate password strength
    static calculatePasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

        const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
        return levels[Math.min(score, levels.length - 1)];
    }

    // Validate form data
    static validateForm(formData, rules) {
        const errors = {};
        
        Object.keys(rules).forEach(field => {
            const value = formData[field];
            const rule = rules[field];
            
            if (rule.required && (!value || value.trim() === '')) {
                errors[field] = rule.requiredMessage || `${field} is required`;
                return;
            }
            
            if (value && rule.pattern && !rule.pattern.test(value)) {
                errors[field] = rule.patternMessage || `${field} format is invalid`;
                return;
            }
            
            if (value && rule.minLength && value.length < rule.minLength) {
                errors[field] = rule.minLengthMessage || `${field} must be at least ${rule.minLength} characters`;
                return;
            }
            
            if (value && rule.maxLength && value.length > rule.maxLength) {
                errors[field] = rule.maxLengthMessage || `${field} must be no more than ${rule.maxLength} characters`;
                return;
            }
        });
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}

// ========================================
// USER FEEDBACK SYSTEM
// ========================================

class FeedbackSystem {
    constructor() {
        this.feedbackQueue = [];
        this.isProcessing = false;
    }

    // Show success message
    showSuccess(message, duration = 3000) {
        this.showNotification({
            type: 'success',
            title: 'Success',
            message: message,
            icon: '✅',
            duration
        });
    }

    // Show error message
    showError(message, duration = 5000) {
        this.showNotification({
            type: 'error',
            title: 'Error',
            message: message,
            icon: '❌',
            duration
        });
    }

    // Show warning message
    showWarning(message, duration = 4000) {
        this.showNotification({
            type: 'warning',
            title: 'Warning',
            message: message,
            icon: '⚠️',
            duration
        });
    }

    // Show info message
    showInfo(message, duration = 3000) {
        this.showNotification({
            type: 'info',
            title: 'Information',
            message: message,
            icon: 'ℹ️',
            duration
        });
    }

    // Show loading message
    showLoading(message = 'Loading...') {
        const notification = document.createElement('div');
        notification.className = 'loading-notification';
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            z-index: 10001;
            font-weight: 600;
            text-align: center;
            animation: fadeIn 0.3s ease-out;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <div class="spinner" style="width: 20px; height: 20px; border: 2px solid #f3f3f3; border-top: 2px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);
        return notification;
    }

    // Hide loading message
    hideLoading(notification) {
        if (notification && notification.parentNode) {
            notification.style.transition = 'opacity 0.5s ease';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }
    }

    // Show notification
    showNotification({ type, title, message, icon, duration = 3000 }) {
        const notification = document.createElement('div');
        notification.className = 'feedback-notification';
        const bg = this.getNotificationColor(type);
        notification.style.cssText = `position: fixed; top: 20px; right: 20px; background: ${bg}; color: white; padding: 15px 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); z-index:10000; font-weight:600; max-width:350px; opacity:0;`;

        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 10px;">
                <div style="font-size: 20px;">${icon}</div>
                <div style="flex: 1;">
                    <div style="font-size: 14px; font-weight: bold; margin-bottom: 3px;">${title}</div>
                    <div style="font-size: 13px; opacity: 0.9;">${message}</div>
                </div>
                <button class="feedback-close-btn" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px; opacity: 0.7; padding: 0;">×</button>
            </div>
        `;

        notification.style.transition = 'opacity 0.5s ease';
        document.body.appendChild(notification);
        void notification.offsetWidth;
        notification.style.opacity = '1';

        const closeBtn = notification.querySelector('.feedback-close-btn');
        if (closeBtn) closeBtn.addEventListener('click', () => { notification.style.opacity = '0'; setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 500); });

        // Auto-remove after duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 500);
            }
        }, duration);
    }

    // Get notification color
    getNotificationColor(type) {
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        return colors[type] || colors.info;
    }
}

// ========================================
// GLOBAL INSTANCES
// ========================================

// Create global instances
window.errorHandler = new ErrorHandler();
window.feedbackSystem = new FeedbackSystem();
window.validationHelper = ValidationHelper;

// ========================================
// CSS ANIMATIONS
// ========================================

const errorHandlerStyle = document.createElement('style');
errorHandlerStyle.textContent = `
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
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
        }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .error-notification {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .feedback-notification {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .loading-notification {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
`;
document.head.appendChild(errorHandlerStyle);

// ========================================
// EXPORT FOR MODULE USAGE
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ErrorHandler,
        FeedbackSystem,
        ValidationHelper,
        ERROR_TYPES
    };
}
