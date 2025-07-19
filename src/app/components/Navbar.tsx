"use client";

import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const NAV_ITEMS = ["Home", "Offers", "Collections", "Contact"] as const;
const CART_ITEMS_COUNT = 3;
const LOGO_SIZE = { base: 32, sm: 40 };
const ICON_SIZE = { base: 20, sm: 24 };

const Navbar = ({ menuOpen, setMenuOpen }: NavbarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-4 sm:py-5">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="flex-shrink-0"
        >
          <Link href="/">
            <img
              src="/assets/logo.png"
              alt="Company Logo"
              width={LOGO_SIZE.sm}
              height={LOGO_SIZE.sm}
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-8 mx-8">
          {NAV_ITEMS.map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <Link
                href={`/${item.toLowerCase()}`}
                className="relative text-white hover:text-pink-400 transition-colors font-medium text-sm uppercase tracking-wider group"
              >
                {item}
                <motion.span
                  className="absolute left-0 bottom-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300"
                  layoutId="nav-underline"
                />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6 ml-auto">
          {/* Search - Desktop */}
          <motion.div className="hidden sm:block relative">
            <motion.input
              type="text"
              placeholder="search..."
              className="px-4 py-1.5 text-white bg-gray-800 rounded-ful focus:outline-none focus:ring-2 focus:ring-pink-400 w-40 hover:w-48 transition-all duration-300 text-sm placeholder-gray-400"
              whileFocus={{ width: "200px" }}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-pink-400 transition-colors pointer-events-none" />
          </motion.div>

          {/* Search - Mobile (icon only) */}
          <motion.button
            className="sm:hidden p-1"
            onClick={() => setSearchOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-white" />
          </motion.button>

          {/* Search - Mobile (expanded) */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                className="sm:hidden absolute left-0 right-0 top-0 bg-gray-900 px-4 py-4 z-50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center max-w-7xl mx-auto">
                  <motion.input
                    type="text"
                    placeholder="search..."
                    className="flex-1 px-4 py-2 text-white border focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm placeholder-gray-400"
                    autoFocus
                  />
                  <motion.button
                    className="ml-2 p-1"
                    onClick={() => setSearchOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shopping Cart */}
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="relative"
          >
            <Link href="/cart" className="flex items-center">
              <ShoppingBag
                className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:text-pink-400 transition-colors"
                strokeWidth={1.5}
              />
              {CART_ITEMS_COUNT > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-pink-500 text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {CART_ITEMS_COUNT}
                </motion.span>
              )}
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="sm:hidden p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6 text-pink-400" strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-6 h-6 text-white" strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
