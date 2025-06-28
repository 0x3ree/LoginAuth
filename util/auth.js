import axios from "axios";

const API_KEY = "AIzaSyAAuSEIF0ILOmbX0ViqYuqCv-km_nHgSLA"; // this is our web api key for Firebase Authentication which stored in the const.

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
  console.log(response.data);
}

// This is the API key for Firebase Authentication, which is used to authenticate requests to the Firebase Authentication service.
// when we trigger the createUser fucntion, it will send a post request to FB automatically a promise comes in and we make our post request an async fucntion and extracts its response using await and then we can use the response to do whatever we want with it, like storing the user in the database or logging them in.
export async function createUser(email, password) {
  await authenticate("signUp", email, password); // this will call the authenticate function with the signUp mode and the email and password provided by the user
}

export async function login(email, password) {
  await authenticate("signInWithPassword", email, password); // this will call the authenticate function with the signInWithPassword mode and the email and password provided by the user
}
