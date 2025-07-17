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

function openModal(src) {
    modalImage.src = src;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('.modal-content').classList.remove('scale-95');
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
