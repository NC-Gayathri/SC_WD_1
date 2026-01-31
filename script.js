/**
 * NEXUS DIGITAL - Main Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Select Elements
    const mainNav = document.querySelector('#mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header');
    const contactForm = document.querySelector('#contactForm');

    /**
     * 2. Navbar Scroll Effect
     * Changes the navbar background from transparent to glassmorphism 
     * when the user scrolls down 80px.
     */
    const handleNavbarScroll = () => {
        if (window.scrollY > 80) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    };

    /**
     * 3. Scroll-Spy (Active Link Highlighter)
     * Automatically updates the navigation menu to show which section
     * the user is currently viewing.
     */
    const handleActiveLink = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Check if user is within the bounds of the section (with 150px offset)
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    /**
     * 4. Smooth Scrolling
     * Prevents the "jumpy" behavior when clicking internal links.
     */
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bootstrapCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        bootstrapCollapse.hide();
                    }

                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for fixed header height
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    /**
     * 5. Contact Form Interaction
     * Provides immediate visual feedback to the user after submission.
     */
    const setupContactForm = () => {
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const btn = contactForm.querySelector('button');
                const originalText = btn.innerText;
                
                // Visual "Loading" State
                btn.innerText = "Processing...";
                btn.disabled = true;

                // Simulate an API call
                setTimeout(() => {
                    btn.innerText = "Message Sent!";
                    btn.style.backgroundColor = "#10b981"; // Success Green
                    btn.style.borderColor = "#10b981";
                    
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.backgroundColor = "";
                        btn.style.borderColor = "";
                        btn.disabled = false;
                    }, 3000);
                }, 1500);
            });
        }
    };

    // Initialize all functions
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        handleActiveLink();
    });
    
    setupSmoothScroll();
    setupContactForm();
});