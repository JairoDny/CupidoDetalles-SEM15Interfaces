/**
 * DetallesCupido - Módulo de Carrito de Compras
 * Manejo de estado en localStorage, cálculos y notificaciones
 */

const STORAGE_KEY_CARRITO = "detalles_cupido_carrito";
const STORAGE_KEY_CUPON = "detalles_cupido_cupon";

// Cupones válidos
const CUPONES_VALIDOS = {
  "AMOR10": { tipo: "porcentaje", valor: 0.10, descripcion: "10% de descuento de bienvenida" },
  "CUPIDO15": { tipo: "porcentaje", valor: 0.15, descripcion: "15% de descuento especial" },
  "SANVALENTIN": { tipo: "fijo", valor: 20.00, descripcion: "S/ 20 de descuento romántico" }
};

/**
 * Obtener items del carrito desde localStorage
 */
function obtenerCarrito() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CARRITO);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error al leer carrito de localStorage:", e);
    return [];
  }
}

/**
 * Guardar items en localStorage y sincronizar contadores
 */
function guardarCarrito(carrito) {
  try {
    localStorage.setItem(STORAGE_KEY_CARRITO, JSON.stringify(carrito));
    actualizarBadgesCarrito();
    window.dispatchEvent(new CustomEvent("carritoActualizado", { detail: { carrito } }));
  } catch (e) {
    console.error("Error al guardar carrito en localStorage:", e);
  }
}

/**
 * Agregar producto al carrito
 */
function agregarAlCarrito(productoId, cantidad = 1) {
  const producto = obtenerProductoPorId(productoId);
  if (!producto) {
    mostrarToast("Producto no encontrado", "error");
    return;
  }

  const carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === parseInt(productoId));

  if (index >= 0) {
    carrito[index].cantidad += parseInt(cantidad);
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      categoriaTexto: producto.categoriaTexto,
      cantidad: parseInt(cantidad)
    });
  }

  guardarCarrito(carrito);
  mostrarToast(`¡"${producto.nombre}" agregado con amor al carrito!`, "exito");

  // Animar el icono del carrito en el navbar
  animarIconoCarrito();
}

/**
 * Cambiar cantidad de un producto (+1 o -1)
 */
function cambiarCantidad(productoId, delta) {
  const carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === parseInt(productoId));

  if (index >= 0) {
    carrito[index].cantidad += parseInt(delta);
    if (carrito[index].cantidad <= 0) {
      carrito.splice(index, 1);
      mostrarToast("Producto eliminado del carrito", "info");
    }
    guardarCarrito(carrito);
    renderizarPaginaCarrito();
    renderizarMiniCarrito();
  }
}

/**
 * Establecer cantidad específica
 */
function establecerCantidad(productoId, cantidad) {
  const cant = parseInt(cantidad);
  const carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === parseInt(productoId));

  if (index >= 0) {
    if (cant <= 0) {
      carrito.splice(index, 1);
      mostrarToast("Producto eliminado del carrito", "info");
    } else {
      carrito[index].cantidad = cant;
    }
    guardarCarrito(carrito);
    renderizarPaginaCarrito();
    renderizarMiniCarrito();
  }
}

/**
 * Eliminar un producto del carrito
 */
function eliminarDelCarrito(productoId) {
  let carrito = obtenerCarrito();
  const prod = carrito.find(p => p.id === parseInt(productoId));
  carrito = carrito.filter(item => item.id !== parseInt(productoId));
  guardarCarrito(carrito);

  if (prod) {
    mostrarToast(`"${prod.nombre}" retirado del carrito`, "info");
  }
  renderizarPaginaCarrito();
  renderizarMiniCarrito();
}

/**
 * Vaciar todo el carrito
 */
function vaciarCarrito(confirmar = true) {
  if (confirmar && !confirm("¿Estás seguro de que deseas vaciar tu carrito de compras?")) {
    return;
  }
  localStorage.removeItem(STORAGE_KEY_CARRITO);
  localStorage.removeItem(STORAGE_KEY_CUPON);
  actualizarBadgesCarrito();
  renderizarPaginaCarrito();
  renderizarMiniCarrito();
  mostrarToast("Tu carrito se ha vaciado", "info");
}

/**
 * Manejo de cupones
 */
function obtenerCuponGuardado() {
  const c = localStorage.getItem(STORAGE_KEY_CUPON);
  return c ? JSON.parse(c) : null;
}

function aplicarCupon(codigo) {
  if (!codigo || codigo.trim() === "") {
    return { exito: false, mensaje: "Por favor escribe un código de cupón." };
  }
  const clean = codigo.trim().toUpperCase();
  if (CUPONES_VALIDOS[clean]) {
    const data = { codigo: clean, ...CUPONES_VALIDOS[clean] };
    localStorage.setItem(STORAGE_KEY_CUPON, JSON.stringify(data));
    actualizarBadgesCarrito();
    renderizarPaginaCarrito();
    return { exito: true, mensaje: `¡Cupón ${clean} aplicado con éxito!`, cupon: data };
  } else {
    return { exito: false, mensaje: "El cupón ingresado no es válido o ya caducó." };
  }
}

function removerCupon() {
  localStorage.removeItem(STORAGE_KEY_CUPON);
  renderizarPaginaCarrito();
  mostrarToast("Cupón removido", "info");
}

/**
 * Calcular subtotales, descuentos y total
 */
function calcularTotales() {
  const carrito = obtenerCarrito();
  const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const cupon = obtenerCuponGuardado();

  let descuento = 0;
  if (cupon && subtotal > 0) {
    if (cupon.tipo === "porcentaje") {
      descuento = subtotal * cupon.valor;
    } else if (cupon.tipo === "fijo") {
      descuento = Math.min(cupon.valor, subtotal);
    }
  }

  // Envío gratuito si supera S/ 150, caso contrario tarifa plana estándar S/ 12
  const envioGratisDesde = 150;
  const costoEnvio = subtotal >= envioGratisDesde || subtotal === 0 ? 0 : 12.00;
  const total = Math.max(0, subtotal - descuento + costoEnvio);
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return {
    subtotal,
    descuento,
    cupon,
    costoEnvio,
    envioGratis: subtotal >= envioGratisDesde,
    faltanteParaEnvioGratis: Math.max(0, envioGratisDesde - subtotal),
    total,
    totalItems
  };
}

/**
 * Actualizar los badges de conteo en la barra de navegación
 */
function actualizarBadgesCarrito() {
  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const badges = document.querySelectorAll(".badge-carrito");

  badges.forEach(badge => {
    badge.textContent = totalItems;
    if (totalItems > 0) {
      badge.classList.remove("oculto");
      badge.style.display = "inline-flex";
    } else {
      badge.classList.add("oculto");
      badge.style.display = "none";
    }
  });
}

function animarIconoCarrito() {
  const cartButtons = document.querySelectorAll(".nav-cart-btn, .icono-carrito-link");
  cartButtons.forEach(btn => {
    btn.classList.add("rebote-amor");
    setTimeout(() => btn.classList.remove("rebote-amor"), 600);
  });
}

/**
 * Notificaciones Flotantes (Toast)
 */
function mostrarToast(mensaje, tipo = "exito") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${tipo}`;

  let icono = "❤️";
  if (tipo === "error") icono = "⚠️";
  if (tipo === "info") icono = "💌";

  toast.innerHTML = `
    <span class="toast-icono">${icono}</span>
    <span class="toast-mensaje">${mensaje}</span>
    <button class="toast-cerrar" onclick="this.parentElement.remove()">&times;</button>
  `;

  toastContainer.appendChild(toast);

  // Auto remover
  setTimeout(() => {
    toast.classList.add("toast-desvanecer");
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/**
 * Renderizado de la página principal del carrito (paginas/carrito.html)
 */
function renderizarPaginaCarrito() {
  const contenedorItems = document.getElementById("carrito-items-lista");
  const contenedorResumen = document.getElementById("carrito-resumen-card");
  const contenedorVacio = document.getElementById("carrito-vacio-aviso");

  if (!contenedorItems) return; // No estamos en carrito.html

  const carrito = obtenerCarrito();
  const totales = calcularTotales();

  if (carrito.length === 0) {
    if (contenedorItems) contenedorItems.innerHTML = "";
    if (contenedorResumen) contenedorResumen.style.display = "none";
    if (contenedorVacio) contenedorVacio.style.display = "block";
    return;
  }

  if (contenedorVacio) contenedorVacio.style.display = "none";
  if (contenedorResumen) contenedorResumen.style.display = "block";

  // Generar HTML de productos
  let itemsHtml = `
    <div class="carrito-tabla-header">
      <span class="col-prod">Detalle</span>
      <span class="col-precio">Precio</span>
      <span class="col-cant">Cantidad</span>
      <span class="col-subtotal">Subtotal</span>
      <span class="col-accion"></span>
    </div>
  `;

  carrito.forEach(item => {
    const subtotalItem = item.precio * item.cantidad;
    const rutaImg = corregirRutaAsset(item.imagen);

    itemsHtml += `
      <div class="carrito-item-fila" data-id="${item.id}">
        <div class="col-prod item-info-box">
          <img src="${rutaImg}" alt="${item.nombre}" class="item-thumb" onerror="this.onerror=null; this.src='../assets/img/productos/caja-sorpresa.svg'">
          <div class="item-detalles">
            <span class="item-categoria">${item.categoriaTexto || 'Regalo'}</span>
            <h4 class="item-nombre">${item.nombre}</h4>
          </div>
        </div>

        <div class="col-precio">
          <span class="precio-etiqueta-movil">Precio:</span>
          <span class="item-precio-unitario">${formatearPrecio(item.precio)}</span>
        </div>

        <div class="col-cant">
          <div class="cantidad-control">
            <button type="button" class="btn-cant" onclick="cambiarCantidad(${item.id}, -1)" title="Disminuir">-</button>
            <input type="number" class="input-cant" value="${item.cantidad}" min="1" max="99" onchange="establecerCantidad(${item.id}, this.value)">
            <button type="button" class="btn-cant" onclick="cambiarCantidad(${item.id}, 1)" title="Aumentar">+</button>
          </div>
        </div>

        <div class="col-subtotal">
          <span class="precio-etiqueta-movil">Subtotal:</span>
          <strong class="item-subtotal-valor">${formatearPrecio(subtotalItem)}</strong>
        </div>

        <div class="col-accion">
          <button type="button" class="btn-eliminar-item" onclick="eliminarDelCarrito(${item.id})" title="Eliminar del carrito">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    `;
  });

  contenedorItems.innerHTML = itemsHtml;

  // Renderizar Resumen
  if (contenedorResumen) {
    const esPaginaInterna = window.location.pathname.includes("/paginas/");
    const rutaPago = esPaginaInterna ? "pago.html" : "paginas/pago.html";
    const rutaCatalogo = esPaginaInterna ? "catalogo.html" : "paginas/catalogo.html";

    let cuponHtml = "";
    if (totales.cupon) {
      cuponHtml = `
        <div class="resumen-linea descuento">
          <span>Cupón (${totales.cupon.codigo}):</span>
          <span class="valor-descuento">-${formatearPrecio(totales.descuento)} <button class="btn-quitar-cupon" onclick="removerCupon()" title="Quitar cupón">&times;</button></span>
        </div>
      `;
    }

    let envioTexto = totales.costoEnvio === 0 
      ? '<span class="envio-gratis">¡GRATIS! 🎉</span>' 
      : formatearPrecio(totales.costoEnvio);

    let barraProgresoEnvio = "";
    if (totales.faltanteParaEnvioGratis > 0) {
      const porcentaje = Math.min(100, (totales.subtotal / 150) * 100);
      barraProgresoEnvio = `
        <div class="alerta-envio-gratis">
          <p>❤️ Agrega <strong>${formatearPrecio(totales.faltanteParaEnvioGratis)}</strong> más para obtener <strong>Envío Gratis</strong>.</p>
          <div class="barra-contenedor"><div class="barra-llenado" style="width: ${porcentaje}%"></div></div>
        </div>
      `;
    } else {
      barraProgresoEnvio = `
        <div class="alerta-envio-gratis exito">
          <p>✨ ¡Felicidades! Tienes <strong>Envío Gratis</strong> para tu detalle de amor.</p>
        </div>
      `;
    }

    contenedorResumen.innerHTML = `
      <div class="card-resumen">
        <h3 class="resumen-titulo">Resumen del Pedido</h3>
        
        ${barraProgresoEnvio}

        <div class="resumen-desglose">
          <div class="resumen-linea">
            <span>Subtotal (${totales.totalItems} productos):</span>
            <strong>${formatearPrecio(totales.subtotal)}</strong>
          </div>
          
          ${cuponHtml}

          <div class="resumen-linea">
            <span>Envío Express a domicilio:</span>
            <strong>${envioTexto}</strong>
          </div>

          <div class="resumen-linea total-destacado">
            <span>Total a Pagar:</span>
            <span class="total-monto">${formatearPrecio(totales.total)}</span>
          </div>
        </div>

        <!-- Caja de Cupon de Descuento -->
        <div class="caja-cupon">
          <label for="input-cupon-codigo">¿Tienes un cupón de amor?</label>
          <div class="cupon-input-grupo">
            <input type="text" id="input-cupon-codigo" placeholder="Ej: AMOR10" uppercase>
            <button type="button" class="btn-aplicar-cupon" onclick="procesarAplicarCupon()">Aplicar</button>
          </div>
          <small class="cupon-sugerencia">Prueba con el cupón <strong>AMOR10</strong> (-10%)</small>
        </div>

        <!-- Botones de Acción -->
        <div class="resumen-botones">
          <a href="${rutaPago}" class="btn-primario btn-bloque">
            Continuar al Pago
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>

          <div class="botones-secundarios">
            <a href="${rutaCatalogo}" class="btn-enlace">
              &larr; Seguir explorando regalos
            </a>
            <button type="button" class="btn-enlace btn-peligro" onclick="vaciarCarrito()">
              Vaciar carrito
            </button>
          </div>
        </div>

        <!-- Garantías de compra -->
        <div class="resumen-garantias">
          <div class="garantia-item">
            <span>🔒</span>
            <p>Pago 100% protegido y seguro</p>
          </div>
          <div class="garantia-item">
            <span>💌</span>
            <p>Tarjeta con dedicatoria romántica GRATIS</p>
          </div>
          <div class="garantia-item">
            <span>⏰</span>
            <p>Entrega puntual en la fecha programada</p>
          </div>
        </div>
      </div>
    `;
  }
}

function procesarAplicarCupon() {
  const input = document.getElementById("input-cupon-codigo");
  if (!input) return;
  const res = aplicarCupon(input.value);
  if (res.exito) {
    mostrarToast(res.mensaje, "exito");
  } else {
    mostrarToast(res.mensaje, "error");
  }
}

/**
 * Mini-Drawer de Carrito (Desplegable lateral desde cualquier página)
 */
function abrirMiniCarrito() {
  let drawer = document.getElementById("mini-carrito-drawer");
  if (!drawer) {
    crearMiniCarritoDrawer();
    drawer = document.getElementById("mini-carrito-drawer");
  }
  renderizarMiniCarrito();
  drawer.classList.add("activo");
  document.body.classList.add("no-scroll");
}

function cerrarMiniCarrito() {
  const drawer = document.getElementById("mini-carrito-drawer");
  if (drawer) {
    drawer.classList.remove("activo");
    document.body.classList.remove("no-scroll");
  }
}

function crearMiniCarritoDrawer() {
  const drawer = document.createElement("div");
  drawer.id = "mini-carrito-drawer";
  drawer.className = "mini-carrito-overlay";
  drawer.innerHTML = `
    <div class="mini-carrito-backdrop" onclick="cerrarMiniCarrito()"></div>
    <div class="mini-carrito-contenido">
      <div class="mini-carrito-header">
        <h3>Tu Carrito de Detalles <span class="corazon-animado">❤️</span></h3>
        <button type="button" class="mini-carrito-cerrar" onclick="cerrarMiniCarrito()">&times;</button>
      </div>
      <div class="mini-carrito-body" id="mini-carrito-items"></div>
      <div class="mini-carrito-footer" id="mini-carrito-footer"></div>
    </div>
  `;
  document.body.appendChild(drawer);
}

function renderizarMiniCarrito() {
  const itemsContainer = document.getElementById("mini-carrito-items");
  const footerContainer = document.getElementById("mini-carrito-footer");
  if (!itemsContainer || !footerContainer) return;

  const carrito = obtenerCarrito();
  const totales = calcularTotales();

  const esPaginaInterna = window.location.pathname.includes("/paginas/");
  const rutaCarrito = esPaginaInterna ? "carrito.html" : "paginas/carrito.html";
  const rutaPago = esPaginaInterna ? "pago.html" : "paginas/pago.html";
  const rutaCatalogo = esPaginaInterna ? "catalogo.html" : "paginas/catalogo.html";

  if (carrito.length === 0) {
    itemsContainer.innerHTML = `
      <div class="mini-carrito-vacio">
        <div class="icono-vacio">💔</div>
        <h4>Tu carrito está vacío</h4>
        <p>Aún no has elegido ese detalle especial para emocionar a tu persona favorita.</p>
        <a href="${rutaCatalogo}" class="btn-primario" onclick="cerrarMiniCarrito()">Explorar Catálogo</a>
      </div>
    `;
    footerContainer.innerHTML = "";
    return;
  }

  let htmlItems = '<ul class="mini-carrito-lista">';
  carrito.forEach(item => {
    const rutaImg = corregirRutaAsset(item.imagen);
    htmlItems += `
      <li class="mini-carrito-item">
        <img src="${rutaImg}" alt="${item.nombre}" class="mini-thumb" onerror="this.onerror=null; this.src='../assets/img/productos/caja-sorpresa.svg'">
        <div class="mini-info">
          <h5>${item.nombre}</h5>
          <span class="mini-precio">${item.cantidad} x ${formatearPrecio(item.precio)}</span>
          <div class="mini-controles">
            <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
            <span>${item.cantidad}</span>
            <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
            <button class="mini-eliminar" onclick="eliminarDelCarrito(${item.id})" title="Eliminar">🗑️</button>
          </div>
        </div>
      </li>
    `;
  });
  htmlItems += '</ul>';
  itemsContainer.innerHTML = htmlItems;

  footerContainer.innerHTML = `
    <div class="mini-subtotal-fila">
      <span>Subtotal estimado:</span>
      <strong>${formatearPrecio(totales.subtotal)}</strong>
    </div>
    <div class="mini-botones">
      <a href="${rutaCarrito}" class="btn-secundario btn-bloque" onclick="cerrarMiniCarrito()">Ver Carrito Completo</a>
      <a href="${rutaPago}" class="btn-primario btn-bloque" onclick="cerrarMiniCarrito()">Comprar Ahora</a>
    </div>
  `;
}

// Inicialización automática de contadores en DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  actualizarBadgesCarrito();
  renderizarPaginaCarrito();
});
