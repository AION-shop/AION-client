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
// import PrivateRouter from "./guard/PrivateRouter.jsx";
// import VerifyGuard from "./guard/VerifyGuard.jsx";

// Pages
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
// import Login from "./pages/Login.jsx";
// import Register from "./pages/Register.jsx";
// import UserProfile from "./pages/Profile.jsx";
import FilteredProducts from "./pages/FilteredProducts.jsx";
import SingleColProductPage from "./pages/SingleProducts.jsx"; // single product sahifasi
import Rasrochka from "./pages/Rasrochka.jsx";
import News from "./pages/News.jsx";
import SellCard from "./components/shared/SellCard.jsx";
import Offerta from "./pages/Offerta.jsx";

import "./i18n";

// Toast
import { Toaster } from "react-hot-toast";

// Lang Context
import { LangProvider } from "../LangContext.jsx";

// Root element
const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter(
  [
    // Auth related routes (commented out in original)
    // { path: "/login", element: <Login /> },
    // { path: "/register", element: <Register /> },
    // { path: "/profile", element: <PrivateRouter><VerifyGuard><UserProfile /></VerifyGuard></PrivateRouter> },

    // MAIN ROUTES
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: "categories/:category", element: <FilteredProducts /> },
        { path: "rasrochka", element: <Rasrochka /> },
        { path: "news", element: <News /> },
        { path: "sell-card", element: <SellCard /> },
        { path: "offerta", element: <Offerta /> },
        
        // Single Product Route:
        // Sizda ikkita bir xil route bor edi, bittasini qoldirdim, 
        // uchinchi tomon SingleColProductPage komponentini ishlatsin deb belgiladim
        { path: "col-products/:id", element: <SingleColProductPage /> }, 
      ],
    },

    // 404 fallback page
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
            {/* O'zgartirildi: button emas, a href orqali uy sahifaga qaytish */}
            <a href="/" className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition shadow-md">
              Back to Home
            </a>
          </div>
        </div>
      ),
    },
  ],
  { basename: "/" }
);

// Render application
root.render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate
          loading={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
            </div>
          }
          persistor={persistor}
        >
          <LangProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" reverseOrder={false} />
          </LangProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);

