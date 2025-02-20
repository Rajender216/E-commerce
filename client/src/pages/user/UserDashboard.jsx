import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserSideBar from "../../components/Layout/UserSideBar";

const UserDashboard = () => {
  const [auht] = useAuth();

  return (
    <Layout>
      <UserSideBar />

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

export default UserDashboard;


