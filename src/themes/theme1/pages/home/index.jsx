import FeaturedCateogies from "./FeaturedCategories";
import DiscountBanner from "./DiscountBanner";
import PopularProducts from "./PopularProducts";
import ThisWeekSales from "./ThisWeekSales";
import LatestBlogPosts from "./LatestBlogPosts";

export default function About() {
  return (
    <>
      <FeaturedCateogies />
      <DiscountBanner />
      <PopularProducts />
      <ThisWeekSales />
      <LatestBlogPosts />
    </>
  );
}