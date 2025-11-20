import { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, SquareXIcon, LogOut, Heart, BarChart2 } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "./Container";
import ColProductCard from "../ui/cards/ColProductCard";
import { logout } from "../../redux/slices/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const cartCount = useSelector((state) => state.cart?.cartItems?.length || 0);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // 🔹 Get all products on mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await res.json();
        if (data.success) setAllProducts(data.products || []);
      } catch (err) {
        console.error("Fetch all products error:", err);
      }
    };
    fetchAllProducts();
  }, []);

  // 🔹 Search products
  useEffect(() => {
    const fetchSearch = async () => {
      const query = searchValue.trim();
      if (query === "") {
        setSearchResults([]);
        return;
      }

      try {
        // Backenddagi search endpointdan qidirish
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/search?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        if (data.success) {
          setSearchResults(data.products || []);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.error("Search error:", err);
        // fallback: frontend filter
        setSearchResults(
          allProducts.filter((p) =>
            p.title.toLowerCase().includes(query.toLowerCase())
          )
        );
      }
    };

    fetchSearch();
  }, [searchValue, allProducts]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-base-100 text-base-content shadow-md relative z-50">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold hover:scale-105 transition-transform duration-200">
            AION-shop
          </Link>

          {/* Search input */}
          <div className="hidden md:flex flex-1 mx-6">
            <input
              type="text"
              placeholder="Поиск по названию"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setIsSearchOpen(true);
              }}
              className="flex-1 input input-bordered"
            />
            <button className="btn btn-primary">
              <Search size={18} />
            </button>
          </div>

          {/* User & Cart */}
          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="font-medium">{user.telegram}</span>
                <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-ghost btn-sm font-medium">
                Войти
              </Link>
            )}
            <Link to="/korzinka" className="relative flex items-center gap-1 btn btn-ghost btn-sm">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="badge badge-sm badge-primary absolute -top-1 -right-1">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
      </Container>

      {/* FULLSCREEN SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] h-screen w-full">
          <div className="container mx-auto max-w-7xl py-10 flex border-b">
            <input
              type="text"
              placeholder="Поиск по названию"
              autoFocus
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 input input-bordered"
            />
            <button className="btn btn-primary">
              <Search size={18} />
            </button>
          </div>

          <div className="max-w-7xl mx-auto container py-6">
            <p className="font-bold text-3xl text-white">Результаты поиска</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
              {(searchResults.length > 0 ? searchResults : allProducts)
                .filter((p) => p.title.toLowerCase().includes(searchValue.toLowerCase()))
                .map((product) => (
                  <ColProductCard key={product._id} card={product} />
                ))}
            </div>

            <div className="absolute top-6 right-6">
              <button
                className="btn btn-circle btn-ghost text-white"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchValue("");
                }}
              >
                <SquareXIcon size={30} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
