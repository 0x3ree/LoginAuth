import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/auth";
import { AuthContext } from "../store/auth-context";

//NOTE: WHEN WE USE FUCTIONS THAT END UP BEING PROMISES, WE NEED TO USE ASYNC/AWAIT OR THEN/ CATCH TO HANDLE THE PROMISES. IN THIS CASE, WE ARE USING ASYNC/AWAIT IN THE createUser FUNCTION IN util/auth.js.

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false); // This state is used to show a loading indicator while the user is being created. It is not used in this example but can be used to show a loading overlay/indicator while the user is being created.
  const authCtx = useContext(AuthContext);
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true); // This will set the isAuthenticating state to true when the user submits the signup form.

    try {
      const token = await createUser(email, password); // This function will be called when the user submits the signup form. It will create a new user using the createUser function from util/auth.js.(this is what links the signup screen to the backend)}
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user. Please check your credentials or try again later!"
      ); // This will show an alert if the user could not be created.
      setIsAuthenticating(false); // This will set the isAuthenticating state to false when the user is created so it doesn't continue spinning.
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating User..."} />; // the message prop is gotten from the loading overlay function
  }

  return <AuthContent onAuthenticate={signupHandler} />; // onAuthenticate here triggers when a user adds their deatils while signingUp
}

export default SignupScreen;
