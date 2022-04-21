import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import SignUp from "./screens/SignUp";
import { auth } from "./firebase";
import Groups from "./screens/Groups";
import { StateProvider } from "./StateContext";
import GroupNavigation from "./screens/GroupNavigation";
export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);
  return (
    <View style={styles.container}>
      <StateProvider>{user ? <GroupNavigation /> : <SignUp />}</StateProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
