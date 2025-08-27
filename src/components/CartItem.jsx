import React from "react";
import { removeFromCart } from "../utils/cartSlice";
import { BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";
import CartControl from "./CartControl";

function CartItem({ item }) {
  const dispatch = useDispatch();

  // Calculate discounted price for clarity and reusability
  const discountedPrice = (
    item.price *
    (1 - item.discountPercentage / 100)
  ).toFixed(2);
  const subtotal = (
    item.price *
    item.quantity *
    (1 - item.discountPercentage / 100)
  ).toFixed(2);

  return (
    <>
      <div className="w-full sm:w-1/4 bg-blue-100 flex items-center justify-center p-4">
        <img
          src={item.images?.[0] || item.thumbnail}
          alt={item.title}
          className="object-contain h-32"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-base sm:text-lg lg:text-lg  text-gray-800 mb-1">
            {item.title}
          </h2>
          <p className="text-gray-500 sm:text-sm mb-3">Brand: {item.brand}</p>
        </div>
        <div className="flex gap-4 items-center justify-between mb-4">
          <div>
            <span className="max-[350px]:text-lg text-2xl font-self  text-[#47A99F] mr-2">
             &#8377; {(discountedPrice*83).toFixed(2)}
            </span>
            <span className="text-sm line-through text-gray-400">
               &#8377;{(item.price*83).toFixed(2)}
            </span>
          </div>

          {/* Cart Controls */}
          <div className="w-fit">
            <CartControl product={item} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="bg-red-100 p-1 rounded-full border border-red-600 flex items-center text-red-600 hover:text-red-800 text-sm">
            <BiTrash size={18} className="mr-1" /> Remove
          </button>
          <span className="text-sm text-gray-600">Subtotal:  &#8377; {(subtotal*83).toFixed(2)}</span>
        </div>
      </div>
    </>
  );
}

export default React.memo(CartItem);
