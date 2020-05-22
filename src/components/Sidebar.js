import React from "react";
import { withRouter } from "react-router-dom";

import { ListGroup, ListGroupItem } from "reactstrap";

const Sidebar = props => {
  return (
    <ListGroup flush>
      <ListGroupItem tag="a" href="#">
        Agenda
      </ListGroupItem>
      <ListGroupItem tag="a" href="#">
        Tarefas
      </ListGroupItem>
    </ListGroup>
  );
};

export default withRouter(Sidebar);
