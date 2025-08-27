import { useRef } from "react";
import { BiRocket, BiShield, BiSupport } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function Home() {
  const moreRef = useRef();

  // smoothly scroll to the "More" section using useRef for DOM reference
  const scrollToMore = () => {
    if (moreRef.current) {
      moreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      {/*Hero Section */}
      <section className="min-h-[60vh] bg-white flex flex-col-reverse md:flex-row items-center justify-end lg:justify-between max-w-6xl mx-auto p-6 lg:p-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-xl min-[360px]:text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-2 min-[360px]:mb-4">
            Wellcome to ShoppyGlobe
          </h1>
          <p className="text-gray-600 text-xs min-[360px]:text-base md:text-lg lg:text-xl mb-4 min-[360px]:mb-6">
            Your one-stop online shop for quality products at unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row max-[350px]:gap-2 gap-4  justify-center lg:justify-start">
            <button
              onClick={() => navigate("/products")}
              className="bg-[#41C7BA] max-[350px]:text-sm hover:bg-[#3F8C84] text-white max-[350px]:py-2 max-[350px]:px-3 px-6 py-3 rounded-full shadow-lg transition"
            >
              Start Shopping
            </button>
            <button
              onClick={() => scrollToMore()}
              className="bg-white max-[350px]:text-sm hover:bg-gray-100 text-gray-800 border max-[350px]:py-2 max-[350px]:px-3 border-[#41C7BA] px-6 py-3 rounded-full shadow transition"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mb-3 min-[360px]:mb-8 lg:mb-0 flex justify-center">
          <img
            src="https://img.freepik.com/premium-photo/shopping-cart-shopping-bags-product-box-put-laptop-which-is-online-shop-store-internet-digital-market-concept-marketing-digital-marketing-communication-3d-rendering_42098-145.jpg"
            alt="Shopping Hero"
            className="w-4/5 lg:w-full object-cover rounded-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className=" py-12" ref={moreRef}>
        <h2 className="max-[350px]:text-xl text-3xl text-center text-gray-800 mb-6 px-6 lg:px-12">
          Services
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-6 lg:p-12">
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 border-gray-200 border rounded-2xl shadow-md hover:shadow-lg transition">
            <BiRocket size={48} className="text-[#41C7BA] mb-4" />
            <h3 className="max-[350px]:text-lg text-xl  mb-2">Fast Delivery</h3>
            <p className="max-[350px]:text-sm text-gray-600">
              Get your orders delivered to your doorstep in record time.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border-gray-200 border bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition">
            <BiShield size={48} className="text-[#41C7BA] mb-4" />
            <h3 className="max-[350px]:text-lg text-xl  mb-2">
              Secure Payments
            </h3>
            <p className="max-[350px]:text-sm text-gray-600">
              Your transactions are protected with top-notch security.
            </p>
          </div>
          <div className="flex flex-col border-gray-200 border items-center text-center p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition">
            <BiSupport size={48} className="text-[#41C7BA] mb-4" />
            <h3 className="max-[350px]:text-lg text-xl  mb-2">24/7 Support</h3>
            <p className="max-[350px]:text-sm text-gray-600">
              Our support team is available around the clock to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className=" py-12">
        <div className="max-w-4xl mx-auto text-center p-6 lg:p-12">
          <h2 className="max-[350px]:text-xl text-3xl  text-gray-800 mb-6">
            What Our Customers Say
          </h2>
          <div className="space-y-8">
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md">
              <p className="max-[350px]:text-sm italic text-gray-700 mb-4">
                Amazing quality! The product looks exactly like the pictures.
                Delivery was super fast.”
              </p>
              <h4 className=" text-lg  text-gray-800">– anonymous</h4>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md">
              <p className="max-[350px]:text-sm italic text-gray-700 mb-4">
                “Customer support was quick to respond when I had a query about
                sizing.”
              </p>
              <h4 className="text-lg  text-gray-800">– anonymous</h4>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md">
              <p className="max-[350px]:text-sm italic text-gray-700 mb-4">
                “Decent quality. Shipping took a bit longer than expected, but
                worth the wait.”
              </p>
              <h4 className="text-lg  text-gray-800">– anonymous</h4>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}
