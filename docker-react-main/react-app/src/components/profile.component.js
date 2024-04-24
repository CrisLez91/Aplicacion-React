import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;



    return (
      <div className="col-md-12">
        <div className="cardLOGIN card-container">
          {(this.state.userReady) ?
            <div>
              <header className="">
                <h3>
                  <strong>{currentUser.nombre}</strong> Profile
                </h3>
              </header>
              <p>
                <strong>Token:</strong>{" "}
                {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
              </p>
              <p>
                <strong>Id:</strong>{" "}
                {currentUser.id}
              </p>

              <p>
                <strong>Fecha de nacimiento:</strong>{" "}
                {currentUser.fecha_nacimiento}
              </p>
              <p>
                <strong>id_Aplicacion:</strong>{" "}
                {currentUser.id_Aplicacion}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {currentUser.email}
              </p>
              <strong>Authorities:</strong>
              <ul>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
              </ul>
            </div> : null}
        </div>
      </div>
    );
  }
}
