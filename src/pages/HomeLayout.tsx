import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeLayout = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/admin");

  return (
    <>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </>
  );
};

export default HomeLayout;
