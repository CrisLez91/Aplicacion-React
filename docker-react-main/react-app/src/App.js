import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-crearREPORTE.component";
import BoardAdmin from "./components/board-admin.component";
import { LinkContainer } from 'react-router-bootstrap';
// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import Ejemple from "./components/board-example.component";
import VerReportes from "./components/board-verREPORTE.component"
import VerUsuarios from "./components/board-verUSUARIO.component"

const Dropdown = () => {
  return (
    <div className="dropdown">
      <button className="dropbtn">Dropdown</button>
      <div className="dropdown-content">
        <a href="#">Option 1</a>
        <a href="#">Option 2</a>
        <a href="#">Option 3</a>
      </div>
    </div>
  );
};

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_publicador"));
      setShowAdminBoard(user.roles.includes("ROLE_administrador"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };


  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && tamañoPantalla < 769) {
        console.log('isNavbarOpen')
        setIsNavbarOpen(false);
      }
    }
    console.log(isNavbarOpen)
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavbarOpen]);




  const [tamañoPantalla, setTamañoPantalla] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setTamañoPantalla(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    if (tamañoPantalla < 769) {
      setIsNavbarOpen(false)

    }else{
      setIsNavbarOpen(true)
    }
  }, [tamañoPantalla]);


  return (
    <div >

      <Navbar bg="light" expand="lg" ref={navbarRef}>
        <Link to={"/home"} className="navbar-brand">
          QuestZ
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsNavbarOpen(!isNavbarOpen)} />
        {isNavbarOpen &&
          <Navbar.Collapse id="basic-navbar-nav" className={`${isNavbarOpen ? 'show' : ''}`}>
            <Nav className="me-auto">
              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/nuevoReporte"} className="nav-link">
                    Nuevo Reporte
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <div>
                  <li className="nav-item">
                    <Link to={"/VerUsuarios"} className="nav-link">
                      Publicadores
                    </Link>
                  </li>
                </div>
              )}
              {showAdminBoard && (
                <div>
                  <NavDropdown title="Preguntas" id="basic-nav-dropdown">
                    <Link to={"/agregarPregunta"} className="dropdown-item">
                      Agregar
                    </Link>
                    <NavDropdown.Divider />
                    <Link to={"/modificarPregunta"} className="dropdown-item">
                      Ver / Modificar
                    </Link>
                  </NavDropdown>
                </div>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/verReportes"} className="nav-link">
                    Reportes
                  </Link>
                </li>
              )}
            </Nav>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.nombre}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </Navbar.Collapse>}

      </Navbar>







      <div  >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/exemle" element={<Ejemple />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/modificarPregunta" element={<BoardUser />} />
          <Route path="/nuevoReporte" element={<BoardModerator />} />
          <Route path="/agregarPregunta" element={<BoardAdmin />} />
          <Route path="/verReportes" element={<VerReportes />} />
          <Route path="/VerUsuarios" element={<VerUsuarios />} />          
        </Routes>
      </div>
    </div>
  );
}

export default App;
