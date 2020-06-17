import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Col,
  Row
} from "reactstrap";

const RoutineCard = props => {
  const routine = props.routine;

  const Field = ({ text, value }) => (
    <Row>
      <Col sm="4">{text}: </Col>
      <Col>
        <strong>{value}</strong>
      </Col>
    </Row>
  );

  return (
    <Card body {...props}>
      <CardHeader>
        <p className="lead">
          <strong>{routine.name}</strong>
        </p>
        <small className="text-muted">{routine.description}</small>
      </CardHeader>
      <CardBody>
        <Field text="Frequência" value={routine.frequencyId} />
        <Field text="Início" value={routine.start} />
        <Field text="Término" value={routine.end} />
        <Field text="Intervalo" value={routine.interval} />
      </CardBody>
      <CardFooter />
    </Card>
  );
};

export default RoutineCard;
