// Enhanced JavaScript for Bunny Bites Website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupNavigation();
    setupHeroAnimations();
    setupScrollAnimations();
    setupMenuFiltering();
    setupInteractiveElements();
    setupLazyLoading();
    setupPerformanceOptimizations();
    setupToysToggle();
    setupBackToTop();
}

// Navigation functionality
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }, 16));

    // Mobile menu toggle
    if (mobileMenuToggle && navMenu && mobileMenuOverlay) {
        mobileMenuToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.contains('mobile-open');
            
            if (isOpen) {
                // Close menu
                navMenu.classList.remove('mobile-open');
                mobileMenuOverlay.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                // Open menu
                navMenu.classList.add('mobile-open');
                mobileMenuOverlay.classList.add('active');
                mobileMenuToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        // Close mobile menu when clicking on overlay
        mobileMenuOverlay.addEventListener('click', function() {
            navMenu.classList.remove('mobile-open');
            mobileMenuOverlay.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('mobile-open');
                mobileMenuOverlay.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Hero section animations (simplified for classic feel)
function setupHeroAnimations() {
    const heroElements = {
        badge: document.querySelector('.hero-badge'),
        title: document.querySelector('.hero-title'),
        subtitle: document.querySelector('.hero-subtitle'),
        description: document.querySelector('.hero-description'),
        buttons: document.querySelector('.hero-buttons'),
        stats: document.querySelector('.hero-stats'),
        image: document.querySelector('.hero-image-wrapper'),
        decorations: document.querySelectorAll('.hero-decoration')
    };

    // Simple hero image hover effects
    if (heroElements.image) {
        heroElements.image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });

        heroElements.image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // Gentle click effect for hero image
        heroElements.image.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1.02)';
            }, 150);
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    }

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    statNumbers.forEach(stat => observer.observe(stat));

    // Enhanced toy animations (diverse patterns across full screen)
    const toys = document.querySelectorAll('.floating-toy');
    toys.forEach((toy, index) => {
        // Each toy already has its unique animation pattern defined in CSS
        // Just add interaction enhancements
        toy.style.animationTimingFunction = 'cubic-bezier(0.4, 0, 0.6, 1)';
        
        // Elegant hover interaction that doesn't interfere with movement
        toy.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.2)) scale(1.2)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            // Don't pause animation to keep the flowing movement
        });
        
        toy.addEventListener('mouseleave', function() {
            this.style.opacity = '0.35';
            this.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.1)) scale(1)';
        });
    });
}

// Scroll-triggered animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation class
                element.classList.add('animate-in');
                
                // Staggered animation for grid items
                if (element.parentElement.classList.contains('features-grid') ||
                    element.parentElement.classList.contains('menu-grid') ||
                    element.parentElement.classList.contains('testimonials-grid')) {
                    
                    const siblings = Array.from(element.parentElement.children);
                    const index = siblings.indexOf(element);
                    element.style.animationDelay = `${index * 0.1}s`;
                }
                
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .menu-card, .testimonial-card, .section-header, .contact-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        animationObserver.observe(element);
    });

    // Add CSS class for animated elements
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Menu filtering functionality
function setupMenuFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    // Initialize all cards as visible
    menuCards.forEach(card => {
        card.style.display = 'block';
        card.classList.remove('hidden');
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter menu cards with smooth transition
            filterMenuItems(category, menuCards);
        });
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addToCartAnimation(this);
        });
    });
}

// Enhanced filter menu items function
function filterMenuItems(category, menuCards) {
    menuCards.forEach((card, index) => {
        const cardCategory = card.dataset.category;
        const shouldShow = category === 'all' || cardCategory === category;
        
        if (shouldShow) {
            // Show the card with animation
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.remove('hidden');
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 50);
        } else {
            // Hide the card with animation
            card.classList.add('hidden');
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (card.classList.contains('hidden')) {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Interactive elements
function setupInteractiveElements() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button, .add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createParticleEffect(this);
        });
    });

    // Menu card hover effects
  // Menu functionality and interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize menu interactions
    initializeMenuCards();
    initializeOrderButtons();
    initializeAnimations();
    initializeScrollEffects();
    
    // Menu card hover effects and interactions
    function initializeMenuCards() {
        const menuCards = document.querySelectorAll('.menu-card');
        
        menuCards.forEach(card => {
            // Enhanced hover effect with sound (if available)
            card.addEventListener('mouseenter', function() {
                this.style.setProperty('--hover-scale', '1.05');
                addRippleEffect(this);
                
                // Add subtle vibration effect on mobile
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.setProperty('--hover-scale', '1');
            });
            
            // Card click interaction
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.add-to-cart')) {
                    showQuickView(this);
                }
            });
        });
    }
    
    // Add ripple effect to cards
    function addRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgba(183, 28, 28, 0.3);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s linear;
            top: 50%;
            left: 50%;
            margin-left: -5px;
            margin-top: -5px;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Order button functionality
    function initializeOrderButtons() {
        const orderButtons = document.querySelectorAll('.add-to-cart');
        
        orderButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const itemName = this.dataset.item;
                handleOrder(itemName, this);
            });
        });
    }
    
    // Handle order process
    function handleOrder(itemName, button) {
        // Add loading state
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Adding...</span>';
        button.disabled = true;
        
        // Simulate order processing
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i><span>Added!</span>';
            button.style.background = 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)';
            
            // Show success notification
            showNotification(`${formatItemName(itemName)} added to cart!`, 'success');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.disabled = false;
                button.style.background = '';
            }, 2000);
            
        }, 1000);
    }
    
    // Format item name for display
    function formatItemName(itemName) {
        return itemName.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--bunny-green)' : 'var(--bunny-red)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: var(--shadow-medium);
            display: flex;
            align-items: center;
            gap: 0.8rem;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);
    }
    
    // Quick view modal
    function showQuickView(card) {
        const title = card.querySelector('.menu-title').textContent;
        const description = card.querySelector('.menu-description').textContent;
        const price = card.querySelector('.menu-price').textContent;
        const ingredients = Array.from(card.querySelectorAll('.ingredient-tag')).map(tag => tag.textContent);
        
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="modal-ingredients">
                    <h4>Ingredients:</h4>
                    <div class="ingredients-list">
                        ${ingredients.map(ing => `<span class="ingredient-badge">${ing}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="modal-price">₹${price}</div>
                    <button class="modal-order-btn">Order Now</button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }
            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                position: relative;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            }
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--light-text);
            }
            .modal-ingredients h4 {
                margin: 1.5rem 0 0.5rem 0;
                color: var(--dark-text);
            }
            .ingredients-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            .ingredient-badge {
                background: var(--cream);
                color: var(--bunny-green);
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 600;
            }
            .modal-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 2rem;
                padding-top: 1rem;
                border-top: 1px solid var(--cream);
            }
            .modal-price {
                font-size: 1.8rem;
                font-weight: 800;
                color: var(--bunny-red);
            }
            .modal-order-btn {
                background: var(--bunny-green);
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .modal-order-btn:hover {
                background: var(--bunny-red);
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(modalStyle);
        
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 100);
        
        // Close functionality
        function closeModal() {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
            setTimeout(() => {
                modal.remove();
                modalStyle.remove();
            }, 300);
        }
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
        
        // Order button in modal
        modal.querySelector('.modal-order-btn').addEventListener('click', () => {
            const itemName = title.toLowerCase().replace(/\s+/g, '-');
            handleOrder(itemName, modal.querySelector('.modal-order-btn'));
            setTimeout(closeModal, 2000);
        });
    }
    
    // Initialize scroll animations
    function initializeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all menu cards
        document.querySelectorAll('.menu-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }
    
    // Scroll effects
    function initializeScrollEffects() {
        let ticking = false;
        
        function updateScrollEffects() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            // Parallax effect for section background
            const menuSection = document.querySelector('.menu');
            if (menuSection) {
                menuSection.style.transform = `translateY(${parallax}px)`;
            }
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.quick-view-modal');
            if (modal) {
                modal.querySelector('.modal-close').click();
            }
            
            const notification = document.querySelector('.notification');
            if (notification) {
                notification.querySelector('.notification-close').click();
            }
        }
    });
    
    // Performance optimization
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimized resize handler
    window.addEventListener('resize', debounce(() => {
        // Re-initialize animations on resize
        initializeAnimations();
    }, 250));
    
    console.log('🍽️ Healthy Menu System Initialized Successfully!');
});

    // Testimonial card tilt effect
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / (rect.width / 2);
            const deltaY = (e.clientY - centerY) / (rect.height / 2);
            
            const tiltX = deltaY * 5;
            const tiltY = deltaX * -5;
            
            this.style.transform = `translateY(-8px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
        });
    });

    // Logo click effect
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.animation = 'bounceIn 0.8s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 800);
        });
    }

    // Contact items hover effect
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        imageObserver.observe(img);
    });
}

// Back to top button functionality
function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 600) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, 100));

        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add click feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Floating toys toggle functionality
function setupToysToggle() {
    const toysToggle = document.getElementById('toys-toggle');
    const pageToys = document.querySelector('.page-toys');
    
    if (toysToggle && pageToys) {
        toysToggle.addEventListener('click', function() {
            const isHidden = pageToys.classList.contains('hidden');
            
            if (isHidden) {
                // Show toys
                pageToys.classList.remove('hidden');
                toysToggle.classList.remove('toys-hidden');
            } else {
                // Hide toys
                pageToys.classList.add('hidden');
                toysToggle.classList.add('toys-hidden');
            }
            
            // Add button feedback animation
            toysToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                toysToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Performance optimizations
function setupPerformanceOptimizations() {
    // Preload critical fonts
    const fontLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
        'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap'
    ];

    fontLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });

    // Optimize scroll performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }

    function updateScrollElements() {
        // Update scroll-dependent elements here
        ticking = false;
    }

    window.addEventListener('scroll', requestTick);
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: translate(${x}px, ${y}px) scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function createBurstEffect(element) {
    const colors = ['var(--bunny-red)', 'var(--bunny-yellow)', 'var(--bunny-green)'];
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        const angle = (i * 60) * Math.PI / 180;
        const distance = 40 + Math.random() * 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            animation: burst 0.8s ease-out forwards;
        `;
        
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        
        element.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
}

function createParticleEffect(element) {
    const colors = ['var(--bunny-yellow)', 'var(--bunny-red)', 'var(--bunny-green)'];
    
    for (let i = 0; i < 2; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat 1.5s ease-out forwards;
            `;
            
            element.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }, i * 300);
    }
}

function addToCartAnimation(button) {
    const originalText = button.textContent;
    
    button.textContent = 'Added!';
    button.style.background = 'var(--bunny-yellow)';
    button.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'var(--bunny-green)';
        button.style.transform = 'scale(1)';
    }, 1500);
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const suffix = element.textContent.replace(/\d/g, '').replace(/\+/, '');
        element.textContent = Math.floor(current) + suffix + (target >= 100 ? '+' : '');
    }, 16);
}

// Add CSS animations for JavaScript effects
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes ripple {
        to {
            transform: translate(var(--x, 0), var(--y, 0)) scale(2);
            opacity: 0;
        }
    }
    
    @keyframes burst {
        0% { 
            transform: translate(-50%, -50%) scale(1); 
            opacity: 1; 
        }
        100% { 
            transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(0); 
            opacity: 0; 
        }
    }
    
    @keyframes particleFloat {
        0% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translateY(-50px) scale(0); 
        }
    }
    
    .loaded {
        opacity: 1 !important;
    }
`;

document.head.appendChild(additionalStyles);

// Handle image loading for menu items and hero
document.addEventListener('DOMContentLoaded', function() {
    // Hide placeholder when real image is loaded
    const images = document.querySelectorAll('.food-image, .hero-main-image');
    images.forEach(img => {
        if (img.src && !img.src.includes('your-') && !img.src.endsWith('.jpg')) {
            const placeholder = img.nextElementSibling;
            if (placeholder && placeholder.classList.contains('image-placeholder', 'hero-image-placeholder')) {
                img.addEventListener('load', function() {
                    placeholder.style.display = 'none';
                });
                
                img.addEventListener('error', function() {
                    placeholder.style.display = 'flex';
                });
            }
        }
    });
});

// Smooth reveal animation for page load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Export functions for external use if needed
window.BunnyBites = {
    filterMenuItems,
    createRippleEffect,
    createBurstEffect,
    animateCounter
};