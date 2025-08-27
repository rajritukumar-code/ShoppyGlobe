import { useState, useMemo, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import {
  BiChevronLeft,
  BiChevronRight,
  BiFilter,
  BiRefresh,
} from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import ProductItem from "./ProductItem";
import useProducts from "../hooks/useProducts";
import Loader from "./Loader";
import ProductsError from "./ProductsError";

function ProductList() {
  // destructing custom hook return values
  const { products, loading, error, fetchProducts } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey] = useState("");
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef();
  const itemRefs = useRef({});
  const itemsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [category, search, sortKey]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    itemRefs.current[category]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [category]);

  const categories = useMemo(
    () => ["All", ...new Set(products?.map((p) => p.category))],
    [products]
  );

  // Getting Active category into View
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -100 : 100,
        behavior: "smooth",
      });
    }
  };
  // Filtering based selected category and sortKey
  const filtered = useMemo(() => {
    return products
      ?.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (search === "" ||
            [p.title, p.description, ...p.tags].some((field) =>
              field.toLowerCase().includes(search.toLowerCase())
            ))
      )
      .sort((a, b) => {
        if (sortKey === "price-asc") return a.price - b.price;
        if (sortKey === "price-desc") return b.price - a.price;
        if (sortKey === "rating-asc") return a.rating - b.rating;
        if (sortKey === "rating-desc") return b.rating - a.rating;
        return 0;
      });
  }, [products, search, category, sortKey]);
  const handleAddCart = (product) => {
    dispatch(addToCart(product));
  };

  // Pagination
  const totalItems = filtered?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered?.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, category, sortKey]);

  // Resetting all filters
  const handleRetry = () => {
    setSearch("");
    setCategory("All");
    setSortKey("");
    setCurrentPage(1);
  };

  //Error Display
  if (error) {
    return (
      <div className="fixed inset-0 bg-red-100 min-h-screen flex flex-col items-center justify-center p-6">
        <ProductsError
          title={error?.title}
          message={error?.message}
          subMessage={error?.subMessage}
        />
      </div>
    );
  }
  // Loader for loading fetch requests
  if (loading) return <Loader />;

  // Error display for returning empty products list in api call
  if (!products?.length > 0)
    return (
      <div className="bg-blue-100 min-h-fit h-full grow flex flex-col items-center justify-center p-6">
        {" "}
        <ProductsError
        isError={false}
          title="No Products Available"
          message="Currently, there are no products to display. Please check back later or refresh the page."
        />
      </div>
    );

  return (
    <section className="w-full max-w-6xl mx-auto p-4">
      {/* Searchbar for products */}
      <div
        className={`${
          showFilters && "grid"
        } grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4`}>
        <div className="col-sapn-1 md:grid-cols-2 flex-1 w-full px-3 py-2 border border-gray-400 rounded-full flex items-center min-w-[250px]">
          <FaSearch className="text-gray-500  text-sm md:text-base mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none max-[350px]:text-sm"
          />
        </div>
        {/* Filters Panel */}
        {showFilters && (
          <div className="grid grid-cols-2 h-full max-[350px]:text-xs text-sm md:text-base w-full gap-4">
            <div className="col-span-1 flex justify-center items-center border h-full border-gray-400 rounded-full px-3 py-2">
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="outline-0 w-full">
                <option value="">Sort By Price</option>
                <option value="price-asc">Low to High</option>
                <option value="price-desc">High to Low</option>
              </select>
            </div>

            <div className="self-end col-span-1 flex justify-center items-center h-full border border-gray-400 rounded-full px-3 py-2">
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="outline-0 w-full">
                <option value="">Sort By Rating</option>
                <option value="rating-asc">Low to High</option>
                <option value="rating-desc">High to Low</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Filter By category section */}
      {showFilters && (
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => scroll("left")}
            className="left-0 max-[350px]:text-xl text-2xl rounded-full bg-white border border-gray-400 text-gray-600 ml-2">
            <BiChevronLeft />
          </button>
          <div
            ref={scrollRef}
            className="flex justify-start gap-3 max-[350px]:text-xs text-sm md:text-base  max-w-full overflow-x-auto scrollbar-hide">
            {categories?.map((cat) => (
              <button
                key={`catbtn${cat}`}
                onClick={() => setCategory(cat)}
                ref={(el) => (itemRefs.current[cat] = el)}
                className={`${
                  category === cat
                    ? "text-black bg-blue-100"
                    : "bg-white hover:bg-blue-50 text-gray-700 hover:text-black  border border-blue-200 hover:border-blue-50"
                }  py-2 px-3 rounded-full text-nowrap`}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={() => scroll("right")}
            className="max-[350px]:text-xl bg-white border brder-gray-400 text-gray-600 right-0 rounded-full  z-10 text-2xl mr-2">
            <BiChevronRight />
          </button>
        </div>
      )}

      {/* Toggle & Reset Filters */}
      <div className="flex justify-between items-center mb-4 max-[350px]:text-xs text-sm md:text-base">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-[#40E0D0] shadow-lg text-gray-800 rounded-full hover:bg-[#41C7BA] transition">
          <BiFilter />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <button
          onClick={handleRetry}
          className="flex items-center gap-2 px-4 py-2 bg-white  border text-gray-800 border-[#40E0D0] rounded-full shadow-lg hover:bg-blue-50 transition">
          <BiRefresh />
          Reset Filters
        </button>
      </div>
      {/* rendering products list based on length */}
      {paginated?.length === 0 ? (
        <div className="py-20 grow flex flex-col items-center justify-center ">
          <BiRefresh className="text-gray-400 w-16 h-16 mb-4" />
          <h2 className="text-2xl  text-gray-700 mb-2">No Products Found</h2>
          <p className="text-gray-500 text-center mb-6">
            Try different filters or keywords to find what you’re looking for.
          </p>
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-6 py-3 bg-[#40E0D0] text-white rounded-lg hover:bg-blue-700 transition">
            <BiRefresh /> Retry
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {paginated?.map((prod) => (
            <li
              key={prod.id}
              className=" relative bg-blue-50 flex w-full h-full flex-col justify-between gap-2 rounded-lg overflow-hidden border shadow-lg border-gray-200">
              <ProductItem product={prod} addToCart={handleAddCart} />
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center text-base items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="self-stretch px-3 py-2 bg-gray-100 border rounded-full shadow-md hover:bg-gray-200 disabled:opacity-50">
            <BiChevronLeft />
          </button>

          <p
            className={`px-3 py-2 rounded-full transition bg-[#41C7BA] text-white`}>
            {currentPage} / {totalPages}
          </p>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-2 self-stretch  bg-gray-100 rounded-full border  hover:bg-gray-200 shadow-md disabled:opacity-50">
            <BiChevronRight />
          </button>
        </div>
      )}
    </section>
  );
}

export default ProductList;
