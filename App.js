import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constant/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext); // we use this to get the auth context, so we can use the logout function to log the user out when they press the exit button in the headerRight prop of the WelcomeScreen
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout} // we can also use an inline function here like onPress={() => authCtx.logout()} but it's better to use the logout function directly to avoid creating a new function on every render and also to keep it shorter
            />
          ),
        }} //tintcolor is the color of the icon, which is white by default, so we can use it to set the color of the icon, it comes with the headerRight prop.
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}
function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState("true");
  const authCtx = useContext(AuthContext); // we use this to get the auth context, so we can use the authenticate function to set the token when the user is logged in or signed up
  // we use a fuction to update our component
  // in here because of the flickering before showing the loggedIn user we remove the useEffect from the auth-context and call it in the app.js
  // in here we use a useEffect when we want to run some cde when a component is say in motion or going to do something

  useEffect(() => {
    // the asyncstorage will return a promise, so we then use a helper function to call the AsyncStorage
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken); // this will set the token to the stored token if it exists, which means the user is already authenticated
        // we only autologin users that are authenticated
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}
// we add {} to the authStack to render it dynamically based on the authentication state of the user, so if the user is authenticated, we will render the AuthenticatedStack, otherwise we will render the AuthStack that's why we add {} to make it a dynamic expression
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
