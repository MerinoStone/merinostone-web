document.addEventListener("DOMContentLoaded", function() {
    
    // 1. INICIALIZAR LIBRERÍA DE ANIMACIONES (AOS)
    // Verificamos si la librería cargó correctamente antes de usarla
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // 2. VERIFICAR MEMORIA (LocalStorage - Lógica de Cliente)
    // Nota de Seguridad: Esta validación es visual. En un entorno de alta seguridad,
    // esto se debe validar por IP en el servidor (Backend).
    const accessGranted = localStorage.getItem("merinostone_access");
    const lockScreen = document.getElementById("tijuana-lock");

    if (accessGranted === "granted" && lockScreen) {
        lockScreen.style.display = "none";
    }

    // 3. INICIAR COMPARADORES DE IMÁGENES (Si existen en la página)
    initComparisons();
});

// --- FUNCIÓN 1: GATEKEEPER (VALIDACIÓN DE ZONA) ---
function validarZona(esLocal) {
    const lockScreen = document.getElementById("tijuana-lock");
    
    if (esLocal) {
        // Usuario confirma ubicación
        localStorage.setItem("merinostone_access", "granted");
        
        if(lockScreen) {
            lockScreen.style.opacity = "0";
            setTimeout(() => {
                lockScreen.style.display = "none";
            }, 500);
        }
    } else {
        // Usuario fuera de zona
        alert("Lo sentimos. Por el momento solo cubrimos Tijuana, Rosarito, Tecate y Ensenada.");
        // Redirección
        window.location.href = "https://www.google.com"; 
    }
}

// --- FUNCIÓN 2: WHATSAPP SEGURO ---
// PARCHE DE SEGURIDAD: Reverse Tabnabbing corregido.
function contactarVendedor(producto) {
    const telefono = "5216646738412"; 
    const mensaje = `Hola Merinostone. Mi proyecto es en Baja California y me interesa cotizar: ${producto}.`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    // CORRECCIÓN DE SEGURIDAD: 
    // Se agregan 'noopener,noreferrer' para evitar que la página nueva tenga control sobre tu sitio.
    window.open(url, '_blank', 'noopener,noreferrer');
}

// --- FUNCIÓN 3: COMPARADOR DE IMÁGENES ---
function initComparisons() {
    var x, i;
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        compareImages(x[i]);
    }

    function compareImages(img) {
        var slider, clicked = 0, w, h;
        w = img.offsetWidth;
        h = img.offsetHeight;
        img.style.width = (w / 2) + "px";
        
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        img.parentElement.insertBefore(slider, img);
        
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        
        slider.addEventListener("mousedown", slideReady);
        window.addEventListener("mouseup", slideFinish);
        slider.addEventListener("touchstart", slideReady);
        window.addEventListener("touchend", slideFinish);

        function slideReady(e) {
            e.preventDefault();
            clicked = 1;
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }
        function slideFinish() {
            clicked = 0;
        }
        function slideMove(e) {
            var pos;
            if (clicked == 0) return false;
            pos = getCursorPos(e);
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            slide(pos);
        }
        function getCursorPos(e) {
            var a, x = 0;
            e = (e.changedTouches) ? e.changedTouches[0] : e;
            a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            x = x - window.pageXOffset;
            return x;
        }
        function slide(x) {
            img.style.width = x + "px";
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }
}

// --- FUNCIÓN 4: MENÚ DESPLEGABLE DE CONTACTO ---
function toggleContacto() {
    var dropdown = document.getElementById("contactoDropdown");
    if (dropdown) {
        dropdown.classList.toggle("show");
    }
}

// Cerrar el menú si se hace clic fuera
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// --- FUNCIÓN 5: BOTÓN VOLVER ARRIBA ---
let mybutton = document.getElementById("myBtn");

// Solo activamos el evento si el botón existe en la página actual
if (mybutton) {
    window.onscroll = function() { scrollFunction() };
}

function scrollFunction() {
    if (!mybutton) return; // Seguridad extra
    
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}