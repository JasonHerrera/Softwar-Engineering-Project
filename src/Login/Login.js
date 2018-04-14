import React, { Component } from 'react';
import "./Login.css";

const baseURL = (process.env.REACT_APP_ENV === "production" ? 'https://swe-server.herokuapp.com' : 'http://localhost:5000')

class Login extends Component {

    constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleState = this.handleState.bind(this);

    this.state = {
      "email": ``,
      "username": ``,
      "password": ``,
      "passwordConf": ``,
      "logemail": ``,
      "logpassword": ``, 
      "response": null
    };
  }

    handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleState(e) {
    var currentState = this.state;
    currentState.response = e.response;
    console.log(e, currentState);
    this.setState(currentState);
  }

  handleLogin(e) {
    e.preventDefault();

    fetch(baseURL + '/login', {
      method: 'post',
      mode: 'cors',
      credentials: 'include',
      body: "logemail=" + this.state.logemail + "&logpassword=" + this.state.logpassword,
      headers: new Headers({
          'Accept': 'application/json',
          "Content-Type": "application/x-www-form-urlencoded"
      }),
      referrer: 'no-referrer'
    }).then(response => response.json())
    .then(data => {
      this.handleState(data)
      if(data.response === 'You have Logged in Successfully!'){
        console.log("offially logged in");
        this.props.logUserIn();
      }
    })
    .catch(function(err) {
      console.log(err);
    });

  }

  handleRegister(e) {
    e.preventDefault();
    fetch(baseURL + '/register', {
      method: 'post',
      body: "email=" 
          + this.state.email 
          + "&username=" 
          + this.state.username
          + "&password=" 
          + this.state.password 
          + "&passwordConf=" 
          + this.state.passwordConf,
      mode: 'cors',
      credentials: 'include',
      headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
      }),
      referrer: 'no-referrer'

    }).then(response => response.json())
    .then(data => {this.handleState(data);
      console.log("Here in the handleRegister method");
      })
    .catch(error => console.error("Error:", error));

    // this.props.logUserIn();
  }


  render() {
    return (
      <div className="container">
        <div className="register">
          <p> Register </p>
          <form onSubmit={this.handleRegister}>
            <input type="text" value={this.state.email} onChange={this.handleChange} name="email" placeholder="E-mail" required=""/>
            <input type="text" value={this.state.username} onChange={this.handleChange} name="username" placeholder="Username" required=""/>
            <input type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="Password" required=""/>
            <input type="password" value={this.state.passwordConf} onChange={this.handleChange} name="passwordConf" placeholder="Confirm Password" required=""/>
            <input type="submit" value="REGISTER"/>
          </form>
        </div>

        {!this.props.loggedIn && 
        <div className="login">
          <p> Log in </p>
          <form onSubmit={this.handleLogin}>
            <input type="text" value={this.state.logemail} onChange={this.handleChange} name="logemail" placeholder="E-mail" required=""/>
            <input type="password" value={this.state.logpassword} onChange={this.handleChange} name="logpassword" placeholder="Password" required=""/>
            <input type="submit" value="LOGIN"/>
          </form>
        </div>
        }
        {this.state.response}
      </div>
      );
  }
}
export default Login;