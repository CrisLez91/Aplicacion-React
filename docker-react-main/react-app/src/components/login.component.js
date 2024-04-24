import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import { withRouter } from '../common/with-router';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      boton: true,
      email: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      email: e.target.value
    });

    if (e.target.value.length !== 0 && this.state.password.length !== 0)
      this.setState({
        boton: false
      });

    if (e.target.value.length === 0)
      this.setState({
        boton: true
      });

  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });

    if (e.target.value.length !== 0 && this.state.email.length !== 0)
      this.setState({
        boton: false
      });
    if (e.target.value.length === 0)
      this.setState({
        boton: true
      });

  }



  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
      boton: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.password).then(
        () => {
          this.props.router.navigate("/home");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            boton: false,
            message: "Error: La contraseña no es correcta. Compruébala."
          });
        }
      );
    } else {
      this.setState({
        loading: false,
        boton: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="cardLOGIN card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            
            <div className="form-floating">
              <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" value={this.state.email}
                  onChange={this.onChangeUsername} />
              <label htmlFor="floatingInput">Correo</label>
            </div>


            <div className="form-floating">
              <input type="password" className="form-control" id="password" placeholder=""  value={this.state.password}
                onChange={this.onChangePassword} />
              <label htmlFor="Contraseña">Contraseña</label>
            </div>

            
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.boton}

              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              /*
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
              */
              <p className="wardengue">{this.state.message}</p>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);