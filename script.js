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

// =========================== BASIC FUNCTIONALITY ===========================

// Loading Animation
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1000);
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.getElementById('nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('nav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        nav.classList.remove('active');
        toggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Header scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
    
    // Hide header on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =========================== SERVICE REDIRECT FUNCTIONALITY ===========================

// FUNGSI REDIRECT KE KONTAK DARI LAYANAN
function redirectToContact(serviceName) {
    // Mapping service name ke option value
    const serviceMap = {
        'branding': 'branding',
        'digital-marketing': 'digital-marketing', 
        'social-media': 'social-media',
        'website': 'website',
        'foto-video': 'foto-video',
        'paket-lengkap': 'paket-lengkap'
    };

    // Scroll ke bagian kontak
    const contactSection = document.getElementById('kontak');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    window.scrollTo({
        top: contactSection.offsetTop - headerHeight,
        behavior: 'smooth'
    });

    // Set nilai layanan di form setelah scroll selesai
    setTimeout(() => {
        const layananSelect = document.getElementById('layanan');
        if (layananSelect && serviceMap[serviceName]) {
            layananSelect.value = serviceMap[serviceName];
            
            // Highlight form dengan animasi
            const form = document.querySelector('.contact-form');
            form.style.transform = 'scale(1.02)';
            form.style.boxShadow = '0 25px 80px rgba(225, 112, 85, 0.2)';
            
            // Kembalikan normal setelah 2 detik
            setTimeout(() => {
                form.style.transform = 'scale(1)';
                form.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
            }, 2000);

            // Fokus ke field nama
            setTimeout(() => {
                document.getElementById('nama').focus();
            }, 500);
        }
    }, 800);

    // Show notification
    showNotification(`Silakan isi form untuk layanan "${getServiceDisplayName(serviceName)}"`, 'info');
}

// Helper function untuk mendapatkan nama layanan yang lebih readable
function getServiceDisplayName(serviceName) {
    const displayNames = {
        'branding': 'Branding & Desain',
        'digital-marketing': 'Digital Marketing',
        'social-media': 'Social Media Management', 
        'website': 'Website Development',
        'foto-video': 'Foto & Video Produk',
        'paket-lengkap': 'Paket Lengkap UMKM'
    };
    return displayNames[serviceName] || serviceName;
}

// =========================== NOTIFICATION SYSTEM ===========================

// Function untuk menampilkan notifikasi
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const colors = {
        success: 'linear-gradient(135deg, #38a169, #2f855a)',
        info: 'linear-gradient(135deg, #3182ce, #2c5282)',
        warning: 'linear-gradient(135deg, #d69e2e, #b7791f)',
        error: 'linear-gradient(135deg, #e53e3e, #c53030)'
    };

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        max-width: 300px;
        font-size: 0.95rem;
    `;

    notification.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// =========================== GMAIL INTEGRATION & FORM HANDLING ===========================

// Enhanced Form submission dengan Gmail Integration
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = document.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    
    // Validate form dengan pesan error yang spesifik
    const requiredFields = [
        { field: this.querySelector('#nama'), name: 'Nama lengkap', type: 'text' },
        { field: this.querySelector('#email'), name: 'Email', type: 'email' },
        { field: this.querySelector('#phone'), name: 'Nomor telepon', type: 'tel' },
        { field: this.querySelector('#bisnis'), name: 'Jenis bisnis', type: 'select' },
        { field: this.querySelector('#layanan'), name: 'Layanan yang dibutuhkan', type: 'select' },
        { field: this.querySelector('#pesan'), name: 'Pesan', type: 'textarea' }
    ];
    
    let isValid = true;
    let errorMessages = [];

    requiredFields.forEach(({ field, name, type }) => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e53e3e';
            field.style.background = '#fed7d7';
            errorMessages.push(name);
            isValid = false;
        } else {
            field.style.borderColor = '#e2e8f0';
            field.style.background = '#f8fafc';
            
            // Validasi tambahan untuk email
            if (type === 'email' && !isValidEmail(field.value)) {
                field.style.borderColor = '#e53e3e';
                field.style.background = '#fed7d7';
                errorMessages.push('Format email tidak valid');
                isValid = false;
            }
            
            // Validasi tambahan untuk nomor telepon
            if (type === 'tel' && !isValidPhone(field.value)) {
                field.style.borderColor = '#e53e3e';
                field.style.background = '#fed7d7';
                errorMessages.push('Format nomor telepon tidak valid');
                isValid = false;
            }
        }
    });
    
    if (!isValid) {
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Mohon perbaiki data yang salah';
        btn.style.background = 'linear-gradient(135deg, #e53e3e, #c53030)';
        
        // Tampilkan pesan error yang spesifik
        if (errorMessages.length > 0) {
            showNotification(`Field yang belum diisi: ${errorMessages.join(', ')}`, 'error');
        }
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'linear-gradient(135deg, #e17055, #d63031)';
        }, 3000);
        return;
    }
    
    // Animate button - proses pengiriman
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim ke Gmail...';
    btn.style.background = 'linear-gradient(135deg, #4299e1, #3182ce)';
    btn.disabled = true;
    
    // Prepare data untuk EmailJS
    const templateParams = {
        from_name: this.querySelector('#nama').value,
        from_email: this.querySelector('#email').value,
        phone: this.querySelector('#phone').value,
        business_type: this.querySelector('#bisnis').selectedOptions[0].text,
        service_needed: this.querySelector('#layanan').selectedOptions[0].text,
        message: this.querySelector('#pesan').value,
        to_email: 'youremail@gmail.com', // Ganti dengan email Gmail Anda
        reply_to: this.querySelector('#email').value
    };
    
    // Kirim email menggunakan EmailJS
    emailjs.send(EMAIL_CONFIG.SERVICE_ID, EMAIL_CONFIG.TEMPLATE_ID, templateParams)
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
            
            // Success state
            btn.innerHTML = '<i class="fas fa-check"></i> Berhasil Dikirim ke Gmail!';
            btn.style.background = 'linear-gradient(135deg, #38a169, #2f855a)';
            
            // Show enhanced success message
            const selectedService = this.querySelector('#layanan').selectedOptions[0]?.text || 'Layanan';
            const successMessage = `Terima kasih ${templateParams.from_name}! Pesan Anda untuk "${selectedService}" telah dikirim ke Gmail kami dan akan segera dibalas maksimal 24 jam.`;
            
            showNotification(successMessage, 'success');
            
            // Reset form dan button setelah sukses
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = 'linear-gradient(135deg, #e17055, #d63031)';
                btn.disabled = false;
                this.reset();
                
                // Reset form styling
                requiredFields.forEach(({ field }) => {
                    field.style.borderColor = '#e2e8f0';
                    field.style.background = '#f8fafc';
                });
            }, 3000);
            
        }, (error) => {
            console.error('Failed to send email:', error);
            
            // Error state
            btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Gagal Mengirim!';
            btn.style.background = 'linear-gradient(135deg, #e53e3e, #c53030)';
            
            showNotification('Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi kami langsung via WhatsApp.', 'error');
            
            // Reset button setelah error
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = 'linear-gradient(135deg, #e17055, #d63031)';
                btn.disabled = false;
            }, 3000);
        });
});

// =========================== FORM VALIDATION HELPERS ===========================

// Helper functions for validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Regex untuk nomor telepon Indonesia
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
}

// Contact form field validation dengan real-time feedback
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
    field.addEventListener('blur', function() {
        validateField(this);
    });

    field.addEventListener('focus', function() {
        this.style.borderColor = '#e17055';
        this.style.background = 'white';
    });

    // Real-time validation untuk email dan phone
    if (field.type === 'email') {
        field.addEventListener('input', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#f56565';
            } else if (this.value) {
                this.style.borderColor = '#38a169';
            }
        });
    }

    if (field.type === 'tel') {
        field.addEventListener('input', function() {
            if (this.value && !isValidPhone(this.value)) {
                this.style.borderColor = '#f56565';
            } else if (this.value) {
                this.style.borderColor = '#38a169';
            }
        });
    }
});

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

// =========================== NEWSLETTER FUNCTIONALITY ===========================

// Newsletter form handling dengan Gmail integration
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = this.querySelector('input');
    const button = this.querySelector('button');
    const originalContent = button.innerHTML;
    
    // Validate email
    if (!isValidEmail(input.value)) {
        input.style.borderColor = '#e53e3e';
        showNotification('Format email tidak valid', 'error');
        return;
    }
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    // Prepare newsletter data
    const newsletterData = {
        subscriber_email: input.value,
        subscriber_date: new Date().toLocaleDateString('id-ID'),
        to_email: 'youremail@gmail.com' // Ganti dengan email Gmail Anda
    };
    
    // Kirim ke EmailJS (buat template terpisah untuk newsletter)
    emailjs.send(EMAIL_CONFIG.SERVICE_ID, 'newsletter_template', newsletterData)
        .then((response) => {
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = 'linear-gradient(135deg, #38a169, #2f855a)';
            input.value = '';
            input.style.borderColor = 'rgba(255,255,255,0.2)';
            
            showNotification('Berhasil berlangganan newsletter!', 'success');
            
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.style.background = 'linear-gradient(135deg, #e17055, #d63031)';
                button.disabled = false;
            }, 2000);
        })
        .catch((error) => {
            console.error('Newsletter subscription failed:', error);
            showNotification('Gagal berlangganan newsletter', 'error');
            
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.disabled = false;
            }, 2000);
        });
});

// =========================== ANIMATION & UI ENHANCEMENTS ===========================

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add stagger animation for grid items
            if (entry.target.parentElement.classList.contains('services-grid') || 
                entry.target.parentElement.classList.contains('team-grid') ||
                entry.target.parentElement.classList.contains('values-grid')) {
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .team-member, .contact-item, .value-card, .vm-card').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(item);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    const heroShapes = document.querySelector('.hero-shapes');
    
    if (heroContent && heroImage && window.innerWidth > 768) {
        const rate = scrolled * -0.3;
        heroContent.style.transform = `translateY(${rate}px)`;
        heroImage.style.transform = `translateY(${rate * 0.6}px)`;
    }
    
    if (heroShapes) {
        heroShapes.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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

// Enhanced service card interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'scale(1.15) rotate(10deg)';
        
        // Ubah box shadow berdasarkan jenis layanan
        const serviceType = this.dataset.service;
        const shadows = {
            'branding': '0 15px 40px rgba(225, 112, 85, 0.4)',
            'digital-marketing': '0 15px 40px rgba(102, 126, 234, 0.4)',
            'social-media': '0 15px 40px rgba(240, 147, 251, 0.4)',
            'website': '0 15px 40px rgba(0, 184, 148, 0.4)',
            'foto-video': '0 15px 40px rgba(253, 203, 110, 0.4)',
            'paket-lengkap': '0 15px 40px rgba(225, 112, 85, 0.5)'
        };
        
        icon.style.boxShadow = shadows[serviceType] || '0 15px 40px rgba(225, 112, 85, 0.4)';
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
        icon.style.boxShadow = '0 10px 30px rgba(225, 112, 85, 0.3)';
    });
});

// Enhanced team member interactions
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-20px) scale(1.02)';
        this.querySelector('.member-photo img').style.transform = 'scale(1.1)';
    });

    member.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.querySelector('.member-photo img').style.transform = 'scale(1)';
    });
});

// =========================== STATISTICS COUNTER ANIMATION ===========================

// Story stats counter animation
const animateNumbers = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        const suffix = stat.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 50);
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.story-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// =========================== MOBILE OPTIMIZATION ===========================

// Enhanced mobile menu animation
const mobileToggle = document.querySelector('.mobile-menu-toggle');
if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const nav = document.getElementById('nav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        nav.classList.remove('active');
        toggle.classList.remove('active');
    }
});

// =========================== WELCOME MESSAGE & ANALYTICS ===========================

// Enhanced service card click analytics
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.dataset.service;
        const serviceTitle = this.querySelector('h3').textContent;
        
        // Log untuk analytics
        console.log(`Service clicked: ${serviceName} - ${serviceTitle}`);
        
        // Optional: Kirim data ke analytics service
        // gtag('event', 'service_interest', {
        //     'service_name': serviceName,
        //     'service_title': serviceTitle
        // });
    });
});

// Welcome message saat website pertama kali dimuat
setTimeout(() => {
    if (sessionStorage.getItem('welcomed') !== 'true') {
        showNotification('Selamat datang di Savory Agency! Konsultasi gratis dengan integrasi Gmail langsung.', 'info');
        sessionStorage.setItem('welcomed', 'true');
    }
}, 2000);

// =========================== PERFORMANCE OPTIMIZATION ===========================

// Performance optimization: Throttle scroll events
let ticking = false;
function updateOnScroll() {
    // All scroll-based updates here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// =========================== CONSOLE MESSAGES ===========================

console.log('🚀 Savory Agency Website dengan Gmail Integration berhasil dimuat!');
console.log('📧 EmailJS telah dikonfigurasi untuk integrasi Gmail');
console.log('✅ Form kontak akan mengirim email langsung ke Gmail Anda');
console.log('📱 Website fully responsive dan mobile-friendly');
console.log('🎯 Semua fitur redirect layanan ke kontak form siap digunakan');
console.log('💬 Sistem notifikasi dan validasi form telah diaktifkan');
console.log('⚡ Optimisasi performa dan animasi telah diterapkan');

// =========================== EMAILJS SETUP INSTRUCTIONS ===========================

console.log(`
📧 CARA SETUP GMAIL INTEGRATION:

1. Daftar di https://www.emailjs.com/
2. Buat service Gmail dan catat Service ID
3. Buat template email dan catat Template ID
4. Dapatkan Public Key dari dashboard
5. Ganti konfigurasi di bagian EMAIL_CONFIG:
   - SERVICE_ID: "service_xxxxxxx"
   - TEMPLATE_ID: "template_xxxxxxx" 
   - PUBLIC_KEY: "xxxxxxxxxxxxxxx"
6. Ganti 'youremail@gmail.com' dengan email Gmail Anda
7. Setup template EmailJS dengan variables:
   - {{from_name}}
   - {{from_email}} 
   - {{phone}}
   - {{business_type}}
   - {{service_needed}}
   - {{message}}
   - {{to_email}}
   - {{reply_to}}
`);