import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import  DefaultPost from "../images/post.jpg";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={{textDecoration: 'none'}} to="/">
            <img
              style={{ borderRadius: "50%", border: "1px solid black" }}
              className="float-left"
              height="40px"
              width="40px"
              src={DefaultPost}
              alt="Earafny"
            />
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/users")}
            to="/users"
          >
            {" "}
            Users
          </Link>
        </li>

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                {" "}
                Sign In
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                {" "}
                Sign Up
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && isAuthenticated().user.role === "admin" && (
          <li className="nav-item">
            <Link
              to={`/admin`}
              style={isActive(history, `/admin`)}
              className="nav-link"
            >
              Admin
            </Link>
          </li>
        )}

        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/findpeople"
                style={isActive(history, `/findpeople`)}
              >
                Find People
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/post/create"
                style={isActive(history, `/post/create`)}
              >
                Create Post
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/user/${isAuthenticated().user._id}`}
                style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              >
                {isAuthenticated().user.name}
              </Link>
            </li>

            <li className="nav-item">
              <span
                className="nav-link"
                href="/"
                style={
                  (isActive(history, "/signup"),
                  { cursor: "pointer", color: "#ffffff" })
                }
                onClick={() => signout(() => history.push("/"))}
              >
                {" "}
                Sign Out
              </span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
