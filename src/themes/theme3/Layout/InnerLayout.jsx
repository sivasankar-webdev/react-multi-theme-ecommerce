import { Outlet } from "react-router-dom";
import Header from "../components/MainHeader";
import Footer from "../components/MainFooter";
import ProductList from "../components/ProductList";

export default function InnerLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    
       <ProductList />
      <Footer /> 
    </>
  );
}