// ===== FIXED MOBILE MENU TOGGLE FUNCTIONALITY =====
// Complete rewrite to fix double-click issue and z-index problems

document.addEventListener('DOMContentLoaded', function() {
    
    // === MOBILE MENU VARIABLES ===
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const menuCloseBtn = document.getElementById('menu-close-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    let isMenuOpen = false;
    let scrollPosition = 0;
    let isAnimating = false; // Prevent multiple clicks during animation

    // Only proceed if bunny toggle elements exist
    if (!mobileMenuToggle || !mobileMenuPanel || !mobileMenuOverlay) {
        console.log('Bunny toggle elements not found, skipping initialization');
        return;
    }

    // === SINGLE TOGGLE FUNCTION ===
    function toggleMobileMenu(event) {
        // Prevent default and stop propagation
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        // Prevent multiple clicks during animation
        if (isAnimating) {
            console.log('Animation in progress, ignoring click');
            return;
        }
        
        isAnimating = true;
        
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 700); // Slightly longer than CSS transition
    }

    // === OPEN MENU FUNCTION ===
    function openMobileMenu() {
        console.log('🐰 Opening bunny menu...');
        
        // Store current scroll position
        scrollPosition = window.pageYOffset;
        
        // Set state first
        isMenuOpen = true;
        
        // Add active classes for animations
        mobileMenuToggle.classList.add('active');
        mobileMenuPanel.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        
        // Lock body scroll
        document.body.classList.add('menu-open');
        document.body.style.top = `-${scrollPosition}px`;
        
        // Update accessibility
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        
        // Stagger animate menu items
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transitionDelay = `${index * 0.1}s`;
            }, 100);
        });
        
        console.log('✅ Bunny menu opened successfully!');
    }

    // === CLOSE MENU FUNCTION ===
    function closeMobileMenu() {
        console.log('🍔 Closing bunny menu...');
        
        // Set state first
        isMenuOpen = false;
        
        // Remove active classes
        mobileMenuToggle.classList.remove('active');
        mobileMenuPanel.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        
        // Unlock body scroll and restore position
        document.body.classList.remove('menu-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);
        
        // Update accessibility
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        
        // Reset menu item delays
        menuItems.forEach(item => {
            item.style.transitionDelay = '0s';
        });
        
        console.log('✅ Bunny menu closed successfully!');
    }

    // === SINGLE EVENT LISTENER SETUP ===
    function setupEventListeners() {
        
        // Remove any existing listeners first
        mobileMenuToggle.removeEventListener('click', toggleMobileMenu);
        mobileMenuToggle.removeEventListener('touchstart', toggleMobileMenu);
        
        // Add single click listener
        mobileMenuToggle.addEventListener('click', toggleMobileMenu, { passive: false });
        
        // Close button listener
        if (menuCloseBtn) {
            menuCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (isMenuOpen && !isAnimating) {
                    toggleMobileMenu();
                }
            });
        }
        
        // Prevent double-tap zoom on mobile
        mobileMenuToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        // Overlay click to close menu
        mobileMenuOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            if (isMenuOpen && !isAnimating) {
                toggleMobileMenu();
            }
        });

        // Menu link clicks
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Close menu after link click
                setTimeout(() => {
                    if (isMenuOpen && !isAnimating) {
                        toggleMobileMenu();
                    }
                }, 300);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            // ESC key to close menu
            if (e.key === 'Escape' && isMenuOpen && !isAnimating) {
                toggleMobileMenu();
            }
            
            // Enter or Space on hamburger button
            if ((e.key === 'Enter' || e.key === ' ') && e.target === mobileMenuToggle) {
                e.preventDefault();
                toggleMobileMenu();
            }
        });

        console.log('📱 Event listeners set up successfully');
    }

    // === RESIZE HANDLER ===
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Close menu if window becomes wide enough
            if (window.innerWidth > 768 && isMenuOpen && !isAnimating) {
                closeMobileMenu();
            }
        }, 250);
    });

    // === TOUCH GESTURES ===
    let touchStartX = 0;
    let touchEndX = 0;

    // Swipe to close menu (swipe right since menu comes from right)
    mobileMenuPanel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    mobileMenuPanel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    }, { passive: true });

    function handleSwipeGesture() {
        const swipeDistance = touchEndX - touchStartX;
        const minSwipeDistance = 100;
        
        // Swipe right to close menu (since menu slides from right)
        if (swipeDistance > minSwipeDistance && isMenuOpen && !isAnimating) {
            toggleMobileMenu();
            console.log('👉 Menu closed by swipe gesture');
        }
    }

    // === INITIALIZATION ===
    function initializeBunnyMenu() {
        // Set initial ARIA attributes
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-label', 'Toggle mobile menu');
        
        // Ensure menu starts closed
        isMenuOpen = false;
        isAnimating = false;
        
        // Remove any active classes
        mobileMenuToggle.classList.remove('active');
        mobileMenuPanel.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('🚀 Bunny toggle initialized successfully!');
        console.log('📋 Menu state: closed, Animation: ready');
    }

    // Initialize the bunny menu system
    initializeBunnyMenu();
    
}); // End of bunny menu DOMContentLoaded

// ===== ENHANCED MOBILE MENU TOGGLE FUNCTIONALITY END =====

// ===== EXISTING WEBSITE FUNCTIONALITY START =====
// Enhanced JavaScript for Bunny Bites Website (keeping all existing functionality)

// DOM Content Loaded for existing functionality
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

// Navigation functionality (updated to work with new mobile menu)
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    
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

// Hero section animations
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

    // Enhanced toy animations
    const toys = document.querySelectorAll('.floating-toy');
    toys.forEach((toy, index) => {
        toy.style.animationTimingFunction = 'cubic-bezier(0.4, 0, 0.6, 1)';
        
        toy.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.2)) scale(1.2)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
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
                
                element.classList.add('animate-in');
                
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

    const animatedElements = document.querySelectorAll(
        '.feature-card, .menu-card, .testimonial-card, .section-header, .contact-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        animationObserver.observe(element);
    });

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

    menuCards.forEach(card => {
        card.style.display = 'block';
        card.classList.remove('hidden');
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            filterMenuItems(category, menuCards);
        });
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addToCartAnimation(this);
        });
    });
}

function filterMenuItems(category, menuCards) {
    menuCards.forEach((card, index) => {
        const cardCategory = card.dataset.category;
        const shouldShow = category === 'all' || cardCategory === category;
        
        if (shouldShow) {
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.remove('hidden');
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 50);
        } else {
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

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createParticleEffect(this);
        });
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
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 600) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, 100));

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
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
                pageToys.classList.remove('hidden');
                toysToggle.classList.remove('toys-hidden');
            } else {
                pageToys.classList.add('hidden');
                toysToggle.classList.add('toys-hidden');
            }
            
            toysToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                toysToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Performance optimizations
function setupPerformanceOptimizations() {
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

    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }

    function updateScrollElements() {
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
    const images = document.querySelectorAll('.food-image, .hero-main-image');
    images.forEach(img => {
        if (img.src && !img.src.includes('your-') && !img.src.endsWith('.jpg')) {
            const placeholder = img.nextElementSibling;
            if (placeholder && (placeholder.classList.contains('image-placeholder') || placeholder.classList.contains('hero-image-placeholder'))) {
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
    animateCounter
};

// ===== EXISTING WEBSITE FUNCTIONALITY END =====