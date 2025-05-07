import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
const Layout = () => {
  return (
    <div className="relative">
      <Header />
      <main className="bg-[#f7f7f7] px-20 pt-5 pb-20 min-h-screen ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
