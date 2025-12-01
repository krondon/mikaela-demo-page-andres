import { useEffect } from 'react'
import { NavigationHeader } from '@/components/NavigationHeader'
import { ReglamentoSection } from '@/components/ReglamentoSection'
import { Footer } from '@/components/Footer'

export function ReglamentoPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationHeader />
      <main className="flex-1">
        <ReglamentoSection />
      </main>
      <Footer />
    </div>
  )
}
