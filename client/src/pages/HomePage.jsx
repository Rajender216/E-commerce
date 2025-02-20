import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Layout from "../components/Layout/Layout";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  // State to track mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Create a ref for the mobile sidebar
  const mobileSidebarRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/api/v1/category/allcategories`
        );
        setCategories(data.allCategory);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/api/v1/product/get-products`
        );
        setProducts(data.product);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Close the sidebar when clicking outside of it (mobile view)
  useEffect(() => {
    if (!isSidebarOpen) return; // only add listener when sidebar is open

    const handleClickOutside = (event) => {
      if (
        mobileSidebarRef.current &&
        !mobileSidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <Layout title={"Home"}>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
        {/* Desktop Sidebar (visible on md and up) */}
        <aside className="hidden md:block md:w-64 bg-gray-800 p-6 sticky top-0 h-screen overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category._id} className="mb-2">
                <Link
                  to={`/category/${category._id}`}
                  className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Mobile Hamburger Button (visible only below md) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 fixed top-16 left-4 z-10"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? "" : <FaBars size={24} />}
        </button>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <aside
            ref={mobileSidebarRef}
            className="md:hidden fixed inset-0 bg-gray-800 p-6 w-64 overflow-y-auto transition-transform duration-300 top-16"
          >
            {/* Close button inside the mobile sidebar */}
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-white"
              aria-label="Close sidebar"
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <ul>
              {categories.map((category) => (
                <li key={category._id} className="mb-2">
                  <Link
                    onClick={toggleSidebar}
                    to={`/category/${category._id}`}
                    className="block p-2 bg-gray-700 rounded hover:bg-gray-600"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Main Content: products grid */}
        <main className="flex-1 p-6 pt-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <img
                  src={`${
                    import.meta.env.VITE_API
                  }/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-400">
                  {product.description.slice(0, 50)}...
                </p>
                <p className="text-green-400 font-bold mt-1">
                  ₹{product.price}
                </p>
                <Link
                  to={`/product/${product._id}`}
                  className="block mt-3 px-4 py-2 bg-blue-600 text-center rounded hover:bg-blue-700"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default HomePage;
