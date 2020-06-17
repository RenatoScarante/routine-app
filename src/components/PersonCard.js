import React from "react";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
  ButtonGroup,
  Button
} from "reactstrap";

const PersonCard = props => {
  const person = props.person;

  const ButtonCustom = props => (
    <Button
      {...props}
      color="none"
      outline
      className={`rounded-circle border-0 bg-transparant text-${props.color}`}
    >
      {props.children}
    </Button>
  );

  return (
    <Card body {...props}>
      <CardBody>
        <Row className="h-100 align-items-center">
          <Col sm="2">
            <p className="h1 my-0 mr-2">
              <i className="fa fa-user"></i>
            </p>
          </Col>
          <Col>
            <CardTitle>
              <p className="lead">
                <strong>{person.name}</strong>
              </p>
            </CardTitle>
            <CardSubtitle>{person.description}</CardSubtitle>
          </Col>
          <Col sm="4">
            <ButtonGroup size="lg" className="h-100 align-items-center">
              <ButtonCustom color="info">
                <i className="fa fa-edit"></i>
              </ButtonCustom>
              <ButtonCustom
                color="danger"
                onClick={() => props.deletePerson(person.id)}
              >
                <i className="fa fa-trash"></i>
              </ButtonCustom>
            </ButtonGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default PersonCard;
