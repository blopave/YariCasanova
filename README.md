# Yari Casanova — Portfolio Web

**Versión:** 1.3 (v13)  
**Fecha:** Febrero 2026  
**Cliente:** Yari Casanova  
**Tipo:** Portfolio de artista — Single Page Application  

---

## Cómo ejecutar

### Opción 1 — Abrir directo
Abrir `index.html` en el navegador. Las imágenes cargan localmente desde la carpeta `img/`.

### Opción 2 — Servidor local (recomendado)
```bash
# Con Python
python3 -m http.server 8000

# Con Node.js
npx serve .

# Con VS Code
# Instalar extensión "Live Server" → click derecho en index.html → "Open with Live Server"
```

Luego abrir `http://localhost:8000` en el navegador.

### Requerimientos
- Chrome 90+ / Safari 15+ / Firefox 88+ / Edge 90+
- JavaScript habilitado
- Conexión a internet (para Google Fonts)

---

## Estructura del proyecto

```
yari-casanova-v13/
├── index.html                          ← Página principal
├── README.md                           ← Este archivo
│
├── css/
│   └── styles.css                      ← Estilos completos (17 secciones documentadas)
│
├── js/
│   └── main.js                         ← Lógica e interactividad (IIFE, comentado)
│
├── img/
│   ├── elegancia-oscura/               ← Serie 1: Elegancia Oscura
│   │   ├── hero-leon-goat.jpg
│   │   ├── leon-cigarro-vino.jpg
│   │   ├── dalmata-sillon.jpg
│   │   ├── bulldog-padrino.jpg
│   │   ├── tigre-blanco.jpg
│   │   └── braco-smoking.jpg
│   │
│   ├── rugido-urbano/                  ← Serie 2: El Rugido Urbano
│   │   ├── leon-rugiendo.jpg
│   │   ├── leon-hoodie.jpg
│   │   ├── leon-dreads.jpg
│   │   └── jabali-tiradores.jpg
│   │
│   ├── leon-mate.jpg                   ← Obras adicionales (no incluidas en galería)
│   └── oso-flores.jpg
│
└── docs/
    ├── CHANGELOG.md                    ← Historial de versiones v1 → v13
    ├── ARQUITECTURA.md                 ← Documentación técnica del proyecto
    └── DECISIONES.md                   ← Fundamentación de decisiones de diseño
```

---

## Stack técnico

| Componente | Tecnología |
|---|---|
| Markup | HTML5 semántico |
| Estilos | CSS3 (custom properties, animations, grid, clamp) |
| Interactividad | JavaScript vanilla ES5+ (sin frameworks) |
| Tipografía | Fraunces + Libre Franklin (Google Fonts) |
| Animaciones | Canvas API (intro), CSS transitions, IntersectionObserver |

**Sin dependencias externas.** No requiere npm, webpack, ni librerías de terceros.

---

## Funcionalidades principales

- Intro animada con explosión de partículas (Canvas 2D, 4 capas, 125 partículas)
- Scroll cinematográfico — 250vh por obra
- Lightbox fullscreen con navegación (click, flechas, teclado)
- Quote breaks con frases reales del artista
- Sistema de diseño Paint Gradient
- Cursor personalizado con mix-blend-mode (desktop)
- Responsive (desktop, tablet, mobile)
- Performance: lazy loading, passive scroll, requestAnimationFrame

---

## Obras incluidas

### Elegancia Oscura (6)
1. **The G.O.A.T.** — León, 2025
2. **El Padrino** — León con cigarro
3. **El Heredero** — Dálmata, 2025
4. **Don Corleone** — Bulldog, 2024
5. **El Gran Gatsby** — Tigre blanco
6. **El Embajador** — Braco alemán

### El Rugido Urbano (4)
1. **Art Is Not a Crime** — León rugiendo
2. **Hood Life** — León con hoodie, 2020
3. **Rebel Soul** — León con dreads, 2022
4. **El Outsider** — Jabalí

---

## Contacto

- **Email:** yari@casanova.art
- **Instagram:** [@yaricasanova](https://instagram.com/yaricasanova)
- **Ubicación:** Gualeguaychú, Entre Ríos, Argentina
