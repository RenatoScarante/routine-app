import React from "react";
import { withRouter } from "react-router-dom";

import { ListGroup, ListGroupItem } from "reactstrap";

const Sidebar = props => {
  return (
    <ListGroup flush>
      <ListGroupItem tag="a" href="#">
        Rotinas
      </ListGroupItem>
      <ListGroupItem tag="a" href="#">
        Atividades
      </ListGroupItem>
    </ListGroup>
  );
};

export default withRouter(Sidebar);
