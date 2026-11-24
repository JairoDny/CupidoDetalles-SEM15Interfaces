/**
 * DetallesCupido - Catálogo de Productos
 * Base de datos de productos románticos para parejas
 */

const PRODUCTOS = [
  {
    id: 1,
    nombre: "Caja Sorpresa Romántica",
    categoria: "cajas",
    categoriaTexto: "Cajas Sorpresa",
    precio: 89.90,
    precioAnterior: 110.00,
    descripcionCorta: "Caja de lujo con rosas rojas seleccionadas, chocolates Ferrero Rocher y luces led cálidas.",
    descripcionLarga: "Sorprende a tu persona favorita con nuestra exclusiva Caja Sorpresa Romántica. Incluye 12 rosas rojas naturales de exportación, 8 bombones Ferrero Rocher, iluminación LED cálida con batería, tarjeta personalizada escrita a mano con el mensaje que elijas y un lazo de seda dorado.",
    imagen: "assets/img/productos/caja-sorpresa.svg",
    imagenOnline: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    calificacion: 4.9,
    resenas: 128,
    destacado: true,
    enStock: true,
    etiqueta: "Más Vendido"
  },
  {
    id: 2,
    nombre: "Taza Personalizada Parejas",
    categoria: "personalizados",
    categoriaTexto: "Personalizados",
    precio: 34.90,
    precioAnterior: 45.00,
    descripcionCorta: "Taza de cerámica mágica o blanca con sus mejores fotos, fecha especial y frase de amor.",
    descripcionLarga: "Despierten cada mañana recordando lo mucho que se aman. Taza de alta resistencia apta para microondas y lavavajillas. Puedes personalizarla con hasta 3 fotografías en alta definición, sus nombres y su fecha de aniversario.",
    imagen: "assets/img/productos/taza-personalizada.svg",
    imagenOnline: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    calificacion: 4.8,
    resenas: 94,
    destacado: true,
    enStock: true,
    etiqueta: "Personalizable"
  },
  {
    id: 3,
    nombre: "Peluche Gigante Te Amo (80cm)",
    categoria: "peluches",
    categoriaTexto: "Peluches",
    precio: 95.00,
    precioAnterior: 125.00,
    descripcionCorta: "Oso de peluche extra suave, hipoalergénico, con corazón bordado y lazo satinado.",
    descripcionLarga: "El abrazo más tierno para quien más quieres. Oso de peluche de 80 cm confeccionado en felpa ultra suave, relleno siliconado antialérgico y corazón bordado con la frase 'Te Amo'. Viene perfumado con exquisita fragancia de vainilla y algodón de azúcar.",
    imagen: "assets/img/productos/peluche-gigante.svg",
    imagenOnline: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80",
    calificacion: 5.0,
    resenas: 210,
    destacado: true,
    enStock: true,
    etiqueta: "Favorito"
  },
  {
    id: 4,
    nombre: "Rosa Eterna en Cúpula de Cristal",
    categoria: "rosas",
    categoriaTexto: "Rosas & Flores",
    precio: 119.00,
    precioAnterior: 150.00,
    descripcionCorta: "Rosa preservada estilo Bella y la Bestia con cúpula de vidrio templado y micro luces LED.",
    descripcionLarga: "Símbolo de un amor que nunca marchita. Rosa 100% natural sometida a un delicado proceso de preservación que dura entre 3 y 5 años sin necesidad de agua ni luz solar. Base de madera noble, cúpula de cristal transparente y cascada de microluces de hadas.",
    imagen: "assets/img/productos/rosa-eterna.svg",
    imagenOnline: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    calificacion: 5.0,
    resenas: 165,
    destacado: true,
    enStock: true,
    etiqueta: "Exclusivo"
  },
  {
    id: 5,
    nombre: "Desayuno Sorpresa de Ensueño",
    categoria: "desayunos",
    categoriaTexto: "Desayunos Sorpresa",
    precio: 79.90,
    precioAnterior: 99.00,
    descripcionCorta: "Bandeja de madera con waffles artesanales, jugo natural, café, flores y globo corazón.",
    descripcionLarga: "Inicia el día de tu pareja con una sonrisa inolvidable. Incluye bandeja de pino decorada, waffles belgas con miel de maple y frutos rojos, jugo de naranja recién exprimido, sandwich gourmet, café selecto, ramillete floral y globo metalizado con helio.",
    imagen: "assets/img/productos/desayuno-sorpresa.svg",
    imagenOnline: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80",
    calificacion: 4.9,
    resenas: 180,
    destacado: true,
    enStock: true,
    etiqueta: "Delivery Temprano"
  },
  {
    id: 6,
    nombre: "Pack Aniversario 'Noche de Romance'",
    categoria: "cajas",
    categoriaTexto: "Cajas Sorpresa",
    precio: 139.90,
    precioAnterior: 175.00,
    descripcionCorta: "Vino tinto reserva especial, 2 copas de cristal grabadas, velas aromáticas y pétalos.",
    descripcionLarga: "Todo lo necesario para celebrar su historia de amor. Una botella de Vino Tinto Reserva Especial (750ml), 2 copas de cristal grabadas con sus nombres, velas aromáticas de cera de soya con aroma a frutos rojos, bolsa de pétalos de rosa para decoración y carta personalizada.",
    imagen: "assets/img/productos/pack-aniversario.svg",
    imagenOnline: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
    calificacion: 4.9,
    resenas: 76,
    destacado: true,
    enStock: true,
    etiqueta: "Edición Aniversario"
  },
  {
    id: 7,
    nombre: "Joyero Musical con Collar Corazón Plata 925",
    categoria: "joyeria",
    categoriaTexto: "Joyería & Accesorios",
    precio: 109.00,
    precioAnterior: 140.00,
    descripcionCorta: "Cofre musical en forma de corazón forrado en terciopelo con collar de plata italiana 925.",
    descripcionLarga: "Al abrir este hermoso cofre sonará una dulce melodía romántica mientras revela un fino collar con dije de corazón elaborado en plata de ley 925 con circón suizo brillante. Incluye certificado de autenticidad y tarjeta dedicatoria de amor eterno.",
    imagen: "assets/img/productos/joyero-musical.svg",
    imagenOnline: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    calificacion: 5.0,
    resenas: 89,
    destacado: false,
    enStock: true,
    etiqueta: "Plata 925"
  },
  {
    id: 8,
    nombre: "Cuadro Estelar Personalizado",
    categoria: "personalizados",
    categoriaTexto: "Personalizados",
    precio: 64.90,
    precioAnterior: 85.00,
    descripcionCorta: "Mapa astronómico exacto de cómo estaban las estrellas el día de su primer beso o aniversario.",
    descripcionLarga: "Revive la noche en que todo comenzó. Calculamos con precisión astronómica la posición exacta de las constelaciones para tu fecha, hora y ciudad elegida. Marco de madera lacada de 30x40cm, vidrio protector y código Spotify opcional de su canción favorita.",
    imagen: "assets/img/productos/cuadro-estelar.svg",
    imagenOnline: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&q=80",
    calificacion: 4.8,
    resenas: 112,
    destacado: false,
    enStock: true,
    etiqueta: "Top Creativo"
  },
  {
    id: 9,
    nombre: "Ramo Buchón 50 Rosas Premium con Corona",
    categoria: "rosas",
    categoriaTexto: "Rosas & Flores",
    precio: 189.00,
    precioAnterior: 230.00,
    descripcionCorta: "Ramo estilo buchón con 50 rosas rojas seleccionadas, envoltura de lujo y corona dorada.",
    descripcionLarga: "Una declaración de amor imponente e inolvidable. Confeccionado con 50 rosas rojas de botón grande en tallo largo, papel coreano impermeable negro mate, lazo de raso dorado, mariposas decorativas 3D y corona de princesa dorada.",
    imagen: "assets/img/productos/ramo-buchon.svg",
    imagenOnline: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80",
    calificacion: 5.0,
    resenas: 145,
    destacado: false,
    enStock: true,
    etiqueta: "Impacto Total"
  },
  {
    id: 10,
    nombre: "Lámpara Luna 3D Personalizada",
    categoria: "personalizados",
    categoriaTexto: "Personalizados",
    precio: 74.90,
    precioAnterior: 95.00,
    descripcionCorta: "Lámpara lunar táctil con foto y frase grabada en relieve. 16 colores con control remoto.",
    descripcionLarga: "Impresa en 3D con tecnología biodegradable respetuosa con el medio ambiente. Graba su fotografía y una frase especial que brilla al encenderse. Dispone de 16 colores RGB, control remoto, batería recargable USB y soporte de madera geométrica.",
    imagen: "assets/img/productos/lampara-luna.svg",
    imagenOnline: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    calificacion: 4.9,
    resenas: 83,
    destacado: false,
    enStock: true,
    etiqueta: "Luz Romántica"
  },
  {
    id: 11,
    nombre: "Caja Corazón Chocolates Artesanales",
    categoria: "cajas",
    categoriaTexto: "Cajas Sorpresa",
    precio: 49.90,
    precioAnterior: 65.00,
    descripcionCorta: "Selección de 16 bombones belgas artesanales rellenos de licor, manjar y frutos del bosque.",
    descripcionLarga: "Caja de terciopelo borgoña en forma de corazón con 16 trufas y bombones gourmet elaborados con cacao orgánico al 70%. Rellenos de ganache de maracuyá, avellana crocante, caramelo salado y crema de cereza al licor.",
    imagen: "assets/img/productos/chocolates-artesanales.svg",
    imagenOnline: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
    calificacion: 4.7,
    resenas: 67,
    destacado: false,
    enStock: true,
    etiqueta: "Dulce Amor"
  },
  {
    id: 12,
    nombre: "Pulseras Pareja Amor Infinito (Magnéticas)",
    categoria: "joyeria",
    categoriaTexto: "Joyería & Accesorios",
    precio: 39.90,
    precioAnterior: 55.00,
    descripcionCorta: "Dúo de pulseras de piedra volcánica y howlita blanca con dijes magnéticos que se atraen.",
    descripcionLarga: "La distancia no separa a dos corazones unidos. Dos pulseras confeccionadas a mano con piedras naturales (piedra volcánica negra mate y piedra howlita blanca de la paz). Cuentan con un broche magnético que se atrae mutuamente al estar cerca.",
    imagen: "assets/img/productos/pulseras-pareja.svg",
    imagenOnline: "https://images.unsplash.com/photo-1611591475155-4282f132ffab?auto=format&fit=crop&w=600&q=80",
    calificacion: 4.8,
    resenas: 190,
    destacado: false,
    enStock: true,
    etiqueta: "Dúo Conexión"
  }
];

/**
 * Funciones de utilidad para acceder a los productos
 */
function obtenerTodosLosProductos() {
  return PRODUCTOS;
}

function obtenerProductosDestacados() {
  return PRODUCTOS.filter(p => p.destacado);
}

function obtenerProductoPorId(id) {
  return PRODUCTOS.find(p => p.id === parseInt(id));
}

function filtrarProductos({ categoria = "todos", precioMax = Infinity, busqueda = "", orden = "destacados" } = {}) {
  let resultado = [...PRODUCTOS];

  // Filtro por categoría
  if (categoria && categoria !== "todos") {
    resultado = resultado.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
  }

  // Filtro por precio máximo
  if (precioMax && precioMax < Infinity) {
    resultado = resultado.filter(p => p.precio <= precioMax);
  }

  // Filtro por texto de búsqueda
  if (busqueda && busqueda.trim() !== "") {
    const q = busqueda.toLowerCase().trim();
    resultado = resultado.filter(p => 
      p.nombre.toLowerCase().includes(q) ||
      p.descripcionCorta.toLowerCase().includes(q) ||
      p.categoriaTexto.toLowerCase().includes(q)
    );
  }

  // Ordenamiento
  switch (orden) {
    case "precio-menor":
      resultado.sort((a, b) => a.precio - b.precio);
      break;
    case "precio-mayor":
      resultado.sort((a, b) => b.precio - a.precio);
      break;
    case "nombre":
      resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;
    case "calificacion":
      resultado.sort((a, b) => b.calificacion - a.calificacion);
      break;
    case "destacados":
    default:
      resultado.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
      break;
  }

  return resultado;
}

// Formateador de moneda en Soles (S/.)
function formatearPrecio(precio) {
  return `S/ ${Number(precio).toFixed(2)}`;
}

// Helper para obtener la ruta adecuada según la ubicación del HTML actual
function corregirRutaAsset(ruta) {
  const esPaginaInterna = window.location.pathname.includes("/paginas/");
  if (esPaginaInterna && !ruta.startsWith("../") && !ruta.startsWith("http")) {
    return "../" + ruta;
  }
  return ruta;
}
