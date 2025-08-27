import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoInstagram,
  BiLogoGmail,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.png";

export default function Footer() {
  return (
    <footer className="text-gray-900 bg-white border border-gray-200 py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-6 md:mb-0 flex flex-col items-center text-center md:text-left">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
            <img src={logo2} alt="Shoppy Globe Logo" className="max-[350px]:h-8 h-12" />
            <span className="max-[350px]:text-xl text-2xl font-self text-blue-900 whitespace-nowrap">
              ShoppyGlobe
            </span>
          </Link>
          <p className="max-[350px]:text-xs text-sm">© 2025 ShoppyGlobe. All rights reserved.</p>
        </div>
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6 md:mb-0">
          <Link to="/" className="hover:text-blue-600 text-sm">
            Home
          </Link>
          <Link to="/products" className="hover:text-blue-600 text-sm">
            Products
          </Link>
          <Link to="/cart" className="hover:text-blue-600 text-sm">
            Cart
          </Link>
        </div>
        {/* Social media links using icons  */}
        <div className="flex items-center space-x-4">
          <Link
            to="https://www.facebook.com/"
            className="hover:text-blue-600">
            <BiLogoFacebook size={24} />
          </Link>
          <Link to="https://x.com/" className="hover:text-blue-600">
            <BiLogoTwitter size={24} />
          </Link>
          <Link
            to="https://www.instagram.com/"
            className="hover:text-blue-600">
            <BiLogoInstagram size={24} />
          </Link>
          <a
            href="mailto:rajritu.kumar260@gmail.com"
            className=" hover:text-blue-600">
            <BiLogoGmail size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
