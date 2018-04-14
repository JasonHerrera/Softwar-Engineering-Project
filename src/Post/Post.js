import React, { Component } from 'react';
import Img from 'react-image';
import "./Post.css";

const baseURL = (process.env.REACT_APP_ENV === "production" ? 'https://swe-server.herokuapp.com' : 'http://localhost:5000')

class Post extends Component {


	constructor(props) {
		super(props);


		this.state = {
			"post": {
				"id": null,
				"title": null,
				"description": null,
				"pictureLink": null
			}
		};
	}

	componentDidMount() {
		let postId = this.props.match.params.id;
		fetch(baseURL + '/post/' + postId,{
			headers: {
				'Accept': 'application/json'
			},
			referrer: 'no-referrer',
			mode: 'cors',
			// credentials: 'include'
		})
			.then(response=> response.json())
			.then(data => {
				this.setState({"post": data});
			});
	}

	render() {

		return (<div className="container">
			<div className="card">
				  <div className="card-body">
				  	<Img className="card-img-top" src={this.state.post.pictureLink} alt="Card image cap"/>
				  	  <div className="right">
					  	<h5 className="card-title">{this.state.post.title}</h5>
					  	<p className="card-text">{this.state.post.description}</p>
					  </div>
				  </div>
				</div>
		</div>)
	}
}
export default Post;
