import React from "react";

import Navbar from "../components/Navbar";
import Main from "../components/Main";
//import Wrapper from "../components/Wrapper";
//import Sidebar from "../components/Sidebar";

const Dashboard = ({ children }) => {
  return (
    <>
      <Navbar />
      <Main>{children}</Main>
    </>
  );
};

export default Dashboard;
