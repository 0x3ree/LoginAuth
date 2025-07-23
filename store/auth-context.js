// Note: in here we are storing the state management for what happens when a user is log's intothe app moving from the login screen to the signUp screen and vice versa,
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    setAuthToken(token); // in here we store the token in the state(memory), which will be used to authenticate the user in the app
    // (s)we can also set isAuthenticated to true here, but we can also use the token

    // for storing the token on the device so as to stay logged in even after the app is closed, we can use AsyncStorage or any other storage solution(3rd part package)
    AsyncStorage.setItem("token", token); //this will store a new item in the storage, this recieves two parameters, the first ('token ') is a key which can then be used to retrive or delete that item, the second is the item you want t store which should always be a string or you can cvert it to a string from a number or object .
  }

  function logout() {
    setAuthToken(null); // this will clear the token and set isAuthenticated to false
    AsyncStorage.removeItem("token"); // this will clear the token from the storage, so that the user is logged out and cannot access protected resources
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken, // this will return true if the token is not null or undefined, otherwise it will return false
    authenticate: authenticate, // this is the method for chaning the state, which triggers when a user is authenticated
    logout: logout, // this is the method for logging out the user
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
