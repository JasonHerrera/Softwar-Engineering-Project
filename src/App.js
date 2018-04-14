import React, { Component } from 'react';
import {Route, NavLink, BrowserRouter } from 'react-router-dom';

import Geolocation from './Geolocation/Geolocation';
import SubmitPost from './SubmitPost/SubmitPost';
import Profile from './Profile/Profile';
import Logout from './Logout/Logout';
import Login from './Login/Login';
import Post from './Post/Post';
import Feed from './Feed/Feed';

import './App.css';

import logo from './test-logo.png';

const baseURL = (process.env.REACT_APP_ENV === "production" ? 'https://swe-server.herokuapp.com' : 'http://localhost:5000')

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      username: ``,
      password: ``,
      passwordConf: ``,
      logemail: ``,
      logpassword: ``,
      coords: null,
      loggedIn: false,
      userData: {}
    };

    this.getInnerRef = this.getInnerRef.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.getLocationMaster = this.getLocationMaster.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
  }

  componentDidMount() {
    fetch(baseURL + '/profile',{
      method: 'get',
      credentials: 'include'
      })
      .then(response=> response.json())
      .then(data => {
        console.log('here',data);
        if(data['username'] != null) {
          this.setState({"loggedIn": true});
          this.setState({"userData": data});

        } else {
          this.setState({"userData": data});
        }

    });
  }


  setCoordinates(coords) {
    this.setState({"coords": coords})
    console.log('state after setCoordinates', this.state);
  }


  innerRef;
  getInnerRef(ref) {
    this.innerRef = ref;
    this.getLocation();
  }

  getLocation() {
    this.innerRef && this.innerRef.getLocation();
    this.props.coords && this.setState({"coords": this.props.coords});
  }

  handleLocation(coords) {
    this.setState({"coords": coords});
    // this.setState({"userData": coords});
    console.log('global', this.state);
  }

  updateUserData(data) {
    this.setState({"userData": data});
  }

  handleLogin() {
    this.setState({"loggedIn": true});
  }

  getLocationMaster() {
    return this.state.coords && this.state.coords;
  }

  render() {
    const { getInnerRef } = this;
    return (         
    <BrowserRouter>
      <div className="App">
        <img src={logo} className="logo" />
        <div className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/posts">Feed</NavLink>
          <NavLink to="/post/1">Post</NavLink>
          <NavLink to="/submit">Submit</NavLink>
        </div>

        <div>
          <Route exact path="/" render={() => {return <Login logUserIn={this.handleLogin} loggedIn={this.state.loggedIn}/>}}/>
          <Route path="/submit" render={() => {return <SubmitPost loggedIn={this.state.loggedIn} userData={this.state.userData} />}}/>
          <Route path="/post/:id" component={Post}/>
          <Route path="/posts" component={Feed}/>
          <Route path="/profile" render={() => {return (<Profile ref={getInnerRef} userData={this.state.userData} updateUserData={this.updateUserData} setGlobalLocation={this.handleLocation} loggedIn={this.state.loggedIn}><Geolocation setCoords={this.setCoordinates.bind(this)}/></Profile>)}} />
          <Route path="/logout" component={Logout}/>
        </div>

        {this.state.coords && this.state.coords.latitude}
        {this.state.loggedIn.toString()}
      </div>
     
    </BrowserRouter>
    );
  }

}

export default App;
