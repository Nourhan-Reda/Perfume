// import { Outlet } from "react-router-dom";

import { Footer } from "./components/ui/Footer";
import Navbar from "./components/ui/Navbar";
import PerfumeCarousel from "./components/ui/Perfumecarousel";
import ShopCollection from "./components/ui/ShopCollection";
import RecommendedSection from "./components/ui/RecommendedSection";
import Bestsellers from "./components/ui/Bestsellers";
import LuxuryImmersiveCarousel from "./components/ui/LuxuryImmersiveCarousel";

const App = () => {
  return (
    <>
      <Navbar />

      <main>
        {/* Auth + other routed pages will render here */}
        {/* <Outlet /> */}

        {/* Homepage content */}
        <LuxuryImmersiveCarousel />
        <PerfumeCarousel />
        <ShopCollection />
        <RecommendedSection />
        <Bestsellers />
      </main>

      <Footer />
    </>
  );
};

export default App;
