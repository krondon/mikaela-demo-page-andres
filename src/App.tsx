import { NavigationHeader } from './components/NavigationHeader'
import { HeroSection } from './components/HeroSection'
import { ResultsSection } from './components/ResultsSection'
import { ReglamentoSection } from './components/ReglamentoSection'
import { OnlineGameSection } from './components/OnlineGameSection'
import { Footer } from './components/Footer'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main>
        <HeroSection />
        <ResultsSection />
        <ReglamentoSection />
        <OnlineGameSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App