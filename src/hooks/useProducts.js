import { useEffect, useState } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(products?.length === 0);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products?limit=150");
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
      setProducts(data.products);
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
          title: "Products Not Found",
          message:
            "We couldn’t find the products you’re looking for. Please try refreshing or come back later.",
        });
      } else if (err.message.includes("NetworkError")) {
        setError({
          title: "Network Error",
          message: "Please check your internet connection.",
          subMessage:
            "It looks like you are offline or your connection is unstable. Please check and try again.",
        });
      } else {
        setError({
          title: "OOPS",
          message: "Something Went Wrong ",
          subMessage:
            "An unexpected error occurred while trying to load the products, you can come back after a few minutes ",
        });
      }
      setProducts([])
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products?.length === 0) {
      fetchProducts();
    }
  }, []);

  return { products, loading, error, fetchProducts };
};

export default useProducts;
