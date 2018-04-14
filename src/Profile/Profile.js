import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';

import Geolocation from '../Geolocation/Geolocation';

const baseURL = (process.env.REACT_APP_ENV === "production" ? 'https://swe-server.herokuapp.com' : 'http://localhost:5000');

class Profile extends Component {
	constructor(props) {
		super(props);


		this.state = {
			profile : [
				
			],
			coords: ``,
			locationAvailable: false,
			locationSource: ``
		};

		this.getInnerRef = this.getInnerRef.bind(this);
		this.getLocation = this.getLocation.bind(this);
		this.setLocation = this.setLocation.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	
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
					this.setState({"profile": data});
					console.log('data', data);
				}
				console.log(data['longitude'] != null);
				if(data['longitude'] != null && data['latitude'] != null){
					console.log('hello');
					const localCoords = {
						"latitude": data["latitude"],
						"longitude": data["longitude"]
					};
					console.log(localCoords);
					this.props.setGlobalLocation(localCoords);
					this.props.updateUserData(data);
					this.setState({"locationAvailable": true});
					this.setState({"locationSource": "Location saved to profile:"});
				}
				console.log('there', this.state);

			});
	}

	handleLogout() {
		this.setState({"profiles": ""});
		fetch(baseURL + '/logout', {
			method: 'get',
			credentials: 'include'
		}).then(res => {
			window.location.reload();
		});
		
	}

	innerRef;
	getInnerRef(ref) {
		this.innerRef = ref;
	}

	getLocation() {
		this.innerRef && this.innerRef.getLocation();
		this.setState({"coords": this.props.coords});
		this.props.setGlobalLocation(this.props.coords);
		this.setLocation();
	}

	setLocation() {
		console.log('setLocation', this.props);
		// update current session to have location
		fetch(baseURL + '/updateSession', {
			method: 'post',
      		mode: 'cors',
			credentials: 'include',
			body: 'latitude=' + this.props.coords.latitude
				+ '&longitude=' + this.props.coords.longitude,
			headers: new Headers({
		        'Accept': 'application/json',
		        "Content-Type": "application/x-www-form-urlencoded"
	      	}),
	      	referrer: 'no-referrer'
		}).then((res) => {
			fetch(baseURL + '/updateProfile', {
				method: 'post', 
				mode: 'cors', 
				credentials: 'include',
				body: 'latitude=' + this.props.coords.latitude
					+ '&longitude=' + this.props.coords.longitude,
				headers: new Headers({
			        'Accept': 'application/json',
			        "Content-Type": "application/x-www-form-urlencoded"
		      	}),
		      	referrer: 'no-referrer'
			}).then(res => {
				window.location.reload();
			});
		});
	}
	render() {
		const { getInnerRef, getLocation } = this;

		if (!this.props.loggedIn) {

			return (<div className="container" style={{justifyContent: `center`}}> 
						<p> You are not logged in </p>
					</div>);
		}
		return (<div className="container" style={{justifyContent: `center`, flexWrap: `no-wrap`}}>
					<p> Welcome! {this.state.profile.username} </p>
					<br/>
					<br/>
					<div>
						{this.state.locationSource}
						<p> Latitude: {this.state.profile.latitude} </p>
						<p> Longitude: {this.state.profile.longitude} </p>
					</div>

					{ !this.state.locationAvailable && <Geolocation ref={getInnerRef} rememberLocation={getLocation}/> }
					{false && !this.state.locationAvailable && <button onClick={getLocation}> Remember Location </button> }
      				<button href="/" onClick={this.handleLogout}>
      					Logout
      				</button>

				</div>)	;
		}
	}


export default geolocated({
	positionOptions: {
		enabledHighAccuracy: false
	}
})(Profile);