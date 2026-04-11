import { Footer } from "./components/ui/Footer";
import Navbar from "./components/ui/Navbar";
import PerfumeCarousel from "./components/ui/Perfumecarousel";
import ShopCollection from "./components/ui/ShopCollection";
import RecommendedSection from "./components/ui/RecommendedSection";
import Bestsellers from "./components/ui/Bestsellers";
import LuxuryImmersiveCarousel from "./components/ui/LuxuryImmersiveCarousel";

const App = () => {
  return (
    <div>
      <Navbar />
      <LuxuryImmersiveCarousel />
      <PerfumeCarousel />
      <ShopCollection />
      <RecommendedSection />
      <Bestsellers />
      <Footer />
    </div>
  );
};

export default App;
