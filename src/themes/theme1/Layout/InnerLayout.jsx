import { Outlet } from "react-router-dom";
import InnerPageHeader from "../components/InnerHeader";
import InnerPageFooter from "../components/InnerFooter";
import FeatureStrip from "../components/FeatureStrip";

export default function InnerLayout() {
  return (
    <>
      <InnerPageHeader />

      <main>
        <Outlet />
      </main>
      
      <FeatureStrip />
      <InnerPageFooter />
    </>
  );
}