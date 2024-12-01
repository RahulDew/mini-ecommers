import { useState } from "react";
import { motion } from "framer-motion";
// import { reveal } from "@/lib/utils";
// import { reveal } from "../lib/utils";
import { reveal } from "../lib/utils";
// import Link from "next/link";
import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 100% 0)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const NavbarData = {
  logoName: "pawtisite",
  navLinks: [
    { name: "Home", link: "/" },
    { name: "About", link: "/#about" },
    { name: "Shop", link: "/#features" },
    { name: "Feedback", link: "/#interface" },
    { name: "Contact", link: "/#faqs" },
  ],
  mainLinks: [
    { name: "Schedule", link: "/schedule" },
    { name: "Login", link: "/login" },
  ],
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className={`fixed h-screen inset-0 z-50 w-full md:hidden ${
        isOpen ? "" : "pointer-events-none"
      }`}
    >
      <motion.div
        className="absolute inset-0 right-0 w-full bg-[#FFF1DB] text-black"
        variants={sidebar}
      />
      {isOpen && (
        <motion.ul
          variants={reveal}
          initial={"hiddenVarient"}
          animate={"revealedVarient"}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute w-full h-full grid place-items-center gap-10 px-10 py-16 overflow-y-auto"
        >
          <Link
            to={"/"}
            className="flex justify-center items-center gap-2 p-1 rounded-md"
          >
            <BiCart className="text-3xl text-indigo-600 " />
            <p className="text-indigo-600 font-semibold text-xl">
              {NavbarData.logoName}
            </p>{" "}
          </Link>
          <div className="space-y-12">
            {NavbarData.navLinks.map((navlink, index) => (
              <motion.li
                key={index}
                variants={reveal}
                initial={"hiddenVarient"}
                animate={"revealedVarient"}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={handleMenuOpen}
                className="font-semibold text-2xl text-center hover:text-primary duration-300"
              >
                <Link to={`${navlink.link}`}>{navlink.name}</Link>
              </motion.li>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {NavbarData.mainLinks.map((mainLink, index) => (
              <Link
                key={index}
                to={mainLink.link}
                className="w-36 text-center text-xl font-semibold md:flex justify-center items-center gap-2  hover:bg-[#B3791D]  border-2 border-[#B3791D] text-[#B3791D] hover:text-white p-2 px-4 rounded-full durarion-300"
              >
                {mainLink.name}
              </Link>
            ))}
          </div>
        </motion.ul>
      )}
      {/* Mobile Menu toggle */}
      <MenuToggle handleClick={handleMenuOpen} />
    </motion.nav>
  );
};

export default MobileNav;

const MenuToggle = ({ handleClick }: { handleClick: () => void }) => (
  <button
    onClick={handleClick}
    className="pointer-events-auto absolute right-4 top-[18px] z-30"
  >
    <svg
      width="24"
      height="18"
      viewBox="0 0 24 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="22" height="2" rx="1" fill="black" />
      <rect x="1" y="8" width="22" height="2" rx="1" fill="black" />
      <rect x="10" y="15" width="13" height="2" rx="1" fill="black" />
    </svg>
  </button>
);
