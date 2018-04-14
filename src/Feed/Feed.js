import React, { Component } from 'react';
import "./Feed.css";
import Img from 'react-image';

const baseURL = (process.env.REACT_APP_ENV === "production" ? 'https://swe-server.herokuapp.com' : 'http://localhost:5000')

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "posts": [

            ]
        };
    }

    componentDidMount() {
        fetch(baseURL + '/posts', {
            headers: {
                'Accept': 'application/json'
            },
            referrer: 'no-refferer',
            mode: 'cors',
            credentials: 'include',

        })
            .then(response=> response.json())
            .then(data => {
                this.setState({"posts": data});
                console.log(this.state.posts);
            });
    }

    // TODO: edit this to generate multiple cards within the div
    render() {
        const cards = this.state.posts.map((post) =>
                <div key={post._id} className="card Feed">
                    <div className="card-body">
                        <Img className="card-img-top" src={post.pictureLink} alt="Card image cap"/>
                        <div className="right">
                            <h3 className="card-title"> {post.title} </h3>
                            <p className="card-text"> {post.description} </p>
                            <p> ~ {post.creator} </p>
                            <p> {post.latitude} </p>
                            <p> {post.longitude} </p>
                            <p> {post.updated} </p>
                        </div>
                    </div>
                </div>
            );

        // TODO: Change className to card-columns for the Feed Container
        return (<div>
                    |{process.env.REACT_APP_ENV}|
                    {(process.env.REACT_APP_ENV === "production").toString()}
                    {baseURL}
                    <div className="container Feed-Card-Container">
                        {cards}
                    </div>
                </div>
        );
    }
}
export default Feed;