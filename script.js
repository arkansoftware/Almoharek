document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav-links li a');

    function toggleMenu() {
        navMenu.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'auto';
    }

    mobileBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Active Link on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Scroll Animations (Intersection Observer)
    const animateElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-top, .fade-in-right, .fade-in-left');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Don't unobserve if you want it to animate only once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animateElements.forEach(el => observer.observe(el));

    // Stats Counter Animation
    const statsContainer = document.querySelector('.stats');
    const statNums = document.querySelectorAll('.stat-num');
    let started = false;

    const countUp = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText.replace('+', '');
        const increment = target / 50;

        if (count < target) {
            el.innerText = `${Math.ceil(count + increment)}`;
            setTimeout(() => countUp(el), 30);
        } else {
            el.innerText = el.getAttribute('data-target').includes('+') ? `+${target}` : target;
        }
    };

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            statNums.forEach(num => countUp(num));
            started = true;
        }
    }, { threshold: 0.5 });

    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }
});
