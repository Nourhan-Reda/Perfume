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
import { WishlistProvider } from "./store/WishlistProvider.tsx";
import AllCollections from "./modules/customer/pages/AllCollections.tsx";
import CartPage from "./modules/customer/pages/CartPage.tsx";
import WishlistPage from "./modules/customer/pages/WishlistPage.tsx";
import ProductDetails from "./modules/customer/pages/ProductDetails.tsx";
import Checkout from "./modules/customer/pages/Checkout.tsx";
import ProtectedRoute from "./protected/ProtectedRoute.tsx";
import ProfilePage from "./modules/customer/pages/Profile.tsx";
import ChatBot from "./modules/customer/components/Home/ChatBot.tsx";
import AuthRoute from "./protected/AuthGuard.tsx";
import AdminLayout from "./modules/admin/pages/AdminLayout.tsx";
import Overview from "./modules/admin/pages/Overview.tsx";
import Inventory from "./modules/admin/pages/Inventory.tsx";
import Categories from "./modules/admin/pages/Categories.tsx";
import StockSales from "./modules/admin/pages/StockSales.tsx";
import AdminProtectedRoute from "./protected/AdminProtectedRoute.tsx";
import UserRoute from "./protected/UserRoute.tsx";
import ConciergeLogs from "./modules/admin/components/ConciergeLogs.tsx";
import Settings from "./modules/admin/pages/Settings.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserRoute>
        <App />
      </UserRoute>
    ),
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
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "blog",
    element: <Blog />,
  },
  {
    path: "auth",
    element: (
      <AuthRoute>
        <AuthLayout />
      </AuthRoute>
    ),
  },
  {
    path: "chatbot",
    element: <ChatBot />,
  },
  {
    path: "admin",
    element: (  <AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>),
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      { path: "categories", element: <Categories /> },
      { path: "stats", element: <StockSales /> },
      { path: "ai-logs", element: <ConciergeLogs /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  // {
  //   path: "dashboard",
  //   element: (
  //     <AdminProtectedRoute>
  //       <Dashboard />
  //     </AdminProtectedRoute>
  //   ),
  // },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
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
      </WishlistProvider>
    </CartProvider>
  </StrictMode>,
);
