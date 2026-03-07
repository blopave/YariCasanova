# Changelog — Yari Casanova Portfolio

---

## v13 — Final Polish (Febrero 2026)

### Nuevas funcionalidades
- **Lightbox fullscreen:** Click en cualquier obra abre vista de detalle a pantalla completa. Navegación con flechas laterales y teclado (← → Esc). Incluye título, subtítulo, técnica, año y botón "Consultar disponibilidad" con mailto directo.
- **Social proof:** Sección en About con colecciones destacadas — Michael Bublé & Luisana Lopilato, Fernando Burlando, Benito Fernández, Presidencia de la Nación Argentina.
- **Transición intro→hero:** El hero incorpora un glow residual que simula los rastros de la explosión del intro, creando continuidad visual entre ambas pantallas.

### Sistema de diseño — Paint Gradient
- Gradiente multicolor como sistema visual del sitio completo.
- Paleta: `#e63946 → #f4a261 → #e9c46a → #2a9d8f → #9b5de5`
- Aplicación: texto de citas, título "Hablemos", hover de nav, líneas divisorias, barra de progreso, divider del About.
- Animación sincronizada de 8 segundos (background-position loop).

### Quote breaks
- 4 frases reales de Yari Casanova extraídas de entrevistas publicadas.
- Diseño: fondo oscuro, glow respirante (radial gradient pulsante), línea paint gradient.
- Sin comillas decorativas — diseño limpio y tipográfico.

### Mejoras de galería
- Hover en obras: `scale(1.04)` + sombra intensificada.
- Ícono de lupa en hover que invita al click.
- Eliminado el contador (01/10) por decisión de diseño.
- Eliminada la numeración de series (Serie I / Serie II).

### Intro mejorada
- 4 capas de partículas: core burst (25), outer ring (40), fine spray (60), drips (15).
- Total: 125 partículas (vs 85 en v12).
- Duración extendida a 2.8 segundos.
- Letras explotan con más rotación, escala y distancia.

### Tipografía
- About name: 6.5rem → 7.5rem
- About location: 1.05rem → 1.2rem
- About bio: 0.86rem → 1rem
- About closing: 1.25rem → 1.4rem
- Quote text: 3rem → 3.2rem
- Serie titles: 11rem → 12rem

### Mobile
- Cursor custom deshabilitado en dispositivos touch (`@media(pointer:coarse)`).
- Touch events agregados (touchend + click).
- Breakpoints: 768px, 480px.
- About: grid colapsa a single column, texto centrado con párrafos alineados a la izquierda.
- Corner marks ocultos. Nav compacto. Glows reducidos.

### Performance
- `loading="lazy"` en todas las imágenes de galería.
- Scroll listener con `{passive:true}`.
- Eliminada lógica de contador no utilizada.

---

## v12 — Professional Package (Febrero 2026)

- Explosión de pintura como intro (Canvas API).
- Scroll cinematográfico de 250vh por obra.
- Entrada cinemática con counter (01/10).
- Sección About con foto del artista.
- Skip navigation button.
- Cursor personalizado con mix-blend-mode.
- Grain overlay y barra de progreso.
- Navegación fija con blend mode.

---

## v1–v11 — Exploración de diseño

| Versión | Concepto |
|---|---|
| v1 | Galería horizontal |
| v2 | Efecto 3D |
| v3 | Dark luxury |
| v4 | White floating |
| v5 | Layout Shantell Martin |
| v6 | Exploración de pintura |
| v7 | Animaciones coreografiadas |
| v8 | Rechazada |
| v9 | Diseño fluido |
| v10 | Stacking cards |
| v11 | Scroll-driven slideshow |
