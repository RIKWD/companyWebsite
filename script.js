// Typewriter effect with formatted text
const textParts = [
    { text: "RiK is a ", style: "normal" },
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
