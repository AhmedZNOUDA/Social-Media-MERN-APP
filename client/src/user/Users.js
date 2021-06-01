import React, { Component } from "react";
import { list } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";

class Users extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  renderUsers = (users) => (
    <div className="row">
      {users.map((user, i) => (
        <div className="col-md-4" style={{ marginBottom: "25px" }}>
          <div className="card" key={i}>
            <img
              className="img-thumbnail"
              style={{ height: "200px", width: "auto" }}
              src={`localhost:3000/api/user/photo/${user._id}`}
              onError={(i) => (i.target.src = `${DefaultProfile}`)}
              alt={user.name}
            />
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <Link
                to={`/user/${user._id}`}
                className="btn btn-raised btn-sm btn-primary"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;
