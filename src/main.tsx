import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. Import the Toaster from sonner
import { Toaster } from "sonner";

import "./index.css";
import App from "./App.tsx";

import { HomePage } from "./modules/customer/pages/HomePage.tsx";
import AuthLayout from "./modules/customer/pages/AuthLayout.tsx";

import Blog from "./modules/customer/pages/Blog";
import { CartProvider } from "./store/CartProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
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
      {/* 2. Add the Toaster with luxury configuration */}
      <Toaster
        position="top-right"
        expand={false}
        richColors={false} // Keeping it minimal/luxury
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#2f1d17",
            border: "1px solid #e7dfe9",
            borderRadius: "0px", // Sharp edges for a high-end feel
            padding: "16px",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          },
        }}
      />
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
);
