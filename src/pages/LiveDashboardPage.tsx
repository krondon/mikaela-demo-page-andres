import { useEffect } from 'react'
import { NavigationHeader } from '@/components/NavigationHeader'
import { LiveDashboardSection } from '@/components/LiveDashboardSection'
import { Footer } from '@/components/Footer'

export function LiveDashboardPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationHeader />
      <main className="flex-1">
        <LiveDashboardSection />
      </main>
      <Footer />
    </div>
  )
}
