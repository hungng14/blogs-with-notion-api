import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

const Layout = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
