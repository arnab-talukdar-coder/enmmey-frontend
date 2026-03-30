import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoTicker from './components/LogoTicker';
import Features from './components/Features';
import Process from './components/Process';
import Results from './components/Results';
import Comparison from './components/Comparison';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <Features />
        <Process />
        <Results />
        <Comparison />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default App;
