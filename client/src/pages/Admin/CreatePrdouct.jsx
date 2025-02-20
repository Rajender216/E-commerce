import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminSideBar from "../../components/Layout/AdminSideBar";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: false,
  });
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // Fetch categories to populate the select dropdown
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

  // Update form values
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handle checkbox change for shipping
  const handleCheckbox = (e) => {
    setValues({ ...values, shipping: e.target.checked });
  };

  // Handle photo file selection
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  // Handle form submission to create product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", values.name);
      productData.append("description", values.description);
      productData.append("price", values.price);
      productData.append("category", values.category);
      productData.append("quantity", values.quantity);
      productData.append("shipping", values.shipping);
      if (photo) productData.append("photo", photo);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/product/create-product`,
        productData
      );

      if (!data?.success) {
        toast.error(data.message || "Failed to create product");
        return;
      }
      toast.success("Product created successfully");
      // Reset form values after successful submission
      navigate("/admin-dashboard/products");
      setValues({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        shipping: false,
      });
      setPhoto(null);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
    }
  };

  return (
    <Layout title={"Create Product"}>
      <AdminSideBar />
      <div className="p-4 sm:ml-64">
        <div className="max-w-2xl mx-auto p-6 bg-gray-700 m-9 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Create Product</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label htmlFor="name" className="block text-white">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Product name"
                className="p-2 border border-gray-300 rounded w-full bg-gray-900"
                required
                autoComplete="on"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-white">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Product description"
                className="p-2 border border-gray-300 rounded w-full bg-gray-900"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-white">
                Price
              </label>
              <input
                id="price"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                placeholder="Product price"
                className="p-2 border border-gray-300 rounded w-full bg-gray-900"
                required
              />
            </div>

            <div className="mb-4 max-w-full overflow-hidden">
              <label htmlFor="category" className="block text-white">
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded w-full bg-gray-900 text-white"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-white">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                placeholder="Product quantity"
                className="p-2 border border-gray-300 rounded w-full bg-gray-900"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                id="shipping"
                type="checkbox"
                name="shipping"
                checked={values.shipping}
                onChange={handleCheckbox}
                className="mr-2"
              />
              <label htmlFor="shipping" className="text-white">
                Shipping available
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="photo" className="block text-white">
                Photo
              </label>
              <input
                id="photo"
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhoto}
                className="p-2 border border-gray-300 rounded w-full bg-gray-900 "
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

