import { BiErrorCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const ProductsError = ({
  isError = true,
  title = "OOPS",
  message,
  subMessage,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`rounded-lg ${
        isError ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"
      }  border-2 p-6 max-w-md mx-auto w-full overflow-hidden text-center`}>
      <BiErrorCircle
        size={64}
        className={`${isError ? "text-red-500" : "text-blue-500"} mx-auto mb-4`}
      />
      <h1 className="max-[350px]:text-xl text-3xl text-gray-800 mb-2">{title}</h1>
      {message && <p className="max-[350px]:text-sm text-gray-600 mb-2">{message}</p>}
      {subMessage && (
        <p className=" text-gray-500 max-[350px]:text-sm text-center max-w-full">{subMessage}</p>
      )}
      <div className="flex gap-4 justify-center mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 max-[350px]:text-sm border border-gray-200 shadow-lg bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
          Go Back
        </button>
        <Link
          to="/"
          className="flex justify-center shadow-lg max-[350px]:text-sm items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Home
        </Link>
      </div>
    </div>
  );
};

export default ProductsError;
