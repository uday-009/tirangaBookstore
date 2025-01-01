import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";

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

      ]
    },
  ]);

export default router;