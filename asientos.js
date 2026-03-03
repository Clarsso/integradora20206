import { db } from "./firebase-config.js";
import { checarSesion } from "./auth.js";
import { doc, onSnapshot, updateDoc, arrayUnion, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

checarSesion(true); // Redirige si no hay login

const container = document.getElementById("seatsContainer");
const buyBtn = document.getElementById("buyBtn");
const evento = JSON.parse(localStorage.getItem("eventoSeleccionado"));
const zona = localStorage.getItem("zonaSeleccionada");
const precio = parseFloat(localStorage.getItem("precioFinal"));

const docId = `${evento.id}_${zona}`;
document.getElementById("tituloEvento").textContent = `${evento.nombre} - ${zona}`;

// Escuchar cambios en Firestore
onSnapshot(doc(db, "asientos", docId), (snap) => {
    const ocupados = snap.exists() ? snap.data().ocupados : [];
    if (!snap.exists()) setDoc(doc(db, "asientos", docId), { ocupados: [] });
    
    renderizarAsientos(ocupados);
});

function renderizarAsientos(ocupados) {
    container.innerHTML = ""; // Limpiar
    for (let i = 1; i <= 60; i++) {
        const seat = document.createElement("div");
        const estaOcupado = ocupados.includes(i);
        
        seat.className = `seat ${estaOcupado ? 'occupied' : 'available'}`;
        seat.innerText = i; // Número de asiento para que no se vea vacío
        
        if (!estaOcupado) {
            seat.onclick = () => {
                seat.classList.toggle("selected");
                actualizarTotales();
            };
        }
        container.appendChild(seat);
    }
}

function actualizarTotales() {
    const seleccionados = document.querySelectorAll(".seat.selected").length;
    document.getElementById("count").textContent = seleccionados;
    document.getElementById("total").textContent = `$${(seleccionados * precio).toLocaleString()}`;
}

buyBtn.onclick = async () => {
    const sel = [...document.querySelectorAll(".seat.selected")].map(s => parseInt(s.innerText));
    if (sel.length === 0) return alert("Selecciona tus asientos");

    try {
        await updateDoc(doc(db, "asientos", docId), { ocupados: arrayUnion(...sel) });
        alert("¡Compra exitosa!");
        window.location.href = "home.html";
    } catch (e) {
        console.error(e);
    }
};