document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const desktopNav = document.querySelector('.desktop-nav');

    // Create mobile nav by cloning desktop nav
    const mobileNav = document.createElement('nav');
    mobileNav.classList.add('mobile-nav');
    mobileNav.innerHTML = desktopNav.innerHTML;
    header.appendChild(mobileNav);

    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        // Animation for hamburger
        const spans = this.querySelectorAll('span');
        this.classList.toggle('open');
        if (this.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuButton.classList.remove('open');
            mobileMenuButton.querySelectorAll('span').forEach(s => s.style.transform = 'none');
            mobileMenuButton.querySelectorAll('span')[1].style.opacity = '1';
        });
    });

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Back to top visibility
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        }
    });

    // Create Back to top button if it doesn't exist
    if (!document.querySelector('.back-to-top')) {
        const btt = document.createElement('div');
        btt.classList.add('back-to-top');
        btt.innerHTML = '↑';
        document.body.appendChild(btt);
        btt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
