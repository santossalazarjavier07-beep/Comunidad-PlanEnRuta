/* =========================================================
   PLANENRUTA — INTERACCIONES
   Mantiene las funcionalidades existentes y añade:
   - reveal al hacer scroll
   - lightbox de galería
   - navegación móvil accesible
   - botones WhatsApp
   - pestañas/scroll de detalle
   - respeto por prefers-reduced-motion
   ========================================================= */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const WHATSAPP_NUMBER = "923118811";

function whatsappUrl(tourName = "", date = "") {
    let message = `Hola PlanEnRuta 👋\n\nQuiero información`;
    if (tourName) message += ` sobre el tour: *${tourName}*`;
    if (date) message += `\n\nFecha de salida: ${date}`;
    message += `.\n\n¿Podrían indicarme disponibilidad y forma de reserva?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function reservarTour(tourName, date = "") {
    window.open(whatsappUrl(tourName, date), "_blank", "noopener");
}

/* Menú móvil */
const menuMobile = document.getElementById("menuMobile");
const menu = document.querySelector(".menu");

if (menuMobile && menu) {
    menuMobile.setAttribute("aria-expanded", "false");
    menuMobile.addEventListener("click", () => {
        const active = menu.classList.toggle("active");
        menuMobile.textContent = active ? "✕" : "☰";
        menuMobile.setAttribute("aria-expanded", String(active));
    });
}
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
        menu?.classList.remove("active");
        if (menuMobile) {
            menuMobile.textContent = "☰";
            menuMobile.setAttribute("aria-expanded", "false");
        }
    });
});

/* Muestra u oculta una tarjeta de tour con una animación suave
   (fade + escala) en vez de ocultarla de golpe. */
function animateTourCard(card, show) {
    if (show) {
        card.hidden = false;
        card.classList.remove("tour-card--out");
        return;
    }
    card.classList.add("tour-card--out");
    if (REDUCED) {
        card.hidden = true;
        return;
    }
    const finish = () => {
        if (card.classList.contains("tour-card--out")) card.hidden = true;
        card.removeEventListener("transitionend", finish);
    };
    card.addEventListener("transitionend", finish);
    /* Respaldo por si transitionend no llega a dispararse */
    setTimeout(finish, 350);
}

/* Muestra u oculta un encabezado de categoría (FULL DAY / 2D1N) con animación */
function animateTourHeading(heading, show) {
    if (!heading || !heading.classList.contains("tour-type-heading")) return;
    if (show) {
        heading.hidden = false;
        heading.classList.remove("tour-heading--out");
        return;
    }
    heading.classList.add("tour-heading--out");
    if (REDUCED) {
        heading.hidden = true;
        return;
    }
    const finish = () => {
        if (heading.classList.contains("tour-heading--out")) heading.hidden = true;
        heading.removeEventListener("transitionend", finish);
    };
    heading.addEventListener("transitionend", finish);
    setTimeout(finish, 320);
}

/* Aplica el filtro de tipo de viaje (y destino, si aplica) a todas las
   tarjetas visibles en la página, con animación suave. */
function applyTourFilter(tourType, destination) {
    const tours = document.querySelectorAll(".tour-card");
    let visible = 0;
    const visibleGroups = new Set();

    tours.forEach(tour => {
        const matchDestination = !destination || tour.dataset.destination === destination;
        const matchType = !tourType || tour.dataset.type === tourType;
        const show = matchDestination && matchType;
        animateTourCard(tour, show);
        const group = tour.closest(".tour-grid");
        if (show) {
            visible++;
            if (group) visibleGroups.add(group);
        }
    });

    /* Oculta/muestra los encabezados FULL DAY / 2D1N según tengan resultados */
    document.querySelectorAll(".tour-grid").forEach(grid => {
        if (!grid.querySelectorAll(".tour-card").length) return;
        const heading = grid.previousElementSibling;
        animateTourHeading(heading, visibleGroups.has(grid));
    });

    const listing = document.getElementById("tourListing") || document.getElementById("tourGrid");
    let noResults = document.querySelector(".no-results");
    if (!visible && tours.length) {
        if (!noResults) {
            noResults = document.createElement("div");
            noResults.className = "no-results";
            noResults.innerHTML = "<h3>No encontramos tours</h3><p>Prueba con otro destino o tipo de viaje.</p>";
            listing?.appendChild(noResults);
        }
    } else noResults?.remove();

    return visible;
}

/* Sincroniza los chips visuales de "Tipo de viaje" con un valor dado */
function syncTourFilterChips(tourType) {
    document.querySelectorAll(".tour-filter").forEach(group => {
        group.querySelectorAll(".tour-filter-btn").forEach(btn => {
            const active = (btn.dataset.filter || "") === (tourType || "");
            btn.classList.toggle("active", active);
            btn.setAttribute("aria-selected", active ? "true" : "false");
        });
    });
}

/* Ordena las tarjetas dentro de cada grilla según el criterio elegido,
   sin romper la agrupación por tipo de viaje (Full Day / 2D1N). */
function applyTourSort(sortValue) {
    if (!sortValue) return;
    const [field, dir] = sortValue.split("-"); // "price"|"duration", "asc"|"desc"
    document.querySelectorAll(".tour-grid").forEach(grid => {
        const cards = Array.from(grid.querySelectorAll(".tour-card"));
        cards.sort((a, b) => {
            const va = parseFloat(a.dataset[field]) || 0;
            const vb = parseFloat(b.dataset[field]) || 0;
            return dir === "desc" ? vb - va : va - vb;
        });
        cards.forEach(card => grid.appendChild(card));
    });
}
document.getElementById("tourSort")?.addEventListener("change", e => applyTourSort(e.target.value));


/* Ejecuta la búsqueda: filtra por destino y tipo de viaje. Si el usuario eligió
   un destino puntual, abre directamente su cotizador. */
function searchTours() {
    const destination = document.getElementById("destination")?.value || "";
    const tourType = document.getElementById("tourType")?.value || "";

    applyTourFilter(tourType, destination);
    syncTourFilterChips(tourType);

    document.getElementById("tours")?.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });

    /* Si el usuario eligió un destino específico, lo llevamos directo a su cotización */
    if (destination && typeof abrirCotizador === "function" && typeof TOURS_DATA !== "undefined" && TOURS_DATA[destination]) {
        setTimeout(() => abrirCotizador(destination), REDUCED ? 0 : 450);
    }
}
document.getElementById("destination")?.addEventListener("change", searchTours);
document.getElementById("tourType")?.addEventListener("change", searchTours);

/* Chips visuales de "Tipo de viaje" (filtro rápido junto al listado de tours) */
document.querySelectorAll(".tour-filter").forEach(group => {
    const buttons = group.querySelectorAll(".tour-filter-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tourType = btn.dataset.filter || "";
            const destinationSelect = document.getElementById("destination");
            const destination = destinationSelect ? destinationSelect.value : "";

            syncTourFilterChips(tourType);

            const tourTypeSelect = document.getElementById("tourType");
            if (tourTypeSelect) tourTypeSelect.value = tourType;

            applyTourFilter(tourType, destination);
        });
    });
});

/* FAQ */
document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
        const item = question.parentElement;
        const open = item.classList.contains("active");
        document.querySelectorAll(".faq-item").forEach(el => {
            el.classList.remove("active");
            const icon = el.querySelector(".faq-question span");
            if (icon) icon.textContent = "+";
        });
        if (!open) {
            item.classList.add("active");
            const icon = question.querySelector("span");
            if (icon) icon.textContent = "−";
        }
    });
});

/* Newsletter */
document.getElementById("newsletterForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.querySelector('input[type="text"]')?.value.trim();
    const email = form.querySelector('input[type="email"]')?.value.trim();
    if (!name || !email) {
        alert("Por favor completa todos los campos.");
        return;
    }
    alert(`¡Gracias ${name}! Te hemos registrado correctamente.`);
    form.reset();
});

/* Reveal on scroll */
const revealTargets = document.querySelectorAll(
    ".tour-card, .advantage, .departure-card, .place-card, .gallery-item, .detail-section, .tour-overview"
);
if (!REDUCED && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px" });

    revealTargets.forEach((el, index) => {
        el.classList.add("reveal-ready");
        el.style.transitionDelay = `${Math.min(index % 5, 4) * 55}ms`;
        revealObserver.observe(el);
    });
}

/* Reserva */
document.querySelectorAll("[data-reserve]").forEach(button => {
    button.addEventListener("click", () => {
        reservarTour(button.dataset.reserve || "el tour", button.dataset.date || "");
    });
});

document.querySelectorAll("a.whatsapp, .whatsapp-float").forEach(link => {
    if (!link.href.includes("wa.me")) link.href = whatsappUrl();
});

/* Header */
const header = document.querySelector(".header");
if (header) {
    const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
}

/* Lightbox accesible */
const galleryImages = [...document.querySelectorAll(".gallery-item img, .gallery-grid img")];
if (galleryImages.length) {
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Galería de fotos");
    overlay.innerHTML = `
        <button class="lightbox-close" aria-label="Cerrar">×</button>
        <button class="lightbox-prev" aria-label="Anterior">‹</button>
        <figure><img alt=""><figcaption></figcaption></figure>
        <button class="lightbox-next" aria-label="Siguiente">›</button>
    `;
    document.body.appendChild(overlay);

    const image = overlay.querySelector("img");
    const caption = overlay.querySelector("figcaption");
    let current = 0;

    const show = index => {
        current = (index + galleryImages.length) % galleryImages.length;
        const source = galleryImages[current];
        image.src = source.currentSrc || source.src;
        image.alt = source.alt || "";
        caption.textContent = source.alt || "";
        overlay.classList.add("open");
        document.body.classList.add("lightbox-open");
    };
    const close = () => {
        overlay.classList.remove("open");
        document.body.classList.remove("lightbox-open");
    };

    galleryImages.forEach((img, index) => {
        img.setAttribute("tabindex", "0");
        img.setAttribute("role", "button");
        img.addEventListener("click", () => show(index));
        img.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                show(index);
            }
        });
    });
    overlay.querySelector(".lightbox-close").addEventListener("click", close);
    overlay.querySelector(".lightbox-prev").addEventListener("click", () => show(current - 1));
    overlay.querySelector(".lightbox-next").addEventListener("click", () => show(current + 1));
    overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
    document.addEventListener("keydown", e => {
        if (!overlay.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(current - 1);
        if (e.key === "ArrowRight") show(current + 1);
    });
}

/* Acordeón de itinerario */
document.querySelectorAll(".itinerary-day-header").forEach(header => {
    header.addEventListener("click", () => header.closest(".itinerary-day")?.classList.toggle("active"));
});
const firstDay = document.querySelector(".itinerary-day");
if (firstDay) firstDay.classList.add("active");

/* Tabs de detalle */
const tabLinks = document.querySelectorAll(".detail-tabs a");
const detailSections = document.querySelectorAll(".detail-section[id]");
if (tabLinks.length && detailSections.length && "IntersectionObserver" in window) {
    const tabObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tabLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
            }
        });
    }, { rootMargin: "-42% 0px -50% 0px" });
    detailSections.forEach(section => tabObserver.observe(section));
}

/* Carrusel de testimonios */
const testimonialTrack = document.querySelector(".testimonial-track");
function scrollTestimonials(direction) {
    if (!testimonialTrack) return;
    const card = testimonialTrack.querySelector(".testimonial-card");
    const distance = card ? card.offsetWidth + 24 : 400;
    testimonialTrack.scrollBy({ left: direction * distance, behavior: REDUCED ? "auto" : "smooth" });
}
document.querySelector("[data-testimonial-prev]")?.addEventListener("click", () => scrollTestimonials(-1));
document.querySelector("[data-testimonial-next]")?.addEventListener("click", () => scrollTestimonials(1));

/* Año */
document.querySelectorAll(".current-year").forEach(el => el.textContent = new Date().getFullYear());

console.log("%cPlanEnRuta", "font-size:24px;font-weight:700;color:#0f4c43;");
console.log("Viaja. Descubre. Vive. ✈️");


/* =========================================================
   ÁLBUM DE FOTOS (hospedaje): miniaturas, flechas, deslizar
   con el dedo y vista ampliada.
   ========================================================= */
(function () {
    const albums = document.querySelectorAll("[data-album]");
    if (!albums.length) return;

    /* Vista ampliada (una sola para toda la página) */
    const box = document.createElement("div");
    box.className = "album-lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Foto ampliada");
    box.innerHTML = `
        <button type="button" class="album-lightbox-close" aria-label="Cerrar">×</button>
        <button type="button" class="album-nav album-prev" aria-label="Foto anterior">‹</button>
        <img alt="">
        <p class="album-lightbox-caption"></p>
        <button type="button" class="album-nav album-next" aria-label="Foto siguiente">›</button>`;
    document.body.appendChild(box);
    const boxImg = box.querySelector("img");
    const boxCap = box.querySelector(".album-lightbox-caption");
    let activo = null;

    function abrir(api) { activo = api; box.classList.add("open"); document.body.style.overflow = "hidden"; sync(); }
    function cerrar()   { box.classList.remove("open"); document.body.style.overflow = ""; activo = null; }
    function sync() {
        if (!activo) return;
        boxImg.src = activo.foto().src;
        boxImg.alt = activo.foto().alt;
        boxCap.textContent = activo.foto().caption;
    }

    box.querySelector(".album-lightbox-close").addEventListener("click", cerrar);
    box.addEventListener("click", e => { if (e.target === box) cerrar(); });
    box.querySelector(".album-prev").addEventListener("click", () => { activo.ir(-1); sync(); });
    box.querySelector(".album-next").addEventListener("click", () => { activo.ir(1); sync(); });
    document.addEventListener("keydown", e => {
        if (!activo) return;
        if (e.key === "Escape") cerrar();
        if (e.key === "ArrowLeft")  { activo.ir(-1); sync(); }
        if (e.key === "ArrowRight") { activo.ir(1); sync(); }
    });

    albums.forEach(album => {
        const thumbs = Array.from(album.querySelectorAll(".album-thumb"));
        const img = album.querySelector(".album-img");
        const cap = album.querySelector(".album-caption");
        const count = album.querySelector(".album-count");
        const main = album.querySelector(".album-main");
        let i = 0;

        /* Las fotos verticales se muestran completas para que no se recorten */
        const ajustar = () => img.classList.toggle("is-portrait", img.naturalHeight > img.naturalWidth * 1.05);
        img.addEventListener("load", ajustar);
        if (img.complete) ajustar();

        function mostrar(n) {
            i = (n + thumbs.length) % thumbs.length;
            const t = thumbs[i];
            img.src = t.dataset.src;
            img.alt = t.dataset.alt;
            cap.textContent = t.dataset.caption;
            count.textContent = `${i + 1} / ${thumbs.length}`;
            thumbs.forEach((b, k) => b.classList.toggle("active", k === i));
            img.classList.remove("fade"); void img.offsetWidth; img.classList.add("fade");
            t.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
        }

        const api = {
            ir: d => mostrar(i + d),
            foto: () => ({ src: thumbs[i].dataset.src, alt: thumbs[i].dataset.alt, caption: thumbs[i].dataset.caption })
        };

        thumbs.forEach((b, k) => b.addEventListener("click", () => mostrar(k)));
        album.querySelector(".album-prev").addEventListener("click", e => { e.stopPropagation(); mostrar(i - 1); });
        album.querySelector(".album-next").addEventListener("click", e => { e.stopPropagation(); mostrar(i + 1); });
        album.querySelector(".album-zoom").addEventListener("click", e => { e.stopPropagation(); abrir(api); });

        /* deslizar con el dedo / clic para ampliar */
        let x0 = null;
        main.addEventListener("pointerdown", e => { x0 = e.clientX; });
        main.addEventListener("pointerup", e => {
            if (x0 === null) return;
            const dx = e.clientX - x0; x0 = null;
            if (Math.abs(dx) > 40) mostrar(i + (dx < 0 ? 1 : -1));
            else if (!e.target.closest(".album-nav, .album-zoom")) abrir(api);
        });
        main.addEventListener("pointercancel", () => { x0 = null; });
    });
})();
