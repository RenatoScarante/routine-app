import { toastr } from "react-redux-toastr";

import api from "./api";

export const TOKEN = process.env.REACT_APP_STORAGE_TOKEN;
export const USER = process.env.REACT_APP_STORAGE_USER;

export function isAuthenticated() {
  return localStorage.getItem(TOKEN) !== null;
}

export async function reauthenticate() {
  let response = {};

  const serializedUser = localStorage.getItem(USER);
  const user = JSON.parse(serializedUser);

  if (user === undefined || user === null) {
    return { user: undefined };
  }

  try {
    const data = { email: user.email };

    await api
      .post(process.env.REACT_APP_USER_REAUTHENTICATE_URL, data)
      .then(res => {
        response = res.data;
      })
      .catch(error => {
        toastr.error(`Erro`, `Erro ao realizar o login ${error}`);
      });
  } catch (error) {
    toastr.error(`Erro`, `Erro ao realizar o login ${error.message}`);
  }

  return response;
}

export async function doLogin(data) {
  let response = {};

  if (data === {}) return {};

  try {
    const authentication = data;

    await api
      .post(process.env.REACT_APP_USER_AUTHENTICATE_URL, authentication)
      .then(res => {
        response = res.data;
      })
      .catch(error => {
        toastr.error(`Erro`, `Erro ao realizar o login ${error}`);
      });
  } catch (error) {
    toastr.error(`Erro`, `Erro ao realizar o login ${error.message}`);
  }

  return response;
}

export async function doRegister(data) {
  let response = {};

  if (data === {}) return {};

  try {
    const register = {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      password: data.password,
      active: true
    };

    await api
      .post(process.env.REACT_APP_USER_POST, register)
      .then(res => {
        response = res.data;
      })
      .catch(error => {
        toastr.error(`Erro`, `Erro ao realizar o registro ${error}`);
      });
  } catch (error) {
    toastr.error(`Erro`, `Erro ao realizar o registro ${error.message}`);
  }

  return response;
}
