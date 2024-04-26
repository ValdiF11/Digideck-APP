import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default MainLayout;
