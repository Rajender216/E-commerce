import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShopware, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/auth";

function Header() {
  const [auth, setAuth] = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-800 shadow-xl">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative">
        {/* Mobile: Left Side - Hamburger Menu */}
        <button
          className="md:hidden text-gray-900 dark:text-white text-2xl z-10"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <FaBars />
        </button>

        {/* Center - Logo */}
        <Link to="/" className="flex items-center mx-auto md:mx-0">
          <FaShopware className="text-3xl text-indigo-600" />
        </Link>

        {/* Right Side: Get Started (Mobile) */}
        {!auth.user && (
          <Link
            to="/register"
            className="md:hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get Started
          </Link>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:space-x-8">
          {["Home", "About", "Policy", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className={({ isActive }) =>
                `text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded ${
                  isActive ? "text-blue-700 dark:text-blue-500" : ""
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </div>

        {/* Auth/Profile Dropdown (Desktop) */}
        {auth.user ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://picsum.photos/200"
                alt="User"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-10">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{auth.user.name}</div>
                  <div className="font-medium truncate">{auth.user.email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      to={
                        auth.user.role === 1
                          ? "/admin-dashboard"
                          : "/user-dashboard"
                      }
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                </ul>
                <div className="py-2">
                  <Link
                    to="/logout"
                    onClick={handleLogOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/register"
            className="hidden md:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get Started
          </Link>
        )}
      </div>

      {/* Mobile Menu (Sliding from Left) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-md transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-900 dark:text-white text-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaTimes />
        </button>

        <div className="p-6 space-y-4 pt-9">
          <h1 className="text-3xl text-white font-bold">E-Commerce</h1>
          {["Home", "About", "Policy", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className={({ isActive }) =>
                `block py-2 px-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${
                  isActive ? "text-blue-700 dark:text-blue-500" : ""
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </NavLink>
          ))}

          
        </div>
      </div>
    </nav>
  );
}

export default Header;

// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { FaShopware } from "react-icons/fa";

// import { useAuth } from "../../context/auth";

// function Header() {
//   const [auth, setAuth] = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogOut = () => {
//     setAuth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     localStorage.removeItem("auth");
//   };

//   return (
//     <>
//       <nav className="bg-white border-gray-200 dark:bg-gray-800 shadow-xl static">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <Link to="/" className="flex items-center ">
//             <FaShopware className="text-3xl text-indigo-600" />
//           </Link>

//           {!auth.user ? (
//             <>
//               <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//                 <Link
//                   to="/register"
//                   type="button"
//                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 >
//                   Get started
//                 </Link>
//               </div>
//             </>
//           ) : (
//             <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//               <div className="relative">
//                 <button
//                   onClick={() => setIsOpen(!isOpen)}
//                   className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
//                   type="button"
//                 >
//                   <span className="sr-only">Open user menu</span>
//                   <img
//                     className="w-8 h-8 rounded-full"
//                     src="https://picsum.photos/200"
//                     alt="user photo"
//                   />
//                 </button>

//                 {isOpen && (
//                   <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
//                     <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
//                       <div>{auth.user.name}</div>
//                       <div className="font-medium truncate">
//                         {auth.user.email}
//                       </div>
//                     </div>
//                     <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//                       <li>
//                         <Link
//                           to={
//                             auth.user.role === 1
//                               ? "/admin-dashboard"
//                               : "/user-dashboard"
//                           }
//                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                         >
//                           Dashboard
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/settings"
//                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                         >
//                           Settings
//                         </Link>
//                       </li>
//                     </ul>
//                     <div className="py-2">
//                       <Link
//                         to="/logout"
//                         onClick={handleLogOut}
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                       >
//                         Sign out
//                       </Link>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           <div
//             className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
//             id="navbar-cta"
//           >
//             <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
//               <li>
//                 <NavLink
//                   to="/"
//                   className={({ isActive }) =>
//                     `block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent ${
//                       isActive ? "md:text-blue-700 md:dark:text-blue-500" : ""
//                     }  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`
//                   }
//                   aria-current="page"
//                 >
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/about"
//                   className={({ isActive }) =>
//                     `block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent ${
//                       isActive ? "md:text-blue-700 md:dark:text-blue-500" : ""
//                     }  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`
//                   }
//                 >
//                   About
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/policy"
//                   className={({ isActive }) =>
//                     `block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent ${
//                       isActive ? "md:text-blue-700 md:dark:text-blue-500" : ""
//                     }  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`
//                   }
//                 >
//                   Policy
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/contact"
//                   className={({ isActive }) =>
//                     `block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent ${
//                       isActive ? "md:text-blue-700 md:dark:text-blue-500" : ""
//                     }  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`
//                   }
//                 >
//                   Contact
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/c"
//                   className={({ isActive }) =>
//                     `block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent ${
//                       isActive ? "md:text-blue-700 md:dark:text-blue-500" : ""
//                     }  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`
//                   }
//                 >
//                   any
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Header;
