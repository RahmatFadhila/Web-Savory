// =========================== EMAILJS CONFIGURATION ===========================
// Inisialisasi EmailJS - Ganti dengan konfigurasi Anda sendiri
(function() {
    emailjs.init("C1CHXbOdrYJMW6PXY"); // Ganti dengan Public Key dari EmailJS
})();

// Konfigurasi EmailJS
const EMAIL_CONFIG = {
    SERVICE_ID: "service_kb4s6b1",     // Ganti dengan Service ID Gmail Anda
    TEMPLATE_ID: "template_79mn2vd",   // Ganti dengan Template ID Anda
    PUBLIC_KEY: "C1CHXbOdrYJMW6PXY"      // Ganti dengan Public Key Anda
};

// =========================== PERFORMANCE OPTIMIZATION VARIABLES ===========================
let ticking = false;
let lastScrollTop = 0;
let isScrolling = false;
let scrollTimeout;

// Debounce function untuk mengurangi frequency event calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function untuk scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// =========================== BASIC FUNCTIONALITY - OPTIMIZED ===========================

// Loading Animation - Optimized
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    if (loading) {
        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 300);
        });
    }
}, { passive: true });

// Mobile Menu Toggle - Optimized
function toggleMobileMenu() {
    const nav = document.getElementById('nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (nav && toggle) {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }
}

// Close mobile menu when clicking on a link - Optimized with event delegation
document.addEventListener('click', function(e) {
    if (e.target.matches('nav a[href^="#"]')) {
        const nav = document.getElementById('nav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (nav && toggle) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Smooth scrolling - Optimized with single event listener
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
        e.preventDefault();
        const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
        const target = document.querySelector(link.getAttribute('href'));
        
        if (target) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Enhanced Header scroll effect - Heavily optimized
const handleScroll = throttle(() => {
    const header = document.getElementById('header');
    if (!header) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Use transform instead of adding/removing classes for better performance
    if (scrollTop > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    // Hide header on scroll down, show on scroll up - Mobile optimized
    if (window.innerWidth <= 768) {
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, 16); // 60fps throttle

window.addEventListener('scroll', handleScroll, { passive: true });

// Scroll to Top Button - Optimized
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    const handleScrollToTop = throttle(() => {
        const isVisible = window.pageYOffset > 300;
        scrollToTopBtn.style.opacity = isVisible ? '1' : '0';
        scrollToTopBtn.style.visibility = isVisible ? 'visible' : 'hidden';
    }, 100);
    
    window.addEventListener('scroll', handleScrollToTop, { passive: true });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =========================== SERVICE REDIRECT FUNCTIONALITY - OPTIMIZED ===========================

// FUNGSI REDIRECT KE KONTAK DARI LAYANAN - Optimized
function redirectToContact(serviceName) {
    const serviceMap = {
        'branding': 'branding',
        'digital-marketing': 'digital-marketing', 
        'social-media': 'social-media',
        'website': 'website',
        'foto-video': 'foto-video',
        'paket-lengkap': 'paket-lengkap'
    };

    const contactSection = document.getElementById('kontak');
    const header = document.querySelector('header');
    
    if (contactSection && header) {
        const headerHeight = header.offsetHeight;
        
        window.scrollTo({
            top: contactSection.offsetTop - headerHeight,
            behavior: 'smooth'
        });

        // Optimized timing with single setTimeout
        setTimeout(() => {
            const layananSelect = document.getElementById('layanan');
            const form = document.querySelector('.contact-form');
            
            if (layananSelect && serviceMap[serviceName]) {
                layananSelect.value = serviceMap[serviceName];
                
                // Simplified form highlight
                if (form) {
                    form.style.transform = 'scale(1.02)';
                    form.style.transition = 'transform 0.3s ease';
                    
                    setTimeout(() => {
                        form.style.transform = 'scale(1)';
                    }, 2000);
                }

                // Focus ke field nama dengan delay
                const namaField = document.getElementById('nama');
                if (namaField) {
                    setTimeout(() => namaField.focus(), 500);
                }
            }
            
            // Show notification
            showNotification(`Silakan isi form untuk layanan "${getServiceDisplayName(serviceName)}"`, 'info');
        }, 800);
    }
}

// Helper function - Optimized with object lookup
const serviceDisplayNames = {
    'branding': 'Branding & Desain',
    'digital-marketing': 'Digital Marketing',
    'social-media': 'Social Media Management', 
    'website': 'Website Development',
    'foto-video': 'Foto & Video Produk',
    'paket-lengkap': 'Paket Lengkap UMKM'
};

function getServiceDisplayName(serviceName) {
    return serviceDisplayNames[serviceName] || serviceName;
}

// =========================== NOTIFICATION SYSTEM - OPTIMIZED ===========================

// Optimized notification system with object pooling
let notificationPool = [];

function showNotification(message, type = 'success') {
    const colors = {
        success: '#38a169',
        info: '#3182ce',
        warning: '#d69e2e',
        error: '#e53e3e'
    };

    // Reuse existing notification element if available
    let notification = notificationPool.pop() || document.createElement('div');
    
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 15px;
        left: 15px;
        background: ${colors[type]};
        color: white;
        padding: 12px 15px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        transform: translateY(-80px);
        transition: transform 0.2s ease;
        box-shadow: 0 3px 15px rgba(0,0,0,0.3);
        font-size: 0.85rem;
        opacity: 0;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    });
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateY(-80px)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
                notificationPool.push(notification); // Return to pool
            }
        }, 200);
    }, 3000);
}

// =========================== FORM HANDLING - OPTIMIZED ===========================

// Form submission - Optimized
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        
        // Cached DOM queries
        const fields = {
            nama: this.querySelector('#nama'),
            email: this.querySelector('#email'),
            phone: this.querySelector('#phone'),
            bisnis: this.querySelector('#bisnis'),
            layanan: this.querySelector('#layanan'),
            pesan: this.querySelector('#pesan')
        };
        
        // Optimized validation
        let isValid = true;
        let errorMessages = [];

        Object.entries(fields).forEach(([key, field]) => {
            if (!field || !field.value.trim()) {
                if (field) {
                    field.style.borderColor = '#e53e3e';
                    field.style.background = '#fed7d7';
                }
                errorMessages.push(key);
                isValid = false;
            } else {
                field.style.borderColor = '#e2e8f0';
                field.style.background = '#f8fafc';
                
                // Specific validations
                if (key === 'email' && !isValidEmail(field.value)) {
                    field.style.borderColor = '#e53e3e';
                    field.style.background = '#fed7d7';
                    errorMessages.push('Format email tidak valid');
                    isValid = false;
                }
                
                if (key === 'phone' && !isValidPhone(field.value)) {
                    field.style.borderColor = '#e53e3e';
                    field.style.background = '#fed7d7';
                    errorMessages.push('Format nomor telepon tidak valid');
                    isValid = false;
                }
            }
        });
        
        if (!isValid) {
            btn.innerHTML = 'Mohon perbaiki data yang salah';
            btn.style.background = '#e53e3e';
            
            showNotification(`Field yang belum diisi: ${errorMessages.join(', ')}`, 'error');
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '#e17055';
            }, 2000);
            return;
        }
        
        // Optimized button state
        btn.innerHTML = 'Mengirim...';
        btn.style.background = '#4299e1';
        btn.disabled = true;
        
        // Prepare data
        const templateParams = {
            from_name: fields.nama.value,
            from_email: fields.email.value,
            phone: fields.phone.value,
            business_type: fields.bisnis.selectedOptions[0].text,
            service_needed: fields.layanan.selectedOptions[0].text,
            message: fields.pesan.value,
            to_email: 'youremail@gmail.com',
            reply_to: fields.email.value
        };
        
        // Send email
        emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, templateParams)
            .then(() => {
                btn.innerHTML = 'Berhasil Dikirim!';
                btn.style.background = '#38a169';
                
                const successMessage = `Terima kasih ${templateParams.from_name}! Pesan Anda untuk "${templateParams.service_needed}" telah dikirim dan akan segera dibalas maksimal 24 jam.`;
                showNotification(successMessage, 'success');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '#e17055';
                    btn.disabled = false;
                    this.reset();
                    
                    // Reset field styling
                    Object.values(fields).forEach(field => {
                        if (field) {
                            field.style.borderColor = '#e2e8f0';
                            field.style.background = '#f8fafc';
                        }
                    });
                }, 2000);
                
            })
            .catch(() => {
                btn.innerHTML = 'Gagal Mengirim!';
                btn.style.background = '#e53e3e';
                
                showNotification('Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung via WhatsApp.', 'error');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '#e17055';
                    btn.disabled = false;
                }, 2000);
            });
    });
}

// =========================== VALIDATION HELPERS - OPTIMIZED ===========================

// Cached regex patterns for better performance
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;

function isValidEmail(email) {
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
}

// Optimized field validation with event delegation
document.addEventListener('blur', function(e) {
    if (e.target.matches('.form-group input, .form-group textarea, .form-group select')) {
        validateField(e.target);
    }
}, true);

document.addEventListener('focus', function(e) {
    if (e.target.matches('.form-group input, .form-group textarea, .form-group select')) {
        e.target.style.borderColor = '#e17055';
        e.target.style.background = 'white';
    }
}, true);

// Real-time validation with debouncing
document.addEventListener('input', debounce(function(e) {
    if (e.target.type === 'email' && e.target.value) {
        e.target.style.borderColor = isValidEmail(e.target.value) ? '#38a169' : '#f56565';
    }
    
    if (e.target.type === 'tel' && e.target.value) {
        e.target.style.borderColor = isValidPhone(e.target.value) ? '#38a169' : '#f56565';
    }
}, 300), true);

function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        field.style.borderColor = '#e53e3e';
        field.style.background = '#fed7d7';
        return false;
    } else {
        field.style.borderColor = '#e2e8f0';
        field.style.background = '#f8fafc';
        return true;
    }
}

// =========================== NEWSLETTER - OPTIMIZED ===========================

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        const button = this.querySelector('button');
        const originalContent = button.innerHTML;
        
        if (!isValidEmail(input.value)) {
            input.style.borderColor = '#e53e3e';
            showNotification('Format email tidak valid', 'error');
            return;
        }
        
        button.innerHTML = 'Mengirim...';
        button.disabled = true;
        
        const newsletterData = {
            subscriber_email: input.value,
            subscriber_date: new Date().toLocaleDateString('id-ID'),
            to_email: 'youremail@gmail.com'
        };
        
        emailjs.send(EMAIL_CONFIG.SERVICE_ID, 'newsletter_template', newsletterData)
            .then(() => {
                button.innerHTML = 'Berhasil!';
                button.style.background = '#38a169';
                input.value = '';
                input.style.borderColor = 'rgba(255,255,255,0.2)';
                
                showNotification('Berhasil berlangganan newsletter!', 'success');
                
                setTimeout(() => {
                    button.innerHTML = originalContent;
                    button.style.background = '';
                    button.disabled = false;
                }, 1500);
            })
            .catch(() => {
                showNotification('Gagal berlangganan newsletter', 'error');
                
                setTimeout(() => {
                    button.innerHTML = originalContent;
                    button.disabled = false;
                }, 1500);
            });
    });
}

// =========================== ANIMATIONS - MOBILE OPTIMIZED ===========================

// Simplified Intersection Observer for mobile
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Only animate if not on mobile or user prefers motion
if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.service-card, .team-member, .value-card, .vm-card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// Optimized parallax - disabled on mobile
if (window.innerWidth > 768) {
    const parallaxElements = {
        heroContent: document.querySelector('.hero-content'),
        heroImage: document.querySelector('.hero-image')
    };
    
    if (parallaxElements.heroContent && parallaxElements.heroImage) {
        const handleParallax = throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            
            parallaxElements.heroContent.style.transform = `translateY(${rate}px)`;
            parallaxElements.heroImage.style.transform = `translateY(${rate * 0.5}px)`;
        }, 16);
        
        window.addEventListener('scroll', handleParallax, { passive: true });
    }
}

// =========================== NAVIGATION - OPTIMIZED ===========================

// Active navigation with throttling
const updateActiveNav = throttle(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
}, 100);

window.addEventListener('scroll', updateActiveNav, { passive: true });

// =========================== MOBILE INTERACTIONS - OPTIMIZED ===========================

// Simplified service card interactions for mobile
if (window.innerWidth > 768) {
    document.addEventListener('mouseenter', function(e) {
        if (e.target.matches('.service-card') || e.target.closest('.service-card')) {
            const card = e.target.matches('.service-card') ? e.target : e.target.closest('.service-card');
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.2s ease';
            }
        }
        
        if (e.target.matches('.team-member') || e.target.closest('.team-member')) {
            const member = e.target.matches('.team-member') ? e.target : e.target.closest('.team-member');
            member.style.transform = 'translateY(-10px)';
            member.style.transition = 'transform 0.2s ease';
        }
    }, true);

    document.addEventListener('mouseleave', function(e) {
        if (e.target.matches('.service-card') || e.target.closest('.service-card')) {
            const card = e.target.matches('.service-card') ? e.target : e.target.closest('.service-card');
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        }
        
        if (e.target.matches('.team-member') || e.target.closest('.team-member')) {
            const member = e.target.matches('.team-member') ? e.target : e.target.closest('.team-member');
            member.style.transform = 'translateY(0)';
        }
    }, true);
}

// =========================== MOBILE MENU - ENHANCED ===========================

// Enhanced mobile menu with keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const nav = document.getElementById('nav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (nav && toggle && nav.classList.contains('active')) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// =========================== PERFORMANCE MONITORING ===========================

// Simple performance logging
const perfLog = {
    start: performance.now(),
    log: function(event) {
        if (console && console.log) {
            console.log(`${event}: ${(performance.now() - this.start).toFixed(2)}ms`);
        }
    }
};

// =========================== WELCOME & CLEANUP ===========================

// Optimized welcome message
setTimeout(() => {
    if (sessionStorage.getItem('welcomed') !== 'true') {
        showNotification('Selamat datang di Savory Agency! Konsultasi gratis tersedia.', 'info');
        sessionStorage.setItem('welcomed', 'true');
    }
}, 1500);

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    // Clear any running timeouts/intervals
    observer.disconnect();
    notificationPool = [];
});

// =========================== CONSOLE MESSAGES - SIMPLIFIED ===========================

if (console && console.log) {
    console.log('Savory Agency - Mobile Optimized Version Loaded');
    console.log('Gmail Integration Ready');
    console.log('Mobile Performance Optimized');
}

// =========================== SETUP INSTRUCTIONS ===========================

if (console && console.log) {
    console.log(`
GMAIL INTEGRATION SETUP:
1. Register at https://www.emailjs.com/
2. Create Gmail service and get Service ID
3. Create email template and get Template ID
4. Get Public Key from dashboard
5. Update EMAIL_CONFIG object
6. Replace 'youremail@gmail.com' with your Gmail
7. Setup EmailJS template variables:
   - {{from_name}}
   - {{from_email}}
   - {{phone}}
   - {{business_type}}
   - {{service_needed}}
   - {{message}}
   - {{to_email}}
   - {{reply_to}}
`);
}

perfLog.log('JavaScript Loaded');