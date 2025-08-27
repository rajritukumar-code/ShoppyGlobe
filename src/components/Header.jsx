import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import  logo3 from "../assets/logo3.jpg";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Using useSelector to subscribe and get Redux state of cartItems for displaying cart length.
  const cart = useSelector((state) => state.cart.cartItems);
  // Toggling the menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header>
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap items-center justify-between">
          {/* Logo section */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo3} alt="Shoppy Globe Logo" className="max-[350px]:h-8 h-12" />
            <span className="text-xl min-[360px]:text-2xl font-self text-[#3F8C84] whitespace-nowrap ">
              ShoppyGlobe
            </span>
          </Link>

          {/* Toggle Menu button with cart*/}
          <div className="flex gap-2 md:hidden">
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="relative py-2 px-3  flex items-center text-gray-900 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
              <BsCart3 className="text-2xl " />
              {cart.length > 0 && (
                <>
                  <span className="absolute -top-1 -right-2 hidden md:flex  bg-blue-500 text-white text-xs w-5 h-5 rounded-full items-center justify-center">
                    {cart.length}
                  </span>
                  <span className="absolute bottom-4 left-6 md:hidden  bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                </>
              )}
            </Link>
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-2xl text-gray-600 rounded-lg  bg-gray-50   outline-none  border border-gray-200 ">
              {!isOpen ? <FaBarsStaggered /> : <IoCloseSharp />}
            </button>
          </div>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}>
            {/* List of Navigation links */}
            <ul className=" flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#41C7BA]  md:p-0">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#41C7BA]  md:p-0">
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#41C7BA]  md:p-0">
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="hidden relative py-2 px-3 md:flex items-center text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#41C7BA] md:p-0">
                  <BsCart3 className="text-2xl" />
                  {cart.length > 0 && (
                    <>
                      <span className="absolute -top-1 -right-2 hidden md:flex  bg-[#41C7BA] text-white text-xs w-5 h-5 rounded-full items-center justify-center">
                        {cart.length}
                      </span>
                      <span className="absolute bottom-4 left-6 md:hidden  bg-[#41C7BA] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cart.length}
                      </span>
                    </>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
