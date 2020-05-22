import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link, NavLink as RRNavLink } from "react-router-dom";

import classnames from "classnames";

//import { reauthenticate } from "../services/auth";
import { Creators as authActions } from "../redux/ducks/auth";

import {
  Container,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

const NavbarMain = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [navbarColor, setNavbarColor] = useState("");
  const [navbarCollapse, setNavbarCollapse] = useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  function handleLogout() {
    dispatch(authActions.logout());
    toggleNavbarCollapse();

    history.push("/");
  }

  // async function checkUser() {
  //   if (user === undefined || user.id === undefined) {
  //     const response = await reauthenticate();

  //     if (response.user !== undefined) {
  //       const user = response.user;

  //       dispatch(authActions.login({ user: user, token: response.token }));

  //       history.push("/");
  //     }
  //   }
  // }

  //checkUser();

  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, []);

  return (
    <div>
      <Navbar
        className={classnames("fixed-top", navbarColor)}
        color-on-scroll="300"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand data-placement="bottom" to="/" title="" tag={Link}>
              {process.env.REACT_APP_NAME}
            </NavbarBrand>
            <button
              aria-expanded={navbarCollapse}
              className={classnames("navbar-toggler navbar-toggler", {
                toggled: navbarCollapse
              })}
              onClick={toggleNavbarCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            navbar
            isOpen={navbarCollapse}
          >
            <Nav className="mr-auto" style={{ height: "auto" }} navbar>
              <NavItem>
                <NavLink
                  data-placement="bottom"
                  tag={RRNavLink}
                  exact
                  to="/dashboard"
                  onClick={toggleNavbarCollapse}
                  activeClassName="active"
                >
                  Dashboard
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-sm-auto" navbar>
              {isAuthenticated ? (
                <>
                  <NavItem>
                    <NavLink color="info">Olá, {user.name}</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={RRNavLink}
                      exact
                      to="/"
                      onClick={() => handleLogout()}
                      activeClassName="active"
                    >
                      Sair
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <NavLink
                      tag={RRNavLink}
                      exact
                      to="/login"
                      activeClassName="active"
                      onClick={toggleNavbarCollapse}
                    >
                      Entrar
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <Link to="/register" onClick={toggleNavbarCollapse}>
                      <Button className="btn-round" color="info">
                        Registre-se
                      </Button>
                    </Link>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarMain;
