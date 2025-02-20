import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminSideBar from "../../components/Layout/AdminSideBar";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auht] = useAuth();

  return (
    <Layout>
      <AdminSideBar />

      <div className="p-4 sm:ml-64">
        <div className="p-4  rounded-lg dark:border-gray-700">
          {/* User Details Card */}
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Admin Details
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Name: {auht?.user?.name}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Email: {auht?.user?.email}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Phone: {auht?.user?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

// import React from 'react'
// import Layout from '../../components/Layout/Layout'

// function AdminDashboard() {
//   return (
//       <Layout>
//           <h1>AdminDashboard</h1>
//     </Layout>
//   )
// }

// export default AdminDashboard;
