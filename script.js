// ===== BUNNY BITES WEBSITE JAVASCRIPT (FIXED VERSION) =====
// Clean, organized, and maintainable code


document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Bunny Bites website...');
    initializeWebsite();
});

// ===== MAIN INITIALIZATION =====
function initializeWebsite() {
    initializeMobileMenu();
    initializeNavigation();
    initializeHeroAnimations();
    initializeScrollAnimations();
    initializeInteractiveElements();
    initializeFloatingToys();
    initializeBackToTop();
    initializeImageLoading();
    initializePageSpecificFunctions();
    console.log('✅ Bunny Bites website initialized successfully!');
}

// ===== MOBILE MENU SYSTEM =====
let mobileMenuState = {
    isOpen: false,
    isAnimating: false,
    scrollPosition: 0
};

function initializeMobileMenu() {
    console.log('🍔 Initializing mobile menu...');
    
    // Get DOM elements
    const elements = {
        toggle: document.getElementById('mobile-menu-toggle'),
        panel: document.getElementById('mobile-menu-panel'),
        overlay: document.getElementById('mobile-menu-overlay'),
        closeBtn: document.getElementById('menu-close-btn'),
        menuLinks: document.querySelectorAll('.menu-link')
    };

    // Verify elements exist
    if (!elements.toggle || !elements.panel || !elements.overlay) {
        console.error('❌ Mobile menu elements not found');
        return;
    }

    // Set initial state
    resetMobileMenuState(elements);
    
    // Add event listeners
    setupMobileMenuEvents(elements);
    
    // Setup touch-friendly contact button
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('touchstart', function(e) {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        }, { passive: true });
        
        contactBtn.addEventListener('touchend', function(e) {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
    }
}

function resetMobileMenuState(elements) {
    // Reset state variables
    mobileMenuState.isOpen = false;
    mobileMenuState.isAnimating = false;
    
    // Remove any active classes
    elements.toggle.classList.remove('active');
    elements.panel.classList.remove('active');
    elements.overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    
    // Set ARIA attributes
    elements.toggle.setAttribute('aria-expanded', 'false');
    elements.toggle.setAttribute('aria-label', 'Toggle mobile menu');
    
    // Reset body styles
    document.body.style.top = '';
    document.body.style.overflow = '';
}

function setupMobileMenuEvents(elements) {
    // Main toggle button click
    elements.toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🐰 Toggle clicked, current state:', mobileMenuState.isOpen);
        
        if (mobileMenuState.isAnimating) {
            console.log('⏳ Animation in progress, ignoring click');
            return;
        }
        
        if (mobileMenuState.isOpen) {
            closeMobileMenu(elements);
        } else {
            openMobileMenu(elements);
        }
    });

    // Close button click
    if (elements.closeBtn) {
        elements.closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('❌ Close button clicked');
            if (mobileMenuState.isOpen && !mobileMenuState.isAnimating) {
                closeMobileMenu(elements);
            }
        });
    }

    // Overlay click to close
    elements.overlay.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('📱 Overlay clicked');
        if (mobileMenuState.isOpen && !mobileMenuState.isAnimating) {
            closeMobileMenu(elements);
        }
    });

    // Menu link clicks with enhanced mobile support
    elements.menuLinks.forEach(link => {
        const icon = link.querySelector('.menu-icon i');
        
        // Handle touch start for mobile
        link.addEventListener('touchstart', function(e) {
            console.log('👆 Menu link touched:', this.textContent.trim());
            this.classList.add('touching');
            
            // Add icon animation
            if (icon) {
                icon.classList.add('clicked');
            }
        }, { passive: true });
        
        // Handle touch end
        link.addEventListener('touchend', function(e) {
            console.log('👆 Menu link touch ended');
            this.classList.remove('touching');
            
            // Remove icon animation after delay
            if (icon) {
                setTimeout(() => {
                    icon.classList.remove('clicked');
                }, 600);
            }
        }, { passive: true });
        
        // Handle click with animation
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log('🔗 Menu link clicked:', this.textContent.trim(), 'href:', href);
            
            // Add click animation for icon
            if (icon && !icon.classList.contains('clicked')) {
                icon.classList.add('clicked');
                setTimeout(() => {
                    icon.classList.remove('clicked');
                }, 600);
            }
            
            // Add link animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Only prevent default and close menu for hash links
            if (href.startsWith('#')) {
                e.preventDefault();
                // Close menu after animation for same-page navigation
                setTimeout(() => {
                    if (mobileMenuState.isOpen && !mobileMenuState.isAnimating) {
                        closeMobileMenu(elements);
                    }
                    // Scroll to target after menu closes
                    const target = document.querySelector(href);
                    if (target) {
                        setTimeout(() => {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }, 600);
                    }
                }, 300);
            } else {
                // For external links, close menu and allow normal navigation
                setTimeout(() => {
                    if (mobileMenuState.isOpen && !mobileMenuState.isAnimating) {
                        closeMobileMenu(elements);
                    }
                }, 200);
            }
        });
        
        // Handle mouse events for desktop
        link.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.classList.add('touching');
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.classList.remove('touching');
            }
        });
    });

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuState.isOpen && !mobileMenuState.isAnimating) {
            console.log('⌨️ Escape pressed, closing menu');
            closeMobileMenu(elements);
        }
    });

    // Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768 && mobileMenuState.isOpen) {
                console.log('📐 Window resized to desktop, closing menu');
                closeMobileMenu(elements);
            }
        }, 250);
    });
}

function openMobileMenu(elements) {
    console.log('🟢 Opening mobile menu...');
    
    mobileMenuState.isAnimating = true;
    mobileMenuState.isOpen = true;
    
    // Store scroll position
    mobileMenuState.scrollPosition = window.pageYOffset;
    
    // Reset menu panel scroll position
    elements.panel.scrollTop = 0;
    
    // Add active classes
    elements.toggle.classList.add('active');
    elements.panel.classList.add('active');
    elements.overlay.classList.add('active');
    
    // Lock body scroll
    document.body.classList.add('menu-open');
    document.body.style.top = `-${mobileMenuState.scrollPosition}px`;
    document.body.style.overflow = 'hidden';
    
    // Update ARIA
    elements.toggle.setAttribute('aria-expanded', 'true');
    
    // Animate menu items with stagger
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 + (index * 100));
    });
    
    // Add scroll hint for mobile users
    setTimeout(() => {
        const footer = elements.panel.querySelector('.menu-footer');
        if (footer && elements.panel.scrollHeight > elements.panel.clientHeight) {
            footer.style.boxShadow = '0 -10px 20px rgba(183, 28, 28, 0.1)';
            console.log('📜 Menu is scrollable - footer shadow added');
        }
    }, 500);
    
    // Reset animation flag
    setTimeout(() => {
        mobileMenuState.isAnimating = false;
        console.log('✅ Menu opened successfully');
    }, 600);
}

function closeMobileMenu(elements) {
    console.log('🔴 Closing mobile menu...');
    
    mobileMenuState.isAnimating = true;
    mobileMenuState.isOpen = false;
    
    // Remove active classes
    elements.toggle.classList.remove('active');
    elements.panel.classList.remove('active');
    elements.overlay.classList.remove('active');
    
    // Unlock body scroll and restore position
    document.body.classList.remove('menu-open');
    document.body.style.top = '';
    document.body.style.overflow = '';
    window.scrollTo(0, mobileMenuState.scrollPosition);
    
    // Update ARIA
    elements.toggle.setAttribute('aria-expanded', 'false');
    
    // Reset menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.style.opacity = '';
        item.style.transform = '';
    });
    
    // Reset animation flag
    setTimeout(() => {
        mobileMenuState.isAnimating = false;
        console.log('✅ Menu closed successfully');
    }, 600);
}

// ===== NAVIGATION (FIXED VERSION) =====
function initializeNavigation() {
    console.log('🧭 Initializing navigation...');
    
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!navbar) {
        console.warn('⚠️ Navbar not found');
        return;
    }
    
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

    // Smart navigation handling - FIXED VERSION
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log('🔗 Nav link clicked:', href);
            
            // Only prevent default for hash links (same-page navigation)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link for same-page navigation
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
            // For external links (.html files), allow normal navigation
            // No preventDefault() is called, so the browser will navigate normally
        });
    });
    
    console.log('✅ Navigation initialized');
}

// ===== HERO ANIMATIONS =====
function initializeHeroAnimations() {
    console.log('🦸 Initializing hero animations...');
    
    // Hero image hover effects
    const heroImage = document.querySelector('.hero-image-wrapper');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });

        heroImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // Gentle click effect
        heroImage.addEventListener('click', function() {
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
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => observer.observe(stat));
    }
    
    console.log('✅ Hero animations initialized');
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    console.log('📜 Initializing scroll animations...');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('animate-in');
                
                // Stagger animation for grid items
                if (element.parentElement.classList.contains('features-grid') ||
                    element.parentElement.classList.contains('menu-grid') ||
                    element.parentElement.classList.contains('testimonials-grid') ||
                    element.parentElement.classList.contains('steps-grid')) {
                    
                    const siblings = Array.from(element.parentElement.children);
                    const index = siblings.indexOf(element);
                    element.style.animationDelay = `${index * 0.1}s`;
                }
                
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.feature-card, .menu-card, .testimonial-card, .step-card, .section-header, .contact-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        animationObserver.observe(element);
    });

    // Add animation styles
    if (!document.getElementById('scroll-animations-styles')) {
        const style = document.createElement('style');
        style.id = 'scroll-animations-styles';
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('✅ Scroll animations initialized');
}

// ===== INTERACTIVE ELEMENTS =====
function initializeInteractiveElements() {
    console.log('🎮 Initializing interactive elements...');
    
    // Button interactions
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button, .add-to-cart');
    buttons.forEach(button => {
        // Ripple effect on click
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
        
        // Hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Contact items hover effect
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
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
    
    console.log('✅ Interactive elements initialized');
}

// ===== FLOATING TOYS =====
function initializeFloatingToys() {
    console.log('🧸 Initializing floating toys...');
    
    const toysToggle = document.getElementById('toys-toggle');
    const pageToys = document.querySelector('.page-toys');
    
    if (toysToggle && pageToys) {
        toysToggle.addEventListener('click', function() {
            const isHidden = pageToys.classList.contains('hidden');
            
            if (isHidden) {
                pageToys.classList.remove('hidden');
                toysToggle.classList.remove('toys-hidden');
                console.log('👁️ Toys shown');
            } else {
                pageToys.classList.add('hidden');
                toysToggle.classList.add('toys-hidden');
                console.log('🙈 Toys hidden');
            }
            
            // Button animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Enhanced toy animations
    const toys = document.querySelectorAll('.floating-toy');
    toys.forEach((toy, index) => {
        toy.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'all 0.3s ease';
        });
        
        toy.addEventListener('mouseleave', function() {
            this.style.opacity = '0.35';
            this.style.transform = 'scale(1)';
        });
    });
    
    console.log('✅ Floating toys initialized');
}

// ===== BACK TO TOP =====
function initializeBackToTop() {
    console.log('⬆️ Initializing back to top...');
    
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
            
            // Button animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    console.log('✅ Back to top initialized');
}

// ===== IMAGE LOADING =====
function initializeImageLoading() {
    console.log('🖼️ Initializing image loading...');
    
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
    
    console.log('✅ Image loading initialized');
}

// ===== PAGE SPECIFIC FUNCTIONS =====
function initializePageSpecificFunctions() {
    console.log('📄 Initializing page-specific functions...');
    
    // About Page Animations
    initializeAboutPageAnimations();
    
    // Menu Page Order Buttons
    initializeMenuOrderButtons();
    
    // Reviews Page Functionality
    initializeReviewsPage();
    
    // Privacy Policy Page
    initializePrivacyPolicyPage();
    
    // Contact Form Pre-fill
    initializeContactFormPrefill();
    
    console.log('✅ Page-specific functions initialized');
}

// ===== ABOUT PAGE ANIMATIONS =====
function initializeAboutPageAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.story-text, .story-visual, .feature-card, .team-member').forEach(el => {
        observer.observe(el);
    });
}

// ===== MENU PAGE ORDER BUTTONS =====
function initializeMenuOrderButtons() {
    const orderButtons = document.querySelectorAll('.order-btn');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-item');
            const menuCard = this.closest('.menu-card');
            const itemTitle = menuCard ? menuCard.querySelector('.menu-title')?.textContent : '';
            const itemPrice = menuCard ? menuCard.querySelector('.price-overlay')?.textContent : '';
            
            // Store selected item in localStorage to pre-fill contact form
            if (itemTitle) {
                localStorage.setItem('selectedMeal', itemTitle);
                localStorage.setItem('selectedMealData', JSON.stringify({
                    name: itemTitle,
                    id: itemName,
                    price: itemPrice
                }));
            }
            
            // Add loading state
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
            this.disabled = true;
            this.style.pointerEvents = 'none';
            
            // Redirect to contact page after short delay
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 1000);
        });
    });
}

// ===== REVIEWS PAGE FUNCTIONALITY =====
function initializeReviewsPage() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const reviewCards = document.querySelectorAll('.review-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            reviewCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (filter === '5-star') {
                    const rating = card.getAttribute('data-rating');
                    card.style.display = rating === '5' ? 'block' : 'none';
                } else if (filter === '4-star') {
                    const rating = card.getAttribute('data-rating');
                    card.style.display = rating === '4' ? 'block' : 'none';
                }
            });
        });
    });
    
    // Load more functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Simulate loading more reviews
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                alert('More reviews would be loaded here!');
            }, 2000);
        });
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sortReviews');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            console.log('Sorting by:', sortValue);
        });
    }
}

// ===== PRIVACY POLICY PAGE FUNCTIONALITY =====
function initializePrivacyPolicyPage() {
    // Smooth scrolling for table of contents
    const tocLinks = document.querySelectorAll('.toc-item');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Cookie settings button
    const cookieSettingsBtn = document.querySelector('.cookie-settings-btn');
    if (cookieSettingsBtn) {
        cookieSettingsBtn.addEventListener('click', function() {
            alert('Cookie preference center would open here!');
        });
    }
    
    // Subscribe to updates button
    const subscribeBtn = document.querySelector('.subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            const email = prompt('Enter your email to receive policy updates:');
            if (email) {
                alert('Thank you! You will receive notifications about policy updates at ' + email);
            }
        });
    }
    
    // Highlight current section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.policy-section');
        const tocItems = document.querySelectorAll('.toc-item');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = '#' + section.id;
            }
        });
        
        tocItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === currentSection) {
                item.classList.add('active');
            }
        });
    });
}

// ===== CONTACT FORM PRE-FILL =====
function initializeContactFormPrefill() {
    // Pre-fill contact form with selected meal data
    const selectedMeal = localStorage.getItem('selectedMeal');
    const selectedMealData = localStorage.getItem('selectedMealData');
    
    if (selectedMeal && selectedMealData) {
        const messageField = document.getElementById('message');
        const subjectField = document.getElementById('subject');
        
        if (messageField && !messageField.value) {
            const mealData = JSON.parse(selectedMealData);
            messageField.value = `Hi! I'm interested in ordering ${mealData.name}. Please provide more details about availability and delivery options.`;
        }
        
        if (subjectField && !subjectField.value) {
            subjectField.value = `Order Inquiry - ${selectedMeal}`;
        }
        
        // Clear the stored data after use
        localStorage.removeItem('selectedMeal');
        localStorage.removeItem('selectedMealData');
    }
}

// ===== UTILITY FUNCTIONS =====
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

function addToCartAnimation(button) {
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.background = 'var(--bunny-yellow)';
    button.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
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

// ===== CSS ANIMATIONS =====
if (!document.getElementById('javascript-animations-styles')) {
    const additionalStyles = document.createElement('style');
    additionalStyles.id = 'javascript-animations-styles';
    additionalStyles.textContent = `
        @keyframes ripple {
            to {
                transform: translate(var(--x, 0), var(--y, 0)) scale(2);
                opacity: 0;
            }
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 1;
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(additionalStyles);
}

// ===== SMOOTH PAGE LOAD =====
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🎨 Page loaded with smooth transition');
});

// Export functions for debugging if needed
window.BunnyBites = {
    mobileMenuState,
    openMobileMenu,
    closeMobileMenu,
    createRippleEffect,
    animateCounter
};

console.log('🎉 Bunny Bites JavaScript loaded successfully!');