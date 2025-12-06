import { HiBars3 } from "react-icons/hi2";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { useState } from "react";

const flags: any = {
  uz: "https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/uzbekistan-flag-icon.png",
  ru: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/2560px-Flag_of_Russia.svg.png",
  en: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1280px-Flag_of_the_United_Kingdom_%283-5%29.svg.png",
};

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("uz");

  return (
    <>
      <header className="max-w-screen-2xl flex justify-between items-center py-4 px-5 mx-auto">
        <div className="flex items-center gap-3">
          <HiBars3
            className="text-2xl cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          />
        </div>

        <Link
          to="/"
          className="text-4xl font-light tracking-[1.08px] max-sm:text-3xl max-[400px]:text-2xl"
        >
          FASHION
        </Link>

        <div className="flex gap-4 items-center">
          <Link to="/search">
            <HiOutlineMagnifyingGlass className="text-2xl" />
          </Link>
          <Link to="/cart">
            <HiOutlineShoppingBag className="text-2xl" />
          </Link>
          <img src={flags[selectedLang]} className="w-7" alt="" />
        </div>
      </header>

      <SidebarMenu
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
      />
    </>
  );
};
export default Header;
