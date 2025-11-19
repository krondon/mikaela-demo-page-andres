import { DailyResults, MOCK_RESULTS, LOTTERY_FIGURES } from '@/lib/lottery-data';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Tipos de Payload para las peticiones API
// Estos interfaces definen qué datos espera el backend recibir

export interface GetResultsPayload {
  date: string; // Formato YYYY-MM-DD
  type?: 'ordinario' | 'extraordinario';
}

export interface GetSpecialGameHistoryPayload {
  year: number;
  month: number; // 0-11
}

// Tipos de Respuesta de la API
// Estos interfaces definen qué datos devolverá el backend

export interface SpecialGameResult {
  dateObj: Date;
  dateFormatted: string;
  figures: number[];
  ticketSerial: string;
  prize: string;
  status: 'Ganador' | 'Vacante';
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

/**
 * Servicio para manejar las peticiones a la API de Lotería.
 * Actualmente simula respuestas asíncronas usando los datos mockeados.
 * 
 * Para conectar con una API real:
 * 1. Reemplazar las promesas simuladas con fetch() o axios.get()
 * 2. Asegurarse que el backend devuelva la estructura definida en las interfaces.
 */
export const lotteryApi = {
  
  /**
   * Obtiene los resultados de los sorteos para una fecha específica.
   * Endpoint sugerido: GET /api/results?date=YYYY-MM-DD
   */
  getResults: async (params: GetResultsPayload): Promise<DailyResults | undefined> => {
    // SIMULACIÓN DE LLAMADA A API
    // En producción, esto sería:
    /*
    const response = await fetch(`/api/results?date=${params.date}`);
    if (!response.ok) throw new Error('Error fetching results');
    const data = await response.json();
    return data;
    */

    // Simulamos un retardo de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // Retornamos los datos mockeados existentes
    return MOCK_RESULTS.find(r => r.date === params.date);
  },

  /**
   * Obtiene el historial del juego especial (Pollo Lleno) para un mes y año específicos.
   * Endpoint sugerido: GET /api/special-game/history?year=2024&month=10
   */
  getSpecialGameHistory: async (params: GetSpecialGameHistoryPayload): Promise<SpecialGameResult | null> => {
    // SIMULACIÓN DE LLAMADA A API
    /*
    const response = await fetch(`/api/special-game/history?year=${params.year}&month=${params.month}`);
    const data = await response.json();
    return data;
    */

    await new Promise(resolve => setTimeout(resolve, 800));

    const { year, month } = params;
    
    // Lógica movida desde SpecialGame.tsx para simular el backend
    const date = new Date(year, month + 1, 0); // Último día del mes
    const day = date.getDay(); // 0 es Domingo
    date.setDate(date.getDate() - day); // Retroceder al último domingo
    
    // Si la fecha es futura, no hay resultados
    if (date > new Date()) {
      return null;
    }

    // Generación determinista de datos (simulando base de datos)
    const seed = date.getTime();
    const figures: number[] = [];
    const availableFigures = [...LOTTERY_FIGURES];
    
    let currentSeed = seed;
    for (let i = 0; i < 6; i++) {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      const index = Math.floor((currentSeed / 233280) * availableFigures.length);
      if (availableFigures[index]) {
        figures.push(availableFigures[index].number);
        availableFigures.splice(index, 1);
      }
    }

    return {
      dateObj: date,
      dateFormatted: format(date, "d 'de' MMMM, yyyy", { locale: es }),
      figures: figures,
      ticketSerial: (seed % 3 !== 0) ? `A-${seed.toString().slice(-7)}` : 'Vacante',
      prize: (seed % 2 === 0) ? '$50,000' : '$45,000',
      status: (seed % 3 !== 0) ? 'Ganador' : 'Vacante'
    };
  }
};
