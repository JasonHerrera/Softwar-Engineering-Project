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
      coords: null
    };

    this.getInnerRef = this.getInnerRef.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
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
  }

  render() {
    const { getInnerRef } = this;
    return (
    <BrowserRouter>
     <div className="App">
      <div>
        <NavLink to="/">Home</NavLink> | 
        <NavLink to="/profile">Profile</NavLink> | 
        <NavLink to="/posts">Feed</NavLink> | 
        <NavLink to="/post/1">Post</NavLink> | 
        <NavLink to="/submit">Submit</NavLink>
      </div>

      <div>
        <Route exact path="/" component={Login}/>
        <Route path="/submit" component={SubmitPost}/>
        <Route path="/post/:id" component={Post}/>
        <Route path="/posts" component={Feed}/>
        <Route path="/profile" render={() => {return (<Profile ref={getInnerRef} onGetLocation={this.handleLocation}><Geolocation setCoords={this.setCoordinates.bind(this)}/></Profile>)}} />
        <Route path="/logout" component={Logout}/>

      </div>
        {this.state.coords && this.state.coords.latitude}
        
        
      </div>
      </BrowserRouter>
    );
  }

}

export default App;
