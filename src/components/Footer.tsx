import { Heart } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import logo from '@/assets/images/Logo_tipografico_Mikaela_La_Pollita_Millonaria-01.png'
import { LOTTERY_CONFIG } from '@/lib/lottery-data'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8 md:py-12 w-full relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <img src={logo} alt="Mikaela La Pollita Millonaria" className="h-10 w-auto object-contain" />
              <div className="text-left">
                <h3 className="font-bold text-lg">{LOTTERY_CONFIG.COMPANY_INFO.NAME}</h3>
                <p className="text-xs opacity-80">{LOTTERY_CONFIG.COMPANY_INFO.FULL_NAME}</p>
              </div>
            </div>
            <p className="text-sm opacity-80 max-w-xs mx-auto md:mx-0">
              Lotería oficial venezolana que te brinda oportunidades diarias de ganar. 
              Operado con responsabilidad y transparencia.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-4">Información Legal</h4>
            <div className="space-y-2 text-sm opacity-80">
              <p>Operado por: {LOTTERY_CONFIG.COMPANY_INFO.OPERATOR}</p>
              <p>Avalado por: {LOTTERY_CONFIG.COMPANY_INFO.ENDORSER}</p>
              <p>Juego responsable +18 años</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-4">Horarios de Sorteo</h4>
            <div className="space-y-2 text-sm opacity-80">
              <p>🕐 {LOTTERY_CONFIG.UI_TEXTS.LA_POLLITA_TITLE}: {LOTTERY_CONFIG.SCHEDULE.ORDINARY_START} - {LOTTERY_CONFIG.SCHEDULE.ORDINARY_END}</p>
              <p>🕗 {LOTTERY_CONFIG.UI_TEXTS.POLLO_LLENO_TITLE}: {LOTTERY_CONFIG.SCHEDULE.EXTRAORDINARY_TIME}</p>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-primary-foreground/20" />

        <div className="text-center text-sm opacity-80">
          <p className="flex items-center justify-center gap-2">
            Hecho con <Heart className="h-4 w-4 fill-current" /> para el pueblo venezolano
          </p>
          <p className="mt-2">
            © {LOTTERY_CONFIG.COMPANY_INFO.COPYRIGHT_YEAR} {LOTTERY_CONFIG.COMPANY_INFO.FULL_NAME}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
