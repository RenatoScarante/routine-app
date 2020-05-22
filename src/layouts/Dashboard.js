import React from "react";

import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";

const Dashboard = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Navbar />
        <Sidebar />
        {children}
      </Wrapper>
    </>
  );
};

export default Dashboard;
