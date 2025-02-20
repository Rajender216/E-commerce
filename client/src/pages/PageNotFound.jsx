import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

function PageNotFound() {
  return (
    <>
      <Layout title={"Page Not Found"}>
        <section className="bg-gray-900 min-h-[80vh]">
          <div className="flex min-h-[80vh] font-bold text-white justify-center items-center flex-col gap-4">
            <h1 className="text-6xl">404</h1>
            <p className="">Page Not Found</p>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default PageNotFound;
