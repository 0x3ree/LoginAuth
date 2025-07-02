import { useContext, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false); // This state is used to show a loading indicator while the user is being created. It is not used in this example but can be used to show a loading overlay/indicator while the user is being created.
  const authCtx = useContext(AuthContext); // This is used to get the auth context which contains the authenticate function that will be used to set the token when the user is logged in.

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true); // This will set the isAuthenticating state to true when the user submits the signup form.
    try {
      const token = await login(email, password); // This function will be called when the user submits the signup form. It will create a new user using the createUser function from util/auth.js.(this is what links the signup screen to the backend)
      authCtx.authenticate(token); // This will call the authenticate function from the auth context which will set the token and isAuthenticated state to true. we can then use the token to update the(UI accordingly) state of the app and show the user that they are logged in.
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      ); // This will show an alert if the user could not be created.
      setIsAuthenticating(false); // This will set the isAuthenticating state to false when the user is created so it doesn't continue spinning.
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message={"Login User In..."} />; // the message prop is gotten from the loading overlay function
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
