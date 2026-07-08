// Subtle parallax effect to the hero background
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero-section');
    if (hero) {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;
        hero.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    }
});

// Smooth scroll for the scroll indicator and navigation
document.querySelectorAll('a[href^="#"], .scroll-indicator').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        let targetId;
        if (this.hasAttribute('href')) {
            targetId = this.getAttribute('href');
        } else if (this.id === 'scroll-to-overview') {
            targetId = '#overview';
        }

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

// Gallery Carousel Logic
const gallerySlides = document.querySelectorAll('.gallery-slide');
let galleryInterval;
let currentGalleryIndex = 0;

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

// Contact Form & Modal Logic
const enquiryForms = document.querySelectorAll('.enquiry-form');
const enquiryModal = document.getElementById('enquiry-modal');
const modalCloseBtn = document.getElementById('modal-close');
let modalTimer;
let hasSubmitted = false;

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

// Handle all enquiry forms
enquiryForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submission
        
        const btn = form.querySelector('button[type="submit"]');
        const successMsg = form.querySelector('.form-success');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'SENDING...';
        btn.disabled = true;
        
        setTimeout(() => {
            // Mark as submitted so modal stops popping up
            hasSubmitted = true;
            clearInterval(modalTimer);
            
            // Unlock all floor plans
            if (typeof unlockPlans === 'function') {
                unlockPlans();
            }
            
            // Show success message
            successMsg.style.display = 'block';
            
            // Reset form
            form.reset();
            
            // Reset button
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Close modal if it was open
            setTimeout(() => {
                successMsg.style.display = 'none';
                if (enquiryModal.classList.contains('active')) {
                    enquiryModal.classList.remove('active');
                }
            }, 3000);
            
        }, 1500);
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
}

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

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

// Close lightbox on outside click
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}
