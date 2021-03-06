import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import Posts from "../post/Posts";
import Users from "../user/Users";

class Admin extends Component {
    state = {
        redirectToHome: false
    };

    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
    }
    
  render() {
    if (this.state.redirectToHome) {
        return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="jumbotron">
          <h2 style={{textAlign: 'center', fontWeight: '500', color: 'green'}}>Admin Dashboard</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h2>Posts</h2>
              <hr />
              <Posts />
            </div>
            <div className="col-md-6">
              <h2>Users</h2>
              <hr />
              <Users />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
