import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {

    state={
        loadedPost: null,
    }

    loadData () {
        if (this.props.match.params.id) {
            // '+' symbol below to turn string into number for strict comparison operator
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
                axios.get("/posts/" + this.props.match.params.id)
                    .then(response => {
                        // console.log(response)
                        this.setState({ loadedPost: response.data });
                    });
            }
        }
    }
    
    componentDidMount() {
        console.log(this.props);
        this.loadData();
         
    }

    componentDidUpdate() {
        this.loadData();
    }

    deletePostHandler = () => {
        axios.delete("/posts/" + this.props.match.params.id)
            .then(response => {
                console.log(response)
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.match.params.id) {
          post = <p style={{ textAlign: "center" }}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;