# Guía Maestra de Integración: Mikaela (Supabase)

Esta guía detalla el proceso completo para conectar el frontend de "Mikaela: La Pollita Millonaria" con una base de datos real en Supabase, reemplazando los datos simulados (mocks) actuales.

## 1. Configuración Inicial

### Base de Datos (Supabase)
Asegúrate de haber ejecutado el script `SUPABASE_SCHEMA.sql` en tu proyecto de Supabase. Esto creará las tablas necesarias:
- `figures`: Catálogo de las 40 figuras.
- `draws`: Registro de sorteos (Ordinarios y Extraordinarios).
- `draw_results`: Resultados de cada sorteo (relación 1:N con draws).
- `tickets`: Tickets comprados por los usuarios.

### Configuración del Proyecto (`src/lib/lottery-data.ts`)
El proyecto ahora utiliza un objeto centralizado `LOTTERY_CONFIG` para manejar constantes. Asegúrate de que los valores en este archivo coincidan con tu lógica de negocio real (horarios, precios, multiplicadores).

## 2. Integración por Módulos

A continuación se detalla cómo actualizar `src/services/lottery-api.ts` para cada funcionalidad.

### A. Catálogo de Figuras (`getFigures`)

**Objetivo:** Cargar las 40 figuras desde la base de datos en lugar del array estático.

1.  **Poblar Datos:** Ejecuta los `INSERT` del archivo `SUPABASE_SCHEMA.sql` para llenar la tabla `figures`.
2.  **Actualizar Servicio:**
    ```typescript
    getFigures: async () => {
      const { data, error } = await supabase
        .from('figures')
        .select('*')
        .order('number', { ascending: true });
        
      if (error) {
        console.error('Error fetching figures:', error);
        return LOTTERY_FIGURES; // Fallback a estático si falla
      }
      return data;
    }
    ```

### B. Resultados de Sorteos (`getResults`)

**Objetivo:** Obtener los resultados del día (Ordinarios y Extraordinarios) para la sección "Resultados".

**Lógica de Mapeo:**
El frontend espera un objeto `DailyResults`. Debes transformar la respuesta plana de Supabase a esta estructura anidada.

**Implementación en `getResults`:**
```typescript
getResults: async (params: GetResultsPayload): Promise<DailyResults | undefined> => {
    // 1. Definir rango de fecha (00:00 a 23:59 del día solicitado)
    const startDate = params.date;
    const endDate = new Date(params.date);
    endDate.setDate(endDate.getDate() + 1);
    const endDateStr = endDate.toISOString().split('T')[0];

    // 2. Consultar Supabase (Draws + Results)
    const { data: draws, error } = await supabase
        .from('draws')
        .select(`
            *,
            draw_results (
                figure_number,
                position
            )
        `)
        .gte('date', startDate)
        .lt('date', endDateStr);

    if (error) throw error;

    // 3. Separar por tipo
    const ordinaryDraws = draws.filter(d => d.type === 'ordinario');
    const extraordinaryDraw = draws.find(d => d.type === 'extraordinario');

    // 4. Construir respuesta
    return {
        date: params.date,
        ordinary: ordinaryDraws.map(d => ({
            // Formatear hora (ej: "10:00:00" -> "10:00 AM")
            time: format(new Date(`2000-01-01T${d.time}`), 'hh:mm a'),
            figureNumber: d.draw_results[0]?.figure_number || 0
        })).sort((a, b) => ...), // Ordenar por hora
        extraordinary: {
            figures: extraordinaryDraw 
                ? extraordinaryDraw.draw_results
                    .sort((a, b) => a.position - b.position) // Importante mantener orden
                    .map(r => r.figure_number)
                : []
        }
    };
}
```

### C. Tablero en Vivo (`getLiveMetrics` y `getLiveFeed`)

**Objetivo:** Mostrar estadísticas en tiempo real y el feed de tickets comprados.

**1. Métricas (`getLiveMetrics`):**
Debes realizar consultas de agregación (count, sum) en Supabase.
```typescript
getLiveMetrics: async () => {
    // Obtener total de tickets hoy
    const today = new Date().toISOString().split('T')[0];
    
    const { count: ticketsCount } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true })
        .gte('purchase_date', today);

    // Obtener Pote (suma de draws.total_pot o lógica personalizada)
    // ...

    return {
        pote: LOTTERY_CONFIG.PRICING.POLLO_LLENO_POT, // O valor calculado real
        ganadores: 0, // Calcular query de tickets con status='winner'
        tickets: ticketsCount || 0
    };
}
```

**2. Feed de Tickets (`getLiveFeed`):**
```typescript
getLiveFeed: async () => {
    const { data } = await supabase
        .from('tickets')
        .select('serial_number, selected_figures')
        .order('purchase_date', { ascending: false })
        .limit(10);

    return data?.map(t => ({
        id: t.serial_number,
        figures: t.selected_figures
    })) || [];
}
```

### D. Historial de Tickets (`getTicketHistory`)

**Objetivo:** Permitir al usuario ver sus jugadas pasadas y si ganaron.

**Implementación:**
Esta es la consulta más compleja, ya que requiere cruzar `tickets` con `draws` y `draw_results` para determinar si hubo aciertos.

*Recomendación:* Para simplificar el frontend, crea una **Vista en Supabase** o una **Edge Function** que devuelva el ticket ya procesado con su estado (Ganador/Perdedor) y aciertos, en lugar de calcularlo todo en el cliente.

Si lo haces en el cliente (`lottery-api.ts`):
1. Obtener tickets paginados.
2. Para cada ticket, obtener el sorteo asociado (`draw_id`).
3. Comparar `ticket.selected_figures` con `draw.draw_results`.
4. Calcular aciertos y premio según `LOTTERY_CONFIG.GAME_RULES`.

## 3. Flujo Operativo (Admin)

Para que el sistema funcione, necesitas una forma de ingresar los datos. Como no hay panel de administración frontend aún, puedes usar el **Table Editor** de Supabase:

1.  **Crear Sorteos Diarios:**
    - Inserta 10 filas en `draws` con `type='ordinario'` y las horas correspondientes.
    - Inserta 1 fila en `draws` con `type='extraordinario'` para las 8:00 PM.

2.  **Cargar Resultados:**
    - Cuando salga un resultado, inserta una fila en `draw_results` vinculada al `draw_id` correspondiente con el `figure_number` ganador.

## 4. Próximos Pasos Recomendados

1.  **Autenticación:** Implementar Supabase Auth para identificar a los usuarios y mostrar *su* historial de tickets real.
2.  **Panel Admin:** Desarrollar una interfaz simple para que el operador cargue los resultados sin entrar a la base de datos directa.
3.  **Edge Functions:** Mover la lógica de "verificar ganador" al servidor para mayor seguridad.