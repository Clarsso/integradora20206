const svgEstadio = document.getElementById("stadium-svg");
const evento = JSON.parse(localStorage.getItem("eventoSeleccionado"));

if (!evento) window.location.href = "home.html";

// Dibujar el escenario según el tipo de evento
const dibujarEscenario = () => {
    let contenido = "";
    
    if (evento.tipo === "concierto") {
        // Escenario de concierto al frente
        contenido = `<rect x="250" y="180" width="300" height="100" fill="#333" stroke="#var(--primary)" stroke-width="3"/>
                     <text x="350" y="240" fill="white" font-weight="bold">ESCENARIO 🎸</text>`;
    } else if (evento.tipo === "futbol") {
        // Cancha de futbol central
        contenido = `<rect x="250" y="175" width="300" height="150" fill="#2e7d32" stroke="#fff" stroke-width="2"/>
                     <circle cx="400" cy="250" r="30" fill="none" stroke="white" />
                     <line x1="400" y1="175" x2="400" y2="325" stroke="white" />`;
    } else if (evento.tipo === "teatro") {
        // Escenario de teatro con "telón"
        contenido = `<path d="M250,175 L550,175 L550,300 L250,300 Z" fill="#b71c1c" />
                     <text x="360" y="245" fill="white">ESCENARIO 🎭</text>`;
    }

    // Insertar el diseño dentro del SVG (antes de las zonas)
    document.getElementById("center-area").innerHTML = contenido;
};

document.querySelectorAll(".zona").forEach(z => {
    z.addEventListener("click", () => {
        const mult = z.id === "SOMBRA_1" ? 1.5 : 1.0;
        localStorage.setItem("zonaSeleccionada", z.id);
        localStorage.setItem("precioFinal", evento.precio * mult);
        window.location.href = "asientos.html";
    });
});

dibujarEscenario();