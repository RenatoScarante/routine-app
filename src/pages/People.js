import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import api from "../services/api";

import {
  Container,
  ButtonGroup,
  Button,
  CardDeck,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import PersonCard from "../components/PersonCard";

const People = () => {
  const { user } = useSelector(state => state.auth);
  const [people, setPeople] = useState([]);
  const [newUserModal, setNewUserModal] = useState(false);
  const [newPerson, setNewPerson] = useState({
    userId: user.id,
    name: "Teste",
    description: "Teste"
  });

  useEffect(() => {
    handlePeople();
  }, []);

  async function handlePeople() {
    try {
      await api
        .get(`${process.env.REACT_APP_URL_USER}/${user.id}/person`)
        .then(res => {
          var people = res.data;

          setPeople(people);
        })
        .catch(error => {
          toastr.error(
            `Erro`,
            `Erro ao solicitar as pessoas ${error.response.data.message}`
          );
        });
    } catch (error) {
      toastr.error(`Erro`, `Erro ao solicitar as pessoas ${error.message}`);
    }
  }

  async function createPerson() {
    try {
      await api
        .post(`${process.env.REACT_APP_URL_PERSON}`, newPerson)
        .then(() => {
          toastr.success(`Inclusão`, `Pessoa criada com sucesso`);
          handlePeople();
          setNewUserModal(false);
        })
        .catch(error => {
          toastr.error(
            `Erro`,
            `Erro ao criar uma nova pessoa ${error.response.data.message}`
          );
        });
    } catch (error) {
      toastr.error(`Erro`, `Erro ao criar uma nova pessoa ${error.message}`);
    }
  }

  async function deletePerson(personId) {
    try {
      await api
        .delete(`${process.env.REACT_APP_URL_PERSON}/${personId}`)
        .then(() => {
          toastr.success(`Exclusão`, `Pessoa excluída com sucesso`);
          handlePeople();
          setNewUserModal(false);
        })
        .catch(error => {
          toastr.error(
            `Erro`,
            `Erro ao excluir a pessoa ${error.response.data.message}`
          );
        });
    } catch (error) {
      toastr.error(`Erro`, `Erro ao excluir a pessoa ${error.message}`);
    }
  }

  const NewUserForm = () => (
    <Modal isOpen={newUserModal} toggle={() => setNewUserModal(false)}>
      <ModalHeader toggle={() => setNewUserModal(false)}>
        <h3>Nova pessoa</h3>
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="personName">Nome</Label>
            <Input
              type="text"
              name="personName"
              id="personName"
              placeholder="Nome da pessoa"
              value={newPerson.name}
              onChange={e =>
                setNewPerson({ ...newPerson, name: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Descrição</Label>
            <Input
              type="text"
              name="personDescription"
              id="personDescription"
              placeholder="Descrição"
              value={newPerson.description}
              onChange={e =>
                setNewPerson({ ...newPerson, description: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup className="text-right">
            <Button className="mr-2" color="primary" onClick={createPerson}>
              Criar
            </Button>
            <Button color="secondary" onClick={() => setNewUserModal(false)}>
              Cancelar
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );

  const PeopleCards = () => (
    <CardDeck>
      <Row>
        {people.map(person => (
          <Col sm="4" className="m-0 p-0" key={person.id}>
            <PersonCard
              className="m-1"
              person={person}
              deletePerson={deletePerson}
            />
          </Col>
        ))}
      </Row>
    </CardDeck>
  );

  return (
    <>
      <Container className="vh-100 my-2 py-2">
        <Row>
          <Col sm="auto">
            <h1>Pessoas</h1>
          </Col>
          <Col>
            <Button
              size="lg"
              outline
              className="border-0 p-0 text-primary bg-transparent"
              onClick={() => setNewUserModal(true)}
            >
              <h1>
                <i className="fa fa-user-plus" />
              </h1>
            </Button>
          </Col>
        </Row>
        <NewUserForm />
        <PeopleCards />
      </Container>
    </>
  );
};

export default People;
