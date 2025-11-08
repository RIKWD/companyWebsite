// Typewriter effect with formatted text
const textParts = [
    { text: "RiKA is a ", style: "normal" },
    { text: "web development company", style: "italic" },
    { text: " creating ", style: "normal" },
    { text: "brand identities", style: "bold" },
    { text: ", digital experiences, and beautiful websites for local businesses.", style: "normal" }
];

const typewriterElement = document.getElementById('typewriter-text');
let partIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Calculate total length for deleting
const totalText = textParts.map(p => p.text).join('');

function typeWriter() {
    if (!isDeleting) {
        // Typing forward
        if (partIndex < textParts.length) {
            const currentPart = textParts[partIndex];

            if (charIndex < currentPart.text.length) {
                // Add character to current part
                const char = currentPart.text[charIndex];

                // Create or update the current span
                let spans = typewriterElement.querySelectorAll('span');
                let currentSpan = spans[partIndex];

                if (!currentSpan) {
                    currentSpan = document.createElement('span');
                    if (currentPart.style === "italic") {
                        currentSpan.className = "italic";
                    } else if (currentPart.style === "bold") {
                        currentSpan.className = "bold";
                    }
                    typewriterElement.appendChild(currentSpan);
                }

                currentSpan.textContent += char;
                charIndex++;
                setTimeout(typeWriter, 80); // Speed of typing
            } else {
                // Move to next part
                partIndex++;
                charIndex = 0;
                setTimeout(typeWriter, 50);
            }
        } else {
            // Finished typing, pause then start deleting
            isDeleting = true;
            setTimeout(typeWriter, 2000); // Pause at end
        }
    } else {
        // Deleting backward
        if (partIndex >= 0) {
            let currentSpan = typewriterElement.querySelectorAll('span')[partIndex];

            if (currentSpan && currentSpan.textContent.length > 0) {
                // Remove character from current span
                currentSpan.textContent = currentSpan.textContent.slice(0, -1);
                setTimeout(typeWriter, 30); // Speed of deleting
            } else {
                // Remove empty span and move to previous part
                if (currentSpan) {
                    currentSpan.remove();
                }
                partIndex--;
                setTimeout(typeWriter, 30);
            }
        } else {
            // Finished deleting, restart
            isDeleting = false;
            partIndex = 0;
            charIndex = 0;
            typewriterElement.innerHTML = '';
            setTimeout(typeWriter, 500); // Pause before restarting
        }
    }
}

// Start the typewriter effect when the page loads
window.addEventListener('load', () => {
    typeWriter();
});

// Lightbox functionality for template gallery
const templateData = {
    1: [
        { src: 'https://via.placeholder.com/1200x800/8b5cf6/ffffff?text=Template+1+-+Image+1', caption: 'Template 1 - Homepage' },
        { src: 'https://via.placeholder.com/1200x800/8b5cf6/ffffff?text=Template+1+-+Image+2', caption: 'Template 1 - About Page' },
        { src: 'https://via.placeholder.com/1200x800/8b5cf6/ffffff?text=Template+1+-+Image+3', caption: 'Template 1 - Services' }
    ],
    2: [
        { src: 'https://via.placeholder.com/1200x800/ec4899/ffffff?text=Template+2+-+Image+1', caption: 'Template 2 - Homepage' },
        { src: 'https://via.placeholder.com/1200x800/ec4899/ffffff?text=Template+2+-+Image+2', caption: 'Template 2 - Gallery' },
        { src: 'https://via.placeholder.com/1200x800/ec4899/ffffff?text=Template+2+-+Image+3', caption: 'Template 2 - Contact' }
    ],
    3: [
        { src: 'https://via.placeholder.com/1200x800/f59e0b/ffffff?text=Template+3+-+Image+1', caption: 'Template 3 - Homepage' },
        { src: 'https://via.placeholder.com/1200x800/f59e0b/ffffff?text=Template+3+-+Image+2', caption: 'Template 3 - Portfolio' },
        { src: 'https://via.placeholder.com/1200x800/f59e0b/ffffff?text=Template+3+-+Image+3', caption: 'Template 3 - Team' }
    ],
    4: [
        { src: 'https://via.placeholder.com/1200x800/06b6d4/ffffff?text=Template+4+-+Image+1', caption: 'Template 4 - Homepage' },
        { src: 'https://via.placeholder.com/1200x800/06b6d4/ffffff?text=Template+4+-+Image+2', caption: 'Template 4 - Services' },
        { src: 'https://via.placeholder.com/1200x800/06b6d4/ffffff?text=Template+4+-+Image+3', caption: 'Template 4 - Reviews' }
    ]
};

let currentTemplate = null;
let currentImageIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

// Open lightbox when clicking template card
document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', function() {
        currentTemplate = this.getAttribute('data-template');
        currentImageIndex = 0;
        showLightbox();
    });
});

// Show lightbox
function showLightbox() {
    const images = templateData[currentTemplate];
    if (images && images[currentImageIndex]) {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxCaption.textContent = images[currentImageIndex].caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

closeBtn.addEventListener('click', closeLightbox);

// Close on clicking outside image
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Previous image
prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    const images = templateData[currentTemplate];
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentImageIndex].src;
    lightboxCaption.textContent = images[currentImageIndex].caption;
});

// Next image
nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    const images = templateData[currentTemplate];
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImg.src = images[currentImageIndex].src;
    lightboxCaption.textContent = images[currentImageIndex].caption;
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});
