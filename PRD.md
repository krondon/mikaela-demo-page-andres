# Planning Guide

Una Landing Page moderna y responsiva para la lotería venezolana "Mikaela La Pollita Millonaria" que permite a los usuarios consultar resultados históricos, conocer el reglamento y obtener información sobre las diferentes modalidades de juego.

**Experience Qualities**:
1. **Confiable**: Información clara y precisa sobre resultados de lotería con diseño profesional que transmite legitimidad y seguridad.
2. **Accesible**: Navegación intuitiva mobile-first que permite a usuarios de todas las edades consultar resultados rápidamente desde sus dispositivos móviles.
3. **Vibrante**: Identidad visual alegre y colorida que captura la emoción del juego y la esperanza de ganar, usando los colores característicos de la marca.

**Complexity Level**: Light Application (multiple features with basic state)
- La aplicación presenta múltiples secciones con funcionalidad de búsqueda de resultados, navegación entre secciones, y visualización de datos complejos. Incluye estado para filtros de fecha y tipo de sorteo, además de datos mockup históricos.

## Essential Features

### Búsqueda de Resultados Históricos
- **Functionality**: Permite a los usuarios filtrar y consultar resultados pasados por fecha y tipo de sorteo (Ordinario/Extraordinario)
- **Purpose**: Verificar números ganadores y revisar historial de sorteos para validar premios
- **Trigger**: Usuario selecciona fecha y tipo de sorteo en los inputs del módulo de búsqueda
- **Progression**: Usuario accede a sección Hero → Selecciona tipo de sorteo (dropdown) → Selecciona fecha (date picker) → Sistema muestra tabla de resultados → Usuario visualiza figuras ganadoras con horarios
- **Success criteria**: Resultados se actualizan instantáneamente al cambiar filtros, mostrando formato correcto (10 horarios para ordinario, 6 figuras para extraordinario)

### Visualización de Modalidades de Juego
- **Functionality**: Presenta información detallada sobre las 3 modalidades: La Pollita, Pollo Lleno y Pollo Millonario
- **Purpose**: Educar a usuarios nuevos y servir como referencia rápida sobre reglas y premios
- **Trigger**: Usuario hace scroll a sección de Reglamento o hace clic en navegación
- **Progression**: Usuario navega a sección Reglamento → Visualiza acordeón/tabs con 3 modalidades → Expande modalidad de interés → Lee detalles (apuesta mínima, premios, horarios, reglas especiales)
- **Success criteria**: Información está organizada jerárquicamente, es fácil de escanear, y muestra claramente la regla especial del #21 Mikaela

### Navegación Suave entre Secciones
- **Functionality**: Navegación single-page con smooth scroll entre Hero, Reglamento y Juego Online
- **Trigger**: Usuario hace clic en enlaces del menú de navegación
- **Progression**: Usuario visualiza header fijo → Hace clic en enlace de sección → Página se desplaza suavemente a sección objetivo → Enlace activo se destaca visualmente
- **Success criteria**: Scroll es fluido (300-500ms), header es sticky en mobile, navegación es thumb-friendly

### Preview de Juego Online
- **Functionality**: Sección placeholder que anticipa funcionalidad futura de juego en línea
- **Trigger**: Usuario explora la página o navega a última sección
- **Progression**: Usuario hace scroll a sección final → Visualiza tarjeta con diseño distintivo → Lee mensaje "Próximamente" → Ve ilustración de selección de animales → Encuentra botón deshabilitado de registro
- **Success criteria**: Diseño genera anticipación, usa degradado dorado/oscuro, comunica claramente que está en desarrollo

## Edge Case Handling

- **Fechas sin resultados**: Mostrar mensaje amigable "No hay resultados para esta fecha" en lugar de tabla vacía
- **Navegación en dispositivos muy pequeños (<360px)**: Asegurar que tabla de resultados sea scrollable horizontalmente con indicador visual
- **Sorteo Extraordinario sin datos**: Mostrar estado vacío con ilustración e invitación a revisar sorteo ordinario
- **Figura #21 (Mikaela) ganadora**: Destacar visualmente con badge especial "Paga 40x" en resultados
- **Carga lenta de datos mockup**: Implementar skeleton loaders para tabla de resultados
- **Overflow de nombres largos en mobile**: Truncar nombres de figuras con ellipsis y mostrar tooltip completo al hacer tap

## Design Direction

El diseño debe evocar emoción, esperanza y celebración venezolana - colores vibrantes que reflejan la alegría del juego, tipografía clara y legible para todas las edades, y elementos visuales juguetones (iconos de animales) que hacen referencia a las figuras de la lotería. La interfaz debe sentirse accesible y confiable, balanceando la diversión visual con la profesionalidad necesaria para manejar dinero y resultados oficiales. Optamos por una interfaz rica con ilustraciones y colores característicos que reflejan la identidad cultural del producto.

## Color Selection

Paleta personalizada (Custom palette) basada en la identidad de marca de Mikaela, usando colores vibrantes que evocan energía, optimismo y la cultura venezolana. Los colores deben transmitir confianza (verde), premio (dorado), urgencia (naranja/rojo).

- **Primary Color**: Verde Principal #009640 (Mikaela Green) - Representa crecimiento, esperanza y fortuna. Se usa en botones de acción principal, fondos de secciones clave y elementos de navegación.

- **Secondary Colors**: 
  - Amarillo Dorado #E5B30D (Mikaela Gold) - Evoca premios y riqueza, usado en badges, textos destacados y fondos del hero
  - Naranja Vibrante #EC7333 (Mikaela Orange) - Para estados hover, resultados ganadores y elementos de "Pollo Lleno"

- **Accent Color**: Rojo Intenso #E02C2C (Mikaela Red) - Usado exclusivamente para la figura especial #21 Mikaela y alertas importantes, comunica urgencia y exclusividad

- **Foreground/Background Pairings**:
  - Background (Blanco #FFFFFF): Texto oscuro #1a1a1a - Ratio 16.1:1 ✓
  - Mikaela Green (#009640): Texto blanco #FFFFFF - Ratio 4.52:1 ✓
  - Mikaela Gold (#E5B30D): Texto oscuro #1a1a1a - Ratio 11.8:1 ✓
  - Mikaela Orange (#EC7333): Texto blanco #FFFFFF - Ratio 4.6:1 ✓
  - Mikaela Red (#E02C2C): Texto blanco #FFFFFF - Ratio 5.3:1 ✓
  - Card (Gris claro #F8F9FA): Texto oscuro #1a1a1a - Ratio 15.2:1 ✓
  - Muted (#6B7280): Texto blanco #FFFFFF - Ratio 4.8:1 ✓

## Font Selection

La tipografía debe ser clara, legible en pantallas pequeñas y transmitir profesionalidad con un toque amigable. Se usará **Poppins** para encabezados (personalidad moderna y amigable con excelente legibilidad) y **Inter** para cuerpo de texto (optimizada para lectura en pantalla con altura-x generosa).

- **Typographic Hierarchy**:
  - H1 (Logo/Hero Title): Poppins Bold/36px/tight (-0.02em) - Mobile: 28px
  - H2 (Section Headers): Poppins SemiBold/32px/tight (-0.01em) - Mobile: 24px
  - H3 (Subsection/Card Titles): Poppins SemiBold/24px/normal - Mobile: 20px
  - H4 (Accordion Headers): Poppins Medium/18px/normal - Mobile: 16px
  - Body Large (Important Info): Inter Regular/16px/relaxed (1.6) - Mobile: 15px
  - Body (General Text): Inter Regular/14px/relaxed (1.6) - Mobile: 14px
  - Small (Labels/Captions): Inter Medium/12px/normal (1.4) - Mobile: 12px
  - Number Display (Winning Figures): Poppins Bold/48px/tight - Mobile: 36px

## Animations

Las animaciones deben ser sutiles pero presentes, reforzando la sensación de "celebración" cuando se muestran resultados ganadores, mientras mantienen fluidez en la navegación. El balance está en usar movimiento para guiar la atención (resultados que se revelan, números ganadores que brillan sutilmente) sin distraer de la función principal de consulta rápida.

- **Purposeful Meaning**: Animaciones de "reveal" al cargar resultados (fade-in stagger) que simulan la emoción de un sorteo. Micro-animaciones en hover de botones que invitan a la acción. Pulse suave en la figura #21 Mikaela para destacar su premio especial.

- **Hierarchy of Movement**: 
  1. Navegación smooth scroll (prioridad alta - 400ms ease-out)
  2. Reveal de resultados en tabla (300ms stagger con 50ms delay entre filas)
  3. Hover states en botones y cards (150ms)
  4. Pulse en figura especial #21 (2s loop, muy sutil)

## Component Selection

- **Components**: 
  - **Card** (shadcn): Para contener resultados de cada sorteo y secciones de reglamento
  - **Accordion** (shadcn): Para la sección de Reglamento, permitiendo expandir/colapsar cada modalidad
  - **Button** (shadcn): Botones de búsqueda, navegación y CTA con variantes (default, outline, ghost)
  - **Select** (shadcn): Dropdown para seleccionar tipo de sorteo
  - **Calendar** (shadcn con date-fns): Date picker para selección de fecha
  - **Badge** (shadcn): Para destacar la figura #21 y premios especiales
  - **Separator** (shadcn): Divisores visuales entre secciones
  - **Table** (shadcn): Para mostrar resultados históricos con estructura clara
  - **Skeleton** (shadcn): Loading states para tabla de resultados

- **Customizations**: 
  - **ResultCard**: Componente personalizado que muestra una figura ganadora con número, emoji/icono y nombre
  - **LotteryFigureIcon**: Componente que mapea cada número (1-40) a su icono correspondiente de lucide-react
  - **NavigationHeader**: Header sticky con logo y links de navegación optimizado para mobile
  - **WinnerHighlight**: Badge especial animado para la figura #21 con efecto de brillo

- **States**: 
  - Botones: Default (verde sólido), Hover (verde más oscuro + lift), Active (pressed down), Disabled (gris con cursor not-allowed)
  - Inputs/Selects: Default (borde gris), Focus (borde verde con ring), Filled (fondo muy sutil verde), Error (borde rojo)
  - Accordion: Collapsed (chevron derecha), Expanded (chevron abajo, animación 200ms)
  - Cards: Default (sombra sutil), Hover (sombra elevada + escala 1.02)

- **Icon Selection**: 
  - Lucide-react icons: Calendar (fecha), Clock (horarios), Trophy (premios), Search (búsqueda), ChevronDown (acordeón), Award (figura #21), Sparkles (nuevo/próximamente), Menu/X (navegación mobile)
  - Emojis para figuras: Usar emojis nativos para representar cada animal/objeto de manera universal y liviana

- **Spacing**: 
  - Sección padding: py-16 px-4 (mobile) / py-24 px-8 (desktop)
  - Card padding: p-4 (mobile) / p-6 (desktop)
  - Gap entre elementos: gap-4 (mobile) / gap-6 (desktop)
  - Gap entre secciones: mb-12 (mobile) / mb-20 (desktop)

- **Mobile**: 
  - Header: Hamburger menu que se expande en overlay completo con links grandes (min 44px touch target)
  - Hero: Stack vertical (imagen arriba, texto abajo)
  - Tabla de resultados: Scroll horizontal con sticky primera columna (horarios)
  - Reglamento: Acordeón full-width con padding generoso para thumb-friendly
  - Botones: Min height 44px, full-width en mobile
  - Typography: Escala reducida (ver jerarquía arriba) pero nunca menor a 14px para body
