import { use, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
// here we use the useNavigation to get acess to other screen because this component is not a screen itself but is used in the login and signup screens
import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { Colors } from "../../constant/styles";

// in here we get 2 props, isLogin and onAuthenticate(which is a function that will be called when the user submits the form(authenticate)) from the LoginScreen and SignupScreen components, this component is used in both of those screens so we can use it to handle both login and signup functionality
function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation(); // this give us a method to navigate to other screens
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });
  // the isLogin prop here is a boolean that determines if the user is logging in or signing up and it has only been placed in the auth content where it comes from and on the login screen but not on the signup screen
  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup"); // this will navigate to the signup screen and in order for the back button to not show so the user cannot go back to the login screen rather they use the flat button to switch to the login screen, we use replace instead of navigate.
    } else {
      navigation.replace("Login"); // this will navigate to the login screen
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim(); // this is used to remove any leading or trailing spaces from the email and password
    password = password.trim();

    const emailIsValid = email.includes("@"); // this is a simple validation for the email, you can use more complex validation if you want but FB allows an email to be valid if it contains an @ symbol so we will use that as a validation here
    const passwordIsValid = password.length > 6; // this is a simple validation for the email and password, you can use more complex validation if you want but FB allows a limit of 6 characters for the password so we will use that as a validation here
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password }); // once a user details are authenticate, this will call the onAuthenticate function that is passed from the LoginScreen or SignupScreen component, which will handle the authentication logic (like calling the createUser function or login function)
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
