import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminSideBar from "../../components/Layout/AdminSideBar";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
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
  const [pictureid, setPictureId] = useState(null);

  // Fetch single product
  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/api/v1/product/get-product/${slug}`
        );
        console.log(data);

        if (data?.success) {
          const product = data.product;
          setValues({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            category: product.category._id,
            shipping: product.shipping,
          });
        setPictureId(product._id);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching product details");
      }
    };

    if (slug) getSingleProduct();
  }, [slug]);

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

  // Handle input changes
    const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handle checkbox change for shipping
  const handleCheckbox = (e) => {
    setValues({ ...values, shipping: e.target.checked });
  };

  // Handle photo selection
 const handlePhoto = (e) => {
   if (e.target.files.length > 0) {
     setPhoto(e.target.files[0]);
   }
 };

    

  // Handle form submission
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

      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/product/update-product/${pictureid}`,
        productData
      );

      if (!data?.success) {
        toast.error(data.message || "Failed to update product");
        return;
      }
      toast.success("Product updated successfully");
      navigate("/admin-dashboard/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
    };
    
    //handle delete form
    const handleDelete = async () => {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_API}/api/v1/product/delete-product/${pictureid}`
        );
        if (!data?.success) {
          toast.error(data.message || "Failed to delete product");
          return;
        }
        toast.success("Product deleted successfully");
        navigate("/admin-dashboard/products");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    };

  return (
    <Layout title={"Update Product"}>
      <AdminSideBar />
      <div className="p-4 sm:ml-64">
        <div className="max-w-2xl mx-auto p-6 bg-gray-700 m-9 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Update Product</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white">Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full bg-gray-900"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Description</label>
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full bg-gray-900"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-white">Price</label>
              <input
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full bg-gray-900"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Category</label>
              <select
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
            <div className="mb-4">
              <label className="block text-white">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full bg-gray-900"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="shipping"
                checked={values.shipping}
                onChange={handleCheckbox}
                className="mr-2"
              />
              <label className="text-white">Shipping available</label>
            </div>
            <div className="mb-4">
              <label className="block text-white">Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhoto} // Fix applied
                className="p-2 border border-gray-300 rounded w-full bg-gray-900"
              />

              {/* Show selected image preview */}
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="New Upload"
                  className="w-100 h-48 object-cover mt-2"
                />
              ) : (
                <img
                  src={`${
                    import.meta.env.VITE_API
                  }/api/v1/product/product-photo/${pictureid}`}
                  alt={values.name}
                  className="w-100 h-48 object-cover mt-2"
                />
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Update Product
              </button>
              <button
                type="submit"
                onClick={handleDelete}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-red-700 transition duration-200"
              >
                Delete Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
