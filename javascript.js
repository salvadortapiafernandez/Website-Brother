// ===========================================
// PUERTO LEGAL - INTERACTIVIDAD Y EFECTOS (CORREGIDO)
// ===========================================

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. EFECTO TYPEWRITER (Máquina de Escribir) ---
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        const textToWrite = "Puerto Legal - Estudio Jurídico";
        let charIndex = 0;
        heroTitle.textContent = ''; // Limpiar el título

        function typewriter() {
            if (charIndex < textToWrite.length) {
                heroTitle.textContent += textToWrite.charAt(charIndex);
                charIndex++;
                setTimeout(typewriter, 100); // Velocidad de escritura
            }
        }
        typewriter(); // Iniciar el efecto
    }

    // --- 2. MENÚ STICKY Y SECCIÓN ACTIVA ---
    const navbar = document.getElementById('mainNavbar');
    // Asegurarse de que la navbar existe antes de continuar
    if (navbar) {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const sections = document.querySelectorAll('section[id]');

        function updateActiveNavLink() {
            let current = '';
            // Ajuste: usar offsetTop relativo al documento y compensar altura del navbar
            const scrollPosition = window.scrollY + navbar.offsetHeight + 20;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').substring(1); // Quita el '#'
                if (href === current) {
                    link.classList.add('active');
                }
            });
        }

        function handleNavbarScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
            updateActiveNavLink();
        }

        window.addEventListener('scroll', handleNavbarScroll);
        window.addEventListener('load', handleNavbarScroll); // Para el estado inicial
    }

    // --- 3. ANIMACIONES SCROLL REVEAL (FADE-UP) ---
    const fadeElements = document.querySelectorAll('.fade-up');

    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            // Si el elemento está visible en la pantalla
            if (elementTop < windowHeight - 80 && elementBottom > 0) {
                element.classList.add('active');
            }
            // Opcional: quitar la clase si se desea que la animación se repita al hacer scroll hacia arriba
            // else {
            //     element.classList.remove('active');
            // }
        });
    }

    // Comprobar al cargar y al hacer scroll
    window.addEventListener('scroll', checkFade);
    window.addEventListener('load', checkFade);
    // También comprobar después de un pequeño retraso por si hay elementos que cargan tarde
    setTimeout(checkFade, 200);

    // --- 4. CONTADOR DE ESTADÍSTICAS (ANIMADO) ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let animationStarted = false; // Para que solo se ejecute una vez

    function animateStats() {
        // Si la animación ya empezó, no hacer nada
        if (animationStarted) return;

        const statsSection = document.getElementById('estadisticas');
        if (statsSection) {
            const sectionTop = statsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // Si la sección de estadísticas está visible
            if (sectionTop < windowHeight - 100) {
                animationStarted = true; // Marcar como iniciada

                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10);
                    if (isNaN(target)) return; // Salir si no es un número válido

                    let current = 0;
                    const increment = target / 50; // Dividir en 50 pasos para una animación suave
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target; // Asegurar que llegue al valor exacto
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current);
                        }
                    }, 20); // Velocidad de la animación
                });
            }
        }
    }

    // Escuchar el scroll para activar el contador
    window.addEventListener('scroll', animateStats);
    // También verificar al cargar la página por si ya está visible
    window.addEventListener('load', animateStats);

    // --- 5. MANEJO DEL FORMULARIO DE CONTACTO (PREVENIR ENVÍO REAL) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita que la página se recargue

            // Aquí puedes agregar la lógica para enviar los datos a un servidor
            // Por ahora, solo mostraremos un mensaje en la consola y limpiaremos el formulario
            console.log('Formulario enviado (simulación). Datos:', {
                telefono: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                mensaje: this.querySelector('textarea').value
            });

            // Opcional: Mostrar un mensaje de éxito al usuario
            alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');

            // Limpiar el formulario
            this.reset();
        });
    }

}); // Fin de DOMContentLoaded