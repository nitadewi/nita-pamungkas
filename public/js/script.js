// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Scroll Up Button Functionality
    document.querySelectorAll('.scroll-up').forEach(button => {
        button.addEventListener('click', function () {
            const currentSection = button.parentElement;
            const previousSection = currentSection.previousElementSibling;

            if (previousSection) {
                previousSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Show Scroll Up Button when reaching the bottom of the section
    window.addEventListener('scroll', function () {
        document.querySelectorAll('.section').forEach(section => {
            const scrollUpButton = section.querySelector('.scroll-up');
            const rect = section.getBoundingClientRect();

            if (rect.bottom <= window.innerHeight) {
                scrollUpButton.style.display = 'block';
            } else {
                scrollUpButton.style.display = 'none';
            }
        });
    });
});
