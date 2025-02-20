import React from "react";


function CategoryForm({ name, setName, handlesubmit }) {
  return (
    <>
      <form action="#" onSubmit={handlesubmit} className="flex gap-4">
        <input
          id="category"
          name="category"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add New Category"
          className="p-2 border border-gray-700 bg-gray-700 rounded-md hover:border-blue-600  transition duration-200 mb-6"
        />
        <button
                  type="submit"
          className="mr-4 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 shadow-md mb-6"
        >
          Add
        </button>
      </form>
    </>
  );
}

export default CategoryForm;
