/**
 * DetallesCupido - Módulo de Buscador
 * Búsqueda predictiva en tiempo real, debounce y sugerencias
 */

let debounceTimer = null;

function inicializarBuscadores() {
  // 1. Buscador dentro del catálogo
  const inputCatalogo = document.getElementById("buscador-input-catalogo");
  if (inputCatalogo) {
    // Si viene parámetro 'q' en la URL
    const params = new URLSearchParams(window.location.search);
    const queryUrl = params.get("q");
    if (queryUrl) {
      inputCatalogo.value = queryUrl;
      estadoFiltros.busqueda = queryUrl;
      renderizarCatalogo();
    }

    inputCatalogo.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        estadoFiltros.busqueda = e.target.value;
        renderizarCatalogo();
      }, 250);
    });
  }

  // 2. Buscador en la barra de navegación (Navbar Global)
  const navBuscadorForm = document.getElementById("nav-buscador-form");
  const navBuscadorInput = document.getElementById("nav-buscador-input");
  const navSugerenciasBox = document.getElementById("nav-sugerencias-box");

  if (navBuscadorInput && navSugerenciasBox) {
    navBuscadorInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      clearTimeout(debounceTimer);

      if (q.length < 2) {
        navSugerenciasBox.classList.remove("activo");
        navSugerenciasBox.innerHTML = "";
        return;
      }

      debounceTimer = setTimeout(() => {
        mostrarSugerenciasNavbar(q, navSugerenciasBox);
      }, 200);
    });

    // Cerrar sugerencias al hacer click fuera
    document.addEventListener("click", (e) => {
      if (!navBuscadorInput.contains(e.target) && !navSugerenciasBox.contains(e.target)) {
        navSugerenciasBox.classList.remove("activo");
      }
    });

    if (navBuscadorForm) {
      navBuscadorForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const q = navBuscadorInput.value.trim();
        if (q) {
          const esPaginaInterna = window.location.pathname.includes("/paginas/");
          const ruta = esPaginaInterna ? `catalogo.html?q=${encodeURIComponent(q)}` : `paginas/catalogo.html?q=${encodeURIComponent(q)}`;
          window.location.href = ruta;
        }
      });
    }
  }
}

/**
 * Muestra el dropdown predictivo con imágenes y precios en el navbar
 */
function mostrarSugerenciasNavbar(query, contenedor) {
  const coincidencias = PRODUCTOS.filter(p => 
    p.nombre.toLowerCase().includes(query) ||
    p.categoriaTexto.toLowerCase().includes(query) ||
    p.descripcionCorta.toLowerCase().includes(query)
  ).slice(0, 5); // Máximo 5 sugerencias

  if (coincidencias.length === 0) {
    contenedor.innerHTML = `
      <div class="sugerencia-vacia">
        <span>💔 No se encontraron coincidencias para "${query}"</span>
      </div>
    `;
    contenedor.classList.add("activo");
    return;
  }

  const esPaginaInterna = window.location.pathname.includes("/paginas/");
  const rutaCatalogo = esPaginaInterna ? "catalogo.html" : "paginas/catalogo.html";

  let html = '<ul class="sugerencias-lista">';
  coincidencias.forEach(p => {
    const rutaImg = corregirRutaAsset(p.imagen);
    html += `
      <li class="sugerencia-item" onclick="abrirModalDetalle(${p.id})">
        <img src="${rutaImg}" alt="${p.nombre}" class="sugerencia-thumb" onerror="this.onerror=null; this.src='${corregirRutaAsset('assets/img/productos/caja-sorpresa.svg')}'">
        <div class="sugerencia-info">
          <span class="sugerencia-cat">${p.categoriaTexto}</span>
          <strong class="sugerencia-nombre">${p.nombre}</strong>
          <span class="sugerencia-precio">${formatearPrecio(p.precio)}</span>
        </div>
      </li>
    `;
  });

  html += `
    <li class="sugerencia-pie">
      <a href="${rutaCatalogo}?q=${encodeURIComponent(query)}">
        Ver todos los resultados para "${query}" &rarr;
      </a>
    </li>
  `;
  html += '</ul>';

  contenedor.innerHTML = html;
  contenedor.classList.add("activo");
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarBuscadores();
});
