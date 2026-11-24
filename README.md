# DetallesCupido 💘 | Tienda Web de Regalos & Amor

**DetallesCupido** es una plataforma web de comercio electrónico y catálogo romántico diseñada para un emprendimiento dedicado a la venta de regalos, flores y sorpresas personalizadas para parejas y fechas especiales (aniversarios, cumpleaños, San Valentín, declaraciones de amor).

---

## 🎨 Paleta de Colores Oficial

- **Color Principal (Rojo Romántico):** `#D62839`
- **Color Secundario (Rosa Suave):** `#F497B6`
- **Color de Fondo (Rosa Claro):** `#FFF1F5`
- **Color para Botones Importantes (Rojo Intenso):** `#C1121F`
- **Color para Textos Principales (Gris Oscuro):** `#2B2B2B`
- **Color para Resaltados (Rosa Pastel):** `#FFD6E0`

---

## 📂 Organización Modular del Proyecto

```text
DetallesCupido/
│
├── index.html                  # Página de inicio con Hero, Destacados, Beneficios y Contacto
│
├── css/
│   ├── estilos.css             # Estilos globales, variables CSS, utilidades y animaciones
│   ├── navbar.css              # Barra de navegación fija, buscador interactivo y badge
│   ├── hero.css                # Portada principal romántica con estadísticas y banner
│   ├── catalogo.css            # Grilla de productos, tarjetas con hover y filtros
│   ├── carrito.css             # Tabla del carrito, resumen de compra y mini-drawer lateral
│   ├── pagos.css               # Pasos de checkout, dedicatoria romántica y métodos de pago
│   ├── nosotros.css            # Historia, misión, visión, valores y testimonios
│   └── footer.css              # Pie de página con redes, horarios y garantías
│
├── js/
│   ├── productos.js            # Base de datos de productos, filtros y formateo de moneda
│   ├── catalogo.js             # Renderizado de tarjetas, filtros por precio/categoría y vista rápida
│   ├── carrito.js              # Manejo del carrito en localStorage, cupones y mini-drawer
│   ├── pagos.js                # Validación de compra, dedicatoria y confirmación por WhatsApp
│   └── buscador.js             # Búsqueda predictiva en tiempo real con debounce
│
├── assets/
│   ├── img/
│   │   ├── logo/               # Logo SVG de DetallesCupido y Favicon
│   │   ├── banner/             # Banners vectoriales del Hero, Promociones y Nosotros
│   │   ├── productos/          # 12 Ilustraciones detalladas para cada producto del catálogo
│   │   └── iconos/             # Íconos de Yape, Plin, Visa, Mastercard, Transferencias y Efectivo
│   └── videos/                 # Carpeta para recursos multimedia adicionales
│
└── paginas/
    ├── catalogo.html           # Catálogo completo con buscador, filtro de precio y categorías
    ├── carrito.html            # Carrito de compras detallado con barra de envío gratis
    ├── pago.html               # Formulario de checkout, selección de pago y dedicatoria
    └── nosotros.html           # Página institucional sobre la historia, misión y valores
```

---

## ✨ Funcionalidades Incluidas

1. **Barra de Navegación Fija (Navbar):**
   - Logo de la marca con animación sutil.
   - Enlaces directos a Inicio, Catálogo, Nosotros y Contacto.
   - Buscador predictivo en tiempo real con ventana emergente de sugerencias, miniaturas y precios.
   - Botón del carrito con contador animado (*badge*) y apertura de un *Mini-Drawer* lateral desde cualquier página.
   - Menú responsive adaptable a teléfonos y tablets con botón hamburguesa animado.

2. **Portada Principal (Hero Section):**
   - Frase destacada: *"Cada detalle cuenta cuando se trata de demostrar amor."*
   - Botones de llamada a la acción: *"Ver Catálogo Completo"* y *"Comprar Ahora"*.
   - Indicadores de confianza: +5,000 sonrisas entregadas, puntualidad y amor garantizado.
   - Ilustración romántica central con elementos flotantes y tarjeta destacada de dedicatoria gratis.

3. **Catálogo y Tarjetas de Productos:**
   - 12 productos románticos (Cajas sorpresa, Rosas eternas en cúpula, Peluches gigantes, Desayunos sorpresa, Tazas personalizadas, Cuadros estelares, Packs de aniversario, Joyeros musicales, Ramos buchones, Lámparas lunares 3D, Chocolates finos y Pulseras de pareja).
   - Tarjetas modernas con bordes redondeados, sombras suaves, insignias (*Más Vendido*, *Personalizable*, *Edición Aniversario*), calificación por estrellas y botón de favoritos con animación de corazón.
   - **Modal de Vista Rápida:** Permite ver la descripción larga del producto, beneficios y seleccionar la cantidad antes de agregarlo al carrito.

4. **Buscador y Filtros Avanzados:**
   - Búsqueda en vivo por nombre, descripción o categoría.
   - Filtro por categorías mediante botones *pills* dinámicos.
   - Filtro interactivo de rango de precio con slider (*slider range*).
   - Selector de ordenamiento (precio menor/mayor, mejor calificados, alfabético o recomendados).

5. **Carrito de Compras Persistente (`localStorage`):**
   - Los productos agregados se conservan entre páginas y sesiones del navegador.
   - Control interactivo de cantidades (+ / -) y eliminación de artículos.
   - Sistema de cupones de descuento (prueba con el cupón **AMOR10** para un 10% de descuento).
   - Barra de progreso dinámica para **Envío Gratis** (compras mayores a S/ 150.00).
   - Acciones para vaciar el carrito o continuar al proceso de pago.

6. **Métodos de Pago Interactivos y Checkout:**
   - Selección visual entre: **Yape**, **Plin**, **Tarjetas Visa/Mastercard**, **Transferencia Bancaria (BCP, BBVA, Interbank)** y **Pago Contraentrega**.
   - Cada método muestra su respectivo panel: Códigos QR con botón de copia rápida de número telefónico o número de cuenta y CCI.
   - **Formulario de Entrega Sorpresa:** Fecha programada, horario de entrega (mañana, tarde, noche) y dirección con referencias.
   - **Dedicatoria Personalizada:** Espacio para que el comprador escriba la carta de amor que acompañará al detalle.
   - **Integración con WhatsApp:** Al confirmar el pedido, genera automáticamente un enlace directo con el mensaje listo para enviar al asesor por WhatsApp con el código de orden, destinatario, dirección, dedicatoria y total.

7. **Sección Nosotros:**
   - Historia de fundación de DetallesCupido.
   - Misión y Visión con diseño en tarjetas elegantes.
   - 4 Valores principales: Amor & Dedicación, Calidad Premium, Puntualidad Absoluta y Empatía.
   - Línea de tiempo visual: *¿Cómo Hacemos Magia?* (Selección, Armado, Carta Manuscrita y Entrega).

8. **Pie de Página (Footer):**
   - Enlaces a redes sociales (Instagram, Facebook, TikTok, WhatsApp).
   - Horarios de atención y cobertura.
   - Formulario de suscripción al *Club de Enamorados* con toast de confirmación.
   - Badges visuales de métodos de pago y derechos reservados.

---

## 🚀 Cómo Ejecutar el Proyecto

1. **Abrir en Visual Studio Code:**
   - Abre la carpeta `IM-DetallesCupido` en VS Code.
2. **Ejecutar con Live Server:**
   - Haz clic derecho sobre el archivo `index.html` y selecciona **"Open with Live Server"** (o usa el botón *Go Live* en la barra inferior de VS Code).
   - Tu navegador abrirá la tienda en `http://127.0.0.1:5500/index.html`.
3. **Exploración sin servidor:**
   - También puedes hacer doble clic directamente en `index.html` para abrirlo en cualquier navegador (Google Chrome, Edge, Firefox).

---

*DetallesCupido - Hecho con ❤️ para transformar sentimientos en momentos inolvidables.*
