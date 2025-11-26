import { useState, useEffect } from "react";
import { ShoppingCart, Search, X } from "lucide-react";
import { useSelector } from "react-redux";
import Container from "./Container";

const API_URL = import.meta.env.VITE_API_URL;

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();

        if (data.success && Array.isArray(data.products)) {
          setAllProducts(data.products);
        } else if (Array.isArray(data)) {
          setAllProducts(data);
        }
      } catch {
        setAllProducts([]);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return setSearchResults([]);

    setSearchResults(
      allProducts.filter((p) => p.title.toLowerCase().includes(q))
    );
  }, [searchValue, allProducts]);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a
              href="/"
              className="text-xl sm:text-2xl font-bold text-black hover:text-blue-600 transition"
            >
              AION-shop
            </a>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 mx-6 max-w-xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => {
                    setIsSearchOpen(true);
                    setSearchValue(e.target.value);
                  }}
                  className="w-full input input-bordered rounded-lg border-gray-300"
                />
                <button className="absolute right-0 top-0 h-full px-4 btn btn-primary rounded-r-lg">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Mobile Search */}
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={22} />
              </button>

              {/* Cart */}
              <a href="/korzinka" className="relative p-2 hover:bg-gray-100 rounded-lg">
                <ShoppingCart size={24} className="text-black" />
                {cartCount > 0 && (
                  <span className="badge badge-sm badge-primary absolute -top-1 -right-1">
                    {cartCount}
                  </span>
                )}
              </a>
            </div>

          </div>
        </Container>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col animate-fade">
          <div className="bg-white border-b p-4 flex items-center gap-3 shadow-md">
            <input
              type="text"
              autoFocus
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="input input-bordered flex-1 rounded-lg"
            />

            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchValue("");
              }}
              className="btn btn-gray-900 btn-square btn-sm "
            >
              <X size={25} />
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto bg-white p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

              {!searchValue && (
                <p className="col-span-full text-center text-gray-400 py-10">
                  Qidiruv uchun matn kiriting...
                </p>
              )}

              {searchValue &&
                searchResults.map((p) => (
                  <div
                    key={p._id}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer bg-white"
                  >
                    <img
                      src={p.images?.[0] || "https://via.placeholder.com/300"}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-medium truncate text-gray-900">{p.title}</h3>
                      <p className="font-semibold text-gray-700">
                        {p.price?.toLocaleString()} UZS
                      </p>
                    </div>
                  </div>
                ))}

              {searchValue && searchResults.length === 0 && (
                <p className="col-span-full text-center text-gray-500 py-6">
                  Mahsulot topilmadi 😕
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
