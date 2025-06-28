import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false); // This state is used to show a loading indicator while the user is being created. It is not used in this example but can be used to show a loading overlay/indicator while the user is being created.

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true); // This will set the isAuthenticating state to true when the user submits the signup form.
    await login(email, password); // This function will be called when the user submits the signup form. It will create a new user using the createUser function from util/auth.js.(this is what links the signup screen to the backend)
    setIsAuthenticating(false); // This will set the isAuthenticating state to false when the user is created so it doesn't continue spinning.
  }
  if (isAuthenticating) {
    return <LoadingOverlay message={"Login User In..."} />; // the message prop is gotten from the loading overlay function
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
