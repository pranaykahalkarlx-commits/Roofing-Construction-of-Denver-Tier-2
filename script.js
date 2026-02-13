// ===== Navigation =====
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
const navbar    = document.getElementById('navbar');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.pageYOffset > 100);
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// ===== Google Maps =====
function initMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl) return;

    const lat = parseFloat(mapEl.dataset.lat || '39.7468171');
    const lng = parseFloat(mapEl.dataset.lng || '-104.9937935');
    const center = { lat, lng };

    if (typeof google !== 'undefined' && google.maps) {
        const map = new google.maps.Map(mapEl, {
            center, zoom: 15,
            styles: [{ featureType: 'all', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] }]
        });
        new google.maps.Marker({ position: center, map, title: 'Roofing Construction of Denver' });
    } else {
        // Fallback
        mapEl.innerHTML =
            '<div style="display:flex;align-items:center;justify-content:center;height:100%;' +
            'background:#f3f4f6;border-radius:12px;">' +
            '<a href="https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng +
            '" target="_blank" rel="noopener" style="color:#2563eb;text-decoration:none;padding:20px;font-weight:600;">' +
            '📍 Open in Google Maps</a></div>';
    }
}

if (document.getElementById('map')) {
    window.initMap = initMap;
    setTimeout(initMap, 150);
}

// ===== Chatbot Logic =====
const chatToggle = document.getElementById('chatToggle');
const chatWidget = document.getElementById('chatWidget');
const chatClose  = document.getElementById('chatClose');
const chatInput  = document.getElementById('chatInput');
const chatSend   = document.getElementById('chatSend');
const chatBody   = document.getElementById('chatBody');

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.add('active');
        chatToggle.style.display = 'none';
    });

    chatClose.addEventListener('click', () => {
        chatWidget.classList.remove('active');
        chatToggle.style.display = 'flex';
    });

    function addMessage(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message ' + type;
        msgDiv.innerHTML = '<p>' + text + '</p><span class="time">Just now</span>';
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleChat() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        addMessage(text, 'user');
        chatInput.value = '';

        // Simulate AI Response
        setTimeout(() => {
            const responses = [
                "Thanks for reaching out! A team member will reply shortly.",
                "We can definitely help with that. Could you leave your phone number?",
                "Our office hours are 8:00 AM - 5:00 PM. We'll get back to you then!",
                "That sounds like something we specialize in. Please check our services page for more info."
            ];
            const randomResp = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResp, 'bot');
        }, 1000);
    }

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChat(); });
}

// ===== Form Submission Simulation =====
window.handleFormSubmit = function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
        alert('Thank you! Your enquiry has been sent successfully. We will contact you soon.');
        e.target.reset();
        btn.innerText = originalText;
        btn.disabled = false;
    }, 1500);
};

// ===== Scroll Animations =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .service-card, .contact-method, .testimonial-card, .enquiry-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
});

window.addEventListener('load', () => { document.body.style.opacity = '1'; });
console.log('✅ Roofing Construction of Denver website loaded successfully!');