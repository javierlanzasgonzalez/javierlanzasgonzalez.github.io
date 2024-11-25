function toggleMenu() {
    document.getElementById("dropdown-menu").classList.toggle("active");
}

let lastScrollTop = 0;
const header = document.getElementById("header");
const backgroundContainer = document.getElementById("background-container"); // Contenedor del fondo dinámico
let isScrollingToTarget = false; // Bandera para controlar el desplazamiento intencional

// Manejo de mostrar/ocultar el header según el scroll
window.addEventListener("scroll", () => {
    if (isScrollingToTarget) return; // Si estamos desplazándonos intencionalmente, no ocultar el header

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Si desplazamos hacia abajo, ocultamos el header
        header.style.transform = "translateY(-100%)";
    } else {
        // Si desplazamos hacia arriba, mostramos el header
        header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
});

// Imágenes de fondo dinámicas para cada tarjeta
const backgrounds = {
    airport1: 'url("./img/imagen1.jpg")',
    airport2: 'url("./img/imagen2.jpg")',
    airport3: 'url("./img/imagen3.jpg")',
    airport4: 'url("./img/imagen4.jpg")',
    airport5: 'url("./img/imagen5.jpg")',
    airport6: 'url("./img/imagen6.jpg")'
    // Agrega más imágenes según sea necesario
};

// Configuración del IntersectionObserver
const options = {
    root: null, // Observa en el viewport
    threshold: 0.5 // Cambia cuando el 50% de la tarjeta es visible
};

// Función para cambiar el fondo dinámico
function changeBackground(entry) {
    const cardId = entry.target.id; // Obtén el ID de la tarjeta
    if (backgrounds[cardId]) {
        backgroundContainer.style.backgroundImage = backgrounds[cardId]; // Cambia el fondo
    }
}

// Crear el IntersectionObserver para las tarjetas
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            changeBackground(entry); // Cambia el fondo cuando la tarjeta es visible
        }
    });
}, options);

// Observar todas las tarjetas
document.querySelectorAll('.airport-card').forEach((card) => {
    observer.observe(card);
});

// Manejo del desplazamiento suave y centrado con compensación del header
const headerHeight = header.offsetHeight; // Altura del header fijo
const additionalMargin = 0; // Margen adicional arriba de la tarjeta

// Función para desplazar hacia un objetivo con la misma lógica
function scrollToTarget(targetId) {
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return; // Si el objetivo no existe, no hacer nada

    const offsetPosition = targetElement.offsetTop - headerHeight - additionalMargin;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });

    // Opcional: resaltar temporalmente la tarjeta
    targetElement.style.transition = "box-shadow 0.3s ease";
    targetElement.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.8)";
    setTimeout(() => {
        targetElement.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    }, 1500); // Eliminar el efecto después de 1.5 segundos
}

// Configurar clics en el menú desplegable
document.querySelectorAll('.dropdown-menu a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace

        const targetId = anchor.getAttribute('href').substring(1); // Obtiene el id de destino
        document.getElementById("dropdown-menu").classList.remove("active"); // Cierra el menú desplegable

        isScrollingToTarget = true; // Activa la bandera para indicar que estamos desplazándonos intencionalmente
        scrollToTarget(targetId); // Usa la función para desplazarse

        // Desactiva la bandera después de que termine el desplazamiento
        setTimeout(() => {
            isScrollingToTarget = false;
        }, 1000); // Tiempo suficiente para que el desplazamiento suave termine
    });
});

// Configurar clic en el botón "Explorar Aeropuertos"
document.getElementById('explore-btn').addEventListener('click', (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del enlace

    isScrollingToTarget = true; // Activa la bandera para indicar que estamos desplazándonos intencionalmente
    scrollToTarget('airport1'); // Usa la función para desplazarse al primer aeropuerto

    // Desactiva la bandera después de que termine el desplazamiento
    setTimeout(() => {
        isScrollingToTarget = false;
    }, 1000); // Tiempo suficiente para que el desplazamiento suave termine
});

// Obtener el botón
const toTopBtn = document.getElementById("toTopBtn");

// Mostrar el botón al hacer scroll hacia abajo
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        toTopBtn.style.display = "flex"; // Muestra el botón
    } else {
        toTopBtn.style.display = "none"; // Oculta el botón
    }
});

// Ir al inicio al hacer clic en el botón
toTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Desplazamiento suave
    });
});