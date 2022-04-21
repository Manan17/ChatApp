import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { StateContext } from "../StateContext";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useContext(StateContext);
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCred) => {}
    );
  };
  return (
    <View>
      <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.textInput}
        placeholder="Username"
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.textInput}
        placeholder="Password"
      />
      <Button onPress={signUp} title="Sign Up" />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  textInput: {
    marginTop: 30,
    height: 50,
    padding: 10,
    fontSize: 20,
  },
});
