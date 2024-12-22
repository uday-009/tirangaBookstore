import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Auth from "../pages/Auth";

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
        }
      ]
    },
  ]);

export default router;