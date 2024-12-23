import NavBar from "../components/ui/NavBar";
import Footer from "../components/ui/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;