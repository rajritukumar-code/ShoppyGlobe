import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartControl from "./CartControl";

function ProductItem({ product, addToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const {
    id,
    title,
    price,
    discountPercentage,
    rating,
    shippingInformation,
    availabilityStatus,
    reviews,
    images,
    thumbnail,
  } = product;

  // Calculation for Discounted  price
  const discountedPrice = (price * (1 - discountPercentage / 100)).toFixed(2);

  return (
    <>
      <img
        src={images[0] || thumbnail}
        alt={title}
        loading="lazy"
        className="w-full p-2 max-w-[300px] text-xs rounded-lg mx-auto h-70 hover:scale-[1.1]  hover:sticky transition object-contain"
      />
      <div className="p-4 bg-white flex flex-col justify-between">
        <h2 className="text-base  mb-2 md:truncate">{title}</h2>
        <div className="w-full">
          <div className="flex items-center mb-2">
            <span className="text-xl font-self text-[#47A99F] mr-2">
              &#8377; {(discountedPrice*83).toFixed(2)}
            </span>
            <span className="text-sm line-through text-gray-400">
              &#8377; {(price*83).toFixed(2)}
            </span>
            <span className="ml-auto text-sm text-gray-800">
              {Math.round(discountPercentage)}% OFF
            </span>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 text-base ">
              {"★".repeat(Math.round(Number(rating)))}{" "}
              <span className="text-black">{rating.toFixed(1)}/5</span>
            </span>
            <span className="ml-2 text-sm text-gray-600">
              ({reviews.length} reviews)
            </span>
          </div>
          <div className="w-full flex justify-between items-center mb-4">
            <span
              className={`${
                product.availabilityStatus === "In Stock"
                  ? "bg-green-100 text-green-700 "
                  : "bg-yellow-100 text-yellow-700"
              } text-xs px-2 py-1 rounded-xl`}>
              {" "}
              {availabilityStatus}
            </span>

            <span className="text-xs  text-gray-500">
              {shippingInformation}
            </span>
          </div>
          {/*View & Add product to cart*/}
          <div
            className={`${
              !isAdded ? "grid grid-cols-2" : "flex "
            } gap-4 items-center text-sm`}>
            <Link
              key={"/"}
              to={`/products/${id}`}
              className={`${
                isAdded && "w-full"
              } text-center bg-white max-[350px]:text-sm hover:bg-gray-100 text-gray-800 border border-[#41C7BA] px-4 py-2 rounded-full shadow-lg transition`}>
              View Details
            </Link>

            {!isAdded ? (
              <button
                onClick={() => {
                  addToCart(product);
                  setIsAdded(true);
                }}
                className="bg-[#40E0D0] hover:bg-[#41C7BA] text-gray-800 max-[350px]:text-sm px-4 py-2 flex-grow rounded-full border border-[#41C7BA] shadow-lg transition">
                Add To Cart
              </button>
            ) : (
              <CartControl product={product} handleItem={setIsAdded} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(ProductItem);
