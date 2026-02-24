import { Outlet } from "react-router-dom";
import Header from "../components/MainHeader";
import Footer from "../components/MainFooter";

export default function MainLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}