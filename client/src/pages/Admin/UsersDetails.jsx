import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminSideBar from '../../components/Layout/AdminSideBar';

function UsersDetails() {
  return (
    <Layout>
      <AdminSideBar />
      <div className="p-4 sm:ml-64">
        <h1>User</h1>
      </div>
    </Layout>
  );
}

export default UsersDetails