/* =========================================================
   PLAN EN RUTA — COMUNIDAD VIAJERA
   ASESOR VIRTUAL (chatbot básico, sin backend)

   Reglas clave:
   - Nunca inventa información: solo usa TOURS_DATA (js/cotizador.js).
   - Responde SOLO lo que el cliente pregunta (nada de volcar toda
     la ficha del tour de una vez).
   - No mezcla información entre tours (cada tour es una ficha
     independiente, controlada por el contexto de la conversación).
   - Si un dato no está registrado, usa el mensaje estándar de
     "no tengo ese dato registrado".
   - Cada respuesta termina, cuando corresponde, con una sola
     pregunta sencilla para continuar la conversación.
   - Muestra un indicador de "Escribiendo..." antes de responder.
   ========================================================= */

const CHAT_WSP = "923118811";
const WA_ICON_INLINE = '<svg class="wa-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#25D366" d="M16 0C7.163 0 0 7.163 0 16c0 2.825.737 5.58 2.137 8.01L0 32l8.19-2.113A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0Z"/><path fill="#FFF" d="M23.47 18.94c-.4-.2-2.35-1.16-2.71-1.29-.36-.13-.63-.2-.9.2-.27.4-1.03 1.29-1.26 1.56-.23.27-.46.3-.86.1-.4-.2-1.69-.62-3.22-1.99-1.19-1.06-1.99-2.37-2.22-2.77-.23-.4-.02-.62.18-.82.18-.18.4-.46.6-.7.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.17-1.24-2.97-.33-.79-.66-.68-.9-.7-.23-.02-.5-.02-.76-.02-.27 0-.7.1-1.06.5-.36.4-1.4 1.37-1.4 3.34 0 1.97 1.43 3.87 1.63 4.13.2.27 2.81 4.29 6.81 6.02.95.41 1.7.66 2.28.84.96.3 1.83.26 2.52.16.77-.12 2.35-.96 2.68-1.89.33-.93.33-1.72.23-1.89-.1-.16-.36-.26-.76-.46Z"/></svg>';

const CHAT_NO_DATO = "En este momento no tengo ese dato registrado, pero puedo brindarte toda la información disponible del tour. 😊";

/* -------- Ficha de presentación por tour (nombre corto + emoji) -------- */
const CHAT_TOUR_DISPLAY = {
    "vichaycocha": { emoji: "🏞️", nombre: "Vichaycocha" },
    "huancaya-vilca": { emoji: "🌿", nombre: "Huancaya & Vilca" },
    "paracas-ica": { emoji: "🌊", nombre: "Paracas + Ica" },
    "huancayo-jauja": { emoji: "🏔️", nombre: "Huancayo & Jauja" }
};
/* Orden en el que se listan los destinos al saludar */
const CHAT_TOUR_ORDEN = ["vichaycocha", "huancaya-vilca", "paracas-ica", "huancayo-jauja"];

/* -------- Alias para reconocer de qué tour habla el cliente -------- */
const CHAT_TOUR_ALIASES = {
    "vichaycocha": ["vichaycocha"],
    "paracas-ica": ["paracas", "ica", "huacachina", "islas ballestas"],
    "huancayo-jauja": ["huancayo", "jauja"],
    "huancaya-vilca": ["huancaya", "vilca"]
};

/* -------- Intenciones que el bot reconoce (orden = prioridad) -------- */
const CHAT_INTENTS = [
    { name: "saludo", test: t => /\b(hola|buenas|buenos dias|buenas tardes|buenas noches|quiero viajar)\b/.test(t) },
    { name: "gracias", test: t => /\bgracias\b/.test(t) },
    { name: "reservar", test: t => /\b(reservar|reserva|separar|apartar|cupo)\b/.test(t) },
    { name: "noIncluye", test: t => /no incluye|que no incluye|no esta incluido/.test(t) },
    { name: "incluye", test: t => /\b(incluye|que trae|que trae el tour|que da el tour)\b/.test(t) },
    { name: "precio", test: t => /\b(precio|cuanto cuesta|costo|vale|tarifa|cuanto sale|cuanto es|cuanto esta)\b/.test(t) },
    { name: "fecha", test: t => /\b(fecha|cuando sale|cuando es|proxima salida|que dia)\b/.test(t) },
    { name: "itinerario", test: t => /\b(itinerario|dia a dia|recorrido completo)\b/.test(t) },
    { name: "embarque", test: t => /\b(embarque|recojo|punto de encuentro|donde salen|donde embarcan|de donde sale|hora de salida|a que hora salimos)\b/.test(t) },
    { name: "lugares", test: t => /\b(lugares|visitaremos|que visitamos|que lugares|conoceremos)\b/.test(t) },
    { name: "mapa", test: t => /\b(mapa|ubicacion|donde queda|como llegar|direccion)\b/.test(t) },
    { name: "duracion", test: t => /\b(cuanto dura|duracion|cuantos dias|es de un dia)\b/.test(t) },
    { name: "pago", test: t => /\b(pago|pagar|tarjeta|yape|plin|efectivo|transferencia)\b/.test(t) },
    { name: "contacto", test: t => /\b(whatsapp|asesor|humano|numero|telefono|hablar con alguien)\b/.test(t) },
    { name: "tours", test: t => /\b(tour|tours|destino|destinos|a donde|adonde|paquete|paquetes)\b/.test(t) }
];

/* Mapeo del menú numerado que se muestra al elegir un tour */
const CHAT_MENU_NUM = { 1: "fecha", 2: "precio", 3: "itinerario", 4: "incluye", 5: "noIncluye", 6: "embarque", 7: "reservar", 8: "mapa" };
const CHAT_MENU_EMOJI = { 1: "1️⃣", 2: "2️⃣", 3: "3️⃣", 4: "4️⃣", 5: "5️⃣", 6: "6️⃣", 7: "7️⃣", 8: "8️⃣" };

function chatNormalize(text) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // quita tildes
}

function chatDetectTour(t) {
    for (const key in CHAT_TOUR_ALIASES) {
        if (CHAT_TOUR_ALIASES[key].some(alias => t.includes(alias))) return key;
    }
    return null;
}

function chatDetectIntent(t) {
    for (const intent of CHAT_INTENTS) {
        if (intent.test(t)) return intent.name;
    }
    return null;
}

/* Detecta si el mensaje es solo un número (o emoji-número) del menú, ej: "3" o "3️⃣" */
function chatExtractMenuNumber(textoOriginal) {
    const trimmed = textoOriginal.trim();
    if (/^[1-8]$/.test(trimmed)) return parseInt(trimmed, 10);
    for (const n in CHAT_MENU_EMOJI) {
        if (trimmed === CHAT_MENU_EMOJI[n]) return parseInt(n, 10);
    }
    return null;
}

function chatStripEmoji(str) {
    return str.replace(/^\p{Emoji_Presentation}\s*|^\p{Emoji}\uFE0F?\s*/u, "").trim();
}

function chatListaTexto(arr) {
    if (!arr || !arr.length) return "";
    const limpio = arr.map(chatStripEmoji);
    if (limpio.length === 1) return limpio[0];
    return limpio.slice(0, -1).join(", ") + " y " + limpio[limpio.length - 1];
}

function chatFormatItinerario(itinerario) {
    if (!itinerario || !itinerario.length) return null;
    return itinerario.map(grupo => {
        const items = grupo.items.map(i => `• ${i.hora} - ${i.texto}`).join("\n");
        return grupo.dia ? `📅 ${grupo.dia}\n${items}` : `🌄 Itinerario:\n${items}`;
    }).join("\n\n");
}

/* -------- Menú de opciones al identificar el tour -------- */
function chatMenuTour(tourKey) {
    const info = CHAT_TOUR_DISPLAY[tourKey];
    return {
        text: `${info.emoji} ¡Excelente elección! ${info.nombre} es una de nuestras experiencias disponibles.\n¿Qué información deseas conocer?\n1️⃣ Fecha\n2️⃣ Precio\n3️⃣ Itinerario\n4️⃣ Qué incluye\n5️⃣ Qué no incluye\n6️⃣ Puntos de embarque\n7️⃣ Reserva\n8️⃣ Mapa`
    };
}

/* -------- Listado general de tours (saludo inicial) -------- */
function chatListaTours() {
    const lineas = CHAT_TOUR_ORDEN.map(key => `${CHAT_TOUR_DISPLAY[key].emoji} ${CHAT_TOUR_DISPLAY[key].nombre}`).join("\n");
    return { text: `¡Hola! 👋😊 Bienvenido(a) a Plan en Ruta – Comunidad Viajera.\nTenemos estos destinos disponibles:\n${lineas}\n\n¿Cuál destino te gustaría conocer? 😊` };
}

/* -------- Construye la respuesta breve según intención + tour -------- */
function chatResponder(intent, tourKey) {
    const data = typeof TOURS_DATA !== "undefined" && tourKey ? TOURS_DATA[tourKey] : null;
    const info = tourKey ? CHAT_TOUR_DISPLAY[tourKey] : null;

    const pedirTour = (pregunta) => ({
        text: `${pregunta} ¿Sobre qué tour te gustaría saber? Tenemos Vichaycocha, Huancaya & Vilca, Paracas + Ica y Huancayo & Jauja. 🙂`
    });

    switch (intent) {
        case "saludo":
        case "tours":
            return chatListaTours();

        case "gracias":
            return { text: "¡Con gusto! Si necesitas algo más, aquí estoy. 🌄" };

        case "precio":
            if (!data) return pedirTour("Claro, te ayudo con el precio.");
            return {
                text: `💰 Precio regular: S/ ${data.precio} por persona\n🔥 Promoción grupal (4 personas a más): S/ ${data.precioGrupal} c/u\n\n¿Deseas que te indique cómo reservar?`
            };

        case "fecha":
            if (!data) return pedirTour("Claro, te comparto las fechas.");
            return { text: `📅 ${data.fecha}.\n\n¿Quieres conocer el precio también?` };

        case "duracion":
            if (!data) return pedirTour("Te cuento la duración.");
            return { text: `${info.nombre} es un tour de ${data.duracion}. 🕒` };

        case "itinerario":
            if (!data) return pedirTour("Te comparto el itinerario.");
            if (!data.itinerario) return { text: CHAT_NO_DATO };
            return { text: `${chatFormatItinerario(data.itinerario)}\n\n¿Deseas ver qué incluye el tour?` };

        case "incluye":
            if (!data) return pedirTour("Te comparto qué incluye.");
            return { text: `🎒 INCLUYE:\n${data.incluye.map(i => `✅ ${chatStripEmoji(i)}`).join("\n")}\n\n¿Quieres saber qué no incluye?` };

        case "noIncluye":
            if (!data) return pedirTour("Te comparto qué no incluye.");
            return { text: `🚫 NO INCLUYE:\n${data.noIncluye.map(i => `• ${chatStripEmoji(i)}`).join("\n")}\n\n¿Te gustaría conocer los puntos de embarque?` };

        case "embarque":
            if (!data) return pedirTour("Te comparto los puntos de embarque.");
            if (!data.embarque || !data.embarque.length) return { text: CHAT_NO_DATO };
            return {
                text: `🚌 Puntos de embarque\n${data.embarque.map(p => `📍 ${p.lugar} – ${p.hora}`).join("\n")}\n\n¿Deseas reservar tu cupo?`
            };

        case "lugares":
            if (!data) return pedirTour("Te cuento qué lugares visitaremos.");
            if (!data.lugares || !data.lugares.length) return { text: CHAT_NO_DATO };
            return { text: `📍 Visitaremos: ${chatListaTexto(data.lugares)}. 🏞️` };

        case "mapa":
            if (!data) return pedirTour("Te comparto la ubicación.");
            if (!data.mapaUrl) return { text: CHAT_NO_DATO };
            return { text: `🗺️ Aquí tienes la ubicación de ${info.nombre}:\n${data.mapaUrl}` };

        case "pago":
            return { text: "Puedes pagar por WhatsApp coordinando con nuestro equipo, o con tarjeta directamente en el cotizador del tour (botón 'Cotizar' → 'Pagar con tarjeta'). También aceptamos Yape/Plin. 💳" };

        case "reservar":
            if (!data) return pedirTour("¡Perfecto! 😊");
            return {
                text: `🎟️ Puedes reservar tu cupo con S/ ${data.precioReserva} de adelanto.\n¿Para cuántas personas deseas reservar? 😊`,
                awaitPersonas: true,
                tourKey
            };

        case "contacto":
            return { text: "Puedes hablar directo con nuestro equipo por WhatsApp aquí 👉", link: true };

        default:
            return null;
    }
}

/* -------- Respuesta cuando el bot está esperando el N.º de personas -------- */
function chatResponderPersonas(texto, tourKey) {
    const match = texto.match(/\d+/);
    const data = typeof TOURS_DATA !== "undefined" && tourKey ? TOURS_DATA[tourKey] : null;
    if (!match) {
        return { text: "¿Me confirmas para cuántas personas sería la reserva? 🙂", awaitPersonas: true, tourKey };
    }
    const personas = match[0];
    if (!data) {
        return { text: `¡Genial! Anotado para ${personas} persona(s). Coordinemos los detalles por WhatsApp 👇`, link: true };
    }
    const info = CHAT_TOUR_DISPLAY[tourKey];
    return {
        text: `¡Genial! Dejo lista tu reserva de ${info.nombre} para ${personas} persona(s). Puedes confirmarla aquí 👇`,
        cotizarTour: tourKey
    };
}

function ensureChatWidget() {
    if (document.getElementById("chatWidget")) return;

    const wrap = document.createElement("div");
    wrap.id = "chatWidget";
    wrap.className = "chat-widget";
    wrap.innerHTML = `
        <button type="button" class="chat-toggle" id="chatToggle" aria-label="Abrir chat de ayuda">
            <svg class="chat-toggle-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M12 2C6.48 2 2 5.94 2 10.8c0 2.62 1.32 4.96 3.4 6.58-.1.9-.42 2.13-1.28 3.4a.5.5 0 0 0 .55.77c1.85-.5 3.32-1.35 4.28-2.02.98.24 2.02.37 3.05.37 5.52 0 10-3.94 10-8.8S17.52 2 12 2Zm-4.5 9.6a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4.5 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4.5 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z"/></svg>
        </button>
        <div class="chat-panel" id="chatPanel" hidden>
            <div class="chat-header">
                <div>
                    <strong>Plan en Ruta</strong>
                    <span>Comunidad Viajera · Responde al instante</span>
                </div>
                <button type="button" class="chat-close" id="chatClose" aria-label="Cerrar chat">×</button>
            </div>
            <div class="chat-messages" id="chatMessages"></div>
            <form class="chat-input-row" id="chatForm">
                <input type="text" id="chatInput" placeholder="Escribe tu pregunta..." autocomplete="off">
                <button type="submit" aria-label="Enviar">➤</button>
            </form>
        </div>
    `;
    document.body.appendChild(wrap);

    const panel = wrap.querySelector("#chatPanel");
    const toggle = wrap.querySelector("#chatToggle");
    const closeBtn = wrap.querySelector("#chatClose");
    const messages = wrap.querySelector("#chatMessages");
    const form = wrap.querySelector("#chatForm");
    const input = wrap.querySelector("#chatInput");

    let opened = false;
    /* Contexto de la conversación: último tour identificado y si el bot
       está esperando el número de personas para una reserva. Cada tour
       funciona como una ficha independiente: nunca se mezcla su
       información con la de otro tour. */
    const chatState = { tourKey: null, awaitPersonas: false };

    function addMessage(text, from) {
        const bubble = document.createElement("div");
        bubble.className = `chat-bubble chat-${from}`;
        bubble.innerHTML = text.replace(/\n/g, "<br>");
        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
        return bubble;
    }

    function addWspButton(mensajeExtra) {
        const wspLink = document.createElement("a");
        wspLink.href = `https://wa.me/${CHAT_WSP}?text=${encodeURIComponent(mensajeExtra)}`;
        wspLink.target = "_blank";
        wspLink.rel = "noopener";
        wspLink.className = "chat-wsp-btn";
        wspLink.innerHTML = WA_ICON_INLINE + " Abrir WhatsApp";
        messages.appendChild(wspLink);
        messages.scrollTop = messages.scrollHeight;
    }

    function addCotizarButton(tourKey) {
        const data = typeof TOURS_DATA !== "undefined" ? TOURS_DATA[tourKey] : null;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "chat-wsp-btn";
        btn.style.background = "var(--sun)";
        btn.style.color = "var(--ink)";
        btn.style.border = "none";
        btn.style.cursor = "pointer";
        btn.textContent = "Completar reserva";
        btn.addEventListener("click", () => {
            if (typeof abrirCotizador === "function" && data) {
                abrirCotizador(tourKey);
            } else {
                addWspButton(`Hola PlanEnRuta 👋, quiero reservar el tour ${data ? data.nombre : ""}.`);
            }
        });
        messages.appendChild(btn);
        messages.scrollTop = messages.scrollHeight;
    }

    /* Indicador "Escribiendo..." */
    function showTyping() {
        const typing = document.createElement("div");
        typing.className = "chat-typing";
        typing.id = "chatTyping";
        typing.innerHTML = "<span></span><span></span><span></span>";
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;
        return typing;
    }
    function hideTyping(typingEl) {
        typingEl?.remove();
    }

    function addBotWelcome() {
        addMessage("¡Hola! 👋 Soy el asesor virtual de Plan en Ruta – Comunidad Viajera. Puedo ayudarte con información de nuestros tours: Vichaycocha, Huancaya & Vilca, Paracas + Ica y Huancayo & Jauja. ¿Cuál te interesa? 😊", "bot");
    }

    toggle.addEventListener("click", () => {
        opened = !opened;
        panel.hidden = !opened;
        if (opened && !messages.dataset.started) {
            messages.dataset.started = "1";
            addBotWelcome();
        }
        if (opened) input.focus();
    });
    closeBtn.addEventListener("click", () => { opened = false; panel.hidden = true; });

    form.addEventListener("submit", e => {
        e.preventDefault();
        const textoOriginal = input.value.trim();
        if (!textoOriginal) return;
        addMessage(textoOriginal, "user");
        input.value = "";

        const typingEl = showTyping();
        const delay = 500 + Math.random() * 400;

        setTimeout(() => {
            hideTyping(typingEl);

            const t = chatNormalize(textoOriginal);
            const tourMencionado = chatDetectTour(t);
            const huboMencionDeTour = !!tourMencionado;
            if (tourMencionado) chatState.tourKey = tourMencionado;

            let respuesta;

            if (chatState.awaitPersonas) {
                chatState.awaitPersonas = false;
                respuesta = chatResponderPersonas(t, chatState.tourKey);
            } else {
                const numeroMenu = chatState.tourKey ? chatExtractMenuNumber(textoOriginal) : null;
                if (numeroMenu && CHAT_MENU_NUM[numeroMenu]) {
                    respuesta = chatResponder(CHAT_MENU_NUM[numeroMenu], chatState.tourKey);
                } else {
                    const intent = chatDetectIntent(t);
                    if (intent) {
                        respuesta = chatResponder(intent, chatState.tourKey);
                    } else if (huboMencionDeTour) {
                        /* El cliente solo nombró un tour, sin pregunta específica:
                           se le muestra el menú de opciones de ESE tour. */
                        respuesta = chatMenuTour(chatState.tourKey);
                    }
                }
            }

            if (respuesta) {
                addMessage(respuesta.text, "bot");
                if (respuesta.awaitPersonas) {
                    chatState.awaitPersonas = true;
                    if (respuesta.tourKey) chatState.tourKey = respuesta.tourKey;
                }
                if (respuesta.link) {
                    const infoActual = chatState.tourKey ? CHAT_TOUR_DISPLAY[chatState.tourKey] : null;
                    addWspButton("Hola PlanEnRuta 👋, tengo una consulta" + (infoActual ? ` sobre el tour ${infoActual.nombre}` : "") + ".");
                }
                if (respuesta.cotizarTour) {
                    addCotizarButton(respuesta.cotizarTour);
                }
            } else {
                addMessage("No estoy seguro de haber entendido bien 🙏 Para una atención más detallada, escríbenos directo por WhatsApp y un asesor te ayudará enseguida.", "bot");
                addWspButton("Hola PlanEnRuta 👋, tengo una consulta: " + textoOriginal);
            }
        }, delay);
    });
}

document.addEventListener("DOMContentLoaded", ensureChatWidget);
