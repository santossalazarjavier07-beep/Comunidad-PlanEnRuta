/* =========================================================
   PLANENRUTA — TÉRMINOS Y CONDICIONES (modal + acordeón)
   Contenido fijo, solo se mejora la presentación visual.
   ========================================================= */

const TERMINOS_DATA = [
    {
        icono: "🪪",
        titulo: "Documentación",
        texto: "Todos los pasajeros deben llevar su DNI, pasaporte o carnet de extranjería a la excursión (adultos y niños)."
    },
    {
        icono: "📅",
        titulo: "Cambios y cancelaciones",
        texto: "Los cambios de fecha o cancelaciones, sea cual sea el motivo, son con 96 horas de anticipación, si la agencia así lo permite. Consultar el costo que deberá asumir por penalidad, ya que esto afecta gastos logísticos y administrativos que fueron organizados con anticipación y que, al no asistir, la agencia debe asumirlos.\n\nSolo permitimos un cambio.\n\nNo se realizan devoluciones de dinero."
    },
    {
        icono: "🩺",
        titulo: "Motivos de salud",
        texto: "Solo si un participante no puede viajar y el motivo es SALUD, deberá obligatoriamente presentar una constancia médica firmada por un profesional de un centro médico, dirigida a la agencia de viajes.\n\nDe esta manera se evaluará su caso y se indicarán las condiciones y costos que tendrá que pagar como penalidad por gastos generados debido a su inasistencia.\n\nSe podrá reprogramar solo si la agencia así lo permite o lo considera, pero no se realizan devoluciones."
    },
    {
        icono: "🧒",
        titulo: "Menores de edad",
        texto: "En Full Days, los menores de 4 años no pagan y deberán viajar cargados por sus padres.\n\nConsultar los costos de ingreso a lugares que sí exijan el pago de entrada.\n\nLos niños son considerados desde los 5 hasta los 12 años."
    },
    {
        icono: "⏰",
        titulo: "Horarios de embarque",
        texto: "El tiempo de espera en el punto de partida será de un promedio de 5 a 10 minutos como máximo mientras abordan la movilidad.\n\nSi el participante no llega a la hora pactada, el bus se retira y no hay lugar a reclamo ni devolución, así el participante indique que está en el lugar o que está llegando a unos minutos.\n\nPor ello, se recomienda presentarse 15 minutos antes de la hora indicada.\n\nEl bus no realizará ninguna parada en la ruta."
    },
    {
        icono: "🔄",
        titulo: "Cambio de participante",
        texto: "En caso de que uno de los participantes no pueda viajar, puede enviar a otra persona en su reemplazo, informando a la agencia de turismo un día antes.\n\nEn caso de inasistencia, se pierde el 100% de lo abonado, sin lugar a reclamo o motivo. Asimismo, el encargado del grupo deberá asumir el saldo restante."
    },
    {
        icono: "💺",
        titulo: "Asignación de asientos",
        texto: "Los asientos son por orden de llegada. No son numerados ni se separan.\n\nEn caso viaje con un niño, niña o un adulto mayor, deberá informar previamente a su asesor al momento de generar su reserva, para hacer una excepción y brindarle la opción de viajar juntos.\n\nSin embargo, el orden de los asientos es aleatorio y puede ser adelante, medio o atrás, según el orden en que suban los viajeros y en caso haya disponibilidad, ya que es un tour compartido con otros turistas quienes también pueden viajar con adultos, niños, etc.\n\nTomar en cuenta los paraderos de abordo de inicio y los paraderos en ruta."
    },
    {
        icono: "🏨",
        titulo: "Hospedaje",
        texto: "Para los tours que incluyen hospedaje, los paquetes son no reembolsables.\n\nUna vez realizada la reserva, no realizamos cancelaciones de habitaciones, devoluciones ni postergaciones por ningún motivo.\n\nNos basamos en las políticas de estos establecimientos, que tampoco realizan devoluciones de dinero.\n\nAsimismo, esta información se detalla en el itinerario del viaje."
    },
    {
        icono: "📞",
        titulo: "Comunicación previa al viaje",
        texto: "El guía de turismo se comunica con el pasajero un día antes, ya sea por WhatsApp o llamada, asegurándose de recibir respuesta e intentando llamar hasta en 3 oportunidades.\n\nDe no ser así, el participante deberá comunicar a la agencia de viajes por el mismo medio donde reservó sus pasajes.\n\nLlegado el día del viaje, en caso el pasajero no se presente a la hora coordinada, el guía llamará hasta 3 veces al turista.\n\nEn caso de no obtener respuesta, el guía tiene la potestad de retirarse del lugar cumpliendo los horarios establecidos, sin lugar a reclamo."
    }
];

function ensureTerminosModal() {
    if (document.getElementById("terminosModal")) return;

    const modal = document.createElement("div");
    modal.id = "terminosModal";
    modal.className = "cotizador-overlay terminos-overlay";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Términos y condiciones");

    const items = TERMINOS_DATA.map((t, i) => `
        <div class="termino-item">
            <button type="button" class="termino-head" data-index="${i}">
                <span class="termino-num">${String(i + 1).padStart(2, "0")}</span>
                <span class="termino-icon">${t.icono}</span>
                <span class="termino-titulo">${t.titulo}</span>
                <span class="termino-chevron">▾</span>
            </button>
            <div class="termino-body">
                <div class="termino-body-inner">${t.texto.split("\n\n").map(p => `<p>${p}</p>`).join("")}</div>
            </div>
        </div>
    `).join("");

    modal.innerHTML = `
        <div class="cotizador-box terminos-box">
            <button type="button" class="cotizador-close" id="terminosClose" aria-label="Cerrar términos y condiciones">×</button>
            <div class="terminos-body">
                <span class="eyebrow">PLANENRUTA</span>
                <h3>Términos y condiciones</h3>
                <p class="terminos-intro">Antes de reservar, revisa nuestras políticas de viaje. Toca cada punto para ver el detalle.</p>

                <div class="terminos-accordion">
                    ${items}
                </div>

                <div class="terminos-footer-actions">
                    <button type="button" class="btn btn-primary" id="terminosVolver">← Volver</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const close = () => {
        modal.classList.remove("open");
        document.body.classList.remove("cotizador-open");
    };
    modal.querySelector("#terminosClose").addEventListener("click", close);
    modal.querySelector("#terminosVolver").addEventListener("click", close);
    modal.addEventListener("click", e => { if (e.target === modal) close(); });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.classList.contains("open")) close();
    });

    modal.querySelectorAll(".termino-head").forEach(head => {
        head.addEventListener("click", () => {
            const item = head.closest(".termino-item");
            const wasOpen = item.classList.contains("open");
            modal.querySelectorAll(".termino-item").forEach(i => i.classList.remove("open"));
            if (!wasOpen) item.classList.add("open");
        });
    });
}

function abrirTerminos() {
    ensureTerminosModal();
    const modal = document.getElementById("terminosModal");
    modal.classList.add("open");
    document.body.classList.add("cotizador-open");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-terminos]").forEach(el => {
        el.addEventListener("click", e => {
            e.preventDefault();
            abrirTerminos();
        });
    });
});
