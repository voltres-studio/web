// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Scroll to top on page load/reload
    window.scrollTo(0, 0);

    // Loader
    setTimeout(function() {
        const loader = document.querySelector(".loader");
        if (loader) {
            loader.classList.add("hidden");
        }
    }, 1500);

    // Sticky Navigation & Back to Top Button
    const navbar = document.getElementById("navbar");
    const backToTop = document.querySelector(".back-to-top");
    
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            if (navbar) navbar.classList.add("scrolled");
            if (backToTop) backToTop.classList.add("show");
        } else {
            if (navbar) navbar.classList.remove("scrolled");
            if (backToTop) backToTop.classList.remove("show");
        }
    });
    
    // Hamburger Menu
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function() {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
    }
    
    // Close mobile menu when clicking a nav link
    document.querySelectorAll(".nav-links li a").forEach(link => {
        link.addEventListener("click", function() {
            if (hamburger && navLinks) {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            }
        });
    });
    
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", function() {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");
                
                const filterValue = this.getAttribute("data-filter");
                
                portfolioItems.forEach(item => {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease'; // Add transition for filtering
                    if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                        item.style.display = "block";
                        // Use a tiny timeout to allow display:block to take effect before animating opacity/transform
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "scale(1)";
                        }, 10);
                    } else {
                        item.style.opacity = "0";
                        item.style.transform = "scale(0.95)";
                        setTimeout(() => {
                            item.style.display = "none";
                        }, 300); // Match transition duration
                    }
                });
            });
        });
    }
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".testimonial-prev");
    const nextBtn = document.querySelector(".testimonial-next");
    let currentSlide = 0;
    let testimonialInterval;

    if (testimonialSlides.length > 0 && dots.length > 0) { // Asegurarse que dots existe
        function showSlide(index) {
            testimonialSlides.forEach(slide => slide.classList.remove("active"));
            dots.forEach(dot => dot.classList.remove("active"));
            
            testimonialSlides[index].classList.add("active");
            dots[index].classList.add("active");
        }
        
        function nextSlideFunc() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }
        
        function prevSlideFunc() {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        }

        function startSlider() {
            testimonialInterval = setInterval(nextSlideFunc, 7000); 
        }

        function resetSliderInterval() {
            clearInterval(testimonialInterval);
            startSlider();
        }
        
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener("click", () => {
                nextSlideFunc();
                resetSliderInterval();
            });
            prevBtn.addEventListener("click", () => {
                prevSlideFunc();
                resetSliderInterval();
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener("click", function() {
                currentSlide = index;
                showSlide(currentSlide);
                resetSliderInterval();
            });
        });
        
        showSlide(currentSlide); 
        startSlider(); 
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Permitir que los enlaces mailto: funcionen por defecto
            if (this.getAttribute('href').startsWith('mailto:')) {
                return;
            }
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === "#") return; 
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = navbar ? navbar.offsetHeight : 70; 
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    if (backToTop) {
        backToTop.addEventListener("click", function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const enviarContactoBtn = document.getElementById('enviarContacto');
    
    if (contactForm && enviarContactoBtn) {
        enviarContactoBtn.addEventListener('click', function() {
            // Validar el formulario
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }
            
            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value || 'No proporcionado';
            const empresa = document.getElementById('empresa').value || 'No proporcionada';
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Construir el cuerpo del correo
            const asunto = `Consulta desde la web Voltres - ${servicio}`;
            const cuerpoMensaje = 
`Hola Voltres,

Me gustaría solicitar información sobre sus servicios. Estos son mis datos:

Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Empresa/Negocio: ${empresa}
Servicio de interés: ${servicio}

Mensaje:
${mensaje}

Saludos.`;
            
            // Codificar los parámetros para URL
            const emailParams = encodeURIComponent(cuerpoMensaje);
            const asuntoParams = encodeURIComponent(asunto);
            
            // Crear y abrir el enlace mailto
            const mailtoLink = `mailto:infovoltres@gmail.com?subject=${asuntoParams}&body=${emailParams}`;
            window.location.href = mailtoLink;
        });
    }

    // Acordeón para FAQs en la sección de precios
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('.accordion-icon i');
            
            if (header && content && icon) {
                header.addEventListener('click', () => {
                    // Cerrar todos los otros elementos
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            otherItem.querySelector('.accordion-content').style.maxHeight = null;
                            const otherIcon = otherItem.querySelector('.accordion-icon i');
                            if (otherIcon) {
                                otherIcon.classList.remove('fa-minus');
                                otherIcon.classList.add('fa-plus');
                            }
                        }
                    });
                    
                    // Alternar el elemento actual
                    item.classList.toggle('active');
                    
                    if (item.classList.contains('active')) {
                        content.style.maxHeight = content.scrollHeight + "px";
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else {
                        content.style.maxHeight = null;
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                });
            }
        });
    }
    
    // Animation on scroll using Intersection Observer
    const animatedElements = document.querySelectorAll(".service-card, .process-item, .featured-content, .featured-image, .contact-info, .contact-form-container, .hero-content, .hero-image");
    
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("aos-animate"); 
                    observerInstance.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1 }); 

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        animatedElements.forEach(el => el.classList.add("aos-animate"));
    }

    // Stats Counter Animation
    const statsSection = document.querySelector(".stats");
    const statNumbers = document.querySelectorAll(".stat-number");

    function animateCounter(element, target) {
        let current = 0;
        const originalText = element.textContent; // Guardar texto original para sufijos
        const suffix = originalText.replace(/[0-9]/g, ''); // Extraer sufijo como '+' o '%'
        const increment = target / 100;
        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target + suffix;
            }
        };
        requestAnimationFrame(updateCount);
    }

    if (statsSection && statNumbers.length > 0) {
        let CouterObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 
        };

        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(numElement => {
                        const targetValue = parseInt(numElement.textContent.replace(/\D/g, '')); // Extraer solo números
                        if (!isNaN(targetValue) && !numElement.dataset.animated) { 
                            animateCounter(numElement, targetValue);
                            numElement.dataset.animated = "true";
                        }
                    });
                    observer.unobserve(statsSection); 
                }
            });
        }, CouterObserverOptions);
        statsObserver.observe(statsSection);
    }

});