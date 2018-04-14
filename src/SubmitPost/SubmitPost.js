import React, { Component } from 'react';
import './SubmitPost.css';

const URL = (process.env.REACT_APP_ENV === "production" ? 'https://swe-server.herokuapp.com' : 'http://localhost:5000')

class SubmitPost extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handlePostSubmission = this.handlePostSubmission.bind(this);
        this.handleState = this.handleState.bind(this);
        this.state = {
          "title": ``,
          "description": ``,
          "pictureLink": ``,
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



    handlePostSubmission(e) {
        e.preventDefault();
        var data = {
            "title": this.state.title,
            "description": this.state.description,
            "pictureLink": this.state.pictureLink
        }
        console.log(data);
        fetch(URL + '/submitPost', {
            method: 'post',
            body: "title=" 
                + this.state.title 
                + "&description=" 
                + this.state.description
                + "&pictureLink=" 
                + this.state.pictureLink
                + "&latitude="
                + this.props.userData.latitude
                + "&longitude="
                + this.props.userData.longitude
                + "&creator="
                + this.props.userData.username,
            mode: 'cors',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            referrer: 'no-referrer'
        })
        .then(response => response.json())
        .then(data => {this.handleState(data);
                console.log("Here in the handlePostSubmission method");
        })
        .catch(error => console.error("Error:", error));
    }

    // TODO: edit this to generate multiple cards within the div
    render() {
        console.log(this.props);
        if(!this.props.loggedIn) {
            return( 
                <div> 
                    Please log in in order to submit a post
                </div>
                )
        }
        return (<div className="container Submit-Container"> 
        {process.env.REACT_APP_ENV}
            <h1>Submit Post</h1>
            <br/>
                <form onSubmit={this.handlePostSubmission}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="inputPostTitle">Post Title</label>
                            <input type="text" className="form-control" id="inputPostTitle" value={this.state.title} onChange={this.handleChange} name="title" placeholder="Lost Courgey in Area!"/>
                            <small id="titleHelp" className="form-text text-muted">Be descriptive and concise when entering a title.</small>
                        </div>
                        <div className="col">
                            <label htmlFor="inputPostLink">Post Link</label>
                            <input type="text" className="form-control" id="inputPostLink" value={this.state.pictureLink} onChange={this.handleChange} name="pictureLink" placeholder="https://imgur.com/..."/>
                            <small id="titleHelp" className="form-text text-muted">You can host images for free at <a href="https://imgur.com/">Imgur</a></small>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPostDescription">Description</label>
                        <textarea type="password" className="form-control" id="inputPostDescription" value={this.state.description} onChange={this.handleChange} name="description" placeholder="Post Description"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {this.state.response}
                </form>
        </div>
        );
    }
}
export default SubmitPost;