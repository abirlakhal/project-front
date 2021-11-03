import './App.css';
import React, {Component } from "react";
import {Switch, Route, Link } from "react-router-dom";
import Switch from "react-switch";
import "bootstrap/dist/css/bootstrap.min.css";

import Profile from "./composants/profile.component";
import AuthService from "./services/auth.service";
import Login from "./composants/login.component";
import Home from "./composants/home.component";
import Membre from "./composants/bMember.component";
import Client from "./composants/bClient.component";
import Admin from "./composants/bAdmin.component";

class App extends Component{

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showClientBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showClientBoard: user.roles.includes("ROLE_CLIENT"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showClientBoard, showAdminBoard } = this.state;

    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              TEAMWORK
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showClientBoard && (
                  <li className="nav-item">
                    <Link to={"/client"} className="nav-link">
                      Client
                    </Link>
                  </li>
              )}

              {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Admin 
                    </Link>
                  </li>
              )}

              {currentUser && (
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      Membre
                    </Link>
                  </li>
              )}
            </div>

            {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
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
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/member" component={Membre} />
              <Route path="/client" component={Client} />
              <Route path="/admin" component={Admin} />
            </Switch>
          </div>
        </div>
    );
  }

}



export default App;
