import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
const UserSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = (event) => {
    if (!event.target.closest("aside") && !event.target.closest("button")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeSidebar);
    return () => {
      document.removeEventListener("click", closeSidebar);
    };
  }, []);

  return (
    <div className="flex">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-13 left-0 z-40 w-64 h-[82vh] transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-gray-50 dark:bg-gray-800`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li className="pb-4">
              <Link
                to="/user-dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">
                  <h3 className="text-3xl font-semibold">Dashboard</h3>
                </span>
              </Link>
            </li>
            <li>
              <NavLink
                to="/user-dashboard/orders"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isActive
                      ? " bg-gray-200 dark:bg-gray-700 shadow-md"
                      : "text-gray-900 dark:text-white"
                  }`
                }
              >
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Z" />
                  <path d="M17 11h-4V7a1 1 0 0 0-2 0v4H7a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2Z" />
                </svg>

                <span className="ms-3">Orders</span>
              </NavLink>
            </li>
            
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default UserSideBar;

