import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';


const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header></Header>
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer></Footer>
    </div>
  );
};

//  These are default props
Layout.defaultProps = {
  title : "Ecommerce App - shop now" , 
  description : "This is mern stack project" ,
  keywords : "nothing" ,
  author : "Ashish Saini"
}

export default Layout;
