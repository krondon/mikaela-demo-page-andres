import { Sparkles, Lock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function OnlineGameSection() {
  return (
    <section id="juego-online" className="py-16 md:py-24 bg-gradient-to-br from-foreground via-foreground/95 to-muted text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2RvdHMpIi8+PC9zdmc+')] opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full text-secondary-foreground text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Próximamente</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Juega Pollo Lleno Online
          </h2>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
            Pronto podrás participar en el sorteo extraordinario desde la comodidad de tu celular. 
            Selecciona tus 6 figuras favoritas y gana el Jackpot acumulado.
          </p>

          <Card className="p-8 md:p-12 bg-background/10 backdrop-blur-sm border-primary-foreground/20 mb-8">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
              {['🐴', '🦁', '🐸', '🦜', '🦋', '🔑'].map((emoji, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-lg bg-secondary/20 backdrop-blur-sm border-2 border-secondary/30 flex items-center justify-center text-4xl md:text-5xl transition-all hover:scale-110 hover:bg-secondary/30"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 text-primary-foreground/70">
                <div className="flex-1 h-px bg-primary-foreground/20"></div>
                <span className="text-sm font-medium">Funcionalidades en Desarrollo</span>
                <div className="flex-1 h-px bg-primary-foreground/20"></div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div className="p-4 rounded-lg bg-background/5 border border-primary-foreground/10">
                  <p className="text-lg font-semibold mb-1">🎯 Selección Inteligente</p>
                  <p className="text-sm text-primary-foreground/70">Elige tus figuras favoritas con un solo toque</p>
                </div>
                <div className="p-4 rounded-lg bg-background/5 border border-primary-foreground/10">
                  <p className="text-lg font-semibold mb-1">💳 Pago Seguro</p>
                  <p className="text-sm text-primary-foreground/70">Múltiples métodos de pago disponibles</p>
                </div>
                <div className="p-4 rounded-lg bg-background/5 border border-primary-foreground/10">
                  <p className="text-lg font-semibold mb-1">🔔 Notificaciones</p>
                  <p className="text-sm text-primary-foreground/70">Entérate al instante si ganaste</p>
                </div>
              </div>
            </div>
          </Card>

          <Button 
            size="lg" 
            disabled
            className="bg-muted text-muted-foreground cursor-not-allowed opacity-50"
          >
            <Lock className="h-5 w-5 mr-2" />
            Registro de Usuarios (Muy Pronto)
          </Button>

          <p className="text-sm text-primary-foreground/60 mt-6">
            Mientras tanto, visita nuestros puntos de venta autorizados para participar
          </p>
        </div>
      </div>
    </section>
  )
}
