import { NavigationHeader } from '@/components/NavigationHeader'
import { ReglamentoSection } from '@/components/ReglamentoSection'
import { Footer } from '@/components/Footer'

export function ReglamentoPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main>
        <ReglamentoSection />
      </main>
      <Footer />
    </div>
  )
}
