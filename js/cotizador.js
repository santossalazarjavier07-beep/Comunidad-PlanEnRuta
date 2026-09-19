/* =========================================================
   PLANENRUTA — COTIZADOR DE TOURS
   Data individual por tour (imagen, precio, precio grupal,
   descripción, incluye/no incluye, ubicación) + modal dinámico
   que se adapta 100% al tour seleccionado.
   ========================================================= */

/* -------- 1. DATA DE CADA TOUR (edita aquí precios y textos) -------- */
const TOURS_DATA = {

    "vichaycocha": {
        nombre: "FULL DAY VICHAYCOCHA",
        tipo: "full-day",
        imagen: "img/tours/laguna-azulcocha.jpg",
        ubicacion: "Vichaycocha, Lima",
        duracion: "Full Day",
        fecha: "Salidas: sábados · Regreso el mismo día",
        precio: 118,          // precio individual "Desde"
        precioGrupal: 115,    // precio por persona en grupo (4+ pax)
        precioReserva: 50,    // adelanto para separar cupo (ajustable)
        descripcion: "Un recorrido de naturaleza andina que combina las Torres de Vichaycocha, la Laguna Azulcocha de aguas serenas y los Baños Termales de Collpa, a poco más de 4 horas de Lima. Ideal para una escapada de un solo día.",
        incluye: [
            "🚌 Transporte turístico privado",
            "🧭 Guía oficial de turismo",
            "♨️ Entrada a Baños Termales de Collpa",
            "📸 Fotos y videos grupales",
            "🩹 Botiquín de primeros auxilios"
        ],
        noIncluye: [
            "Alimentación (desayuno / almuerzo)",
            "Gastos personales",
            "Propinas"
        ],
        lugares: [
            "Torres de Vichaycocha",
            "Laguna Azulcocha",
            "Baños Termales de Collpa"
        ],
        embarque: [
            { hora: "09:30 p. m.", lugar: "Puente Nuevo" },
            { hora: "10:00 p. m.", lugar: "Plaza Norte" },
            { hora: "10:30 p. m.", lugar: "Puente Piedra" }
        ],
        itinerario: [
            { dia: null, items: [
                { hora: "04:00 a. m.", texto: "Llegada a Vichaycocha" },
                { hora: "06:30 a. m.", texto: "Torres de Vichaycocha" },
                { hora: "Picnic", texto: "Momento para compartir" },
                { hora: "10:00 a. m.", texto: "Laguna Azulcocha" },
                { hora: "01:30 p. m.", texto: "Almuerzo en Vichaycocha" },
                { hora: "04:00 p. m.", texto: "Baños Termales de Collpa" },
                { hora: "05:30 p. m.", texto: "Degustación de panes artesanales" },
                { hora: "09:30 p. m.", texto: "Llegada aproximada a Lima" }
            ] }
        ],
        mapaUrl: "https://www.google.com/maps?q=Vichaycocha,+Lima,+Per%C3%BA",
        pageUrl: "tour-vichaycocha.html"
    },

    "huancaya-vilca": {
        nombre: "HUANCAYA &amp; VILCA",
        tipo: "2d1n",
        imagen: "img/tours/cascadas-del-eden.jpg",
        ubicacion: "Reserva Paisajística Nor Yauyos Cochas",
        duracion: "2 días / 1 noche",
        fecha: "Salidas: viernes por la noche · Regreso: domingo",
        precio: 185,
        precioGrupal: 175,
        precioPaquete: 275,
        precioReserva: 80,
        descripcion: "Una experiencia entre lagunas turquesas, cascadas cristalinas, bosques andinos y pueblos que conservan la esencia del Nor Yauyos Cochas. Incluye paseo en bote y noche de fogata. ¿Buscas dónde dormir? Agrega hospedaje (habitación matrimonial) por S/ 90 más — paquete completo por S/ 275.",
        incluye: [
            "🚌 Transporte turístico privado",
            "🧭 Guía oficial de turismo",
            "🚣 Paseo en bote",
            "🔥 Noche de fogata",
            "🥂 Brindis de bienvenida",
            "📸 Fotos y videos grupales",
            "🩹 Botiquín de primeros auxilios"
        ],
        noIncluye: [
            "Gastos extras",
            "Actividades de aventura adicionales",
            "Hospedaje (opcional: habitación matrimonial S/90, paquete completo S/275)"
        ],
        lugares: [
            "Bosque del Amor",
            "Cascadas del Edén",
            "Lagunas Huallhua & Carhuayno",
            "Mirador Cantagallo"
        ],
        embarque: null,
        itinerario: [
            { dia: "Día 1 — Vilca & Bosque del Amor", items: [
                { hora: "06:30 AM", texto: "Llegada a Huancaya" },
                { hora: "08:00 AM", texto: "Salida hacia Vilca" },
                { hora: "09:30 AM", texto: "City tour en Vilca, Puente de Piedra" },
                { hora: "10:30 AM", texto: "Bosque del Amor, Cascadas del Edén y Laguna Papacocha" },
                { hora: "01:00 PM", texto: "Almuerzo" },
                { hora: "03:00 PM", texto: "Mirador Cantagallo" },
                { hora: "05:00 PM", texto: "Retorno a Huancaya" },
                { hora: "07:30 PM", texto: "Cena y fogata de confraternidad" }
            ] },
            { dia: "Día 2 — Lagunas & Cascadas", items: [
                { hora: "07:00 AM", texto: "Desayuno" },
                { hora: "08:30 AM", texto: "Trekking hacia Laguna Huallhua" },
                { hora: "09:30 AM", texto: "Paseo en bote" },
                { hora: "11:00 AM", texto: "Cascadas de Cabracancha y Puente Colonial Calicanto" },
                { hora: "01:30 PM", texto: "Almuerzo" },
                { hora: "03:00 PM", texto: "Retorno, Laguna Piquecocha y degustación de productos artesanales" },
                { hora: "10:00 PM", texto: "Llegada aproximada a Lima" }
            ] }
        ],
        mapaUrl: "https://www.google.com/maps?q=Huancaya,+Yauyos,+Lima,+Per%C3%BA",
        pageUrl: "tour-huancaya-vilca.html"
    },

    "huaraz": {
        nombre: "HUARAZ",
        tipo: "2d1n",
        imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Laguna%2069%2C%20Huaraz%2C%20Peru.jpg",
        ubicacion: "Cordillera Blanca, Áncash",
        duracion: "2 días / 1 noche",
        fecha: "Tours: 24 y 25 de octubre · Salida desde Lima: viernes 23, 10:00 p. m. · Regreso: domingo 25",
        precio: 270,
        precioGrupal: 260,
        precioPaquete: 330,
        precioReserva: 100,
        descripcion: "Aventura, historia y naturaleza en la Cordillera Blanca: Chavín de Huántar, Nevado Pastoruri, Laguna Llanganuco y la mítica Laguna 69. ¿Buscas dónde dormir? Agrega hospedaje (habitación matrimonial) por S/ 60 más — paquete completo por S/ 330.",
        incluye: [
            "🚌 Transporte Lima – Huaraz – Lima",
            "🚐 Movilidad turística para los tours",
            "🧭 Guía turístico",
            "📋 Coordinación durante todo el viaje",
            "📸 Paradas turísticas según itinerario"
        ],
        noIncluye: [
            "Entradas a los lugares turísticos",
            "Hospedaje (opcional: matrimonial S/60, paquete completo S/330)",
            "Alimentación",
            "Gastos personales"
        ],
        lugares: [
            "Chavín de Huántar",
            "Nevado Pastoruri",
            "Laguna 69",
            "Laguna Llanganuco"
        ],
        embarque: [
            { hora: "09:00 p. m.", lugar: "Puente Nuevo" },
            { hora: "09:30 p. m.", lugar: "Plaza Norte" },
            { hora: "10:00 p. m.", lugar: "Puente Nuevo" }
        ],
        itinerario: [
            { dia: "Día 1 — Sábado 24: Chavín y Pastoruri", items: [
                { hora: "06:00 AM", texto: "Llegada a Huaraz" },
                { hora: "07:30 AM", texto: "Salida hacia Chavín de Huántar" },
                { hora: "09:00 AM", texto: "Visita al complejo arqueológico de Chavín de Huántar" },
                { hora: "11:00 AM", texto: "Laguna Querococha" },
                { hora: "01:00 PM", texto: "Nevado Pastoruri" },
                { hora: "04:00 PM", texto: "Retorno a Huaraz" },
                { hora: "06:00 PM", texto: "Visita a la Plaza de Armas de Huaraz" },
                { hora: "Noche", texto: "Alojamiento en Huaraz" }
            ] },
            { dia: "Día 2 — Domingo 25: Llanganuco y Laguna 69", items: [
                { hora: "05:00 AM", texto: "Desayuno y salida hacia el Parque Nacional Huascarán" },
                { hora: "07:00 AM", texto: "Laguna Llanganuco" },
                { hora: "09:00 AM", texto: "Trekking a Laguna 69" },
                { hora: "01:00 PM", texto: "Tiempo libre para fotografías" },
                { hora: "04:00 PM", texto: "Retorno hacia Huaraz" },
                { hora: "08:00 PM", texto: "Salida de retorno a Lima" }
            ] }
        ],
        mapaUrl: "https://www.google.com/maps?q=Huaraz,+Ancash,+Per%C3%BA",
        pageUrl: "tour-huaraz.html"
    },

    "paracas-ica": {
        nombre: "PARACAS + ICA",
        tipo: "full-day",
        imagen: "img/tours/dunas-ica.jpg",
        ubicacion: "Bahía de Paracas & desierto de Ica",
        duracion: "Full Day",
        fecha: "Salidas: sábados y feriados",
        precio: 140,
        precioGrupal: 130,
        precioReserva: 50,
        descripcion: "Un día lleno de naturaleza marina, paisajes desérticos y adrenalina: paseo en deslizador a las Islas Ballestas, carros tubulares y sandboarding en las dunas de Huacachina.",
        incluye: [
            "🚌 Transporte turístico privado",
            "🚤 Paseo en deslizador a Islas Ballestas",
            "🏜️ Carros tubulares",
            "🏂 Sandboarding",
            "🧭 Guía oficial de turismo",
            "📸 Fotos y videos",
            "🩹 Botiquín de primeros auxilios"
        ],
        noIncluye: [
            "Desayuno",
            "Almuerzo",
            "Gastos personales"
        ],
        lugares: [
            "Islas Ballestas",
            "Reserva Nacional de Paracas",
            "Huacachina",
            "Viñedos y bodegas"
        ],
        embarque: [
            { hora: "04:00 a. m.", lugar: "Plaza Norte" },
            { hora: "04:30 a. m.", lugar: "Puente Nuevo" }
        ],
        itinerario: null,
        mapaUrl: "https://www.google.com/maps?q=Paracas,+Ica,+Per%C3%BA",
        pageUrl: "tour-paracas-ica.html"
    },

    "huancayo-jauja": {
        nombre: "HUANCAYO + JAUJA",
        tipo: "2d1n",
        imagen: "img/tours/mural-tunantada.jpg",
        ubicacion: "Valle del Mantaro",
        duracion: "2 días / 1 noche",
        fecha: "Salidas: viernes por la noche · Regreso: domingo",
        precio: 180,
        precioGrupal: 175,
        paquetes: [
            { id: "matrimonial", nombre: "Paquete Matrimonial", habitacion: "habitación matrimonial", msg: "matrimonial", precio: 250 },
            { id: "doble",       nombre: "Paquete Doble",       habitacion: "habitación doble",       msg: "doble",       precio: 270 }
        ],
        precioReserva: 80,
        descripcion: "Desconéctate del trabajo y vive un fin de semana lleno de aventura, paisajes increíbles y cultura viva en el Valle del Mantaro: Huancayo y Jauja. ¿Buscas dónde dormir? Agrega hospedaje: habitación matrimonial (S/ 70) o doble (S/ 90) — paquete completo desde S/ 250.",
        incluye: [
            "🚌 Transporte turístico",
            "🧭 Guía oficial de turismo",
            "📸 Fotos & videos",
            "🥂 Cortesía de bienvenida",
            "💬 Atención personalizada",
            "🔌 Estaciones de carga USB"
        ],
        noIncluye: [
            "Alimentación (desayuno / almuerzo / cena)",
            "Hospedaje (opcional: matrimonial S/70, doble S/90; paquetes desde S/250)",
            "Gastos personales"
        ],
        lugares: [
            "Cañón de Shutjo",
            "Puente Colgante del Inca",
            "Aguas Termales de Huishcapuquio",
            "Laguna de Paca",
            "Mural de la Tunantada",
            "Parque de la Identidad Wanka",
            "Plaza de Armas de Huancayo"
        ],
        embarque: [
            { hora: "09:00 p. m.", lugar: "Plaza Norte" },
            { hora: "10:00 p. m.", lugar: "Puente Nuevo" },
            { hora: "10:30 p. m.", lugar: "Puente Piedra" }
        ],
        itinerario: null,
        mapaUrl: "https://www.google.com/maps?q=Huancayo,+Jun%C3%ADn,+Per%C3%BA",
        pageUrl: "tour-huancayo-jauja.html"
    }
};

/* Paquetes (tour + hospedaje) de un tour: acepta `paquetes: [...]` (varios)
   o el clásico `precioPaquete` (uno solo, habitación matrimonial). */
function getPaquetes(data) {
    if (Array.isArray(data.paquetes) && data.paquetes.length) return data.paquetes;
    if (data.precioPaquete) {
        return [{ id: "completo", nombre: "Paquete completo", habitacion: data.hospedajeTipo || "habitación matrimonial", msg: data.hospedajeMsg || "matrimonial", precio: data.precioPaquete }];
    }
    return [];
}

function getPaqueteSeleccionado(data, tipoPrecio) {
    if (!tipoPrecio || !tipoPrecio.startsWith("paquete:")) return null;
    const id = tipoPrecio.slice(8);
    return getPaquetes(data).find(p => p.id === id) || null;
}

/* -------- 2. INYECTAR EL MODAL DEL COTIZADOR EN EL DOM -------- */
function ensureCotizadorModal() {
    if (document.getElementById("cotizadorModal")) return;

    const modal = document.createElement("div");
    modal.id = "cotizadorModal";
    modal.className = "cotizador-overlay";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Cotizador de tour");
    modal.innerHTML = `
        <div class="cotizador-box">
            <button type="button" class="cotizador-close" id="cotizadorClose" aria-label="Cerrar cotizador">×</button>

            <div class="cotizador-media">
                <img id="cotImagen" src="" alt="">
                <span class="cotizador-tipo" id="cotTipo"></span>
            </div>

            <div class="cotizador-body">
                <span class="eyebrow" id="cotUbicacion">📍</span>
                <h3 id="cotNombre"></h3>
                <p class="cotizador-fecha" id="cotFecha"></p>
                <p class="cotizador-desc" id="cotDescripcion"></p>

                <div class="cotizador-precios" id="cotPrecios">
                    <label class="precio-option">
                        <input type="radio" name="tipoPrecio" value="individual" checked>
                        <span>Individual <strong id="cotPrecioIndividual">S/ 0</strong><small>por persona</small></span>
                    </label>
                    <label class="precio-option">
                        <input type="radio" name="tipoPrecio" value="grupal">
                        <span>Grupal (4+) <strong id="cotPrecioGrupal">S/ 0</strong><small>por persona</small></span>
                    </label>
                </div>

                <div class="cotizador-grid">
                    <div class="includes-mini">
                        <h4>Incluye</h4>
                        <ul id="cotIncluye"></ul>
                    </div>
                    <div class="includes-mini excludes-mini">
                        <h4>No incluye</h4>
                        <ul id="cotNoIncluye"></ul>
                    </div>
                </div>

                <div class="cotizador-form">
                    <div class="cotizador-row">
                        <label>N.º de personas
                            <input type="number" id="cotPersonas" min="1" value="1">
                        </label>
                        <label>Fecha deseada
                            <input type="date" id="cotFechaInput">
                        </label>
                    </div>
                    <label>Nombre completo
                        <input type="text" id="cotClienteNombre" placeholder="Tu nombre">
                        <small class="campo-error" id="errNombre" hidden>Por favor ingresa tu nombre completo.</small>
                    </label>
                    <label>WhatsApp / correo
                        <input type="text" id="cotClienteContacto" placeholder="Número o correo de contacto">
                        <small class="campo-error" id="errContacto" hidden>Ingresa un WhatsApp o correo para poder contactarte.</small>
                    </label>
                    <p class="cotizador-envio-msg" id="cotEnvioMsg" hidden></p>

                    <div class="cotizador-total">
                        <span>Total estimado</span>
                        <strong id="cotTotal">S/ 0</strong>
                    </div>
                    <p class="cotizador-reserva-nota" id="cotReservaNota"></p>

                    <div class="cotizador-pago-tabs">
                        <button type="button" class="pago-tab active" data-pago="whatsapp"><svg class="wa-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#25D366" d="M16 0C7.163 0 0 7.163 0 16c0 2.825.737 5.58 2.137 8.01L0 32l8.19-2.113A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0Z"/><path fill="#FFF" d="M23.47 18.94c-.4-.2-2.35-1.16-2.71-1.29-.36-.13-.63-.2-.9.2-.27.4-1.03 1.29-1.26 1.56-.23.27-.46.3-.86.1-.4-.2-1.69-.62-3.22-1.99-1.19-1.06-1.99-2.37-2.22-2.77-.23-.4-.02-.62.18-.82.18-.18.4-.46.6-.7.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.17-1.24-2.97-.33-.79-.66-.68-.9-.7-.23-.02-.5-.02-.76-.02-.27 0-.7.1-1.06.5-.36.4-1.4 1.37-1.4 3.34 0 1.97 1.43 3.87 1.63 4.13.2.27 2.81 4.29 6.81 6.02.95.41 1.7.66 2.28.84.96.3 1.83.26 2.52.16.77-.12 2.35-.96 2.68-1.89.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46Z"/></svg> Reservar por WhatsApp</button>
                        <button type="button" class="pago-tab" data-pago="tarjeta">💳 Pagar con tarjeta</button>
                    </div>

                    <div class="pago-panel" id="pagoWhatsapp">
                        <button type="button" class="btn btn-whatsapp btn-full" id="cotEnviarWhatsapp">
                            <svg class="wa-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#25D366" d="M16 0C7.163 0 0 7.163 0 16c0 2.825.737 5.58 2.137 8.01L0 32l8.19-2.113A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0Z"/><path fill="#FFF" d="M23.47 18.94c-.4-.2-2.35-1.16-2.71-1.29-.36-.13-.63-.2-.9.2-.27.4-1.03 1.29-1.26 1.56-.23.27-.46.3-.86.1-.4-.2-1.69-.62-3.22-1.99-1.19-1.06-1.99-2.37-2.22-2.77-.23-.4-.02-.62.18-.82.18-.18.4-.46.6-.7.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.17-1.24-2.97-.33-.79-.66-.68-.9-.7-.23-.02-.5-.02-.76-.02-.27 0-.7.1-1.06.5-.36.4-1.4 1.37-1.4 3.34 0 1.97 1.43 3.87 1.63 4.13.2.27 2.81 4.29 6.81 6.02.95.41 1.7.66 2.28.84.96.3 1.83.26 2.52.16.77-.12 2.35-.96 2.68-1.89.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46Z"/></svg>
                            Enviar cotización por WhatsApp
                        </button>
                    </div>

                    <div class="pago-panel" id="pagoTarjeta" hidden>
                        <div class="cotizador-row">
                            <label>Titular de la tarjeta
                                <input type="text" id="cardName" placeholder="Nombre y apellido">
                            </label>
                        </div>
                        <label>Número de tarjeta
                            <input type="text" id="cardNumber" inputmode="numeric" maxlength="19" placeholder="1234 1234 1234 1234">
                        </label>
                        <div class="cotizador-row">
                            <label>Vencimiento
                                <input type="text" id="cardExpiry" maxlength="5" placeholder="MM/AA">
                            </label>
                            <label>CVV
                                <input type="text" id="cardCvv" maxlength="4" inputmode="numeric" placeholder="123">
                            </label>
                        </div>
                        <button type="button" class="btn btn-primary btn-full" id="cotPagarBtn">Pagar S/ <span id="cotPagarMonto">0</span></button>
                        <p class="pago-demo-nota">🔒 Pago simulado (demo). Para cobrar en producción se debe conectar una pasarela real como Culqi, Niubiz o Stripe.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    /* Cerrar modal */
    const close = () => {
        modal.classList.remove("open");
        document.body.classList.remove("cotizador-open");
    };
    modal.querySelector("#cotizadorClose").addEventListener("click", close);
    modal.addEventListener("click", e => { if (e.target === modal) close(); });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.classList.contains("open")) close();
    });

    /* Cambiar tipo de precio (individual / grupal) */
    modal.querySelector("#cotPrecios").addEventListener("change", actualizarTotalCotizador);
    modal.querySelector("#cotPersonas").addEventListener("input", actualizarTotalCotizador);

    /* Limpiar errores de validación mientras el usuario escribe */
    const revisarEnvioMsg = () => {
        const nombreOk = modal.querySelector("#cotClienteNombre").value.trim().length >= 2;
        const contactoOk = modal.querySelector("#cotClienteContacto").value.trim().length >= 6;
        if (nombreOk && contactoOk) modal.querySelector("#cotEnvioMsg").hidden = true;
    };
    modal.querySelector("#cotClienteNombre").addEventListener("input", e => {
        if (e.target.value.trim().length >= 2) {
            e.target.classList.remove("input-error");
            modal.querySelector("#errNombre").hidden = true;
        }
        revisarEnvioMsg();
    });
    modal.querySelector("#cotClienteContacto").addEventListener("input", e => {
        if (e.target.value.trim().length >= 6) {
            e.target.classList.remove("input-error");
            modal.querySelector("#errContacto").hidden = true;
        }
        revisarEnvioMsg();
    });

    /* Tabs de método de pago */
    modal.querySelectorAll(".pago-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            modal.querySelectorAll(".pago-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const pago = tab.dataset.pago;
            modal.querySelector("#pagoWhatsapp").hidden = pago !== "whatsapp";
            modal.querySelector("#pagoTarjeta").hidden = pago !== "tarjeta";
        });
    });

    /* Formato tarjeta */
    const cardNumber = modal.querySelector("#cardNumber");
    cardNumber.addEventListener("input", () => {
        cardNumber.value = cardNumber.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    });
    const cardExpiry = modal.querySelector("#cardExpiry");
    cardExpiry.addEventListener("input", () => {
        let v = cardExpiry.value.replace(/\D/g, "").slice(0, 4);
        if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
        cardExpiry.value = v;
    });
    modal.querySelector("#cardCvv").addEventListener("input", e => {
        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
    });

    /* Enviar por WhatsApp */
    modal.querySelector("#cotEnviarWhatsapp").addEventListener("click", () => {
        const tour = modal.dataset.tourKey;
        const data = TOURS_DATA[tour];
        if (!data) return;

        const nombreInput = modal.querySelector("#cotClienteNombre");
        const contactoInput = modal.querySelector("#cotClienteContacto");
        const errNombre = modal.querySelector("#errNombre");
        const errContacto = modal.querySelector("#errContacto");
        const envioMsg = modal.querySelector("#cotEnvioMsg");

        const nombreOk = nombreInput.value.trim().length >= 2;
        const contactoOk = contactoInput.value.trim().length >= 6;

        errNombre.hidden = nombreOk;
        errContacto.hidden = contactoOk;
        nombreInput.classList.toggle("input-error", !nombreOk);
        contactoInput.classList.toggle("input-error", !contactoOk);

        if (!nombreOk || !contactoOk) {
            envioMsg.hidden = false;
            envioMsg.className = "cotizador-envio-msg error";
            envioMsg.textContent = "⚠️ Completa tu nombre y un WhatsApp o correo antes de enviar la cotización.";
            (nombreOk ? contactoInput : nombreInput).focus();
            return;
        }

        const personas = modal.querySelector("#cotPersonas").value || 1;
        const fecha = modal.querySelector("#cotFechaInput").value || "";
        const nombreCliente = nombreInput.value.trim();
        const total = modal.querySelector("#cotTotal").textContent;
        const tipoPrecio = modal.querySelector('input[name="tipoPrecio"]:checked')?.value || "individual";

        let msg = `Hola PlanEnRuta 👋\n\nQuiero reservar el tour *${data.nombre}*`;
        const paqSel = getPaqueteSeleccionado(data, tipoPrecio);
        if (paqSel) msg += ` (PAQUETE COMPLETO: tour + hospedaje ${paqSel.msg})`;
        msg += `\nNombre: ${nombreCliente}`;
        msg += `\nContacto: ${contactoInput.value.trim()}`;
        msg += `\nN.º de personas: ${personas}`;
        if (fecha) msg += `\nFecha deseada: ${fecha}`;
        msg += `\nTotal estimado: ${total}`;
        msg += `\n\n¿Podrían confirmarme disponibilidad y forma de reserva?`;

        envioMsg.hidden = false;
        envioMsg.className = "cotizador-envio-msg success";
        envioMsg.textContent = "✅ ¡Listo! Te llevamos a WhatsApp para enviar tu cotización.";

        window.open(`https://wa.me/${typeof WHATSAPP_NUMBER !== "undefined" ? WHATSAPP_NUMBER : "923118811"}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    });

    /* Pago con tarjeta (simulado) */
    modal.querySelector("#cotPagarBtn").addEventListener("click", () => {
        const name = modal.querySelector("#cardName").value.trim();
        const number = modal.querySelector("#cardNumber").value.replace(/\s/g, "");
        const expiry = modal.querySelector("#cardExpiry").value.trim();
        const cvv = modal.querySelector("#cardCvv").value.trim();

        if (!name || number.length < 15 || !/^\d{2}\/\d{2}$/.test(expiry) || cvv.length < 3) {
            alert("Por favor completa correctamente los datos de la tarjeta.");
            return;
        }

        const tour = modal.dataset.tourKey;
        const data = TOURS_DATA[tour];
        const total = modal.querySelector("#cotTotal").textContent;

        alert(`✅ Pago simulado exitoso por ${total}.\n\nEsto es una demo: para procesar pagos reales, PlanEnRuta debe integrar una pasarela como Culqi o Niubiz. Ahora te redirigiremos a WhatsApp para confirmar tu reserva.`);

        const personas = modal.querySelector("#cotPersonas").value || 1;
        let msg = `Hola PlanEnRuta 👋\n\nAcabo de realizar el pago (demo) del tour *${data.nombre}*`;
        msg += `\nN.º de personas: ${personas}`;
        msg += `\nTotal pagado: ${total}`;
        msg += `\n\nQuedo atento(a) a la confirmación de mi reserva.`;
        window.open(`https://wa.me/${typeof WHATSAPP_NUMBER !== "undefined" ? WHATSAPP_NUMBER : "923118811"}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    });
}

function actualizarTotalCotizador() {
    const modal = document.getElementById("cotizadorModal");
    if (!modal) return;
    const tour = modal.dataset.tourKey;
    const data = TOURS_DATA[tour];
    if (!data) return;

    const personas = Math.max(1, parseInt(modal.querySelector("#cotPersonas").value, 10) || 1);
    const tipoPrecio = modal.querySelector('input[name="tipoPrecio"]:checked')?.value || "individual";
    let precioUnitario = data.precio;
    if (tipoPrecio === "grupal") precioUnitario = data.precioGrupal;
    const paqSel = getPaqueteSeleccionado(data, tipoPrecio);
    if (paqSel) precioUnitario = paqSel.precio;
    const total = precioUnitario * personas;

    modal.querySelector("#cotTotal").textContent = `S/ ${total}`;
    modal.querySelector("#cotPagarMonto").textContent = total;
    modal.querySelector("#cotReservaNota").textContent = paqSel
        ? `Incluye el tour + 1 noche de hospedaje (${paqSel.habitacion}). Reserva con solo S/ ${data.precioReserva} de adelanto.`
        : `Reserva tu cupo con solo S/ ${data.precioReserva} de adelanto. Saldo se cancela antes de la salida.`;
}

/* -------- 3. ABRIR EL COTIZADOR CON LOS DATOS DEL TOUR ELEGIDO -------- */
function abrirCotizador(tourKey, preseleccion) {
    const data = TOURS_DATA[tourKey];
    if (!data) return;

    ensureCotizadorModal();
    const modal = document.getElementById("cotizadorModal");
    modal.dataset.tourKey = tourKey;

    modal.querySelector("#cotImagen").src = data.imagen;
    modal.querySelector("#cotImagen").alt = data.nombre;
    modal.querySelector("#cotTipo").textContent = data.tipo === "full-day" ? "FULL DAY" : "2 DÍAS / 1 NOCHE";
    modal.querySelector("#cotNombre").innerHTML = data.nombre;
    modal.querySelector("#cotUbicacion").textContent = `📍 ${data.ubicacion}`;
    modal.querySelector("#cotFecha").textContent = `🗓️ ${data.duracion} · ${data.fecha}`;
    modal.querySelector("#cotDescripcion").textContent = data.descripcion;
    modal.querySelector("#cotPrecioIndividual").textContent = `S/ ${data.precio}`;
    modal.querySelector("#cotPrecioGrupal").textContent = `S/ ${data.precioGrupal}`;

    /* Opciones de paquete (una o varias) */
    const contPrecios = modal.querySelector("#cotPrecios");
    contPrecios.querySelectorAll(".precio-option-paquete").forEach(el => el.remove());
    const paquetes = getPaquetes(data);
    paquetes.forEach(p => {
        const label = document.createElement("label");
        label.className = "precio-option precio-option-paquete";
        label.innerHTML = `
            <input type="radio" name="tipoPrecio" value="paquete:${p.id}">
            <span>🛌 ${p.nombre} (Tour + Hospedaje) <strong>S/ ${p.precio}</strong><small>por persona · ${p.habitacion}</small></span>`;
        contPrecios.appendChild(label);
    });

    modal.querySelector("#cotIncluye").innerHTML = data.incluye.map(i => `<li>${i}</li>`).join("");
    modal.querySelector("#cotNoIncluye").innerHTML = data.noIncluye.map(i => `<li>${i}</li>`).join("");

    /* reset form */
    modal.querySelector("#cotPersonas").value = 1;
    let tipoDefault = "individual";
    if (preseleccion && preseleccion.startsWith("paquete") && paquetes.length) {
        const elegido = paquetes.find(p => preseleccion === "paquete:" + p.id) || paquetes[0];
        tipoDefault = "paquete:" + elegido.id;
    }
    modal.querySelectorAll('input[name="tipoPrecio"]').forEach(r => { r.checked = (r.value === tipoDefault); });
    modal.querySelector("#cotFechaInput").value = "";
    modal.querySelector("#cotClienteNombre").value = "";
    modal.querySelector("#cotClienteContacto").value = "";
    modal.querySelector("#cotClienteNombre").classList.remove("input-error");
    modal.querySelector("#cotClienteContacto").classList.remove("input-error");
    modal.querySelector("#errNombre").hidden = true;
    modal.querySelector("#errContacto").hidden = true;
    modal.querySelector("#cotEnvioMsg").hidden = true;
    modal.querySelectorAll(".pago-tab").forEach(t => t.classList.remove("active"));
    modal.querySelector('.pago-tab[data-pago="whatsapp"]').classList.add("active");
    modal.querySelector("#pagoWhatsapp").hidden = false;
    modal.querySelector("#pagoTarjeta").hidden = true;

    actualizarTotalCotizador();

    modal.classList.add("open");
    document.body.classList.add("cotizador-open");
}

/* -------- 4. CONECTAR BOTONES "COTIZAR" EXISTENTES EN LA PÁGINA -------- */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-cotizar]").forEach(btn => {
        btn.addEventListener("click", () => abrirCotizador(btn.dataset.cotizar, btn.dataset.preseleccion));
    });
});
