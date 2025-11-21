# Guía de Integración: De Datos Mock a Datos Reales (Supabase)

Este documento detalla paso a paso cómo transformar la aplicación actual (que usa datos falsos/mock) a una aplicación real conectada a una base de datos Supabase.

## 1. Análisis de la Situación Actual

Actualmente, la aplicación obtiene sus datos de dos archivos principales:
- **`src/lib/lottery-data.ts`**: Contiene los arrays estáticos (`LOTTERY_FIGURES`, `MOCK_RESULTS`) y tipos de datos.
- **`src/services/lottery-api.ts`**: Simula llamadas a una API usando `setTimeout` y devuelve los datos estáticos de arriba.

Los componentes (`ResultsSection`, `LiveDashboardSection`) llaman a `lotteryApi.getResults()`, pensando que es una API real.

## 2. Preparación de la Base de Datos (Supabase)

Para manejar datos reales, necesitamos tablas que reemplacen los arrays estáticos.

1.  Crea un proyecto en [Supabase](https://supabase.com/).
2.  Ve al **SQL Editor** en tu dashboard de Supabase.
3.  Copia y pega el contenido del archivo `SUPABASE_SCHEMA.sql` que he creado en la raíz de este proyecto.
4.  Ejecuta el script para crear las tablas.

## 3. Conexión con el Proyecto

Necesitamos instalar la librería cliente de Supabase y configurarla.

### Paso 3.1: Instalar dependencia
Ejecuta en la terminal:
```bash
npm install @supabase/supabase-js
```

### Paso 3.2: Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto (si no existe) y agrega tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-publica
```

### Paso 3.3: Crear Cliente
Crea un archivo `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 4. Migración del Servicio (`lottery-api.ts`)

Ahora debemos modificar `src/services/lottery-api.ts` para que consulte a Supabase en lugar de devolver `MOCK_RESULTS`.

### Ejemplo de cómo cambiar `getResults`:

**Código Actual (Mock):**
```typescript
getResults: async (params: GetResultsPayload): Promise<DailyResults | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_RESULTS.find(r => r.date === params.date);
},
```

**Código Nuevo (Real):**
```typescript
import { supabase } from '@/lib/supabase';

// ...

getResults: async (params: GetResultsPayload): Promise<DailyResults | undefined> => {
    // 1. Consultar sorteos para la fecha
    const { data: draws, error } = await supabase
        .from('draws')
        .select(`
            *,
            draw_results (
                figure_number,
                position
            )
        `)
        .eq('date', params.date);

    if (error) throw error;
    if (!draws || draws.length === 0) return undefined;

    // 2. Transformar datos de Supabase al formato que espera tu App (DailyResults)
    // Esto es necesario porque tu frontend espera una estructura específica anidada
    
    const ordinaryDraws = draws.filter(d => d.type === 'ordinario');
    const extraordinaryDraw = draws.find(d => d.type === 'extraordinario');

    const result: DailyResults = {
        date: params.date,
        ordinary: ordinaryDraws.map(d => ({
            time: d.time.substring(0, 5) + (parseInt(d.time) >= 12 ? ' PM' : ' AM'), // Formatear hora
            figureNumber: d.draw_results[0]?.figure_number || 0
        })),
        extraordinary: {
            figures: extraordinaryDraw 
                ? extraordinaryDraw.draw_results.map(r => r.figure_number) 
                : []
        }
    };

    return result;
},
```

## 5. Payloads y Estructuras

Cuando hablas de "Payloads", te refieres a la estructura de datos que se envía y recibe.

- **Request Payload (Lo que envías):** Al usar Supabase, los "payloads" son los filtros que aplicas en la consulta (ej: `.eq('date', '2024-11-21')`).
- **Response Payload (Lo que recibes):** Supabase devuelve objetos JSON planos que coinciden con tus tablas. Como tu frontend ya está construido esperando una estructura específica (definida en `lottery-data.ts`), tienes dos opciones:
    1.  **Adaptador (Recomendado):** Transformar la respuesta de Supabase en el servicio (como hice en el ejemplo de arriba) para que coincida con las interfaces `DailyResults`, `OrdinaryResult`, etc. Esto evita tener que reescribir todos tus componentes.
    2.  **Refactorizar Frontend:** Cambiar los componentes para que lean directamente la estructura de las tablas de Supabase.

## 6. Siguientes Pasos

1.  **Poblar Datos:** Necesitas crear un script o usar la interfaz de Supabase para insertar las 40 figuras en la tabla `figures`.
2.  **Admin Panel:** Para que esto sea útil, necesitarás una forma de *crear* los sorteos y *cargar* los resultados. Deberías crear una página `/admin` (protegida con autenticación de Supabase) donde puedas:
    - Crear un nuevo sorteo diario.
    - Ingresar los números ganadores cuando salgan.
