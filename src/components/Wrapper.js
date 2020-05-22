import React from "react";
import styled from "styled-components";

const WrapperDiv = styled.div`
  -webkit-box-align: stretch;
  align-items: stretch;
  display: -webkit-box;
  display: flex;
  width: 100%;

  max-width: 1440px;
  margin: 0 auto;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Wrapper = ({ children }) => {
  return <WrapperDiv>{children}</WrapperDiv>;
};

export default Wrapper;
