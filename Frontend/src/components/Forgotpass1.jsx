import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import Footer from "./Footer/Footer";
import { useState } from "react";
import "../CSS/Forgotpass1.css";

export default function Forgotpassword1(){
    const [isSidebarOpen, setSidebarOpen] = useState(false);
      const handleOpenSidebar = () => setSidebarOpen(true);
      const handleCloseSidebar = () => setSidebarOpen(false);
      return (
        <>
          {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
          <Sidebar onOpenSidebar={handleOpenSidebar} />
          <Navbar></Navbar>
          <Navbar2></Navbar2>
          <MainNav></MainNav>
          <Footer></Footer>
        </>
      );
}