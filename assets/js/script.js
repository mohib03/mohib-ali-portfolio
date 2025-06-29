// EmailJS Configuration
const EMAILJS_CONFIG = {
    SERVICE_ID: 'your_actual_service_id',
    TEMPLATE_ID: 'your_actual_template_id',
    PUBLIC_KEY: '2dpXQYX8JJ_kgw_cy'
};

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    
    // Initialize all functionality
    initTypewriter();
    initSmoothScrolling();
    initScrollToTop();
    initFormValidation();
    initProgressBars();
    initScrollAnimations();
});

// Typewriter Effect
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const text = 'Mohib Ali';
    let index = 0;
    let isDeleting = false;
    
    function typeText() {
        if (!isDeleting && index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 150);
        } else if (!isDeleting && index === text.length) {
            setTimeout(() => {
                isDeleting = true;
                typeText();
            }, 3000);
        } else if (isDeleting && index > 0) {
            typewriterElement.textContent = text.substring(0, index - 1);
            index--;
            setTimeout(typeText, 100);
        } else if (isDeleting && index === 0) {
            isDeleting = false;
            setTimeout(typeText, 500);
        }
    }
    
    typeText();
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
}

// Scroll to Top Button Functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Reset previous validation states
        resetValidation([name, email, message]);
        
        let isValid = true;
        
        // Validate name
        if (!validateName(name.value.trim())) {
            showError(name, 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!validateMessage(message.value.trim())) {
            showError(message, 'Please enter a message (at least 10 characters)');
            isValid = false;
        }
        
        // If form is valid, send email
        if (isValid) {
            sendEmail({
                name: name.value.trim(),
                email: email.value.trim(),
                message: message.value.trim()
            }, contactForm);
        }
    });
}

// Validation Helper Functions
function validateName(name) {
    return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMessage(message) {
    return message.length >= 10;
}

function showError(element, message) {
    element.classList.add('is-invalid');
    const feedback = element.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = message;
    }
}

function resetValidation(elements) {
    elements.forEach(element => {
        element.classList.remove('is-invalid', 'is-valid');
    });
}

// Send Email using EmailJS
function sendEmail(formData, form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    // Show loading state
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    submitBtn.disabled = true;
    
    // EmailJS template parameters

    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    submitBtn.disabled = true;

    // Template parameters for EmailJS
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'mohibsolanki@gmail.com'
    };
    
    emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            showAlert('success', 'Your message has been sent successfully! I\'ll get back to you soon.');
            form.reset();
        })
        .catch(function(error) {
            console.error('Email sending failed:', error);
            showAlert('danger', 'Failed to send message. Please try again or contact me directly.');
        })
        .finally(function() {
            // Reset button state
        // to_name: 'Mohib Ali'
        to_email: 'mohibsolanki@gmail.com'
    });

    emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
        .then(() => {
            showAlert('success', 'Thank you for your message! I will get back to you soon.');
            form.reset();
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            showAlert('danger', 'Something went wrong. Please try again later.');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

function showAlert(type, message) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.innerHTML = `
        <strong>${type === 'success' ? 'Success!' : 'Error!'}</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert after form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form.nextSibling);
    
    // Auto-remove alert after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Animate Progress Bars on Scroll
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    const skillsSection = document.getElementById('skills');
    
    // Intersection Observer for skills section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }
}

// Scroll Animations for Sections
function initScrollAnimations() {
    const sections = document.querySelectorAll('section:not(.hero-section)');
    
    // Intersection Observer for sections (excluding hero)
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate section content
                const content = entry.target.querySelector('.section-content');
                if (content) {
                    setTimeout(() => {
                        content.classList.add('animate');
                    }, 200);
                }
                
                // Animate items within section
                const items = entry.target.querySelectorAll('.animate-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, 300 + (index * 100));
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all sections except hero
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Active Navigation Link Highlighting
window.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (
      window.pageYOffset >= sectionTop &&
      window.pageYOffset < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});