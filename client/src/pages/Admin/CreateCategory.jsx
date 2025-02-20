import Layout from "../../components/Layout/Layout";
import AdminSideBar from "../../components/Layout/AdminSideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [name, setName] = useState("");


  const fetchAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/allcategories`
      );
      if (!data?.success) {
        toast.error(data.message);
        return;
      }
      setCategories(data.allCategory);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/category/create-category`,
        { name }
      );
      if (!data?.success) {
        toast.error(data.message);
        return;
      }
      
      toast.success("Category created successfully");
      fetchAllCategories();
      
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    }
  };

  useEffect(() => {
    
    fetchAllCategories();
  }, []);

  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setEditedName(currentName);
  };

  const handleSave = async (id) => {
    try {
      if (!editedName) {
        toast.error("Category name cannot be empty");
        return;
      }

      // Call backend API to update the category
      await axios.put(
        `${import.meta.env.VITE_API}/api/v1/category/update-category/${id}`,
        { name: editedName }
      );
      // Update local state after successful API call
      setCategories((prev) =>
        prev.map((cat) => (cat._id === id ? { ...cat, name: editedName } : cat))
      );
      setEditingId(null);
      setEditedName("");

      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  const handleDelete = async (id) => {
  
      try {
        // Delete category from the backend
        await axios.delete(`${import.meta.env.VITE_API}/api/v1/category/delete-category/${id}`);
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
        toast.success("Category deleted successfully");
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category");
      }
  
  };

  return (
    <Layout title={"Categories"}>
      <div>
        <AdminSideBar />
      </div>
      <div className="max-w-md md:max-w-lg lg:max-w-xl mx-auto p-4 sm:ml-64">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold mb-6">Categories</h2>
          <CategoryForm
            value={name}
            setName={setName}
            handlesubmit={handlesubmit}
          />
        </div>

        <div className="bg-gray-900 shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-black">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-700 divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      {editingId === category._id ? (
                        <input
                          id="editedName"
                          name="editedName"
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="p-2 border border-gray-300 rounded-md w-full bg-gray-900"
                        />
                      ) : ( 
                        category.name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                      {editingId === category._id ? (
                        <button
                          onClick={() => handleSave(category._id)}
                          className="mr-4 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition duration-200 shadow-md"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleEdit(category._id, category.name)
                          }
                          className="mr-4 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 shadow-md"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition duration-200 shadow-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;




// import Layout from "../../components/Layout/Layout";
// import AdminSideBar from "../../components/Layout/AdminSideBar";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const CreateCategory = () => {
//   const [categories, setCategories] = useState([]);

//   // Simulate fetching categories from an API
//   useEffect(() => {
//     const fetchAllCategories = async () => {
//       try {
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API}/api/v1/category/allcategories`
//         );

//         setCategories(data.allCategory);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchAllCategories();
//   }, []);

//   // Handler for editing a category (e.g., navigate to an edit page)
//   const handleEdit = (id) => {
//     // For example, you might use your routing logic here
//     console.log("Edit category", id);
//     // navigate(`/admin-dashboard/edit-category/${id}`);
//   };

//   // Handler for deleting a category
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       // Replace this with your deletion logic or API call
//       setCategories((prev) => prev.filter((cat) => cat.id !== id));
//     }
//   };

//   return (
//     <Layout title={"Categories"}>
//       <div>
//         <AdminSideBar />
//       </div>
//       <div className="max-w-md md:max-w-lg lg:max-w-xl mx-auto p-4 sm:ml-64">
//         <h2 className="text-3xl font-bold mb-6">Categories</h2>
//         <div className="bg-gray-900 shadow-md rounded-lg overflow-hidden">
//           {/* Wrap table in a container for horizontal scrolling on small screens */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-black div ">
//               <thead className="bg-gray-700">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-gray-700 divide-y divide-gray-200">
//                 {categories.map((category) => (
//                   <tr key={category._id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-lg">
//                       {category.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap flex gap-4">
//                       <button
//                         onClick={() => handleEdit(category.id)}
//                         className="mr-4 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 shadow-md"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => handleDelete(category.id)}
//                         className="mr-4 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 shadow-md"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {categories.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan="2"
//                       className="px-6 py-4 text-center text-gray-500"
//                     >
//                       No categories found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CreateCategory;
