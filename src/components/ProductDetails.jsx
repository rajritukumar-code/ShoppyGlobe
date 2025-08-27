import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { addToCart } from "../utils/cartSlice";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import CartControl from "./CartControl";
import ProductsError from "./ProductsError";
const ProductDetails = () => {
  const [isAdded, setIsAdded] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetching product details using ID
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      if (!res.ok) {
        if (res.status >= 500) {
          throw new Error("Server Error");
        } else if (res.status === 404) {
          throw new Error("Not Found");
        } else {
          throw new Error(`Request Failed`);
        }
      }
      const data = await res.json();
      setProduct(data);
      setError(null);
    } catch (err) {
      if (err.message === "Server Error") {
        setError({
          title: "Server Error",
          message: "Server error occurred. Please try again later.",
          subMessage:
            "Our servers are currently experiencing issues. We are working to resolve this, and your patience is appreciated.",
        });
      } else if (err.message === "Not Found") {
        setError({
          title: "Product Not Found",
          message: `The product with ID "${id}" you are looking is not found or is currently unavailable`,
        });
      } else if (err.message.includes("NetworkError")) {
        setError({
          title: "Network Error",
          message: "Please check your internet connection",
          subMessage:
            "It looks like you are offline or your connection is unstable. Please check and try again.",
        });
      } else {
        setError({
          title: "OOPS",
          message: "Something Went Wrong ",
          subMessage:
            "An unexpected error occurred while trying to load the product, you can come back after a few minutes ",
        });
      }
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddCart = (product) => {
    dispatch(addToCart(product));
    setIsAdded(true);
  };

  // Display user-friendly error if fetch failed or product not found
  if (error)
    return (
      <div className="fixed inset-0 bg-red-100 min-h-screen flex flex-col items-center justify-center p-6">
        <ProductsError
          title={error?.title}
          message={error?.message}
          subMessage={error?.subMessage}
        />
      </div>
    );

  // Display loader while fetching product data

  if (loading) return <Loader />;

  // Handle case where product is null but not in loading state
  if (!product)
    return (
      <div className="fixed inset-0 bg-red-100 min-h-screen flex flex-col items-center justify-center p-6">
        <ProductsError
          title="Product Not Available"
          message={`The product with ID "${id}" may have been removed or is currently not in our catalog.`}
        />
      </div>
    );

  // Destructure product fields safely
  const {
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    tags,
    brand,
    weight,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    images,
    thumbnail,
  } = product;

  // Calculate discounted price
  const discountedPrice = (price * (1 - discountPercentage / 100)).toFixed(2);

  return (
    <section className="flex flex-col justify-center items-center h-fit w-full p-4">
      <h1 className="text-[#3F8C84] font-self max-[350px]:text-xl text-3xl md:text-4xl text-center  my-4">
        Product Overview
      </h1>
      {/* Product Display Card */}
      <div className="relative max-w-3xl m-auto  bg-white shadow-xl border border-gray-200 rounded-xl grid grid-cols-1 md:grid-cols-2">
        <div className=" flex flex-col w-full h-full bg-blue-50 justify-center items-center">
          <img
            src={images[0] || thumbnail}
            alt={title}
            className="w-full h-auto object-contain p-4 rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-1 p-4">
          <h2 className="max-[350px]:text-base text-lg md:text-xl ">{title}</h2>
          {brand && (
            <p className="max-[350px]:text-xs text-sm text-gray-600">
              <span className="">Brand: </span> {brand}
            </p>
          )}
          <div className="flex items-center">
            <span className="max-[350px]:text-lg text-xl  text-[#47A99F] mr-2">
              &#8377; {(discountedPrice*83).toFixed(2)}
            </span>
            <span className="text-sm line-through text-gray-400">
              &#8377; {(price*83).toFixed(2)}
            </span>
            <span className="ml-auto text-sm text-[#47A99F]">
              {Math.round(discountPercentage)}% OFF
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500 max-[350px]:text-sm text-base ">
              {"★".repeat(Math.round(Number(rating)))}{" "}
              <span className="text-black">{rating.toFixed(1)}/5</span>
            </span>
            <span className="ml-1 text-sm text-gray-600">
              ({reviews.length} reviews)
            </span>
          </div>
          <div className="mb-2">
            <h3 className="mb-1 max-[350px]:text-sm">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-between items-center mb-2">
            <span
              className={`${
                product.availabilityStatus === "In Stock"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              } text-xs px-2 py-1 rounded-xl`}>
              {" "}
              {availabilityStatus}
            </span>

            <span className="text-xs  text-gray-500">
              {shippingInformation}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            <span className="">Category: </span> {category}
          </p>

          {!isAdded ? (
            <button
              onClick={() => handleAddCart(product)}
              className={`max-[350px]:text-sm flex items-center justify-center text-center gap-3 px-3 py-2 rounded-full bg-[#47A99F] text-white `}>
              <BiCart size={30} />
              Add To Cart
            </button>
          ) : (
            <CartControl product={product} handleItem={setIsAdded} />
          )}
          {isAdded && (
            <Link
              to="/cart"
              className={`max-[350px]:text-sm flex items-center justify-center text-center gap-3 px-3 py-2 mt-2 rounded-full bg-[#3F8C84] text-white `}>
              Go To Cart <BiCart className=" max-[350px]:w-[20px] max-[350px]:h-[20px] h-[30px] w-[30px]" />
            </Link>
          )}
          <div>
            <h3 className="max-[350px]:text-base text-blue-600">Description:</h3>
            <p className="max-[350px]:text-sm text-base text-gray-600 font-outfit">{description}</p>
          </div>

          <div className="mb-4 max-[350px]:text-xs text-sm text-gray-700 space-y-1">
            <div>
              <span className="">Weight:</span> {weight}g
            </div>
            <div>
              <span className="">Warranty:</span> {warrantyInformation}
            </div>
            <div>
              <span className="">Return Policy:</span> {returnPolicy}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
