// Note: in here we are storing the state management for what happens when a user is log's intothe app moving from the login screen to the signUp screen and vice versa,

import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "", // this is the token that will be used to authenticate the user, it's gotten from the Firebase Authentication service when the user is created or logged in
  isAuthenticated: false, // this helper variable is used to check if the user is logged in or not, which is set to false by default
  authenticate: (token) => {}, // this is a method for chaning the state, which triggers when a user is authenticated, it will set the token and isAuthenticated to true
  logout: () => {}, // this is a method for logging out the user, which will clear the token and set isAuthenticated to false
});

function AuthContextProvider({ children }) {
  // in here we manage the auth(token) related state content, beacsue we only get this token when the user is logged in or signed up, so we will use this context to manage the state of the token and the authentication status of the user
  const [authToken, setAuthToken] = useState(); // this is the token that will be used to authenticate the user, it's gotten from the Firebase Authentication service when the user is created or logged in

  // in here is the fucntion that triggers when a user is authenticated, it will set the token and isAuthenticated to true

  function authenticate(token) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken(null); // this will clear the token and set isAuthenticated to false
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken, // this will return true if the token is not null or undefined, otherwise it will return false
    authenticate: authenticate, // this is the method for chaning the state, which triggers when a user is authenticated
    logout: logout, // this is the method for logging out the user
  };
  return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
}

export default AuthContextProvider;
