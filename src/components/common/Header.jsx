import React, { useEffect, useRef, useState } from "react";
import logoImg from "../../assets/common/logo.png";
import { menulists } from "../../assets/data/data";
import { IoCartOutline, IoHeart, IoSearchOutline } from "react-icons/io5";
import {
  json,
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CustomLink, CustomNavLink, Badges } from "./CustomComponents";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import CartModal from "../cart/cartModal";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const LoggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);
  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to proceed to logout?",
    );
    if (confirmed) {
      sessionStorage.removeItem("loggedInUser");
      setIsOpenProfileMenu(false);
      toggleMenu();
      navigate("/login");
    }
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenuOutSide = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenuOutSide);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.addEventListener("mousedown", closeMenuOutSide);
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomepage = location.pathname === "/";
  // const isHomepage = false;
  return (
    <>
      <header
        className={`header relative z-20 py-2 sm:px-12 sm:py-2 ${isHomepage ? "bg-white-100" : ""} ${isScrolled ? "scrolled" : ""}`}
      >
        {isHomepage && (
          <div
            className={`${isScrolled ? "lg:bg-none" : "lg:bg-black"} lg:absolute lg:right-0 lg:top-0 lg:z-10 lg:h-[88px] lg:w-1/3`}
          ></div>
        )}
        <nav className="relative flex items-center justify-between gap-[10px] p-4">
          <div className="flex items-center gap-14">
            <div>
              <Link to="/">
                <img src={logoImg} alt="Logo" className="h-7" />
              </Link>
            </div>
            <div className="item-center hidden justify-between gap-6 lg:flex">
              {menulists.map((list) => {
                return (
                  <li key={list.id} className="list-none uppercase">
                    <CustomNavLink
                      href={list.path}
                      className="hover:text-primary-green"
                    >
                      {list.link}
                    </CustomNavLink>
                  </li>
                );
              })}
            </div>
          </div>
          <div className="icons flex items-center gap-6 uppercase">
            {LoggedInUser ? (
              <>
                <div
                  className={`z-20 hidden items-center gap-4 text-right lg:flex ${!isScrolled && isHomepage ? "text-white" : "text-primary"}`}
                >
                  {" "}
                  <p>Welcome {LoggedInUser.name}</p>
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="font-semiboldshadow-sm inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                        onClick={() => setIsOpenProfileMenu(!isOpenProfileMenu)}
                      >
                        <FaUserCircle size={30} />
                      </button>
                    </div>
                    <div
                      className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isOpenProfileMenu ? "" : "hidden"}`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex={-1}
                    >
                      <div className="py-1" role="none">
                        {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                        <Link
                          to="/my-orders"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-0"
                          onClick={() => setIsOpenProfileMenu(false)}
                        >
                          My Orders
                        </Link>

                        <button
                          className="block w-full px-4 py-2 text-left text-sm uppercase text-gray-700"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-3"
                          onClick={handleLogout}
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // </div>
              <div
                className={`relative z-20 hidden uppercase text-inherit lg:block ${!isScrolled && isHomepage ? "text-white" : "text-primary"}`}
              >
                <NavLink
                  className={({ isActive }) =>
                    "cursor-pointer list-none text-[15px] font-medium hover:text-primary-green" +
                    (isActive ? "text-primary-green" : "")
                  }
                  to={"/login"}
                >
                  Login
                </NavLink>

                <span className=""> / </span>
                <NavLink
                  className={({ isActive }) =>
                    "cursor-pointer list-none text-[15px] font-medium hover:text-primary-green" +
                    (isActive ? "text-primary-green" : "")
                  }
                  to={"/register"}
                >
                  Register
                </NavLink>
              </div>
            )}

            <div
              className={`icon flex items-center justify-center gap-[1rem] text-black sm:gap-6 ${!isScrolled && isHomepage ? "lg:text-white" : "lg:text-primary"}`}
            >
              {/* <IoSearchOutline size={23} className="z-20" /> */}
              <CartModal />

              <button className="flex h-10 w-10 items-center justify-center bg-black text-white focus:outline-none lg:hidden">
                {isOpen ? (
                  <AiOutlineClose size={24} onClick={toggleMenu} />
                ) : (
                  <AiOutlineMenu size={24} onClick={toggleMenu} />
                )}
              </button>
            </div>
          </div>

          {/* Responsive Navbar */}
          <div
            ref={menuRef}
            className={`menu-container absolute right-0 top-full w-full p-5 ${isOpen ? "open" : "closed"}`}
          >
            {menulists.map((list) => {
              return (
                <li key={list.id} className="list-none uppercase">
                  <CustomNavLink
                    href={list.path}
                    className="hover:text-primary-green"
                    onClick={toggleMenu}
                  >
                    {list.link}
                  </CustomNavLink>
                </li>
              );
            })}
            {LoggedInUser ? (
              <div className="mt-3">
                <button className="uppercase text-white" onClick={handleLogout}>
                  Logout
                </button>
                <br />
                <button className="uppercase text-white">
                  <Link to="/my-orders" onClick={toggleMenu}>
                    My Orders
                  </Link>
                </button>
              </div>
            ) : (
              <div className="mt-3 uppercase">
                <CustomNavLink
                  href="/login"
                  className="hover:text-primary-green"
                  onClick={toggleMenu}
                >
                  Login
                </CustomNavLink>

                <span className="text-white"> / </span>
                <CustomNavLink
                  href="/register"
                  className="hover:text-primary-green"
                  onClick={toggleMenu}
                >
                  Register
                </CustomNavLink>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
