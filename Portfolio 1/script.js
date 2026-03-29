// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle Icon (hamburger to close)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            // Change logo and text colors if we are starting from transparent to dark
            // (handled by css background update)
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Highlight Active Link on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // 4. Scroll Animation for Sections (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: animate only once
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // 5. Contact Form Submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather input values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate (simple)
            if (name && email && message) {
                // Here, you would normally send the data via fetch/ajax. 
                // Since this is a static frontend, we'll just show an alert.
                
                const btn = contactForm.querySelector('button');
                const originalText = btn.innerHTML;
                
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Simulate network request
                setTimeout(() => {
                    alert(`Thanks for reaching out, ${name}! Your message has been sent successfully.`);
                    contactForm.reset();
                    btn.innerHTML = originalText;
                }, 1500);
            }
        });
    }

    // 7. Typewriter Effect
    const nameEl = document.querySelector('.name');
    const roleEl = document.querySelector('.role');
    const descEl = document.querySelector('.hero-desc');

    if (nameEl && roleEl && descEl) {
        const nameText = nameEl.innerHTML.trim().replace(/\s+/g, ' ');
        const roleText = roleEl.innerHTML.trim().replace(/\s+/g, ' ');
        const descText = descEl.innerHTML.trim().replace(/\s+/g, ' ');

        nameEl.innerHTML = '';
        roleEl.innerHTML = '';
        descEl.innerHTML = '';

        const typeHTML = (element, htmlStr, speed, onComplete) => {
            element.innerHTML = "";
            let i = 0;
            let currentText = "";
            let timer = setInterval(() => {
                if (i < htmlStr.length) {
                    if (htmlStr.charAt(i) === '<') {
                        let tagEnd = htmlStr.indexOf('>', i);
                        if (tagEnd !== -1) {
                            currentText += htmlStr.substring(i, tagEnd + 1);
                            i = tagEnd + 1;
                        }
                    }
                    if (i < htmlStr.length) {
                        currentText += htmlStr.charAt(i);
                        element.innerHTML = currentText + '<span class="type-cursor">|</span>';
                        i++;
                    } else {
                        element.innerHTML = currentText;
                    }
                } else {
                    clearInterval(timer);
                    element.innerHTML = currentText; 
                    if (onComplete) onComplete();
                }
            }, speed);
        };

        setTimeout(() => {
            typeHTML(nameEl, nameText, 60, () => {
                typeHTML(roleEl, roleText, 40, () => {
                    typeHTML(descEl, descText, 25);
                });
            });
        }, 600);
    }

    // 6. Theme Toggle Feature
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        const themeIcon = themeBtn.querySelector('i');
        
        // Initial check
        const currentTheme = localStorage.getItem('portfolioTheme');
        if (currentTheme === 'light') {
            document.body.classList.add('light-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
        
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('portfolioTheme', 'light');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                localStorage.setItem('portfolioTheme', 'dark');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }
});
