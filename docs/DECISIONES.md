# Decisiones de diseño

Este documento fundamenta las decisiones creativas y técnicas del proyecto.

---

## 1. Single file vs. proyecto modular

**Decisión:** Todo en un único archivo HTML.

**Razón:** El cliente necesita un entregable simple que funcione en cualquier contexto — desde un hosting básico hasta abrirlo desde el escritorio. Las imágenes en base64 eliminan la dependencia de archivos externos y garantizan que el sitio siempre se vea igual.

**Trade-off:** El archivo pesa ~4.7MB. Para producción con alto tráfico se recomienda extraer imágenes a archivos separados y servir con CDN.

---

## 2. Scroll cinematográfico (250vh por obra)

**Decisión:** Cada obra ocupa 250vh de scroll, mostrándose una a la vez en un viewport sticky.

**Razón:** Las pinturas de Yari son densas en detalle y merecen apreciación individual. Un grid tradicional las reduce a thumbnails y pierde impacto. El formato cinematográfico fuerza al visitante a detenerse en cada pieza.

**Trade-off:** Navegar todas las obras requiere scroll extenso. Se mitiga con el botón "Saltar galería" y el lightbox para navegación rápida.

---

## 3. Paint gradient como sistema de diseño

**Decisión:** Un gradiente multicolor (rojo → naranja → amarillo → verde → violeta) que aparece en puntos estratégicos del sitio.

**Razón:** Las pinturas de Yari son explosiones de color sobre fondos oscuros. El sitio refleja este contraste: base monocromática (negro/crema) con toques de color concentrados. El gradiente conecta visualmente todas las secciones sin competir con las obras.

**Aplicación controlada:** Solo aparece en texto de citas, líneas divisorias, hover states y la barra de progreso. Nunca como fondo ni en áreas grandes.

---

## 4. Frases reales del artista

**Decisión:** Usar citas textuales de entrevistas publicadas de Yari en lugar de textos genéricos.

**Razón:** La autenticidad es imposible de fabricar. Las frases de Yari sobre su padre sastre, sobre los leones, sobre su inquietud creativa — cuentan una historia que ningún copywriting podría superar. Posicionan al artista como persona real, no como marca.

**Fuentes:** Entrevistas en medios digitales argentinos (verificables).

---

## 5. Social proof discreto

**Decisión:** Incluir nombres de coleccionistas destacados en la sección About, con diseño ultra-sutil (tipografía pequeña, baja opacidad).

**Razón:** Un galerista o coleccionista necesita validación. Saber que Bublé, Burlando o la Presidencia de la Nación tienen obras de Yari es información que cierra ventas. Pero mostrarlo de forma prominente sería vulgar para un sitio de arte. La sutileza comunica confianza.

---

## 6. Lightbox con "Consultar disponibilidad"

**Decisión:** Al hacer click en una obra, se abre en fullscreen con un CTA de consulta.

**Razón:** Sin esta funcionalidad, un visitante interesado en comprar no tiene camino claro. El lightbox permite ver la obra en detalle y, si hay interés, iniciar contacto directo. El CTA es discreto (borde sutil, texto pequeño) para no romper la experiencia contemplativa.

---

## 7. Intro con explosión de partículas

**Decisión:** Pantalla de entrada con el nombre del artista que explota en partículas de color al hacer click.

**Razón:** La primera impresión define todo. La explosión es una metáfora visual del acto de pintar — caos controlado, color sobre negro. Establece el tono del sitio y genera anticipación antes de ver las obras.

**Técnica:** Canvas 2D con física simulada (velocidad, fricción, gravedad para drips). 4 capas para profundidad visual.

---

## 8. Cursor personalizado

**Decisión:** Cursor custom con dot + ring, mix-blend-mode difference.

**Razón:** Es un detalle de craft que señala calidad. El blend mode hace que el cursor se adapte al contenido — blanco sobre oscuro, oscuro sobre claro — sin intervención. Se desactiva en touch devices donde no aporta valor.

---

## 9. Tipografía: Fraunces + Libre Franklin

**Decisión:** Fraunces (serif variable) para títulos y citas. Libre Franklin (sans variable) para body y UI.

**Razón:** Fraunces tiene personalidad — sus itálicas son expresivas y su optical sizing permite controlar la presencia tipográfica. Libre Franklin es neutral y profesional como contrapunto. Ambas son variable fonts, lo que permite control fino de peso y tamaño sin cargar múltiples archivos.

---

## 10. Opacidades extremadamente bajas

**Decisión:** Muchos elementos usan opacidades de 0.04–0.15 (casi invisibles).

**Razón:** En un sitio de arte, las pinturas son las protagonistas absolutas. Todo lo demás — textos auxiliares, líneas, tags — existe para dar estructura sin competir. La baja opacidad crea capas de información que se revelan con atención, recompensando al visitante que mira con cuidado.
