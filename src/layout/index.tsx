import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
const Layout = () => {
  return (
    <>
      <Header />
      <main className="bg-[#f7f7f7] px-30 py-5 min-h-[80vh] max-h-[80vh] overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
