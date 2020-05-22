import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { toastr } from "react-redux-toastr";

import { doRegister } from "../../services/auth";
import { Creators as authActions } from "../../redux/ducks/auth";

import { Container, Card, Form, Row, Col, Button, Input } from "reactstrap";
import InputMask from "react-input-mask";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: "",
    active: false
  });

  const [invalidFields, setInvalidFields] = useState({
    name: false,
    cpf: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  async function handleRegister() {
    setInvalidFields({
      name: data.name === "",
      cpf: data.cpf === "",
      email: data.email === "",
      password: data.password === "",
      confirmPassword:
        data.confirmPassword === "" || data.confirmPassword !== data.password
    });

    if (
      data.name === "" ||
      data.cpf === "" ||
      data.email === "" ||
      data.password === "" ||
      data.confirmPassword === "" ||
      data.confirmPassword !== data.password
    ) {
      return;
    }

    const response = await doRegister(data);

    if (response.user !== undefined) {
      const user = response.user;

      dispatch(authActions.login(user, response.token));

      toastr.success(
        "Registro realizado com sucesso",
        `Bem vindo ${user.name}`
      );

      history.push("/home");
    }
  }

  return (
    <div className="page-header">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="6">
            <Card className="card-register ml-auto mr-auto">
              <h3 className="title mx-auto">
                <strong>Registre-se</strong>
                <hr />
              </h3>
              <Form className="register-form">
                <label>Nome</label>
                <Input
                  type="text"
                  placeholder="Seu nome completo"
                  value={data.name}
                  onChange={e => setData({ ...data, name: e.target.value })}
                  invalid={invalidFields.name}
                />
                <label>CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  value={data.cpf}
                  onChange={e => setData({ ...data, cpf: e.target.value })}
                >
                  {inputProps => (
                    <Input
                      {...inputProps}
                      type="text"
                      placeholder="Seu CPF"
                      value={data.cpf}
                      invalid={invalidFields.cpf}
                    />
                  )}
                </InputMask>
                <label>E-mail</label>
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={data.email}
                  onChange={e => setData({ ...data, email: e.target.value })}
                  invalid={invalidFields.email}
                />
                <Row>
                  <Col>
                    <label>Senha</label>
                    <Input
                      type="password"
                      placeholder="Sua senha"
                      value={data.password}
                      onChange={e =>
                        setData({ ...data, password: e.target.value })
                      }
                      invalid={invalidFields.password}
                    />
                  </Col>
                  <Col>
                    <label>Confirme</label>
                    <Input
                      type="password"
                      placeholder="Confirme a senha"
                      value={data.confirmPassword}
                      onChange={e =>
                        setData({ ...data, confirmPassword: e.target.value })
                      }
                      invalid={invalidFields.confirmPassword}
                    />
                  </Col>
                </Row>
                <Button
                  block
                  className="btn-round"
                  color="primary"
                  onClick={() => {
                    handleRegister();
                  }}
                >
                  Registrar
                </Button>
                <div className="forgot">
                  <Link to="/login">
                    <Button className="btn-link" color="secondary">
                      Já possui uma conta? <strong>Entre.</strong>
                    </Button>
                  </Link>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
