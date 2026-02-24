import DealBanners from "./DealBanners";
import FeaturedProducts from "./FeaturedProducts";
import HeroSlider from "./HeroSlider";
import CategoryGrid from "./CategoryGrid";
import Bestsellers from "./Bestsellers";
import RecentlyViewed from "./RecentlyViewed";
//import ProductLists from "../../components/ProductList/ProductLists";

function Home() {
  return (
    <>
     <HeroSlider />
     <DealBanners />
     <FeaturedProducts />
     <CategoryGrid />
     <Bestsellers />
     <RecentlyViewed />
     {/* <ProductLists /> */}
    </>
  )
}

export default Home