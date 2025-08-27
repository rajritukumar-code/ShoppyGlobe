import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
  Link,
} from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";

export default function NotFound() {
  // Retrieve the error thrown by the router for the current route.
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "Oops!";
  let message = "Something went wrong.";
  let subMes = false;

  // Checking if the error is a route error and extracting status and message for user-friendly display.
  if (isRouteErrorResponse(error)) {
    title = `${error.status} - ${error.statusText}`;
    message = error.error?.message || "An unexpected error occurred.";
    subMes = true;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="bg-red-100 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="rounded-lg bg-red-50 border-red-200 border-2 p-6 max-w-md w-full text-center">
        <BiErrorCircle className="text-red-500 mx-auto mb-4" size={64} />
        <h1 className="max-[350px]:text-xl text-3xl font-self  text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-700 max-[350px]:text-base text-lg">{message}</p>
        {subMes && (
          <p className="max-[350px]:text-sm text-gray-500 mt-2">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
        )}
        {/* Navigate back to the previous page and  home page when clicked. */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="max-[350px]:text-sm max-[350px]:py-2 max-[350px]:px-4 px-6 py-3 bg-gray-200 shadow-xl  text-gray-700 rounded-lg hover:bg-gray-300 transition">
            Go Back
          </button>
          <Link
            to={"/"}
            className="max-[350px]:text-sm max-[350px]:py-2 max-[350px]:px-4 px-6 py-3 shadow-xl bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
