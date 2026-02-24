import CategoryCarousel from "./CategoryCarousel";
import HomeHero from "./HeroSlider";
import PromoBanners from "./PromoBanners";
import FlashSales from "./FlashSales.jsx"
import DealBanners from "./DealBanners.jsx";
import Recommended from "./Recommended.jsx";
import DiscountStrip from "./DiscountStrip.jsx";
import MediumBanner from "./MediumBanner.jsx";
import FeatureProducts from "./FeaturedProducts.jsx";
import NewsLetterBanner from "./NewsletterBanner.jsx";

export default function About() {
  return (
    <>
      <HomeHero />
      <CategoryCarousel />
      {/* <PromoBanners /> */}
      <FlashSales />
      <DealBanners />
      <Recommended />
      <DiscountStrip />
      <MediumBanner />
      <NewsLetterBanner />
      {/* <FeatureProducts /> */}
    </>
  );
}