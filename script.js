// Subtle parallax effect to the hero background
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero-section');
    if (hero) {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;
        hero.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// Smooth scroll for the scroll indicator and navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        if (targetId && targetId !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Interactive Amenities Panel Selector & Carousel
const tabBtns = document.querySelectorAll('.tab-btn');
const amenityImages = document.querySelectorAll('.amenity-image');
let carouselInterval;
let currentTabIndex = 0;

function activateTab(index) {
    if (tabBtns.length === 0) return;
    
    // Remove active class from all buttons and images
    tabBtns.forEach(b => b.classList.remove('active'));
    amenityImages.forEach(img => img.classList.remove('active'));
    
    // Add active class to clicked button
    tabBtns[index].classList.add('active');
    
    // Add active class to corresponding image
    const targetId = tabBtns[index].getAttribute('data-target');
    const targetElement = document.getElementById(targetId);
    if(targetElement) {
        targetElement.classList.add('active');
    }
    currentTabIndex = index;
}

function startCarousel() {
    stopCarousel();
    carouselInterval = setInterval(() => {
        let nextIndex = (currentTabIndex + 1) % tabBtns.length;
        activateTab(nextIndex);
    }, 4000); // Change image every 4 seconds
}

function stopCarousel() {
    if(carouselInterval) clearInterval(carouselInterval);
}

tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        activateTab(index);
        startCarousel(); // Reset timer on manual click
    });
});

if (tabBtns.length > 0) {
    startCarousel();
}

// Swipe support for Amenities
const selectorContent = document.querySelector('.selector-content');
let touchStartX = 0;
let touchEndX = 0;

if (selectorContent) {
    selectorContent.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    selectorContent.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleAmenitiesSwipe();
    }, {passive: true});
}

function handleAmenitiesSwipe() {
    if (tabBtns.length === 0) return;
    if (touchEndX < touchStartX - 40) {
        // Swipe Left
        activateTab((currentTabIndex + 1) % tabBtns.length);
        startCarousel();
    }
    if (touchEndX > touchStartX + 40) {
        // Swipe Right
        activateTab((currentTabIndex - 1 + tabBtns.length) % tabBtns.length);
        startCarousel();
    }
}

// Swipe support for Plan Carousel
const planCarouselElement = document.querySelector('.plan-carousel');
let planTouchStartX = 0;
let planTouchEndX = 0;

if (planCarouselElement) {
    planCarouselElement.addEventListener('touchstart', e => {
        planTouchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    planCarouselElement.addEventListener('touchend', e => {
        planTouchEndX = e.changedTouches[0].screenX;
        handlePlanSwipe();
    }, {passive: true});
    // Navigation buttons
    const prevBtn = planCarouselElement.querySelector('.prev-btn');
    const nextBtn = planCarouselElement.querySelector('.next-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let prevIndex = (currentPlanIndex - 1 + planSlides.length) % planSlides.length;
            showPlanSlide(prevIndex);
            startPlanCarousel();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = (currentPlanIndex + 1) % planSlides.length;
            showPlanSlide(nextIndex);
            startPlanCarousel();
        });
    }
}

function handlePlanSwipe() {
    if (planSlides.length === 0) return;
    if (planTouchEndX < planTouchStartX - 40) {
        // Swipe Left
        let nextIndex = (currentPlanIndex + 1) % planSlides.length;
        showPlanSlide(nextIndex);
        startPlanCarousel();
    }
    if (planTouchEndX > planTouchStartX + 40) {
        // Swipe Right
        let prevIndex = (currentPlanIndex - 1 + planSlides.length) % planSlides.length;
        showPlanSlide(prevIndex);
        startPlanCarousel();
    }
}

// Lightbox for Amenities
amenityImages.forEach(img => {
    img.addEventListener('click', () => {
        const bgUrl = img.style.backgroundImage;
        const match = bgUrl.match(/url\(['"]?(.*?)['"]?\)/i);
        if (match && match[1]) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            if (lightbox && lightboxImg) {
                lightboxImg.src = match[1];
                lightbox.classList.add('active');
            }
        }
    });
});

// Gallery Carousel Logic
const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryCarouselElement = document.querySelector('.gallery-carousel');
let galleryInterval;
let currentGalleryIndex = 0;
let galleryTouchStartX = 0;
let galleryTouchEndX = 0;

function showGallerySlide(index) {
    if (gallerySlides.length === 0) return;
    
    gallerySlides.forEach(slide => slide.classList.remove('active'));
    gallerySlides[index].classList.add('active');
    currentGalleryIndex = index;
}

function startGalleryCarousel() {
    if(galleryInterval) clearInterval(galleryInterval);
    galleryInterval = setInterval(() => {
        let nextIndex = (currentGalleryIndex + 1) % gallerySlides.length;
        showGallerySlide(nextIndex);
    }, 4000);
}

if (gallerySlides.length > 0) {
    startGalleryCarousel();
}

if (galleryCarouselElement) {
    // Swipe support
    galleryCarouselElement.addEventListener('touchstart', e => {
        galleryTouchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    galleryCarouselElement.addEventListener('touchend', e => {
        galleryTouchEndX = e.changedTouches[0].screenX;
        handleGallerySwipe();
    }, {passive: true});
    
    // Navigation buttons
    const prevBtn = galleryCarouselElement.querySelector('.prev-btn');
    const nextBtn = galleryCarouselElement.querySelector('.next-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let prevIndex = (currentGalleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
            showGallerySlide(prevIndex);
            startGalleryCarousel();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = (currentGalleryIndex + 1) % gallerySlides.length;
            showGallerySlide(nextIndex);
            startGalleryCarousel();
        });
    }
}

function handleGallerySwipe() {
    if (gallerySlides.length === 0) return;
    if (galleryTouchEndX < galleryTouchStartX - 40) {
        // Swipe Left
        let nextIndex = (currentGalleryIndex + 1) % gallerySlides.length;
        showGallerySlide(nextIndex);
        startGalleryCarousel();
    }
    if (galleryTouchEndX > galleryTouchStartX + 40) {
        // Swipe Right
        let prevIndex = (currentGalleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
        showGallerySlide(prevIndex);
        startGalleryCarousel();
    }
}

// Contact Form & Modal Logic
const enquiryForms = document.querySelectorAll('.enquiry-form');
const enquiryModal = document.getElementById('enquiry-modal');
const modalCloseBtn = document.getElementById('modal-close');
let modalTimer;
let hasSubmitted = localStorage.getItem('hasSubmitted') === 'true';

// If already submitted in this session, unlock plans immediately
if (hasSubmitted) {
    window.addEventListener('DOMContentLoaded', () => {
        if (typeof unlockPlans === 'function') {
            unlockPlans();
        }
    });
}

// Function to show modal
function showModal() {
    if (!hasSubmitted && enquiryModal) {
        enquiryModal.classList.add('active');
    }
}

// Start 10-second timer for popup
function startModalTimer() {
    if (!hasSubmitted) {
        modalTimer = setInterval(() => {
            if (!enquiryModal.classList.contains('active')) {
                showModal();
            }
        }, 10000);
    }
}

// Close modal
if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
        enquiryModal.classList.remove('active');
    });
}

// Start timer on load
startModalTimer();

// Replace with your Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbxoLZwGAVqU7vLKroILHMW4lnacQLiVNKjKzhj8UWqaeX4HZjkkJmeoPBFDz7-yoRg9sw/exec';

// Handle all enquiry forms
enquiryForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submission
        
        const btn = form.querySelector('button[type="submit"]');
        const successMsg = form.querySelector('.form-success');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'SENDING...';
        btn.disabled = true;
        
        const formData = new FormData(form);

        fetch(scriptURL, { method: 'POST', body: formData})
            .then(response => {
                // Mark as submitted in local storage
                localStorage.setItem('hasSubmitted', 'true');
                
                // Redirect to thank you page
                window.location.href = 'thank-you.html';
            })
            .catch(error => {
                console.error('Error!', error.message);
                btn.innerHTML = 'Error! Try Again';
                btn.disabled = false;
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 3000);
            });
    });
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Floor Plans & Lightbox Logic
const planItems = document.querySelectorAll('.plan-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function unlockPlans() {
    planItems.forEach(item => {
        item.classList.remove('locked');
    });
    
    // Unlock brochure
    const brochureBtns = document.querySelectorAll('.brochure-btn');
    brochureBtns.forEach(btn => {
        btn.classList.remove('locked');
        btn.href = btn.getAttribute('data-src');
        btn.setAttribute('download', '');
        // Remove the lock icon visually
        const lockIcon = btn.querySelector('.lock-icon');
        if (lockIcon) lockIcon.remove();
    });
}

// Plan Carousel Auto-play Logic
const planSlides = document.querySelectorAll('.plan-slide');
let planInterval;
let currentPlanIndex = 0;

function showPlanSlide(index) {
    if (planSlides.length === 0) return;
    
    planSlides.forEach(slide => slide.classList.remove('active'));
    planSlides[index].classList.add('active');
    currentPlanIndex = index;
}

function startPlanCarousel() {
    if(planInterval) clearInterval(planInterval);
    planInterval = setInterval(() => {
        let nextIndex = (currentPlanIndex + 1) % planSlides.length;
        showPlanSlide(nextIndex);
    }, 4000); // 4 seconds
}

if (planSlides.length > 0) {
    startPlanCarousel();
}

// Brochure Button Logic
const brochureBtns = document.querySelectorAll('.brochure-btn');
brochureBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.classList.contains('locked')) {
            e.preventDefault();
            showModal();
        }
    });
});

planItems.forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('locked')) {
            // If locked, show the enquiry modal
            showModal();
        } else {
            // If unlocked, show the full screen lightbox
            const imgSrc = item.getAttribute('data-src');
            if (imgSrc && lightboxImg) {
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
            }
        }
    });
});

if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        lightboxImg.src = '';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            lightboxImg.src = '';
        }
    });
}

// --- 3D Parallax Hero Effect ---
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        // Only run parallax on desktop
        if (window.innerWidth <= 768) return;
        
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        // Slightly shift the background position based on mouse position
        heroSection.style.backgroundPosition = `calc(50% + ${x * 20}px) calc(50% + ${y * 20}px)`;
    });
    
    heroSection.addEventListener('mouseleave', () => {
        if (window.innerWidth <= 768) return;
        heroSection.style.backgroundPosition = 'center';
    });
}

// --- GSAP Scroll Reveals ---
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = document.querySelectorAll('.gs-reveal');
    
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { autoAlpha: 0, y: 50 },
            {
                duration: 1,
                autoAlpha: 1,
                y: 0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%', // trigger when top of element hits 85% down viewport
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}
