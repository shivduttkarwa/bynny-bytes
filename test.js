// ===== MOBILE MENU TOGGLE FUNCTIONALITY START =====
// This section contains all mobile menu toggle functionality
// You can easily replace this entire section if needed

document.addEventListener('DOMContentLoaded', function() {
    
    // === MOBILE MENU VARIABLES ===
    const hamburgerBtn = document.getElementById('mobileMenuToggle');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuLinks = document.querySelectorAll('.menu-link');
    let isMenuOpen = false;
    let scrollPosition = 0;

    // === MENU TOGGLE FUNCTION ===
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    }

    // === OPEN MENU FUNCTION ===
    function openMobileMenu() {
        // Store current scroll position
        scrollPosition = window.pageYOffset;
        
        // Add active classes for animations
        hamburgerBtn.classList.add('active');
        mobileMenuPanel.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        
        // Lock body scroll
        document.body.classList.add('menu-open');
        document.body.style.top = `-${scrollPosition}px`;
        
        // Trigger bunny animation
        triggerBunnyAnimation();
        
        // Announce menu opening for accessibility
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        
        // Add stagger animation to menu items
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transitionDelay = `${index * 0.1}s`;
            }, 100);
        });
        
        // Play menu open sound (if you want to add audio)
        playMenuSound('open');
        
        console.log('🐰 Mobile menu opened - Bunny is happy!');
    }

    // === CLOSE MENU FUNCTION ===
    function closeMobileMenu() {
        // Remove active classes
        hamburgerBtn.classList.remove('active');
        mobileMenuPanel.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        
        // Unlock body scroll and restore position
        document.body.classList.remove('menu-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);
        
        // Reset bunny animation
        resetBunnyAnimation();
        
        // Update accessibility
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        
        // Reset menu item delays
        menuItems.forEach(item => {
            item.style.transitionDelay = '0s';
        });
        
        // Play menu close sound
        playMenuSound('close');
        
        console.log('🍔 Mobile menu closed - Back to hamburger!');
    }

    // === BUNNY ANIMATION TRIGGERS ===
    function triggerBunnyAnimation() {
        // Add extra bunny delight animation
        setTimeout(() => {
            hamburgerBtn.style.transform = 'scale(1.2) rotate(5deg)';
            setTimeout(() => {
                hamburgerBtn.style.transform = '';
            }, 200);
        }, 300);
        
        // Make bunny eyes blink faster when menu opens
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            eye.style.animationDuration = '1s';
        });
    }

    function resetBunnyAnimation() {
        // Reset bunny to normal state
        setTimeout(() => {
            hamburgerBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                hamburgerBtn.style.transform = '';
            }, 150);
        }, 100);
        
        // Reset eye blink speed
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            eye.style.animationDuration = '3s';
        });
    }

    // === SOUND EFFECTS (OPTIONAL) ===
    function playMenuSound(action) {
        // You can add actual audio files here
        // For now, we'll use console sounds for fun
        if (action === 'open') {
            console.log('🎵 *happy bunny hop sound*');
        } else {
            console.log('🎵 *gentle closing sound*');
        }
        
        // Example of how to add real audio:
        /*
        const audio = new Audio(`sounds/menu-${action}.mp3`);
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio play failed:', e));
        */
    }

    // === EVENT LISTENERS ===
    
    // Hamburger button click
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Add hover effect for desktop users
        hamburgerBtn.addEventListener('mouseenter', function() {
            if (!isMenuOpen) {
                this.style.transform = 'scale(1.05)';
            }
        });
        
        hamburgerBtn.addEventListener('mouseleave', function() {
            if (!isMenuOpen) {
                this.style.transform = '';
            }
        });
    }

    // Overlay click to close menu
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
            if (isMenuOpen) {
                closeMobileMenu();
            }
        });
    }

    // Menu link clicks
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Close menu after link click (for single page apps)
            setTimeout(() => {
                if (isMenuOpen) {
                    closeMobileMenu();
                }
            }, 300);
            
            // Add fun feedback
            const icon = this.querySelector('.menu-icon');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(360deg)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 500);
            }
        });
    });

    // === KEYBOARD NAVIGATION ===
    document.addEventListener('keydown', function(e) {
        // ESC key to close menu
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
        
        // Enter or Space on hamburger button
        if ((e.key === 'Enter' || e.key === ' ') && e.target === hamburgerBtn) {
            e.preventDefault();
            toggleMobileMenu();
        }
    });

    // === RESIZE HANDLER ===
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Close menu if window becomes wide enough
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMobileMenu();
            }
        }, 250);
    });

    // === TOUCH GESTURES (OPTIONAL ENHANCEMENT) ===
    let touchStartX = 0;
    let touchEndX = 0;

    // Swipe to close menu
    mobileMenuPanel?.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    mobileMenuPanel?.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    });

    function handleSwipeGesture() {
        const swipeDistance = touchEndX - touchStartX;
        const minSwipeDistance = 100;
        
        // Swipe left to close menu
        if (swipeDistance < -minSwipeDistance && isMenuOpen) {
            closeMobileMenu();
            console.log('👈 Menu closed by swipe gesture');
        }
    }

    // === MENU INITIALIZATION ===
    function initializeMobileMenu() {
        // Set initial ARIA attributes
        if (hamburgerBtn) {
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            hamburgerBtn.setAttribute('aria-label', 'Toggle mobile menu');
        }
        
        // Add focus styles for accessibility
        hamburgerBtn?.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--bunny-yellow)';
            this.style.outlineOffset = '2px';
        });
        
        hamburgerBtn?.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
        
        console.log('🚀 Mobile menu system initialized successfully!');
        console.log('🐰 Bunny toggle is ready for action!');
    }

    // === MENU ITEM HOVER ENHANCEMENTS ===
    menuItems.forEach((item, index) => {
        const link = item.querySelector('.menu-link');
        
        link?.addEventListener('mouseenter', function() {
            // Add playful bounce to menu icon
            const icon = this.querySelector('.menu-icon');
            if (icon) {
                icon.style.animation = 'bounce 0.6s ease';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 600);
            }
        });
    });

    // === DEBUG FUNCTIONS (REMOVE IN PRODUCTION) ===
    window.debugMobileMenu = {
        open: () => openMobileMenu(),
        close: () => closeMobileMenu(),
        toggle: () => toggleMobileMenu(),
        status: () => console.log('Menu open:', isMenuOpen)
    };

    // Initialize the mobile menu system
    initializeMobileMenu();
    
}); // End of DOMContentLoaded

// ===== MOBILE MENU TOGGLE FUNCTIONALITY END =====

// ===== ADDITIONAL PAGE FUNCTIONALITY START =====
// You can add other page-specific JavaScript here
// This section is separate from the mobile menu functionality

// Example: Smooth scrolling for menu links
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('a[href^="#"]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#') && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    // Smooth scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, href);
                }
            }
        });
    });
});

// ===== ADDITIONAL PAGE FUNCTIONALITY END =====