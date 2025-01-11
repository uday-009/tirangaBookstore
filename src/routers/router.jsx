import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import Wishlist from "../components/Wishlist";
import AllProducts from "../pages/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Auth />
      },
      {
        path: "/orders",
        element: <div> orders page</div>
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",
        element: <Checkout />
      },
      {
        path: "/wishlist",
        element: <Wishlist />
      },
      {
        path: "/allproducts/:slugAndId",
        element: <AllProducts />
      },


    ]
  },
]);

export default router;