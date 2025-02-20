import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

function Layout({
  children,
  title = "Ecommerce",
  description = "MERN stack project",
  keywords = "mern, react, node, mongodb",
  author = "Rajender",
}) {
  title = `${title} | Ecommerce`;
  description = `${description} | MERN stack project`;
  keywords = `${keywords} | mern, react, node, mongodb`;
  author = `${author} | Rajender`;

  return (
    <div className="bg-gray-900">
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header className="sticky top-0 z-10" />
      <main className=" h-[82.2vh] overflow-y-auto text-white ">
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

// import React, { Children } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import { Helmet } from "react-helmet";
// import { ToastContainer } from "react-toastify";

// Layout.defaultProps = {};
// function Layout({ children, title, description, keywords, author }) {
//   title: `${title} | Ecommerce`;
//   description: `${description} | mern stack project`;
//   keywords: `${keywords} |mern, react, node, mongodb`;
//   author: `${author} |Rajender`;
//   return (
//     <div className="bg-gray-900">
//       <Helmet>
//         <meta name="description" content={description} />
//         <meta name="keywords" content={keywords} />
//         <meta name="author" content={author} />
//         <title>{title}</title>
//       </Helmet>
//       <Header />
//       <main className="h-[82vh] overflow-y-auto">
//         <ToastContainer />
//         {children}
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Layout;
