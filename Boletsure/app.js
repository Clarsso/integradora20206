const eventos = [
    { id: "rockfest", nombre: "RockFest 2026", precio: 1200, img: "🎸", tipo: "concierto" },
    { id: "fcjuarez", nombre: "Bravos vs América", precio: 800, img: "⚽", tipo: "futbol" },
    { id: "drama", nombre: "Hamlet", precio: 500, img: "🎭", tipo: "teatro" }
];


const container = document.getElementById("eventosContainer");

eventos.forEach(evt => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="card-icon">${evt.img}</div>
        <h3>${evt.nombre}</h3>
        <p>Desde <strong>$${evt.precio} MXN</strong></p>
        <button onclick='irAEstadio(${JSON.stringify(evt)})'>Comprar Boletos</button>
    `;
    container.appendChild(card);
});

function irAEstadio(evento) {
    localStorage.setItem("eventoSeleccionado", JSON.stringify(evento));
    window.location.href = "estadio.html";
}

