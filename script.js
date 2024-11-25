// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 3000);
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    // Top Banner Rotation
    const banner = document.getElementById('top-banner');
    const bannerContent = banner.querySelector('.banner-content');
    const bannerItems = banner.querySelectorAll('.banner-item');
    let currentBanner = 0;

    function rotateBanner() {
        currentBanner = (currentBanner + 1) % bannerItems.length;
        bannerContent.style.transform = `translateX(-${currentBanner * 100}%)`;
    }

    setInterval(rotateBanner, 5000);

    // About Section Swiper
    new Swiper('.about-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Service Modal
    const serviceModal = document.createElement('div');
    serviceModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
    serviceModal.innerHTML = `
        <div class="bg-white p-8 rounded-lg max-w-md w-full relative">
            <button id="closeModal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl" aria-label="Cerrar modal">&times;</button>
            <h2 id="modalTitle" class="text-2xl font-bold mb-4"></h2>
            <p id="modalDescription" class="mb-4"></p>
            <ul id="modalFeatures" class="list-disc pl-5 mb-4"></ul>
            <p id="modalPrice" class="font-bold mb-4"></p>
        </div>
    `;
    document.body.appendChild(serviceModal);

    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalPrice = document.getElementById('modalPrice');
    const closeModal = document.getElementById('closeModal');
    const viewServiceButtons = document.querySelectorAll('.view-service');

    const serviceDetails = {
        wash: {
            title: "Lavado y Encerado Premium",
            description: "Nuestro servicio de Lavado y Encerado Premium está diseñado para dar a tu vehículo un acabado de calidad de exhibición.",
            features: [
                "Lavado exterior minucioso",
                "Tratamiento con arcilla",
                "Aplicación de cera de alta calidad",
                "Limpieza de llantas y rines",
                "Aspirado interior y limpieza de superficies"
            ],
            price: "Desde $499 MXN"
        },
        interior: {
            title: "Detallado Interior",
            description: "Nuestro servicio de Detallado Interior limpia profundamente y refresca el interior de tu vehículo.",
            features: [
                "Aspirado minucioso",
                "Limpieza a vapor de tapicería",
                "Tratamiento de cuero (si aplica)",
                "Limpieza de tablero y consola",
                "Limpieza de ventanas y espejos"
            ],
            price: "Desde $899 MXN"
        },
        paint: {
            title: "Corrección de Pintura",
            description: "Nuestro servicio de Corrección de Pintura elimina imperfecciones y restaura la pintura de tu vehículo a su gloria original.",
            features: [
                "Proceso de pulido en múltiples etapas",
                "Eliminación de remolinos y rayones",
                "Medición de profundidad de pintura",
                "Acabado de alto brillo",
                "Aplicación de sellador protector"
            ],
            price: "Desde $1,999 MXN"
        },
        ceramic: {
            title: "Recubrimiento Cerámico",
            description: "Nuestro servicio de Recubrimiento Cerámico proporciona una protección duradera y un brillo inigualable para tu vehículo.",
            features: [
                "Descontaminación de pintura",
                "Corrección de pintura de una etapa",
                "Aplicación de recubrimiento cerámico profesional",
                "Propiedades hidrofóbicas",
                "Protección UV"
            ],
            price: "Desde $2,999 MXN"
        }
    };

    viewServiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const service = button.getAttribute('data-service');
            const details = serviceDetails[service];
            modalTitle.textContent = details.title;
            modalDescription.textContent = details.description;
            modalFeatures.innerHTML = details.features.map(feature => `<li>${feature}</li>`).join('');
            modalPrice.textContent = details.price;
            serviceModal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => {
        serviceModal.classList.add('hidden');
    });

    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gallery Modal
    const galleryModal = document.createElement('div');
    galleryModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
    galleryModal.innerHTML = `
        <div class="bg-white p-8 rounded-lg max-w-4xl w-full relative">
            <button id="closeGalleryModal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl" aria-label="Cerrar galería modal">&times;</button>
            <h2 id="galleryModalTitle" class="text-2xl font-bold mb-4"></h2>
            <div id="galleryModalImages" class="swiper gallery-swiper mb-4">
                <div class="swiper-wrapper"></div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
            <p id="galleryModalDescription" class="mb-4"></p>
        </div>
    `;
    document.body.appendChild(galleryModal);

    const galleryModalTitle = document.getElementById('galleryModalTitle');
    const galleryModalImages = document.getElementById('galleryModalImages');
    const galleryModalDescription = document.getElementById('galleryModalDescription');
    const closeGalleryModal = document.getElementById('closeGalleryModal');
    const viewWorkButtons = document.querySelectorAll('.view-work');

    viewWorkButtons.forEach(button => {
        button.addEventListener('click', () => {
            const galleryItem = button.closest('.gallery-item');
            const images = JSON.parse(galleryItem.getAttribute('data-images'));
            const description = galleryItem.getAttribute('data-description');
            const title = galleryItem.querySelector('h3').textContent;

            galleryModalImages.querySelector('.swiper-wrapper').innerHTML = images.map(image => `
                <div class="swiper-slide">
                    <img src="${image}" alt="${title}" class="w-full h-auto">
                </div>
            `).join('');

            galleryModalTitle.textContent = title;
            galleryModalDescription.textContent = description;
            galleryModal.classList.remove('hidden');

            new Swiper('.gallery-swiper', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        });
    });

    closeGalleryModal.addEventListener('click', () => {
        galleryModal.classList.add('hidden');
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');

            answer.classList.toggle('active');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    // Booking Modal y Notificación
    const bookNowBtn = document.getElementById('bookNowBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeBookingModal = bookingModal.querySelector('.close');
    const bookNowNotification = document.getElementById('bookNowNotification');

    let notificationTimeout;

    function showNotification() {
        bookNowNotification.classList.remove('opacity-0');
        bookNowNotification.classList.add('opacity-100');
        
        clearTimeout(notificationTimeout);
        notificationTimeout = setTimeout(() => {
            bookNowNotification.classList.remove('opacity-100');
            bookNowNotification.classList.add('opacity-0');
        }, 3000);
    }

    function hideNotification() {
        bookNowNotification.classList.remove('opacity-100');
        bookNowNotification.classList.add('opacity-0');
    }

    bookNowBtn.addEventListener('mouseenter', showNotification);
    bookNowBtn.addEventListener('mouseleave', hideNotification);

    bookNowBtn.addEventListener('click', () => {
        bookingModal.style.display = 'block';
        hideNotification();
    });

    closeBookingModal.addEventListener('click', () => {
        bookingModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == bookingModal) {
            bookingModal.style.display = 'none';
        }
    });

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
    });

    console.log('Script cargado y ejecutándose');
});