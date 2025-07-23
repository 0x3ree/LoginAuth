import axios from "axios";

const API_KEY = "AIzaSyDCkoOMFC9-6hQf6xzdfJWJUpQU5wHM5HI"; // this is our web api key for Firebase Authentication which stored in the const.

// due to the similarities between the signup and sign in end point we'd save most of the part in a const and then create diff functions for where they differ in url
// the MODE(signIN or signUP))
async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`; // this is the endpoint for Firebase Authentication, where mode can be either signUp or signInWithPassword, we simply broke it down
  const response = await axios.post(
    url,
    {
      email: email,
      password: password,
      returnSecureToken: true, // this is used to return a secure token for the user
    } // this is the endpoint for creating a new user in Firebase Authentication (this(email,pass, RST) should always be in an object format which will be sent as the body of the request which will be converted to JSON(a data format) by axios));
  );
  const token = response.data.idToken; // this is the token that will be used to authenticate the user, it's gotten from the Firebase Authentication service when the user is created or logged in
  return token; // this will return the token to the caller of the function, which can be used to authenticate the user in the app
}
// NOTE: this is the API key for Firebase Authentication, which is used to authenticate requests to the Firebase Authentication service, plays other role than authenticating the user, it can also be used to access protected resources we might have in our app(backend), say for only authenticated users,

// This is the API key for Firebase Authentication, which is used to authenticate requests to the Firebase Authentication service.
// when we trigger the createUser fucntion, it will send a post request to FB automatically a promise comes in and we make our post request an async fucntion and extracts its response using await and then we can use the response to do whatever we want with it, like storing the user in the database or logging them in.
export function createUser(email, password) {
  return authenticate("signUp", email, password); // this will call the authenticate function with the signUp mode and the email and password provided by the user
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password); // this will call the authenticate function with the signInWithPassword mode and the email and password provided by the user
}

/* nomral this is how we'd pass the token from our response to the auth context provider so that we can use it in our app,
  but we used a much simpler method by just returning authenticate which carries the token in it.

 
  export async function createUser(email, password) {
  const token = await authenticate("signUp", email, password);
  return token;
}
  */
