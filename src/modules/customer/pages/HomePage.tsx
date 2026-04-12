import PerfumeCarousel from "../components/Home/Perfumecarousel";
import ShopCollection from "../components/Home/ShopCollection";
import RecommendedSection from "../components/Home/RecommendedSection";
import Bestsellers from "../components/Home/Bestsellers";
import LuxuryImmersiveCarousel from "../components/Home/LuxuryImmersiveCarousel";
export const HomePage = () => {
  return (
    <>
         <LuxuryImmersiveCarousel/>
              <PerfumeCarousel />
              <ShopCollection />
              <RecommendedSection />
              <Bestsellers />
    </>
  )
}
