import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const FullScreenMenu = ({ isOpen, onClose, menuItems, onItemClick }) => {
  // Function to handle menu item clicks and close the menu.
  const handleMenuItemClick = () => {
    onClose(); // Close the menu when an item is clicked.

    // Optional: Execute a callback when a menu item is clicked.
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div
      className={`fixed inset-0  ${
        isOpen ? "flex ease-in-out transform transition-transform duration-1000" : "hidden"
      } items-center justify-center bg-gradient-to-b from-gray-800 to-black`}
    >
      <div className="absolute top-4 right-4">
        <FontAwesomeIcon
          icon={faTimes}
          className="text-white text-3xl cursor-pointer hover:text-emerald-400 "
          onClick={onClose}
        />
      </div>
      <div className="text-white text-7xl">
        {menuItems.map((item, index) => (
          <div className="py-3" key={index}>
            {item.toLowerCase() === "home" ? (
              <Link
                href="/"
                className="hover:text-emerald-400 link link-underline cursor-pointer"
                onClick={handleMenuItemClick}
              >
                {item.toUpperCase()}
              </Link>
            ) : (
              <Link
                href={`/${item.toLowerCase()}`}
                className="hover:text-emerald-400 link link-underline cursor-pointer"
                onClick={handleMenuItemClick}
              >
                {item.toUpperCase()}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullScreenMenu;
