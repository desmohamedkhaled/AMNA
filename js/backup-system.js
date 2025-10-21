// AMNA Shop - Data Backup and Restore System
// Comprehensive data persistence and backup functionality

// ========================================
// BACKUP SYSTEM CLASS
// ========================================

class BackupSystem {
    constructor() {
        this.backupKey = 'amna_shop_backup';
        this.autoBackupInterval = 30 * 60 * 1000; // 30 minutes
        this.maxBackups = 10;
        this.initializeAutoBackup();
    }

    // Initialize automatic backup
    initializeAutoBackup() {
        // Auto-backup every 30 minutes
        setInterval(() => {
            this.createAutoBackup();
        }, this.autoBackupInterval);

        // Backup on page unload
        window.addEventListener('beforeunload', () => {
            this.createAutoBackup();
        });

        // Backup on data changes
        this.setupDataChangeListeners();
    }

    // Setup listeners for data changes
    setupDataChangeListeners() {
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
            originalSetItem.call(this, key, value);
            
            // Trigger backup for important data changes
            if (['cart', 'orders', 'registeredUsers', 'wishlist'].includes(key)) {
                window.backupSystem?.createAutoBackup();
            }
        };
    }

    // Create automatic backup
    createAutoBackup() {
        try {
            const backup = this.createBackup('auto');
            this.saveBackup(backup);
            console.log('Auto-backup created successfully');
        } catch (error) {
            console.error('Auto-backup failed:', error);
        }
    }

    // Create manual backup
    createManualBackup() {
        try {
            const backup = this.createBackup('manual');
            this.saveBackup(backup);
            this.feedbackSystem?.showSuccess('Backup created successfully!');
            return backup;
        } catch (error) {
            this.feedbackSystem?.showError('Failed to create backup: ' + error.message);
            throw error;
        }
    }

    // Create backup data
    createBackup(type = 'manual') {
        const timestamp = new Date().toISOString();
        const version = '1.0';
        
        // Collect all relevant data
        const data = {
            // User data
            users: this.getData('registeredUsers'),
            currentUser: this.getData('currentUser'),
            loggedInUser: this.getData('loggedInUser'),
            
            // Shopping data
            cart: this.getData('cart'),
            wishlist: this.getData('wishlist'),
            comparisonProducts: this.getData('comparisonProducts'),
            
            // Order data
            orders: this.getData('orders'),
            
            // Contact and messages
            contactMessages: this.getData('contactMessages'),
            
            // Settings
            settings: this.getData('settings'),
            darkMode: this.getData('darkMode'),
            
            // Error log
            errorLog: this.getData('errorLog'),
            
            // Backup metadata
            backupInfo: {
                type: type,
                timestamp: timestamp,
                version: version,
                userAgent: navigator.userAgent,
                url: window.location.href,
                dataSize: 0 // Will be calculated
            }
        };

        // Calculate data size
        const dataString = JSON.stringify(data);
        data.backupInfo.dataSize = new Blob([dataString]).size;

        return data;
    }

    // Get data from localStorage with fallback
    getData(key, defaultValue = []) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.warn(`Failed to get data for key ${key}:`, error);
            return defaultValue;
        }
    }

    // Save backup to localStorage
    saveBackup(backup) {
        const backups = this.getBackups();
        
        // Add new backup
        backups.unshift(backup);
        
        // Keep only recent backups
        if (backups.length > this.maxBackups) {
            backups.splice(this.maxBackups);
        }
        
        // Save backups
        localStorage.setItem('amna_shop_backups', JSON.stringify(backups));
    }

    // Get all backups
    getBackups() {
        return this.getData('amna_shop_backups', []);
    }

    // Restore from backup
    restoreFromBackup(backup) {
        try {
            // Validate backup
            if (!this.validateBackup(backup)) {
                throw new Error('Invalid backup data');
            }

            // Restore data
            Object.keys(backup).forEach(key => {
                if (key !== 'backupInfo' && backup[key] !== undefined) {
                    localStorage.setItem(key, JSON.stringify(backup[key]));
                }
            });

            this.feedbackSystem?.showSuccess('Data restored successfully!');
            
            // Reload page to apply changes
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            this.feedbackSystem?.showError('Failed to restore backup: ' + error.message);
            throw error;
        }
    }

    // Validate backup data
    validateBackup(backup) {
        if (!backup || typeof backup !== 'object') {
            return false;
        }

        // Check for required fields
        const requiredFields = ['backupInfo'];
        return requiredFields.every(field => backup.hasOwnProperty(field));
    }

    // Export backup to file
    exportBackup(backup) {
        try {
            const dataString = JSON.stringify(backup, null, 2);
            const blob = new Blob([dataString], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `amna_shop_backup_${backup.backupInfo.timestamp.split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            this.feedbackSystem?.showSuccess('Backup exported successfully!');
        } catch (error) {
            this.feedbackSystem?.showError('Failed to export backup: ' + error.message);
            throw error;
        }
    }

    // Import backup from file
    importBackup(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const backup = JSON.parse(e.target.result);
                    
                    if (!this.validateBackup(backup)) {
                        throw new Error('Invalid backup file');
                    }

                    this.restoreFromBackup(backup);
                    resolve(backup);
                } catch (error) {
                    this.feedbackSystem?.showError('Failed to import backup: ' + error.message);
                    reject(error);
                }
            };

            reader.onerror = () => {
                this.feedbackSystem?.showError('Failed to read backup file');
                reject(new Error('Failed to read file'));
            };

            reader.readAsText(file);
        });
    }

    // Clear all data
    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            try {
                // Clear all AMNA Shop data
                const keysToRemove = [
                    'registeredUsers',
                    'currentUser',
                    'loggedInUser',
                    'cart',
                    'wishlist',
                    'comparisonProducts',
                    'orders',
                    'contactMessages',
                    'settings',
                    'darkMode',
                    'errorLog',
                    'amna_shop_backups'
                ];

                keysToRemove.forEach(key => {
                    localStorage.removeItem(key);
                });

                this.feedbackSystem?.showSuccess('All data cleared successfully!');
                
                // Reload page
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            } catch (error) {
                this.feedbackSystem?.showError('Failed to clear data: ' + error.message);
            }
        }
    }

    // Get backup statistics
    getBackupStats() {
        const backups = this.getBackups();
        const totalSize = backups.reduce((sum, backup) => sum + (backup.backupInfo?.dataSize || 0), 0);
        
        return {
            totalBackups: backups.length,
            totalSize: totalSize,
            totalSizeFormatted: this.formatBytes(totalSize),
            oldestBackup: backups[backups.length - 1]?.backupInfo?.timestamp,
            newestBackup: backups[0]?.backupInfo?.timestamp,
            autoBackups: backups.filter(b => b.backupInfo?.type === 'auto').length,
            manualBackups: backups.filter(b => b.backupInfo?.type === 'manual').length
        };
    }

    // Format bytes to human readable format
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // Clean old backups
    cleanOldBackups() {
        const backups = this.getBackups();
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 30); // Keep backups for 30 days
        
        const filteredBackups = backups.filter(backup => {
            const backupDate = new Date(backup.backupInfo?.timestamp);
            return backupDate > cutoffDate;
        });
        
        if (filteredBackups.length < backups.length) {
            localStorage.setItem('amna_shop_backups', JSON.stringify(filteredBackups));
            this.feedbackSystem?.showSuccess(`Cleaned ${backups.length - filteredBackups.length} old backups`);
        }
    }
}

// ========================================
// DATA SYNCHRONIZATION
// ========================================

class DataSync {
    constructor() {
        this.syncInterval = 5 * 60 * 1000; // 5 minutes
        this.isOnline = navigator.onLine;
        this.setupOnlineOfflineListeners();
    }

    // Setup online/offline listeners
    setupOnlineOfflineListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncPendingData();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    // Sync pending data
    syncPendingData() {
        if (!this.isOnline) return;

        try {
            // Sync cart data
            this.syncCartData();
            
            // Sync user data
            this.syncUserData();
            
            // Sync order data
            this.syncOrderData();
            
            console.log('Data synchronization completed');
        } catch (error) {
            console.error('Data synchronization failed:', error);
        }
    }

    // Sync cart data
    syncCartData() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.length > 0) {
            // In a real application, this would sync with server
            console.log('Cart data synced:', cart);
        }
    }

    // Sync user data
    syncUserData() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            // In a real application, this would sync with server
            console.log('User data synced:', currentUser);
        }
    }

    // Sync order data
    syncOrderData() {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        if (orders.length > 0) {
            // In a real application, this would sync with server
            console.log('Order data synced:', orders);
        }
    }
}

// ========================================
// DATA VALIDATION
// ========================================

class DataValidator {
    // Validate user data
    static validateUser(user) {
        const errors = [];
        
        if (!user.email || !this.isValidEmail(user.email)) {
            errors.push('Invalid email address');
        }
        
        if (!user.firstName || user.firstName.trim().length < 2) {
            errors.push('First name must be at least 2 characters');
        }
        
        if (!user.lastName || user.lastName.trim().length < 2) {
            errors.push('Last name must be at least 2 characters');
        }
        
        if (user.password && user.password.length < 8) {
            errors.push('Password must be at least 8 characters');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Validate order data
    static validateOrder(order) {
        const errors = [];
        
        if (!order.items || order.items.length === 0) {
            errors.push('Order must have at least one item');
        }
        
        if (!order.total || order.total <= 0) {
            errors.push('Order total must be greater than 0');
        }
        
        if (!order.shippingAddress) {
            errors.push('Shipping address is required');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Validate cart data
    static validateCart(cart) {
        const errors = [];
        
        if (!Array.isArray(cart)) {
            errors.push('Cart must be an array');
            return { isValid: false, errors };
        }
        
        cart.forEach((item, index) => {
            if (!item.id) {
                errors.push(`Item ${index + 1} missing ID`);
            }
            
            if (!item.name) {
                errors.push(`Item ${index + 1} missing name`);
            }
            
            if (!item.price || item.price <= 0) {
                errors.push(`Item ${index + 1} has invalid price`);
            }
            
            if (!item.quantity || item.quantity <= 0) {
                errors.push(`Item ${index + 1} has invalid quantity`);
            }
        });
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Validate email
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate phone number
    static isValidPhone(phone) {
        const phoneRegex = /^(\+20|0)?1[0-9]{9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
}

// ========================================
// DATA ENCRYPTION
// ========================================

class DataEncryption {
    // Simple encryption for sensitive data
    static encrypt(text, key = 'amna_shop_key') {
        try {
            let encrypted = '';
            for (let i = 0; i < text.length; i++) {
                encrypted += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }
            return btoa(encrypted);
        } catch (error) {
            console.error('Encryption failed:', error);
            return text;
        }
    }

    // Simple decryption
    static decrypt(encryptedText, key = 'amna_shop_key') {
        try {
            const text = atob(encryptedText);
            let decrypted = '';
            for (let i = 0; i < text.length; i++) {
                decrypted += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }
            return decrypted;
        } catch (error) {
            console.error('Decryption failed:', error);
            return encryptedText;
        }
    }

    // Encrypt sensitive user data
    static encryptUserData(user) {
        const sensitiveFields = ['password', 'phone', 'address'];
        const encryptedUser = { ...user };
        
        sensitiveFields.forEach(field => {
            if (encryptedUser[field]) {
                encryptedUser[field] = this.encrypt(encryptedUser[field]);
            }
        });
        
        return encryptedUser;
    }

    // Decrypt user data
    static decryptUserData(user) {
        const sensitiveFields = ['password', 'phone', 'address'];
        const decryptedUser = { ...user };
        
        sensitiveFields.forEach(field => {
            if (decryptedUser[field]) {
                decryptedUser[field] = this.decrypt(decryptedUser[field]);
            }
        });
        
        return decryptedUser;
    }
}

// ========================================
// GLOBAL INSTANCES
// ========================================

// Create global instances
window.backupSystem = new BackupSystem();
window.dataSync = new DataSync();
window.dataValidator = DataValidator;
window.dataEncryption = DataEncryption;

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Get data usage statistics
function getDataUsageStats() {
    let totalSize = 0;
    const stats = {};
    
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const size = localStorage.getItem(key).length;
            totalSize += size;
            stats[key] = size;
        }
    }
    
    return {
        totalSize: totalSize,
        totalSizeFormatted: formatBytes(totalSize),
        breakdown: stats
    };
}

// Format bytes helper
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Clean up old data
function cleanupOldData() {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 90); // Keep data for 90 days
    
    // Clean old error logs
    const errorLog = JSON.parse(localStorage.getItem('errorLog') || '[]');
    const filteredErrors = errorLog.filter(error => {
        const errorDate = new Date(error.timestamp);
        return errorDate > cutoffDate;
    });
    
    if (filteredErrors.length < errorLog.length) {
        localStorage.setItem('errorLog', JSON.stringify(filteredErrors));
        console.log(`Cleaned ${errorLog.length - filteredErrors.length} old error logs`);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BackupSystem,
        DataSync,
        DataValidator,
        DataEncryption
    };
}
