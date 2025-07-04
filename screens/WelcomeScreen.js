import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function WelcomeScreen() {
  // in here we are going to use the token gotten fire firebase to access a protected resouce which loads on the welcome screen for authenticated user
  // rather than async we use the good old  way .then() a promise, to fetch the data from the firebase realtime database
  const [fetchedMessage, setFetchedMessage] = useState("");

  useEffect(() => {
    axios.get(
      "https://expensetracker-ebaa0-default-rtdb.firebaseio.com/message.json"
    ).then((response) => {
      response.data});
  }, []);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
