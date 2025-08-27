import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import NotFound from "./components/NotFound.jsx";
import Home from "./components/Home";
import Loader from "./components/Loader.jsx";
import "./index.css";
import store from "./utils/store.js";

const ProductList = lazy(() => import("./components/ProductList.jsx"));
const ProductDetails = lazy(() => import("./components/ProductDetails.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));
const CheckoutPage = lazy(() => import("./components/Checkout.jsx"));
const OrdersHistory = lazy(() => import("./components/Orders.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/products",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductList />
          </Suspense>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<Loader />}>
            <CheckoutPage />
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<Loader />}>
            <OrdersHistory />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
