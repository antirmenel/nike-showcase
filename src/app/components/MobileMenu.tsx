"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const NAV_ITEMS = ["Home", "Offers", "Collections", "Contact"] as const;

const MobileMenu = ({ menuOpen, setMenuOpen }: MobileMenuProps) => {
  const closeMenu = () => setMenuOpen(false);

  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          />

          {/* Menu Panel */}
          <motion.nav
            className="fixed top-24 right-4 z-50 w-[calc(100%-2rem)] max-w-sm bg-gray-800/ backdrop-blur-md shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="flex flex-col p-2">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 * index,
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="block px-6 py-4 text-white hover:text-pink-400 transition-colors text-lg font-medium hover:bg-gray-700/50"
                    onClick={closeMenu}
                  >
                    <motion.span
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="flex items-center"
                    >
                      {item}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
