import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserSideBar from '../../components/Layout/UserSideBar';

function Orders() {
  return (
    <Layout>
      <UserSideBar />

      <div className="p-4 sm:ml-64">
        <h1>Orders</h1>
      </div>
    </Layout>
  );
}

export default Orders