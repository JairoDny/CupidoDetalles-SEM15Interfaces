/**
 * DetallesCupido - Módulo de Pagos y Checkout
 * Manejo de métodos de pago, dedicatoria romántica, validación y confirmación
 */

let metodoPagoSeleccionado = "yape";

function inicializarPaginaPago() {
  const contenedorMetodos = document.getElementById("contenedor-metodos-pago");
  const formCheckout = document.getElementById("form-checkout-pago");
  const contenedorResumenCheckout = document.getElementById("checkout-resumen-totales");

  // Si no estamos en pago.html, no ejecutar checkout
  if (!formCheckout) return;

  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    mostrarAvisoCarritoVacioCheckout();
    return;
  }

  // Sincronizar resumen del pedido en la columna derecha
  sincronizarResumenCheckout();

  // Configurar pestañas / selectores de métodos de pago
  configurarSelectoresPago();

  // Fecha mínima para entrega (a partir de hoy)
  const inputFecha = document.getElementById("checkout-fecha-entrega");
  if (inputFecha) {
    const hoy = new Date().toISOString().split("T")[0];
    inputFecha.min = hoy;
    inputFecha.value = hoy;
  }

  // Manejar envío del formulario
  formCheckout.addEventListener("submit", (e) => {
    e.preventDefault();
    procesarPedido(formCheckout);
  });
}

function mostrarAvisoCarritoVacioCheckout() {
  const wrapper = document.querySelector(".checkout-layout");
  const esPaginaInterna = window.location.pathname.includes("/paginas/");
  const rutaCatalogo = esPaginaInterna ? "catalogo.html" : "paginas/catalogo.html";

  if (wrapper) {
    wrapper.innerHTML = `
      <div class="checkout-vacio-box">
        <div class="icono-vacio">💔</div>
        <h2>¡No tienes productos en tu carrito!</h2>
        <p>Para proceder al pago, primero debes elegir los regalos y detalles con los que deseas enamorar.</p>
        <a href="${rutaCatalogo}" class="btn-primario">Ir al Catálogo de Regalos</a>
      </div>
    `;
  }
}

function sincronizarResumenCheckout() {
  const contenedorItems = document.getElementById("checkout-lista-items");
  const contenedorTotales = document.getElementById("checkout-resumen-totales");
  if (!contenedorItems || !contenedorTotales) return;

  const carrito = obtenerCarrito();
  const totales = calcularTotales();

  let htmlItems = "";
  carrito.forEach(item => {
    const rutaImg = corregirRutaAsset(item.imagen);
    htmlItems += `
      <div class="checkout-item-mini">
        <img src="${rutaImg}" alt="${item.nombre}" onerror="this.onerror=null; this.src='../assets/img/productos/caja-sorpresa.svg'">
        <div class="checkout-item-datos">
          <strong>${item.nombre}</strong>
          <span>Cant: ${item.cantidad} &bull; ${formatearPrecio(item.precio * item.cantidad)}</span>
        </div>
      </div>
    `;
  });
  contenedorItems.innerHTML = htmlItems;

  let cuponLinea = "";
  if (totales.cupon) {
    cuponLinea = `
      <div class="resumen-linea descuento">
        <span>Descuento (${totales.cupon.codigo}):</span>
        <strong>-${formatearPrecio(totales.descuento)}</strong>
      </div>
    `;
  }

  contenedorTotales.innerHTML = `
    <div class="resumen-linea">
      <span>Subtotal:</span>
      <strong>${formatearPrecio(totales.subtotal)}</strong>
    </div>
    ${cuponLinea}
    <div class="resumen-linea">
      <span>Envío:</span>
      <strong>${totales.costoEnvio === 0 ? "¡GRATIS!" : formatearPrecio(totales.costoEnvio)}</strong>
    </div>
    <div class="resumen-linea total-destacado">
      <span>Total a Pagar:</span>
      <span class="total-monto">${formatearPrecio(totales.total)}</span>
    </div>
  `;
}

function configurarSelectoresPago() {
  const tarjetasMetodo = document.querySelectorAll(".opcion-metodo-pago");
  const panelesDetalle = document.querySelectorAll(".detalle-metodo-panel");

  tarjetasMetodo.forEach(tarjeta => {
    tarjeta.addEventListener("click", () => {
      tarjetasMetodo.forEach(t => t.classList.remove("activo"));
      tarjeta.classList.add("activo");

      const metodo = tarjeta.dataset.metodo;
      metodoPagoSeleccionado = metodo;

      panelesDetalle.forEach(panel => {
        if (panel.dataset.metodoPanel === metodo) {
          panel.classList.add("activo");
        } else {
          panel.classList.remove("activo");
        }
      });
    });
  });
}

function copiarTexto(texto, label = "Dato") {
  navigator.clipboard.writeText(texto).then(() => {
    mostrarToast(`¡${label} copiado al portapapeles!`, "exito");
  }).catch(() => {
    mostrarToast(`Copia manual: ${texto}`, "info");
  });
}

function procesarPedido(form) {
  // Recopilar datos
  const nombreComprador = form["comprador_nombre"].value.trim();
  const telefonoComprador = form["comprador_telefono"].value.trim();
  const emailComprador = form["comprador_email"].value.trim();

  const nombreDestinatario = form["destinatario_nombre"].value.trim();
  const direccionEntrega = form["destinatario_direccion"].value.trim();
  const referenciaEntrega = form["destinatario_referencia"].value.trim();
  const fechaEntrega = form["entrega_fecha"].value;
  const horarioEntrega = form["entrega_horario"].value;
  const dedicatoria = form["tarjeta_dedicatoria"].value.trim();

  if (!nombreComprador || !telefonoComprador || !nombreDestinatario || !direccionEntrega || !fechaEntrega) {
    mostrarToast("Por favor completa los campos obligatorios (*)", "error");
    return;
  }

  const carrito = obtenerCarrito();
  const totales = calcularTotales();
  const codigoOrden = "CUPIDO-" + Math.floor(100000 + Math.random() * 900000);

  // Crear objeto del pedido
  const pedido = {
    codigo: codigoOrden,
    fechaPedido: new Date().toLocaleDateString("es-PE"),
    comprador: { nombre: nombreComprador, telefono: telefonoComprador, email: emailComprador },
    destinatario: { nombre: nombreDestinatario, direccion: direccionEntrega, referencia: referenciaEntrega },
    entrega: { fecha: fechaEntrega, horario: horarioEntrega },
    dedicatoria: dedicatoria || "Con todo mi amor para ti ❤️",
    metodoPago: metodoPagoSeleccionado,
    items: carrito,
    totales: totales
  };

  // Mostrar modal de confirmación
  mostrarModalConfirmacion(pedido);

  // Vaciar carrito tras el pedido exitoso
  vaciarCarrito(false);
}

function mostrarModalConfirmacion(pedido) {
  let modal = document.getElementById("modal-confirmacion-pedido");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal-confirmacion-pedido";
    modal.className = "modal-overlay activo";
    document.body.appendChild(modal);
  }

  const textoWhatsApp = generarMensajeWhatsApp(pedido);
  const urlWhatsApp = `https://wa.me/51987654321?text=${encodeURIComponent(textoWhatsApp)}`;

  const esPaginaInterna = window.location.pathname.includes("/paginas/");
  const rutaInicio = esPaginaInterna ? "../index.html" : "index.html";

  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-dialogo modal-exito">
      <div class="modal-exito-header">
        <div class="icono-cupido-exito">💘</div>
        <h2>¡Pedido Recibido con Éxito!</h2>
        <span class="codigo-orden-badge">${pedido.codigo}</span>
        <p class="subtitulo-exito">Gracias <strong>${pedido.comprador.nombre}</strong>. Estamos listos para preparar tu detalle con todo el amor que se merece.</p>
      </div>

      <div class="modal-exito-body">
        <div class="resumen-pedido-card">
          <h4>📦 Resumen de la Sorpresa</h4>
          <p><strong>Para:</strong> ${pedido.destinatario.nombre}</p>
          <p><strong>Dirección:</strong> ${pedido.destinatario.direccion} ${pedido.destinatario.referencia ? '(' + pedido.destinatario.referencia + ')' : ''}</p>
          <p><strong>Fecha y Hora:</strong> ${pedido.entrega.fecha} &bull; ${pedido.entrega.horario}</p>
          <p><strong>Método de Pago:</strong> <span class="tag-metodo">${pedido.metodoPago.toUpperCase()}</span></p>
          <p><strong>Total:</strong> <strong class="texto-rojo">${formatearPrecio(pedido.totales.total)}</strong></p>
          
          <div class="dedicatoria-preview-box">
            <span>💌 Dedicatoria en la tarjeta:</span>
            <em>"${pedido.dedicatoria}"</em>
          </div>
        </div>

        <div class="alerta-whatsapp-paso">
          <p><strong>Paso final:</strong> Envíanos un mensaje por WhatsApp con tu número de orden o comprobante para coordinar el envío de inmediato.</p>
        </div>

        <div class="modal-exito-acciones">
          <a href="${urlWhatsApp}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-confirmar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.203.043.072.043.419-.101.824z"/>
            </svg>
            Confirmar Pedido por WhatsApp
          </a>

          <a href="${rutaInicio}" class="btn-secundario btn-bloque">
            Volver a la Página Principal
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.classList.add("no-scroll");
}

function generarMensajeWhatsApp(p) {
  let itemsLista = p.items.map(it => `• ${it.cantidad}x ${it.nombre}`).join("\n");
  
  return `¡Hola DetallesCupido! 💘 Acabo de realizar el pedido *${p.codigo}*:\n\n` +
    `👤 *Cliente:* ${p.comprador.nombre} (${p.comprador.telefono})\n` +
    `🎁 *Para:* ${p.destinatario.nombre}\n` +
    `📍 *Dirección:* ${p.destinatario.direccion}\n` +
    `📅 *Fecha de Entrega:* ${p.entrega.fecha} (${p.entrega.horario})\n` +
    `💌 *Dedicatoria:* "${p.dedicatoria}"\n\n` +
    `🛍️ *Detalles del pedido:*\n${itemsLista}\n\n` +
    `💳 *Método de Pago:* ${p.metodoPago.toUpperCase()}\n` +
    `💰 *Total a pagar:* ${formatearPrecio(p.totales.total)}\n\n` +
    `¡Adjunto mi comprobante para coordinar la entrega! Muchas gracias ✨`;
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarPaginaPago();
});
