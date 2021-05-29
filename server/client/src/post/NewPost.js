import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { isAuthenticated } from "../auth";
import { create } from './apiPost'
import DefaultProfile from '../images/avatar.jpg'

class NewPost extends Component {
    state = {
        title: "",
        body:"",
        photo: "",
        error: '',
        user: {},
        fileSize: 0,
        loading: false,
        redirectToProfie: false
    }
    
      componentDidMount() {
        this.postData = new FormData()
        this.setState({user: isAuthenticated().user})
      }

      isValid = () => {
          const { title, body, fileSize } =this.state
          if(fileSize > 1000000) {
            this.setState({error: "File size should be less than 1mb"})
            return false
        }

          if(title.length === 0  || body.length === 0) {
              this.setState({ error: "All fields are required", loading: false })
              return false
          }
        return true
      }

      handleChange = (name) => (event) => {
        this.setState({ error: "" })
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        const fileSize = name === 'photo' ? event.target.files[0].size : 0
        this.postData.set(name, value)
        this.setState({ [name]: value, fileSize });
      };
    
      clickSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        if(this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token
    
            create(userId, token, this.postData).then((data) => {
              if (data.error) this.setState({ error: data.error });
              else {
                  this.setState({ 
                      loading: false, 
                      title: "", 
                      body: "", 
                      photo: "",
                      redirectToProfie: true
                  })
              }

            });
        }
      };

      newPostForm = (title, body) => (
        <form>
          <div className="form-group">
            <label className="text-muted"></label>
            <input
              onChange={this.handleChange("photo")}
              type="file"
              accept="image/*"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-muted"></label>
            <input
              onChange={this.handleChange("title")}
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
            />
          </div>
          <div className="form-group">
            <label className="text-muted"></label>
            <textarea
              onChange={this.handleChange("body")}
              type="text"
              className="form-control"
              placeholder="Body"
              value={body}
            />
          </div>
          <button
            className=" btn btn-raised btn-primary"
            onClick={this.clickSubmit}
          >
            Create Post
          </button>
        </form>
      )

    render() {
        const { title, body, photo, user, error, loading, redirectToProfie } = this.state

        if(redirectToProfie) {
            return <Redirect to={`/user/${user._id}`} />
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a new post</h2>
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                      {error}
                </div>
                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : ( "" )
                }

                {this.newPostForm(title, body)}
            </div>
        )
    }
}

export default NewPost

