function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav a');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('header')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

function initAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            accordionButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.classList.remove('active');
                    otherButton.nextElementSibling.style.maxHeight = null;
                }
            });

            button.classList.toggle('active');
            const content = button.nextElementSibling;

            if (button.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });
}

function initScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');

    if (!scrollButton) return;

    // Mostrar/esconder botão conforme o scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });

    // Ação de scroll ao topo
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAccordion();
    initScrollToTop();
    console.log('✓ Interações JavaScript carregadas com sucesso!');
});
