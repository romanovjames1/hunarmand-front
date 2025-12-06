import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AdminPanel,
  Cart,
  Checkout,
  HomeLayout,
  Landing,
  OrderConfirmation,
  OrderHistory,
  Search,
  Shop,
  SingleOrderHistory,
  SingleProduct,
} from "./pages";

import { checkoutAction, searchAction } from "./actions/index";
import { shopCategoryLoader } from "./pages/Shop";
import { loader as orderHistoryLoader } from "./pages/OrderHistory";
import { loader as singleOrderLoader } from "./pages/SingleOrderHistory";
import { LanguageProvider } from "./context/LanguageContext";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/:category",
        element: <Shop />,
        loader: shopCategoryLoader,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        action: checkoutAction,
      },
      {
        path: "search",
        action: searchAction,
        element: <Search />,
      },
      {
        path: "order-confirmation",
        element: <OrderConfirmation />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
        loader: orderHistoryLoader,
      },
      {
        path: "order-history/:id",
        element: <SingleOrderHistory />,
        loader: singleOrderLoader,
      },
      {
        path: "admin",
        element: <AdminPanel />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    const disableInspect = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", disableInspect);
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    return () => {
      document.removeEventListener("keydown", disableInspect);
    };
  }, []); //inspect block uchun
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;
