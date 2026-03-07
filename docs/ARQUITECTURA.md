# Arquitectura técnica

---

## Filosofía

Single-file application. Todo el sitio vive en un único archivo HTML: estilos, scripts e imágenes (base64 inline). Esto garantiza portabilidad total — funciona en cualquier entorno sin servidor ni build process.

---

## Estructura del DOM

```
body
├── .pre              → Preloader (barra de carga)
├── .grain            → Overlay de ruido (SVG animado)
├── .cd / .cr         → Cursor personalizado (dot + ring)
├── #pcv              → Canvas para explosión de partículas
├── .prog             → Barra de progreso (bottom, fixed)
├── .skip-btn         → Botón de navegación rápida
├── .lb               → Lightbox fullscreen
├── .intro            → Pantalla de entrada (Yari / Casanova)
├── .nav              → Navegación fija (mix-blend-mode)
└── .site             → Contenido principal
    ├── .hero         → Hero con cita del artista
    ├── .sb#brk-e     → Break: Elegancia Oscura
    ├── .gal#gal-e    → Galería serie 1 (6 obras, 1500vh)
    ├── .qb#qb1       → Quote break: El león...
    ├── .sb#brk-s     → Break: El Rugido Urbano
    ├── .gal#gal-s    → Galería serie 2 (4 obras, 1000vh)
    ├── .qb#qb2       → Quote break: Soy bastante inquieto...
    ├── .about        → Sección del artista (bio + social proof)
    ├── .qb#qb3       → Quote break: Se puede...
    └── .contact      → Sección de contacto
```

---

## Sistema de galería

Cada sección `.gal` tiene una altura total de `N × 250vh` (donde N = cantidad de obras). Dentro hay un `.gal-vp` sticky que ocupa `100vh` y funciona como viewport.

El scroll controla qué obra se muestra mediante cálculo proporcional:

```
scrollProgress = -rect.top / (galleryHeight - viewportHeight)
currentSlide = floor(scrollProgress × (totalSlides - 1))
```

Las transiciones entre obras usan una función de suavizado sigmoide para evitar parpadeos en el punto medio.

---

## Sistema de animación

| Tipo | Tecnología | Uso |
|---|---|---|
| Intro explosión | Canvas 2D | 4 capas de partículas con física simulada |
| Scroll parallax | requestAnimationFrame | Imágenes de galería con translateY dinámico |
| Apariciones | IntersectionObserver | About paragraphs, serie breaks, quote breaks |
| Micro-interacciones | CSS transitions | Hover en cards, nav links, botones |
| Breathing glows | CSS @keyframes | Hero glow, quote break glows |
| Paint gradient | CSS animation | background-position loop 8s en todos los elementos |

---

## Responsive design

Tres breakpoints principales:

| Breakpoint | Cambios clave |
|---|---|
| > 768px | Layout completo, cursor custom, grid About 2 columnas |
| ≤ 768px | Sin cursor custom, About 1 columna, tipografía reducida, glows menores |
| ≤ 480px | Tipografía mínima, nav ultra-compacto, hero texto reducido |

El cursor personalizado se desactiva con `@media(pointer:coarse)` para dispositivos touch.

---

## Performance

- **Lazy loading:** Todas las imágenes de galería usan `loading="lazy"`.
- **Passive listeners:** El scroll listener usa `{passive:true}` para no bloquear el thread principal.
- **requestAnimationFrame:** Throttling natural del scroll handler.
- **Will-change:** Aplicado a elementos que se transforman frecuentemente (slides).
- **Single repaint:** El loop de animación actualiza todas las galerías en un solo frame.

---

## Tipografía

| Fuente | Uso | Variable |
|---|---|---|
| Fraunces (variable) | Títulos, citas, nombres de obras | opsz 9–144, wght 100–900 |
| Libre Franklin (variable) | Body text, labels, navegación | wght 100–900 |

Se usa `font-variation-settings: "opsz" 72` como valor base para optical sizing.

---

## Colores

| Token | Valor | Uso |
|---|---|---|
| --cream | #f0ebe4 | Texto principal sobre fondo oscuro |
| --dark | #0a0a0a | Fondo base |
| --paint | gradiente 7 colores | Sistema de acento visual |

La paleta paint gradient: `#e63946 → #f4a261 → #e9c46a → #2a9d8f → #9b5de5 → #e63946 → #f4a261`
