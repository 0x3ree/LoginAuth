import axios from "axios";

const API_KEY = "AIzaSyAAuSEIF0ILOmbX0ViqYuqCv-km_nHgSLA"; // this is our web api key for Firebase Authentication which stored in the const.

// This is the API key for Firebase Authentication, which is used to authenticate requests to the Firebase Authentication service.
// when we trigger the createUser fucntion, it will send a post request to FB automatically a promise comes in and we make our post request an async fucntion and extracts its response using await and then we can use the response to do whatever we want with it, like storing the user in the database or logging them in.
export async function createUser(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true, // this is used to return a secure token for the user
    } // this is the endpoint for creating a new user in Firebase Authentication (this(email,pass, RST) should always be in an object format which will be sent as the body of the request which will be converted to JSON(a data format) by axios)
  );
}
