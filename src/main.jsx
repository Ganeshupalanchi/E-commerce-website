import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./screen/home/Home.jsx";
import Shop from "./screen/Shop/Shop.jsx";
import ProductDetail from "./screen/Product/ProductDetail.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Cart from "./screen/cart/Cart.jsx";
import Services from "./screen/Services/Services.jsx";
import Login from "./screen/Login/Login.jsx";
import Signup from "./screen/Signup/Signup.jsx";
import ErrorPage from "./screen/ErrorPage.jsx";
import Checkout from "./screen/Checkout/Checkout.jsx";
import UserOrders from "./screen/UserOrders/UserOrders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/product-detail/:productId",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/Services",
        element: <Services />,
      },
      {
        path: "/about",
        element: (
          <div className="mt-36 flex items-center justify-center text-3xl font-medium uppercase">
            About US
          </div>
        ),
      },
      {
        path: "/contact",
        element: (
          <div className="mt-36 flex items-center justify-center text-3xl font-medium uppercase">
            Contact US
          </div>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Signup />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/my-orders",
        element: <UserOrders />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
