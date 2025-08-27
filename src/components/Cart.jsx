import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Using useSelector to subscribe and get Redux state of cartItems for automatic re-renders when data changes.
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculating total price with discount for each item
  const total = cartItems
    .reduce(
      (sum, item) =>
        sum + item.price * item.quantity * (1 - item.discountPercentage / 100),
      0
    )
    .toFixed(2);

  // If cart is empty, showing the EmptyCart component
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="max-w-5xl w-full mx-auto p-4">
      <h1 className="max-[350px]:text-xl text-2xl font-self text-center md:text-left md:text-4xl  text-blue-500 mb-6">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/*Displaying Cart Items by sending item prop to Child CartItem component */}
        <ul className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex flex-col sm:flex-row  bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <CartItem item={item} />
            </li>
          ))}
        </ul>

        {/*Order Summary */}
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col">
          <h2 className="max-[350px]:text-xl text-2xl  text-gray-800 mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 max-[350px]:text-lg  text-xl">
              Items ({cartItems.length})
            </span>
            <span className="max-[350px]:text-lg text-xl text-gray-800">Total: {(total*83).toFixed(2)}</span>
          </div>
          <div className=" border-t border-gray-200 my-4"></div>
          <button
            onClick={() => dispatch(clearCart())}
            className="max-[350px]:text-sm w-full py-2 mb-4 bg-red-100 text-red-600 hover:text-white  rounded-full hover:bg-red-600 transition border border-red-600">
            Clear Cart
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="max-[350px]:text-sm w-full py-2 bg-[#47A99F] text-white  rounded-full
             hover:bg-[#47A99F]  transition border border-[#47A99F]">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
