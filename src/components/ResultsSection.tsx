import { useState } from 'react'
import { Calendar, Search, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { MOCK_RESULTS, SorteoType, getFigureByNumber, ORDINARY_TIMES } from '@/lib/lottery-data'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

type ShiftType = 'all' | 'morning' | 'afternoon' | 'night'

const SHIFTS = {
  morning: { 
    label: 'Mañana (10:00 AM - 11:00 AM)', 
    times: ['10:00 AM', '11:00 AM'] 
  },
  afternoon: { 
    label: 'Tarde (12:00 PM - 05:00 PM)', 
    times: ['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'] 
  },
  night: { 
    label: 'Noche (06:00 PM - 07:00 PM)', 
    times: ['06:00 PM', '07:00 PM'] 
  }
}

export function ResultsSection() {
  const [selectedDate, setSelectedDate] = useState(MOCK_RESULTS[0].date)
  const [sorteoType, setSorteoType] = useState<SorteoType>('ordinario')
  const [selectedShift, setSelectedShift] = useState<ShiftType>('all')

  const currentResults = MOCK_RESULTS.find(r => r.date === selectedDate)

  const getFilteredOrdinaryResults = () => {
    if (!currentResults) return []
    if (selectedShift === 'all') return currentResults.ordinary
    
    const targetTimes = SHIFTS[selectedShift].times
    return currentResults.ordinary.filter(result => targetTimes.includes(result.time))
  }

  const filteredOrdinaryResults = getFilteredOrdinaryResults()

  return (
    <section id="resultados" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Resultados
          </h2>
          <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
            Consulta los números ganadores de sorteos anteriores
          </p>
        </div>

        <Card className="max-w-6xl mx-auto p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-foreground">
                <Calendar className="inline h-4 w-4 mr-1" />
                Fecha
              </label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_RESULTS.map(result => (
                    <SelectItem key={result.date} value={result.date}>
                      {format(new Date(result.date), "EEEE, d 'de' MMMM yyyy", { locale: es })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-foreground">
                <Search className="inline h-4 w-4 mr-1" />
                Tipo de Sorteo
              </label>
              <Select value={sorteoType} onValueChange={(v) => setSorteoType(v as SorteoType)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ordinario">La Pollita (Ordinario)</SelectItem>
                  <SelectItem value="extraordinario">Pollo Lleno (Extraordinario)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {sorteoType === 'ordinario' && (
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2 text-foreground">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Turno
                </label>
                <Select value={selectedShift} onValueChange={(v) => setSelectedShift(v as ShiftType)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los turnos</SelectItem>
                    <SelectItem value="morning">Mañana (10am - 11am)</SelectItem>
                    <SelectItem value="afternoon">Tarde (12pm - 5pm)</SelectItem>
                    <SelectItem value="night">Noche (6pm - 7pm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {currentResults && (
            <div className="overflow-x-auto">
              {sorteoType === 'ordinario' ? (
                <div className="min-w-full">
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    Sorteo Ordinario - {format(new Date(selectedDate), "d 'de' MMMM", { locale: es })}
                    {selectedShift !== 'all' && ` - ${SHIFTS[selectedShift].label.split('(')[0].trim()}`}
                  </h3>
                  {filteredOrdinaryResults.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {filteredOrdinaryResults.map((result, idx) => {
                        const figure = getFigureByNumber(result.figureNumber)
                        const isMikaela = result.figureNumber === 21
                        
                        return (
                          <Card
                            key={idx}
                            className={`p-4 text-center transition-all hover:shadow-lg ${
                              isMikaela ? 'border-2 border-destructive bg-destructive/5' : ''
                            }`}
                          >
                            <div className="flex justify-center mb-3">
                              <Badge variant="secondary" className="font-medium">
                                <Clock className="h-3 w-3 mr-1" />
                                {result.time}
                              </Badge>
                            </div>
                            <div className="mb-2 h-16 w-16 mx-auto relative">
                              <img 
                                src={figure?.image} 
                                alt={figure?.name}
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <p className="text-2xl font-bold text-primary mb-1">
                              #{result.figureNumber}
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              {figure?.name}
                            </p>
                            {isMikaela && (
                              <Badge className="mt-2 bg-destructive text-destructive-foreground animate-pulse-glow">
                                ¡Paga 40x!
                              </Badge>
                            )}
                          </Card>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No hay resultados disponibles para este turno.
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-accent">
                    Pollo Lleno (Extraordinario) - 8:00 PM
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Gana con 5 o 6 aciertos en cualquier orden
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {currentResults.extraordinary.figures.map((figNum, idx) => {
                      const figure = getFigureByNumber(figNum)
                      const isMikaela = figNum === 21
                      
                      return (
                        <Card
                          key={idx}
                          className={`p-6 text-center transition-all hover:shadow-lg ${
                            isMikaela ? 'border-2 border-destructive bg-destructive/5' : 'bg-accent/10'
                          }`}
                        >
                          <div className="mb-3 h-20 w-20 mx-auto relative">
                            <img 
                              src={figure?.image} 
                              alt={figure?.name}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <p className="text-3xl font-bold text-accent mb-1">
                            #{figNum}
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {figure?.name}
                          </p>
                          {isMikaela && (
                            <Badge className="mt-2 bg-destructive text-destructive-foreground">
                              Especial
                            </Badge>
                          )}
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
