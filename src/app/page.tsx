"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";

const shoes = [
  { id: 1, name: "Nike Impact 4", thumbnail: "/assets/1/1.png", price: 250.9 },
  { id: 2, name: "Nike Air Max 1", thumbnail: "/assets/2/1.png", price: 195.55 },
  { id: 3, name: "Nike Air Max INTRLK Lite", thumbnail: "/assets/3/1.png", price: 213.55 },
  { id: 4, name: "Nike Impact 4", thumbnail: "/assets/4/1.png", price: 199.99 },
  { id: 5, name: "Nike Air Max Solo", thumbnail: "/assets/5/1.png", price: 135.55 },
];

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState(shoes[0]);
  const [selectedImage, setSelectedImage] = useState("/assets/1/1.png");
  const [selectedSize, setSelectedSize] = useState("6");
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleSelectShoe = (shoe: typeof shoes[0]) => {
    setSelectedShoe(shoe);
    setSelectedImage(`/assets/${shoe.id}/1.png`);
  };

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (!carouselRef.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    carouselRef.current.dataset.dragStartX = clientX.toString();
    carouselRef.current.dataset.scrollLeft = carouselRef.current.scrollLeft.toString();
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!carouselRef.current) return;
    const dragStartX = parseFloat(carouselRef.current.dataset.dragStartX || "0");
    const scrollLeft = parseFloat(carouselRef.current.dataset.scrollLeft || "0");
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    carouselRef.current.scrollLeft = scrollLeft - (clientX - dragStartX);
  };

  const gradients = [
    "linear-gradient(257.21deg, #FF67F9 0%, #DB6EFA 26.27%, #0085FF 100%)",
    "linear-gradient(257.12deg, #CC0087 0%, #905CFF 100%)",
    "linear-gradient(257.49deg, #FF5353 0%, #FFFFFF 101.92%)",
  ];

  return (
    <div className="relative h-screen px-4 sm:px-6 text-white bg-[linear-gradient(107.43deg,_#3C3D41_1.2%,_#1D1E25_39.49%,_#181820_99.41%)] overflow-x-hidden">
      <img
        src="/assets/nike.png"
        alt="Nike background"
        className="fixed inset-0 m-auto max-w-[90%] sm:max-w-[70%] lg:max-w-[60%] object-contain pointer-events-none z-0 opacity-80"
      />

      <motion.img
        src="/assets/coloredlogo.png"
        alt="Logo Colored"
        className="fixed z-10 pointer-events-none hidden lg:block"
        style={{ height: "500px", left: "-100px", bottom: "10px", transform: "rotate(-20deg)" }}
        animate={{ opacity: [0.7, 0.8, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />

      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="relative z-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16 pt-8 sm:pt-12 px-2 sm:px-4">
        {/* Info Card */}
        <div className="w-full lg:w-auto lg:max-w-sm p-4 sm:p-6 order-2 lg:order-1">
          <div className="flex flex-col space-y-3 sm:space-y-4 w-full">
            <motion.h2
              className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 text-shadow-2xs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              key={selectedShoe.id}
            >
              {selectedShoe.name}
            </motion.h2>
            <h3 className="text-xl sm:text-2xl text-white">${selectedShoe.price.toFixed(2)}</h3>

            <div>
              <h6 className="font-medium text-xs sm:text-sm text-gray-300">Colors</h6>
              <div className="flex gap-2 sm:gap-3 mt-1 sm:mt-2">
                {["white", "red-500", "green-500", "black"].map((color) => (
                  <motion.span
                    key={color}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-${color} border border-gray-400 cursor-pointer hover:scale-110 transition-transform`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>

            <div>
              <h6 className="font-medium text-xs sm:text-sm text-gray-300 mt-2 sm:mt-4">Size</h6>
              <div className="flex gap-2 sm:gap-3 mt-1 sm:mt-2">
                {["6", "7", "8", "9"].map((size) => (
                  <motion.span
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-2 rounded-full border cursor-pointer font-medium text-xs sm:text-sm transition ${
                      selectedSize === size
                        ? "bg-white text-black border-transparent"
                        : "bg-transparent text-white border border-white hover:bg-white hover:text-black"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.button
              className="mt-4 sm:mt-6 px-4 py-2 text-white font-semibold transition text-xs sm:text-sm w-24 inline-block"
              style={{
                background: "linear-gradient(45deg, #FF67F9, #DB6EFA, #0085FF)",
                backgroundSize: "200% 200%",
              }}
              whileHover={{ scale: 1.05, backgroundPosition: "right center" }}
              whileTap={{ scale: 0.95 }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
              transition={{
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                },
              }}
            >
              BUY
            </motion.button>
          </div>
        </div>

        {/* Shoe Image */}
        <div className="flex justify-center flex-1 relative order-1 lg:order-2 w-full lg:w-auto">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt="Selected Shoe"
              className="w-full max-w-[400px] lg:max-w-none transform rotate-[-40deg] lg:absolute lg:right-72 lg:-top-96"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>

        {/* Mobile Carousel */}
        <div
          ref={carouselRef}
          className="lg:hidden w-full overflow-x-auto py-4 px-2 order-3 no-scrollbar"
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex gap-4 w-max mx-auto px-4">
            {shoes.map((shoe) => (
              <motion.div
                key={shoe.id}
                onClick={() => handleSelectShoe(shoe)}
                className="relative w-20 h-20 sm:w-24 sm:h-24 cursor-pointer shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-full h-full rounded-full border-4 transition-transform ${
                    selectedShoe.id === shoe.id
                      ? "border-pink-400 scale-110"
                      : "border-transparent"
                  }`}
                  style={{
                    backgroundImage: `url(${shoe.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Angles */}
        <div className="lg:hidden w-full flex justify-center gap-3 order-1 py-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              onClick={() => setSelectedImage(`/assets/${selectedShoe.id}/${i}.png`)}
              className="w-20 h-20 sm:w-20 sm:h-20 overflow-hidden flex items-center justify-center rounded-xl cursor-pointer"
              style={{ background: gradients[i - 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={`/assets/${selectedShoe.id}/${i}.png`}
                alt={`Sneaker angle ${i}`}
                className="max-h-full max-w-full object-contain"
              />
            </motion.div>
          ))}
        </div>

        {/* Desktop Thumbnails */}
        <div className="hidden lg:flex flex-col gap-4 absolute z-30" style={{ right: "250px", top: "300px" }}>
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              onClick={() => setSelectedImage(`/assets/${selectedShoe.id}/${i}.png`)}
              className="w-[100px] h-[100px] overflow-hidden flex items-center justify-center rounded-xl cursor-pointer"
              style={{ background: gradients[i - 1] }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.5)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src={`/assets/${selectedShoe.id}/${i}.png`}
                alt={`Sneaker angle ${i}`}
                className="max-h-full max-w-full object-contain"
              />
            </motion.div>
          ))}
        </div>

        {/* Desktop Carousel Circle */}
        <div
          className="hidden lg:block absolute z-40 rounded-full -rotate-90 -right-65"
          style={{
            width: 364,
            height: 364,
            top: "250px",
            background: "linear-gradient(90deg, rgba(200,200,200,0.5) 0%, rgba(255,255,255,0) 33.38%)",
            pointerEvents: "auto",
          }}
        >
          {shoes.map((shoe, index) => {
            const radius = 182;
            const angleDeg = 30 + (index / (shoes.length - 1)) * 120;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = radius * Math.cos(angleRad);
            const y = radius * Math.sin(angleRad);

            return (
              <motion.div
                key={shoe.id}
                onClick={() => handleSelectShoe(shoe)}
                className="relative w-[100px] h-[100px] cursor-pointer"
                style={{
                  position: "absolute",
                  left: radius + x - 35,
                  top: radius - y - 35,
                  transform: `rotate(${-angleDeg}deg)`,
                }}
                title={shoe.name}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className={`w-full h-full rounded-full border-4 transition-transform ${
                    selectedShoe.id === shoe.id
                      ? "border-pink-400 scale-110 z-10"
                      : "border-transparent z-5"
                  }`}
                  style={{
                    backgroundImage: `url(${shoe.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    zIndex: 10,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Page;
