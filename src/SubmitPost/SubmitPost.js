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
        return (<div>
                {this.props.userData && this.props.userData.latitude}
                {process.env.REACT_APP_ENV}
                    <div className="submitPost">
                        <p>Submit Post</p>
                            <form onSubmit={this.handlePostSubmission}>
                                <input type="text" value={this.state.title} onChange={this.handleChange} name="title" placeholder="Post Title" required=""/>
                                <input type="text" value={this.state.description} onChange={this.handleChange} name="description" placeholder="Animal Description" required=""/>
                                <input type="text" value={this.state.pictureLink} onChange={this.handleChange} name="pictureLink" placeholder="Picture Link" required=""/>
                                <input type="submit" value="SUBMIT"/>
                            </form>
                                {this.state.response}
                    </div>                
                </div>
        );
    }
}
export default SubmitPost;