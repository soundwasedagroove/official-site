// Global state
let currentSlide = 0;
let isPlaying = false;
let isMuted = false;
let showMobileMenu = false;
let slideInterval;

// DOM elements
let audio;
let header;
let mobileMenu;
let mobileMenuIcon;
let playIcon;
let muteIcon;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeSlideshow();
    initializeAudio();
    initializeScrollHandler();
    initializeNavigation();
});

function initializeElements() {
    audio = document.getElementById('bgm-audio');
    header = document.getElementById('header');
    mobileMenu = document.getElementById('mobile-menu');
    mobileMenuIcon = document.getElementById('mobile-menu-icon');
    playIcon = document.getElementById('play-icon');
    muteIcon = document.getElementById('mute-icon');
}



// Handle image loading errors
function handleImageError(img) {
    console.log('Image failed to load, using fallback gradient');
    img.classList.add('image-error');
    img.style.display = 'none';
}

// Audio functionality
function initializeAudio() {
    if (audio) {
        audio.volume = 0.3;
        audio.muted = isMuted;
    }
}

function toggleMusic() {
    if (!audio) return;
    
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        if (playIcon) {
            playIcon.className = 'fas fa-play';
        }
    } else {
        // Handle autoplay restrictions
        audio.play().then(() => {
            isPlaying = true;
            if (playIcon) {
                playIcon.className = 'fas fa-pause';
            }
        }).catch(error => {
            console.log('Audio autoplay prevented:', error);
            // User interaction required for audio
        });
    }
}

function toggleMute() {
    if (!audio) return;
    
    isMuted = !isMuted;
    audio.muted = isMuted;
    
    if (muteIcon) {
        muteIcon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    }
}

// Navigation functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = header ? header.offsetHeight : 0;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Mobile menu functionality
function toggleMobileMenu() {
    showMobileMenu = !showMobileMenu;
    
    if (mobileMenu) {
        if (showMobileMenu) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('mobile-menu-enter');
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('mobile-menu-enter');
        }
    }
    
    if (mobileMenuIcon) {
        mobileMenuIcon.className = showMobileMenu ? 'fas fa-times' : 'fas fa-bars';
    }
}

function closeMobileMenu() {
    showMobileMenu = false;
    
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('mobile-menu-enter');
    }
    
    if (mobileMenuIcon) {
        mobileMenuIcon.className = 'fas fa-bars';
    }
}

// Scroll handler for header effects
function initializeScrollHandler() {
    let lastScrollY = 0;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (header) {
            if (scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
        
        lastScrollY = scrollY;
    });
}

// Initialize navigation event listeners
function initializeNavigation() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (showMobileMenu && mobileMenu && !mobileMenu.contains(event.target) && !event.target.closest('[data-testid="mobile-menu-toggle"]')) {
            closeMobileMenu();
        }
    });
    
    // Handle escape key for mobile menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && showMobileMenu) {
            closeMobileMenu();
        }
    });
    
    // Keyboard navigation for slideshow
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            const prevIndex = currentSlide === 0 ? 2 : currentSlide - 1;
            setSlide(prevIndex);
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

// Utility functions for animation and effects
function addHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.hover-lift');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Call hover effects after DOM is loaded
document.addEventListener('DOMContentLoaded', addHoverEffects);

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768 && showMobileMenu) {
        closeMobileMenu();
    }
});

// Intersection Observer for animations (optional enhancement)
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAnimations);

// Error handling for audio
function handleAudioError() {
    console.log('Audio playback failed or not supported');
    // Could show a user notification here
}

// Add error listeners
document.addEventListener('DOMContentLoaded', function() {
    if (audio) {
        audio.addEventListener('error', handleAudioError);
        audio.addEventListener('canplaythrough', function() {
            console.log('Audio loaded and ready to play');
        });
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll handler
const debouncedScrollHandler = debounce(function() {
    const scrollY = window.scrollY;
    
    if (header) {
        if (scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
}, 10);

// Replace the original scroll handler with debounced version
window.removeEventListener('scroll', initializeScrollHandler);
window.addEventListener('scroll', debouncedScrollHandler);

// Cleanup function for when page is unloaded
window.addEventListener('beforeunload', function() {
    clearInterval(slideInterval);
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to interactive elements
    const slideIndicators = document.querySelectorAll('[data-testid^="slide-indicator-"]');
    slideIndicators.forEach((indicator, index) => {
        indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
        indicator.setAttribute('role', 'button');
        indicator.setAttribute('tabindex', '0');
        
        // Add keyboard support for indicators
        indicator.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setSlide(index);
            }
        });
    });
    
    // Add ARIA labels to music controls
    const playButton = document.querySelector('[data-testid="button-play-pause"]');
    if (playButton) {
        playButton.setAttribute('aria-label', 'Play or pause background music');
    }
    
    const muteButton = document.querySelector('[data-testid="button-mute"]');
    if (muteButton) {
        muteButton.setAttribute('aria-label', 'Mute or unmute background music');
    }
    
    // Add ARIA label to mobile menu toggle
    const mobileMenuToggle = document.querySelector('[data-testid="mobile-menu-toggle"]');
    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute('aria-label', 'Toggle mobile navigation menu');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Update ARIA states when mobile menu toggles
function updateAriaStates() {
    const mobileMenuToggle = document.querySelector('[data-testid="mobile-menu-toggle"]');
    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute('aria-expanded', showMobileMenu.toString());
    }
}

// Call updateAriaStates in toggle functions
const originalToggleMobileMenu = toggleMobileMenu;
toggleMobileMenu = function() {
    originalToggleMobileMenu();
    updateAriaStates();
};

const originalCloseMobileMenu = closeMobileMenu;
closeMobileMenu = function() {
    originalCloseMobileMenu();
    updateAriaStates();
};