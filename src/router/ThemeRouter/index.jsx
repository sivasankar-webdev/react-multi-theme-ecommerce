

import { useParams, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { FullPageLoader, PageSkeleton } from "../../themes/theme1/components/SuspenseWrapper";
import NotFound from "../../shared/components/NotFound";   

    /* ══════════════════════════════════════
      SAFE ROUTE HELPER
      If the component is undefined (not implemented for this theme),
      render NotFound instead of crashing / blank screen.
    ══════════════════════════════════════ */
    function SafeRoute({ component: Component, fallback = <PageSkeleton /> }) {
      if (!Component) return <NotFound />;
      return (
        <Suspense fallback={fallback}>
          <Component />
        </Suspense>
      );
    }

// ── lazy maps per theme ──────────────────────────────
// Define ONCE outside — never inside a component body
const themeModules = {
  theme1: {
    MainLayout:    lazy(() => import("../../themes/theme1/Layout/MainLayout.jsx")),
    InnerLayout:   lazy(() => import("../../themes/theme1/Layout/InnerLayout.jsx")),
    Register:      lazy(() => import("../../themes/theme1/pages/register")),
    Login:         lazy(() => import("../../themes/theme1/pages/login")),
    Home:          lazy(() => import("../../themes/theme1/pages/home")),
    About:         lazy(() => import("../../themes/theme1/pages/about")),
    Contact:       lazy(() => import("../../themes/theme1/pages/contact")),
    VendorList:    lazy(() => import("../../themes/theme1/pages/vendor/vendorList")),
    VendorGrid:    lazy(() => import("../../themes/theme1/pages/vendor/VendorGrid")),
    VendorDetail:  lazy(() => import("../../themes/theme1/pages/vendor/VendorDetails")),
    Store:         lazy(() => import("../../themes/theme1/pages/stores")),
    Blog:          lazy(() => import("../../themes/theme1/pages/blog/BlogList")),
    BlogDetails:   lazy(() => import("../../themes/theme1/pages/blog/BlogDetails")),
    PrivacyPolicy: lazy(() => import("../../themes/theme1/pages/privacypolicy")),
    Tc:            lazy(() => import("../../themes/theme1/pages/tc")),
  },
  theme2: {
    MainLayout:    lazy(() => import("../../themes/theme2/Layout/MainLayout.jsx")),
    InnerLayout:   lazy(() => import("../../themes/theme2/Layout/InnerLayout.jsx")),
    Home:          lazy(() => import("../../themes/theme2/pages/home")),
    // About:      lazy(() => import("../../themes/theme2/pages/about")),
    Contact:       lazy(() => import("../../themes/theme2/pages/contact")),
    Blog:          lazy(() => import("../../themes/theme2/pages/blog")),
    BlogDetails:   lazy(() => import("../../themes/theme2/pages/blog/blogDetails")),
    VendorList:    lazy(() => import("../../themes/theme2/pages/vendor/vendorList")),
    VendorDetail:  lazy(() => import("../../themes/theme2/pages/vendor/VendorDetails")),
    Shop:          lazy(() => import("../../themes/theme2/pages/shop")),
    ShopDetails:   lazy(() => import("../../themes/theme2/pages/shop/ShopDetail")),
    Cart:          lazy(() => import("../../themes/theme2/pages/cart")),
    Account:       lazy(() => import("../../themes/theme2/pages/account")),
  },
  theme3: {
    MainLayout:    lazy(() => import("../../themes/theme3/Layout/MainLayout.jsx")),
    InnerLayout:   lazy(() => import("../../themes/theme3/Layout/InnerLayout.jsx")),
    Home:          lazy(() => import("../../themes/theme3/pages/home")),
    //About:       lazy(() => import("../../themes/theme2/pages/about")),
    ShopGrid:      lazy(() => import("../../themes/theme3/pages/shop/ShopGrid")),
  },
};

export default function ThemeRoutes() {
  const { theme } = useParams();

  // Pick the right theme's components — never re-create lazy()
  const modules = themeModules[theme];

  if (!modules) {
    return <div className="p-10 text-center text-red-500">Theme "{theme}" not found.</div>;
  }

  const { MainLayout, InnerLayout, Register, Login, Home, About, Contact, VendorList, VendorGrid, Blog, BlogDetails, VendorDetail, Shop,
          ShopDetails, Cart, Account, Store, PrivacyPolicy, Tc, ShopGrid } = modules;

  return (
    <Suspense fallback={<FullPageLoader message="Loading..." />}>
      <Routes>

        {/* HOME layout */}
        {/* <Route element={<MainLayout />}>
          <Route index element={
            <Suspense fallback={<FullPageLoader message="Loading Home..." />}>
              <Home />
            </Suspense>
          }/>
        </Route> */}

        {/* ── HOME layout ── */}
          <Route element={<MainLayout />}>
            <Route index element={
              <SafeRoute component={Home} fallback={<FullPageLoader message="Loading Home..." />} />
            } />
          </Route>

        {/* INNER layout */}
        <Route element={<InnerLayout />}>

          <Route path="register"       element={<SafeRoute component={Register} />} />
          <Route path="login"          element={<SafeRoute component={Login} />} />
          <Route path="about"          element={<SafeRoute component={About} />} />
          <Route path="contact"        element={<SafeRoute component={Contact} />} />
          <Route path="vendor-list"    element={<SafeRoute component={VendorList} />} />
          <Route path="vendor-grid"    element={<SafeRoute component={VendorGrid} />} />
          <Route path="vendor-detail"  element={<SafeRoute component={VendorDetail} />} />
          <Route path="store"          element={<SafeRoute component={Store} />} />
          <Route path="blog"           element={<SafeRoute component={Blog} />} />
          <Route path="blog-details"   element={<SafeRoute component={BlogDetails} />} />
          <Route path="privacy-policy" element={<SafeRoute component={PrivacyPolicy} />} />
          <Route path="tc"             element={<SafeRoute component={Tc} />} />
          <Route path="shop"           element={<SafeRoute component={Shop} fallback={<FullPageLoader message="Loading Shop..." />} />} />
          <Route path="shop-details"   element={<SafeRoute component={ShopDetails} />} />
          <Route path="cart"           element={<SafeRoute component={Cart} />} />
          <Route path="account"        element={<SafeRoute component={Account} />} />
          <Route path="shop-grid"      element={<SafeRoute component={ShopGrid} />} />

          <Route path="*" element={<NotFound />} />

        </Route>

      </Routes>
    </Suspense>
  );
}