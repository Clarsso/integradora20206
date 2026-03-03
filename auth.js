import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Función global para cerrar sesión (disponible en botones onclick)
window.cerrarSesion = () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
};

export function checarSesion(redigirSiNoHayUser = false) {
    onAuthStateChanged(auth, (user) => {
        const navRight = document.getElementById("navRight");
        
        if (user) {
            console.log("Usuario detectado:", user.email);
            if (navRight) {
                navRight.innerHTML = `
                    <span style="margin-right:15px; color:#00d4ff;">● ${user.email.split('@')[0]}</span>
                    <button onclick="cerrarSesion()" style="background:transparent; border:1px solid #ff4d4d; color:#ff4d4d; padding:5px 15px; border-radius:15px; cursor:pointer;">Salir</button>
                `;
            }
        } else {
            console.log("No hay usuario logueado");
            if (redigirSiNoHayUser) {
                window.location.href = "index.html";
            }
            if (navRight) {
                navRight.innerHTML = `<button onclick="window.location.href='index.html'" style="background:#00d4ff; color:black; border:none; padding:8px 20px; border-radius:20px; font-weight:bold; cursor:pointer;">Iniciar Sesión</button>`;
            }
        }
    });
}