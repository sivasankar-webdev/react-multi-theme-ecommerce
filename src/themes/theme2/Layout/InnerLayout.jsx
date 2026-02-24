import { Outlet } from "react-router-dom";
import Header from "../components/MainHeader";
import Footer from "../components/MainFooter";
import FeatureStrip from "../components/FeatureStrip";

export default function InnerLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    
      <FeatureStrip />
      <Footer />
    </>
  );
}