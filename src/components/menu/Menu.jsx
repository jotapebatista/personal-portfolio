import React, { useState } from "react";
import FullScreenMenu from "./FullScreenMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Menu = ({ onItemClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = ["Home", "About", "Contact"];

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <FontAwesomeIcon
        icon={faBars}
        className="text-white text-2xl cursor-pointer hover:text-emerald-400"
        onClick={handleMenuToggle}
      />
      <FullScreenMenu
        isOpen={menuOpen}
        onClose={handleMenuToggle}
        menuItems={menuItems}
        onItemClick={onItemClick}
      />
    </div>
  );
};

export default Menu;
