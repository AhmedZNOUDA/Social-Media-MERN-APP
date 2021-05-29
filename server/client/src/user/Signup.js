import React, { Component } from "react";
import { signup } from '../auth'
import { Link } from 'react-router-dom'

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
    open: false,
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    };
    signup(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          name: "",
          email: "",
          password: "",
          error: "",
          open: true,
        });
    });
  };



  signupForm = (name, email, password) => (
    <form>
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
        Submit
      </button>
    </form>
  )

  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">SignUp</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <div
          className="alert alert-success"
          style={{ display: open ? "" : "none" }}
        >
          New account is successfully created. Please <Link to="/signin">Sign In</Link>
        </div>

        {this.signupForm(name, email, password)}
      </div>
    );
  }
}

export default Signup;
