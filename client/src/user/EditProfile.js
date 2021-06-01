import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from './apiUser'
import DefaultProfile from '../images/avatar.jpg'

class EditProfile extends Component {
    state = {
        id: "",
        name: "",
        email: "",
        password: "",
        about: "",
        redirectToProfile: false,
        error: "",
        fileSize: 0,
        loading: false
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then((data) => {
          if (data.error) {
            this.setState({ redirectToProfile: true });
          } else {
            this.setState({ 
              id: data._id, 
              name: data.name, 
              email: data.email, 
              about: data.about, 
              error: "" 
            });
          }
        });
      };
    
      componentDidMount() {
        this.userData = new FormData()
        const userId = this.props.match.params.userId;
        this.init(userId);
      }

      isValid = () => {
          const { name, email, password, fileSize } =this.state
          if(fileSize > 100000) {
            this.setState({error: "File size should be less than 100kb"})
            return false
        }

          if(name.length === 0) {
              this.setState({ error: "Name is required", loading: false })
              return false
          }

          if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({ error: "A valid email is required", loading: false })
            return false
        }

        if(password.length >= 1 && password.length <=5) {
            this.setState({ error: "Password must be at least 6 characters long", loading: false })
            return false
        }
        return true
      }

      handleChange = (name) => (event) => {
        this.setState({ error: "" })
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        const fileSize = name === 'photo' ? event.target.files[0].size : 0
        this.userData.set(name, value)
        this.setState({ [name]: value, fileSize });
      };

      clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
    
        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
    
            update(userId, token, this.userData).then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                    // if admin only redirect
                } else if (isAuthenticated().user.role === "admin") {
                    this.setState({
                        redirectToProfile: true
                    });
                } else {
                    // if same user update localstorage and redirect
                    updateUser(data, () => {
                        this.setState({
                            redirectToProfile: true
                        });
                    });
                }
            });
        }
    };

      signupForm = (name, email, password, about) => (
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
              onChange={this.handleChange("name")}
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <label className="text-muted"></label>
            <input
              onChange={this.handleChange("email")}
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
            />
          </div>
          <div className="form-group">
            <label className="text-muted"></label>
            <textarea
              onChange={this.handleChange("about")}
              type="text"
              className="form-control"
              placeholder="About"
              value={about}
            />
          </div>
          <div className="form-group">
            <label className="text-muted"></label>
            <input
              onChange={this.handleChange("password")}
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
            />
          </div>
          <button
            className=" btn btn-raised btn-primary"
            onClick={this.clickSubmit}
          >
            Update
          </button>
        </form>
      )

    render() {
        const { id, name, email, about, password, redirectToProfile, error, loading } = this.state

        if(redirectToProfile) {
            return <Redirect to={`/user/${id}`} />
        }

        const photoUrl = id 
        ? `http://localhost:3000/api/user/photo/${id}?${new Date().getTime()}` 
        : DefaultProfile

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
                <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                      {error}
                </div>
                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : ( "" )
                }

                <img
                  className="img-thumbnail"
                  style={{height: '200px', width: 'auto'}} 
                  src={photoUrl}
                  onError={i => (i.target.src = `${DefaultProfile}`)}  
                  alt={name} />
                
                {this.signupForm(name, email, password, about)}
            </div>
        )
    }
}

export default  EditProfile