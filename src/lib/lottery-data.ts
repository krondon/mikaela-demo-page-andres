export interface LotteryFigure {
  number: number
  name: string
  emoji: string
}

export const LOTTERY_FIGURES: LotteryFigure[] = [
  { number: 1, name: "Sol", emoji: "☀️" },
  { number: 2, name: "Lentes", emoji: "👓" },
  { number: 3, name: "Bombillo", emoji: "💡" },
  { number: 4, name: "Silla", emoji: "🪑" },
  { number: 5, name: "Mano", emoji: "✋" },
  { number: 6, name: "Rana", emoji: "🐸" },
  { number: 7, name: "Perico", emoji: "🦜" },
  { number: 8, name: "Mariposa", emoji: "🦋" },
  { number: 9, name: "Llave", emoji: "🔑" },
  { number: 10, name: "Aguacate", emoji: "🥑" },
  { number: 11, name: "Lápiz", emoji: "✏️" },
  { number: 12, name: "Caballo", emoji: "🐴" },
  { number: 13, name: "Mono", emoji: "🐒" },
  { number: 14, name: "Paloma", emoji: "🕊️" },
  { number: 15, name: "León", emoji: "🦁" },
  { number: 16, name: "Machete", emoji: "🔪" },
  { number: 17, name: "Barco", emoji: "⛵" },
  { number: 18, name: "Burro", emoji: "🫏" },
  { number: 19, name: "Limón", emoji: "🍋" },
  { number: 20, name: "Cochino", emoji: "🐷" },
  { number: 21, name: "MIKAELA", emoji: "🐔" },
  { number: 22, name: "Pato", emoji: "🦆" },
  { number: 23, name: "Cuchara", emoji: "🥄" },
  { number: 24, name: "Ojo", emoji: "👁️" },
  { number: 25, name: "Piña", emoji: "🍍" },
  { number: 26, name: "Luna", emoji: "🌙" },
  { number: 27, name: "Corona", emoji: "👑" },
  { number: 28, name: "Mango", emoji: "🥭" },
  { number: 29, name: "Martillo", emoji: "🔨" },
  { number: 30, name: "Huevo", emoji: "🥚" },
  { number: 31, name: "Carro", emoji: "🚗" },
  { number: 32, name: "Bicicleta", emoji: "🚲" },
  { number: 33, name: "Moto", emoji: "🏍️" },
  { number: 34, name: "Venado", emoji: "🦌" },
  { number: 35, name: "Cuchillo", emoji: "🔪" },
  { number: 36, name: "Candado", emoji: "🔒" },
  { number: 37, name: "Reloj", emoji: "⏰" },
  { number: 38, name: "Avión", emoji: "✈️" },
  { number: 39, name: "Tijera", emoji: "✂️" },
  { number: 40, name: "Mesa", emoji: "🪑" },
]

export const getFigureByNumber = (num: number): LotteryFigure | undefined => {
  return LOTTERY_FIGURES.find(fig => fig.number === num)
}

export type SorteoType = 'ordinario' | 'extraordinario'

export interface OrdinaryResult {
  time: string
  figureNumber: number
}

export interface ExtraordinaryResult {
  figures: number[]
}

export interface DailyResults {
  date: string
  ordinary: OrdinaryResult[]
  extraordinary: ExtraordinaryResult
}

export const ORDINARY_TIMES = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
]

const generateRandomFigure = () => Math.floor(Math.random() * 40) + 1

const generateRandomExtraordinary = (): number[] => {
  const figures = new Set<number>()
  while (figures.size < 6) {
    figures.add(generateRandomFigure())
  }
  return Array.from(figures)
}

const generateOrdinaryResults = (): OrdinaryResult[] => {
  return ORDINARY_TIMES.map(time => ({
    time,
    figureNumber: generateRandomFigure()
  }))
}

const generateDailyResults = (daysAgo: number): DailyResults => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  
  return {
    date: date.toISOString().split('T')[0],
    ordinary: generateOrdinaryResults(),
    extraordinary: {
      figures: generateRandomExtraordinary()
    }
  }
}

export const MOCK_RESULTS: DailyResults[] = Array.from({ length: 30 }, (_, i) => generateDailyResults(i))
