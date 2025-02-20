import Layout from "../../components/Layout/Layout";
import AdminSideBar from "../../components/Layout/AdminSideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Adjust the endpoint if needed
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/api/v1/product/get-products/`
        );
        // Assuming your API returns an array in data.product
        setProducts(data.product);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <Layout>
      <AdminSideBar />
      <div className="p-4 sm:ml-64">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  onClick={() =>
                    navigate(`/admin-dashboard/update-product/${product.slug}`)
                  }
                  className="bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-200"
                >
                  {product.photo ? (
                    <img
                      src={`${
                        import.meta.env.VITE_API
                      }/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-white">
                      No Image
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-white">
                      {product.name}
                    </h2>
                    <p className="text-gray-300 mt-2">
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + "..."
                        : product.description}
                    </p>
                    <p className="text-blue-400 mt-2">${product.price}</p>
                    <p className="text-gray-400 mt-2">
                      Quantity: {product.quantity}
                    </p>
                    {product.shipping ? (
                      <p className="text-green-400 mt-2">Free Shipping</p>
                    ) : (
                      <p className="text-red-400 mt-2">No Shipping</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
