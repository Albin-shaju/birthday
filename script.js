// JavaScript for scroll animations
const scrollAnimateElements = document.querySelectorAll('.scroll-animate');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

scrollAnimateElements.forEach(element => {
    observer.observe(element);
});

// JavaScript for the photo gallery modal
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

// Get the audio elements
const backgroundMusic = document.getElementById('backgroundMusic');
const clickSound = document.getElementById('clickSound');

function openModal(src) {
    modalImage.src = src;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('.modal-content').classList.remove('scale-95');
    
    // Play the click sound if the element exists
    if (clickSound) { 
        clickSound.currentTime = 0; // Rewind to the start for immediate playback
        clickSound.play().catch(e => console.error("Error playing click sound:", e)); // Add error handling
    }
}

function closeModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('.modal-content').classList.add('scale-95');
}

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Handle background music autoplay and unmuting
document.addEventListener('DOMContentLoaded', () => {
    // Attempt to play background music on page load, if it exists
    if (backgroundMusic) {
        backgroundMusic.play().catch(e => {
            // This catch block will likely run if autoplay is blocked by the browser
            console.warn("Background music autoplay prevented by browser. It will be unmuted on first user interaction.", e);
            // Since it's muted, we rely on user interaction to unmute and play
        });
    }

    // Add a global click listener to unmute background music if it's muted
    // This is a common workaround for browser autoplay policies
    document.body.addEventListener('click', function unmuteHandler() {
        if (backgroundMusic && backgroundMusic.muted) {
            backgroundMusic.muted = false;
            backgroundMusic.play().catch(e => console.error("Error unmuting/playing background music after user interaction:", e));
            // Optional: You could show a small "Music On" indicator here
        }
        // Remove the event listener after the first interaction to avoid unnecessary calls
        document.body.removeEventListener('click', unmuteHandler);
    }, { once: true }); // Ensure the event listener is removed after the first trigger
});
