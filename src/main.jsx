// main.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Helmet
import { HelmetProvider } from "react-helmet-async";

// Guards
import PrivateRouter from "./guard/PrivateRouter.jsx";
import VerifyGuard from "./guard/VerifyGuard.jsx";

// Pages
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import UserProfile from "./pages/Profile.jsx";
import VerifyAccount from "./pages/verfiyPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TelegramCallback from "./pages/TelegramCallback.jsx";
import FilteredProducts from "./pages/FilteredProducts.jsx";
import SingleProducts from "./pages/SingleProducts.jsx";
import SingleColProductPage from "./pages/SingleProducts.jsx";
import Korzinka from "./pages/Korzinka.jsx";
import Favorites from "./pages/Fovorites.jsx";
import Rasrochka from "./pages/Rasrochka.jsx";
// import SellOnPage from "./pages/SellOn.jsx";
import Discount from "./pages/Discount.jsx";
import News from "./pages/News.jsx";

// Toast
import { Toaster } from "react-hot-toast";
import SellCard from "./components/shared/SellCard.jsx";


// Router configuration with SEO meta
const router = createBrowserRouter(
  [
    // Profile routes
    {
      path: "/profile",
      element: (
        <PrivateRouter>
          <VerifyGuard>
            <UserProfile />
          </VerifyGuard>
        </PrivateRouter>
      ),
      children: [
        {
          index: true,
          element: (
            <VerifyGuard>
              <Home />
            </VerifyGuard>
          ),
        },
      ],
      errorElement: (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <h1 className="text-3xl font-bold text-gray-600">Profile page not found</h1>
        </div>
      ),
    },
    { path: "/verify-account", element: <PrivateRouter><VerifyAccount /></PrivateRouter> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/telegram/callback", element: <TelegramCallback /> },

    // Main app routes
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: "categories/:category", element: <FilteredProducts /> },
        { path: "korzinka", element: <Korzinka /> },
        { path: "favorites", element: <Favorites /> },
        { path: "rasrochka", element: <Rasrochka /> },
        { path: "news", element: <News /> },
        { path: "discount", element: <Discount /> },
        { path: "products/:id", element: <SingleProducts /> },
        { path: "col-products/:id", element: <SingleColProductPage /> },
        { path: "sell-card", element: <SellCard /> }, 
      ],
    },

    // 404 page
    {
      path: "*",
      element: (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
            <p className="text-gray-500 mb-8">
              The page you're looking for doesn't exist.
            </p>
            <a href="/" className="btn btn-primary w-full">
              Back to Home
            </a>
          </div>
        </div>
      ),
    },
  ],
  { basename: "/" }
);

// Render app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate
          loading={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
          }
          persistor={persistor}
        >
          <RouterProvider router={router} />
          <Toaster position="top-right" reverseOrder={false} /> 
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
