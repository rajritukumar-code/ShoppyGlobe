import { BiCart } from "react-icons/bi";

export default function EmptyCart() {
  return (
    <section className=" flex-grow h-full flex flex-col items-center justify-center m-4 p-6">
      <div className="text-center h-full">
        <BiCart className="text-gray-400 w-24 h-24 mx-auto mb-4" />
        <h2 className="max-[350px]:text-xl text-3xl  text-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="max-[350px]:text-sm text-gray-600 mb-6">
          Looks like you haven’t added anything to your cart yet.
        </p>
        <button
          onClick={() => (window.location.href = "/products")}
          className="inline-block max-[350px]:text-sm max-[350px]:py-2 max-[350px]:px-4 px-6 py-3 bg-blue-600 text-white  rounded-lg hover:bg-blue-700 transition">
          Shop Now
        </button>
      </div>
    </section>
  );
}
