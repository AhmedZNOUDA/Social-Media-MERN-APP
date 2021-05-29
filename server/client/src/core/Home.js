import React from "react";
import Posts from "../post/Posts";
import DefaultPost from "../images/post.jpg";

const Home = () => (
  <div style={{backgroundColor: '#b2dfdb'}}>
    <div className="jumbotron" 
         style={{display: 'flex', 
                 flexDirection: 'column', 
                 alignItems: 'center', 
                 justifyContent: 'center'}} 
    >
      <img
        style={{ borderRadius: "50%", border: "1px solid black" }}
        height="150px"
        width="150px"
        src={DefaultPost}
        alt="Earafny"
      />
      <p className="lead" style={{fontSize: '35px',fontWeight: '500', color: 'green'}}>
        Welcome to Earafny
      </p>
    </div>
    <div className="container">
      <Posts />
    </div>
  </div>
);

export default Home;
