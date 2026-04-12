import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";

import { HomePage } from "./modules/customer/pages/HomePage.tsx";
import AuthLayout from "./modules/customer/pages/AuthLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
   
      {
        index:true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
