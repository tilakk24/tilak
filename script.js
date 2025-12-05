// Falling Flowers Animation
function createFallingFlowers() {
    const container = document.querySelector('.flowers-container');
    const flowers = ['🌸', '🌺', '🌼', '🌻', '💐'];

    function createFlower() {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = Math.random() * 100 + '%';
        flower.style.animationDuration = (Math.random() * 3 + 4) + 's';
        flower.style.animationDelay = Math.random() * 2 + 's';

        container.appendChild(flower);

        setTimeout(() => {
            flower.remove();
        }, 8000);
    }

    setInterval(createFlower, 300);
}

// Initialize falling flowers on page load
document.addEventListener('DOMContentLoaded', createFallingFlowers);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Observe story cards
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach((card) => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // Observe moment cards
    const momentCards = document.querySelectorAll('.moment-card');
    momentCards.forEach((card) => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});

// Photo upload functionality
const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
const photoModal = document.getElementById('photoModal');
const photoInput = document.getElementById('photoInput');
const confirmPhotoBtn = document.getElementById('confirmPhotoBtn');
const closePhotoBtn = document.getElementById('closePhotoBtn');
const heroPhoto = document.getElementById('heroPhoto');

uploadPhotoBtn.addEventListener('click', () => {
    photoModal.classList.add('active');
});

closePhotoBtn.addEventListener('click', () => {
    photoModal.classList.remove('active');
    photoInput.value = '';
});

confirmPhotoBtn.addEventListener('click', () => {
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            heroPhoto.src = e.target.result;
            photoModal.classList.remove('active');
            photoInput.value = '';
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        alert('Please select a photo first');
    }
});

// Close modal when clicking outside
photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal) {
        photoModal.classList.remove('active');
        photoInput.value = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && photoModal.classList.contains('active')) {
        photoModal.classList.remove('active');
        photoInput.value = '';
    }
});
