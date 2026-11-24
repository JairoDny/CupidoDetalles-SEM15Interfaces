/**
 * DetallesCupido - Módulo de Catálogo
 * Renderizado de productos, filtros por categoría y precio, ordenamiento y vista rápida
 */

// Estado actual de filtros
let estadoFiltros = {
  categoria: "todos",
  precioMax: 250,
  busqueda: "",
  orden: "destacados"
};

/**
 * Genera el HTML de una tarjeta de producto moderna
 */
function crearTarjetaProducto(p) {
  const rutaImg = corregirRutaAsset(p.imagen);
  const estrellas = "★".repeat(Math.floor(p.calificacion)) + (p.calificacion % 1 !== 0 ? "½" : "");

  let etiquetaBadge = "";
  if (p.etiqueta) {
    etiquetaBadge = `<span class="badge-etiqueta">${p.etiqueta}</span>`;
  }

  let precioAnteriorHtml = "";
  if (p.precioAnterior && p.precioAnterior > p.precio) {
    precioAnteriorHtml = `<span class="precio-tachado">${formatearPrecio(p.precioAnterior)}</span>`;
  }

  return `
    <article class="tarjeta-producto" data-id="${p.id}" data-categoria="${p.categoria}">
      <div class="tarjeta-imagen-wrapper">
        ${etiquetaBadge}
        <button class="btn-favorito-corazon" onclick="animarCorazonFavorito(this)" title="Añadir a deseos">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <img 
          src="${rutaImg}" 
          alt="${p.nombre}" 
          class="producto-imagen" 
          loading="lazy"
          onerror="this.onerror=null; this.src='${corregirRutaAsset('assets/img/productos/caja-sorpresa.svg')}'"
        >
        <div class="tarjeta-overlay-acciones">
          <button type="button" class="btn-vista-rapida" onclick="abrirModalDetalle(${p.id})">
            👁️ Vista Rápida
          </button>
        </div>
      </div>

      <div class="tarjeta-cuerpo">
        <span class="producto-categoria-texto">${p.categoriaTexto}</span>
        <h3 class="producto-titulo">${p.nombre}</h3>
        
        <div class="producto-estrellas" title="${p.calificacion} de 5 estrellas">
          <span class="estrellas-iconos">${estrellas}</span>
          <span class="estrellas-conteo">(${p.resenas})</span>
        </div>

        <p class="producto-descripcion">${p.descripcionCorta}</p>

        <div class="producto-pie">
          <div class="producto-precios">
            ${precioAnteriorHtml}
            <span class="precio-actual">${formatearPrecio(p.precio)}</span>
          </div>
          <button type="button" class="btn-agregar-carrito" onclick="agregarAlCarrito(${p.id}, 1)" title="Agregar al carrito">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Renderizar productos destacados (en index.html)
 */
function renderizarProductosDestacados() {
  const contenedor = document.getElementById("productos-destacados-grid");
  if (!contenedor) return;

  const destacados = obtenerProductosDestacados();
  contenedor.innerHTML = destacados.map(p => crearTarjetaProducto(p)).join("");
}

/**
 * Renderizar catálogo completo con filtros activos (en catalogo.html)
 */
function renderizarCatalogo() {
  const contenedor = document.getElementById("catalogo-productos-grid");
  const contadorEl = document.getElementById("catalogo-contador-resultados");
  if (!contenedor) return;

  const lista = filtrarProductos(estadoFiltros);

  if (contadorEl) {
    contadorEl.textContent = `Mostrando ${lista.length} de ${PRODUCTOS.length} regalos románticos`;
  }

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <div class="catalogo-vacio-busqueda">
        <div class="icono-vacio">🔍</div>
        <h3>No encontramos regalos con esos criterios</h3>
        <p>Intenta ajustar el rango de precios o buscar con otras palabras mágicas de amor.</p>
        <button class="btn-secundario" onclick="restablecerFiltros()">Limpiar Filtros</button>
      </div>
    `;
    return;
  }

  contenedor.innerHTML = lista.map(p => crearTarjetaProducto(p)).join("");
}

/**
 * Inicializar eventos de filtros
 */
function inicializarFiltrosCatalogo() {
  // Filtro de categorías (pills o tabs)
  const tabsCategorias = document.querySelectorAll(".filtro-categoria-btn");
  tabsCategorias.forEach(btn => {
    btn.addEventListener("click", () => {
      tabsCategorias.forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
      estadoFiltros.categoria = btn.dataset.categoria;
      renderizarCatalogo();
    });
  });

  // Filtro de slider de precio
  const sliderPrecio = document.getElementById("filtro-precio-slider");
  const displayPrecio = document.getElementById("filtro-precio-display");
  if (sliderPrecio && displayPrecio) {
    sliderPrecio.addEventListener("input", (e) => {
      const valor = parseFloat(e.target.value);
      estadoFiltros.precioMax = valor;
      displayPrecio.textContent = `Hasta ${formatearPrecio(valor)}`;
      renderizarCatalogo();
    });
  }

  // Ordenamiento
  const selectOrden = document.getElementById("catalogo-orden-select");
  if (selectOrden) {
    selectOrden.addEventListener("change", (e) => {
      estadoFiltros.orden = e.target.value;
      renderizarCatalogo();
    });
  }

  // Soporte para leer categoría desde URL si vino desde el navbar o portada
  const params = new URLSearchParams(window.location.search);
  const catUrl = params.get("categoria");
  if (catUrl) {
    estadoFiltros.categoria = catUrl;
    tabsCategorias.forEach(b => {
      if (b.dataset.categoria === catUrl) {
        b.classList.add("activo");
      } else {
        b.classList.remove("activo");
      }
    });
  }
}

function restablecerFiltros() {
  estadoFiltros = {
    categoria: "todos",
    precioMax: 250,
    busqueda: "",
    orden: "destacados"
  };

  const tabsCategorias = document.querySelectorAll(".filtro-categoria-btn");
  tabsCategorias.forEach(b => {
    if (b.dataset.categoria === "todos") b.classList.add("activo");
    else b.classList.remove("activo");
  });

  const sliderPrecio = document.getElementById("filtro-precio-slider");
  const displayPrecio = document.getElementById("filtro-precio-display");
  if (sliderPrecio && displayPrecio) {
    sliderPrecio.value = 250;
    displayPrecio.textContent = "Hasta S/ 250.00";
  }

  const inputBuscar = document.getElementById("buscador-input-catalogo");
  if (inputBuscar) inputBuscar.value = "";

  renderizarCatalogo();
}

/**
 * Animación de corazón favorito
 */
function animarCorazonFavorito(btn) {
  btn.classList.toggle("favorito-activo");
  const svg = btn.querySelector("svg");
  if (btn.classList.contains("favorito-activo")) {
    svg.setAttribute("fill", "#D62839");
    svg.setAttribute("stroke", "#D62839");
    mostrarToast("¡Añadido a tus favoritos!", "exito");
  } else {
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
  }
}

/**
 * Modal de Vista Rápida de Producto
 */
function abrirModalDetalle(id) {
  const p = obtenerProductoPorId(id);
  if (!p) return;

  let modal = document.getElementById("modal-vista-rapida");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal-vista-rapida";
    modal.className = "modal-overlay";
    document.body.appendChild(modal);
  }

  const rutaImg = corregirRutaAsset(p.imagen);

  modal.innerHTML = `
    <div class="modal-backdrop" onclick="cerrarModalDetalle()"></div>
    <div class="modal-dialogo modal-producto">
      <button type="button" class="modal-cerrar" onclick="cerrarModalDetalle()">&times;</button>
      <div class="modal-grid-producto">
        <div class="modal-col-imagen">
          <img src="${rutaImg}" alt="${p.nombre}" onerror="this.onerror=null; this.src='${corregirRutaAsset('assets/img/productos/caja-sorpresa.svg')}'">
          ${p.etiqueta ? `<span class="badge-etiqueta">${p.etiqueta}</span>` : ''}
        </div>
        <div class="modal-col-detalles">
          <span class="producto-categoria-texto">${p.categoriaTexto}</span>
          <h2>${p.nombre}</h2>
          
          <div class="producto-estrellas">
            <span class="estrellas-iconos">★★★★★</span>
            <span>${p.calificacion} (${p.resenas} parejas felices)</span>
          </div>

          <div class="modal-precios">
            ${p.precioAnterior ? `<span class="precio-tachado">${formatearPrecio(p.precioAnterior)}</span>` : ''}
            <span class="precio-actual">${formatearPrecio(p.precio)}</span>
            <span class="badge-stock">✓ En Stock para entrega</span>
          </div>

          <p class="modal-descripcion">${p.descripcionLarga}</p>

          <div class="modal-beneficios-lista">
            <div>💌 <span>Incluye tarjeta con dedicatoria romántica gratis</span></div>
            <div>🎁 <span>Empaque de regalo con lazo satinado</span></div>
            <div>🚚 <span>Envío seguro y programado a domicilio</span></div>
          </div>

          <div class="modal-acciones-compra">
            <div class="cantidad-control">
              <button type="button" class="btn-cant" onclick="decrementarModalCant()">-</button>
              <input type="number" id="modal-cant-input" value="1" min="1" max="99">
              <button type="button" class="btn-cant" onclick="incrementarModalCant()">+</button>
            </div>
            <button type="button" class="btn-primario btn-agregar-modal" onclick="agregarDesdeModal(${p.id})">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("activo");
  document.body.classList.add("no-scroll");
}

function cerrarModalDetalle() {
  const modal = document.getElementById("modal-vista-rapida");
  if (modal) {
    modal.classList.remove("activo");
    document.body.classList.remove("no-scroll");
  }
}

function decrementarModalCant() {
  const inp = document.getElementById("modal-cant-input");
  if (inp && parseInt(inp.value) > 1) {
    inp.value = parseInt(inp.value) - 1;
  }
}

function incrementarModalCant() {
  const inp = document.getElementById("modal-cant-input");
  if (inp) {
    inp.value = parseInt(inp.value) + 1;
  }
}

function agregarDesdeModal(id) {
  const inp = document.getElementById("modal-cant-input");
  const cant = inp ? parseInt(inp.value) : 1;
  agregarAlCarrito(id, cant);
  cerrarModalDetalle();
}

// Inicialización en DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  renderizarProductosDestacados();
  renderizarCatalogo();
  inicializarFiltrosCatalogo();
});
