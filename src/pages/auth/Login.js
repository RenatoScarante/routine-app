import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { toastr } from "react-redux-toastr";

import { doLogin } from "../../services/auth";
import { Creators as authActions } from "../../redux/ducks/auth";

import { Container, Row, Col, Card, Button, Form, Input } from "reactstrap";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [data, setData] = useState({ email: "", password: "" });

  async function handleLogin() {
    const response = await doLogin(data);

    if (response.user !== undefined) {
      const user = response.user;

      toastr.success("Login realizado com sucesso", `Bem vindo ${user.name}`);

      dispatch(authActions.login(user, response.token));

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
                <strong>Bem vindo</strong>
                <hr />
              </h3>
              <Form className="register-form">
                <label>E-mail</label>
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  value={data.email}
                  onChange={e => setData({ ...data, email: e.target.value })}
                />
                <label>Senha</label>
                <Input
                  type="password"
                  placeholder="Sua senha"
                  value={data.password}
                  onChange={e => setData({ ...data, password: e.target.value })}
                />
                <div className="forgot text-right">
                  <Link to="/forgot-password">
                    <Button className="btn-link m-0 p-0" color="danger">
                      <small>Esqueceu a senha?</small>
                    </Button>
                  </Link>
                </div>
                <Button
                  block
                  className="btn-round"
                  color="primary"
                  type="button"
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Entrar
                </Button>
                <div className="forgot">
                  <Link to="/register">
                    <Button className="btn-link" color="secondary">
                      Não possui uma conta? <strong>Registre-se.</strong>
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

export default Login;
