import { createActions, createReducer } from "reduxsauce";
import { defineState } from "redux-localstore";

export const { Types, Creators } = createActions({
  login: ["user", "token"],
  logout: []
});

const defaultState = {
  user: {},
  token: "",
  isAuthenticated: false
};

const INITIAL_STATE = defineState(defaultState)("auth");

const login = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    user: action.user,
    token: action.token,
    isAuthenticated: true
  };
};

const logout = (state = INITIAL_STATE, action) => {
  return defaultState;
};

export default createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
  [Types.LOGOUT]: logout
});
