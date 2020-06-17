import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import api from "../services/api";

import {
  Container,
  Button,
  Table,
  Row,
  Col,
  CardDeck,
  Card,
  CardBody,
  CardHeader,
  CardTitle
} from "reactstrap";

import RoutineCard from "../components/RoutineCard";

const Routine = () => {
  const { user } = useSelector(state => state.auth);
  const [routines, setRoutines] = useState([]);
  const [lines, setLines] = useState([]);
  const [people, setPeople] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    handleRoutines();
    handlePeople();
  }, []);

  async function handleRoutines() {
    try {
      await api
        .get(`${process.env.REACT_APP_URL_USER}/${user.id}/routines`)
        .then(res => setRoutines(res.data))
        .catch(error => {
          toastr.error(
            `Erro`,
            `Erro ao solicitar as rotinas ${error.response.data.message}`
          );
        });
    } catch (error) {
      toastr.error(`Erro`, `Erro ao solicitar as rotinas ${error.message}`);
    }
  }

  async function handleLines(routineId) {
    try {
      await api
        .get(`${process.env.REACT_APP_URL_ROUTINE}/${routineId}/lines`)
        .then(res => {
          setLines(res.data);
        })
        .catch(error => {
          toastr.error(
            `Erro`,
            `Erro ao solicitar as atividades ${error.response.data.message}`
          );
        });
    } catch (error) {
      toastr.error(`Erro`, `Erro ao solicitar as atividades ${error.message}`);
    }
  }

  async function handlePeople() {
    try {
      await api
        .get(`${process.env.REACT_APP_URL_USER}/${user.id}/person`)
        .then(res => {
          var people = res.data;
          var activitiesList = [];

          setPeople(people);

          people.map(async person => {
            await api
              .get(
                `${process.env.REACT_APP_URL_USER}/${user.id}/person/${person.id}/activities`
              )
              .then(res => {
                activitiesList.push({
                  person: { ...res.data },
                  activities: res.data.activity
                });
              })
              .catch(error => {
                toastr.error(
                  `Erro`,
                  `Erro ao solicitar as atividades ${error.response.data.message}`
                );
              });
          });

          setActivities(activitiesList);
        })
        .catch(error => {
          toastr.error(`Erro`, `Erro ao solicitar as pessoas ${error}`);
        });
    } catch (error) {
      toastr.error(`Erro`, `Erro ao solicitar as pessoas ${error.message}`);
    }
  }

  const RoutinesCards = () => {
    return (
      <CardDeck>
        {routines.map(routine => (
          <RoutineCard
            key={routine.id}
            routine={routine}
            onClick={() => handleLines(routine.id)}
          />
        ))}
      </CardDeck>
    );
  };

  const Activities = () => (
    <>
      <h3>Atividades</h3>
      {lines.length === 0 ? (
        <p>Sem linhas</p>
      ) : (
        <Table bordered striped hover size="sm">
          <thead className="text-center">
            <tr>
              <th style={{ width: "10%" }}>Hora</th>
              {people.map(people => (
                <th key={people.id} style={{ width: `${90 / people.length}%` }}>
                  {people.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lines.map(line => (
              <tr key={line.id} className="text-center">
                <td style={{ width: "10%" }}>
                  <small>{line.time}</small>
                </td>
                {people.map(person => (
                  <td
                    key={person.id}
                    style={{ width: `${90 / people.length}%` }}
                  >
                    {ActivityLine(line.id, person.id)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );

  const ActivityLine = (lineId, personId) => {
    var person = activities.find(item => item.person.id === personId);
    var activity = person.activities.find(
      activity => activity.routineLineId === lineId
    );

    return activity === undefined ? (
      <Row>
        <Col className="ml-1 text-center">
          <small>
            <strong>-</strong>
          </small>
        </Col>
        <Col sm="auto">
          <small>
            <i className=""></i>
          </small>
          <small className="text-primary">
            <i className="fa fa-plus"></i>
          </small>
        </Col>
      </Row>
    ) : (
      <Row>
        <Col className="ml-1 text-left">
          <small>
            <strong>{activity.title}</strong>
          </small>
        </Col>
        <Col sm="auto">
          <Button
            size="sm"
            outline
            className="border-0 p-0 bg-transparent text-info "
          >
            <i className="fa fa-edit" />
          </Button>
          <Button
            size="sm"
            outline
            className="border-0 p-0 bg-transparent text-danger"
          >
            <i className="fa fa-trash" />
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Container className="vh-100 my-2 py-2">
        <h1>Rotinas</h1>
        <br />
        <RoutinesCards />
        <Activities />
      </Container>
    </>
  );
};

export default Routine;
