export const signup = (user) => {
    return fetch(`localhost:3000/api/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const signin = (user) => {
    return fetch(`localhost:3000/api/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const authenticate = (jwt, next) => {
    if(typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(jwt))
        next()
    }
}

export const signout = (next) => {
    if (typeof window !== undefined) localStorage.removeItem("jwt");
    next();
    return fetch(`localhost:3000/api/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  
  export const isAuthenticated = () => {
    if (typeof window == undefined) {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };

  export const forgotPassword = email => {
    console.log("email: ", email);
    return fetch(`localhost:3000/api/forgot-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
  return fetch(`localhost:3000/api/reset-password/`, {
      method: "PUT",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(resetInfo)
  })
      .then(response => {
          console.log("forgot password response: ", response);
          return response.json();
      })
      .catch(err => console.log(err));
};

export const socialLogin = user => {
  return fetch(`http://localhost:3000/api/social-login/`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      // credentials: "include", // works only in the same origin
      body: JSON.stringify(user)
  })
      .then(response => {
          console.log("signin response: ", response);
          return response.json();
      })
      .catch(err => console.log(err));
};