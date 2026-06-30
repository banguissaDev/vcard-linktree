document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('visit-count');
    
    // We try to use a free global counter API to track total visits
    const namespace = 'univers_services_intl';
    const key = 'vcard_visits_count_v2';
    const baseCount = 1755;
    
    fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
        .then(response => response.json())
        .then(data => {
            if (data && data.count) {
                // Animate the counter
                animateValue(counterElement, 0, data.count + baseCount, 1500);
            } else {
                // Fallback
                fallbackCounter();
            }
        })
        .catch(error => {
            console.error('Error fetching global counter:', error);
            fallbackCounter();
        });

    function fallbackCounter() {
        let count = localStorage.getItem('vcard_visits_local_v2') || baseCount;
        count = parseInt(count) + 1;
        localStorage.setItem('vcard_visits_local_v2', count);
        counterElement.textContent = count;
    }

    // Nice little animation for the counter
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // --- Particle Animation Logic ---
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 25; // Number of particles

    if (particlesContainer) {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties for organic movement
            const size = Math.random() * 6 + 2; // size between 2px and 8px
            const posX = Math.random() * 100; // 0% to 100% width
            const posY = Math.random() * 100 + 20; // 20% to 120% height (to start slightly lower)
            const duration = Math.random() * 8 + 4; // 4s to 12s duration
            const delay = Math.random() * 5; // 0s to 5s initial delay
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // --- Global Background Particles Logic ---
    const bgParticlesContainer = document.getElementById('bg-particles-container');
    const bgParticleCount = 40; // Number of red particles for the background

    if (bgParticlesContainer) {
        for (let i = 0; i < bgParticleCount; i++) {
            const particle = document.createElement('div');
            // Adding 'red' class
            particle.classList.add('particle', 'red');
            
            // Random properties for organic movement
            const size = Math.random() * 8 + 3; // size between 3px and 11px
            const posX = Math.random() * 100; // 0% to 100% width
            const posY = Math.random() * 100 + 20; // 20% to 120% height (to start slightly lower)
            const duration = Math.random() * 12 + 6; // 6s to 18s duration
            const delay = Math.random() * 5; // 0s to 5s initial delay
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            bgParticlesContainer.appendChild(particle);
        }
    }
});
