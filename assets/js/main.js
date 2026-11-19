// ==========================================================================
// JILS PATEL - MODERN PORTFOLIO INTERACTIONS (2026)
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
    // 1. Mobile Navigation Drawer Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('nav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function () {
            mainNav.classList.toggle('mobile-active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (mainNav.classList.contains('mobile-active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Close mobile drawer when clicking a navigation link
    const navLinks = document.querySelectorAll('nav ul li a, .nav-cta');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (mainNav && mainNav.classList.contains('mobile-active')) {
                mainNav.classList.remove('mobile-active');
                const icon = mobileToggle ? mobileToggle.querySelector('i') : null;
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // 2. Highlight current active nav item
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav ul li a').forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('data-current', 'true');
        } else {
            link.classList.remove('active');
            link.removeAttribute('data-current');
        }
    });

    // 3. Scroll Progress Indicator & Navbar Elevation
    const scrollBar = document.querySelector('.scroll-progress');
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        if (scrollBar) {
            scrollBar.style.width = scrolled + '%';
        }

        if (mainNav) {
            if (winScroll > 40) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (winScroll > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    // 4. Back To Top Action
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 6. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .project-card, .skill-pill-card, .contact-quick-card, .education-card, .narrative-card').forEach(el => {
        revealObserver.observe(el);
    });

    // 7. Dynamic 3D tilt effect on hero card (desktop only)
    const heroVisualCard = document.querySelector('.hero-visual-card');
    if (heroVisualCard && window.innerWidth > 992) {
        heroVisualCard.addEventListener('mousemove', function (e) {
            const rect = heroVisualCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (-y / rect.height) * 12;
            const rotateY = (x / rect.width) * 12;
            heroVisualCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        heroVisualCard.addEventListener('mouseleave', function () {
            heroVisualCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }
});
