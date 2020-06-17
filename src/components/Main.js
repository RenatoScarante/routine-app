import React from "react";
import classNames from "classnames";
import styled from "styled-components";

export const MainDiv = styled.div`
  margin-top: 5rem;
  width: 100%;
  min-height: 100vh;
  min-width: 0;
  -webkit-transition: margin-left 0.35s ease-in-out, left 0.35s ease-in-out;
  transition: margin-left 0.35s ease-in-out, left 0.35s ease-in-out;
  @media (max-width: 991.98px) {
    .main {
      overflow-y: hidden;
    }
  }
`;

const Main = ({ className, children }) => (
  <MainDiv className={classNames(className)}>{children}</MainDiv>
);

export default Main;
