import React from "react";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import Layout from "../components/Layout/Layout";
function About() {
  return (
    <>
      <Layout title={"About Us"}>
        <section className="bg-gray-100 dark:bg-gray-900 py-12 px-6 min-h-[80vh]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              About Us
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              We are a passionate team dedicated to delivering high-quality
              products and services. Our mission is to create impactful digital
              experiences for everyone.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-10">
              <div className="w-48 text-center">
                <VscAccount className="w-32 h-32 rounded-full mx-auto" />
                <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
                  John Doe
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  CEO & Founder
                </p>
              </div>

              <div className="w-48 text-center">
                <VscAccount className="w-32 h-32 rounded-full mx-auto" />

                <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
                  Jane Smith
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Lead Designer
                </p>
              </div>

              <div className="w-48 text-center">
                <VscAccount className="w-32 h-32 rounded-full mx-auto" />

                <h3 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
                  Alex Brown
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Head Developer
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8">
              <Link
                to="/contact"
                className="px-6 py-3 text-white bg-blue-600 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default About;
