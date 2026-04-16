import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import "./index.css";
import App from "./App.tsx";

import { HomePage } from "./modules/customer/pages/HomePage.tsx";
import AuthLayout from "./modules/customer/pages/AuthLayout.tsx";
import Blog from "./modules/customer/pages/Blog";
import { CartProvider } from "./store/CartProvider.tsx";
import AllCollections from "./modules/customer/pages/AllCollections.tsx";
import ProductDetails from "./modules/customer/pages/ProductDetails.tsx";
import Checkout from "./modules/customer/pages/Checkout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "collections",
        element: <AllCollections />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path:"checkout",
        element:<Checkout/>
      }
    ],
  },
  {
    path: "blog",
    element: <Blog />,
  },
  {
    path: "auth",
    element: <AuthLayout />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <Toaster
        position="top-right"
        expand={false}
        richColors={false}
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#2f1d17",
            border: "1px solid #e7dfe9",
            borderRadius: "0px",
            padding: "16px",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          },
        }}
      />
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);