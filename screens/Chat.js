import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { StateContext } from "../StateContext";

const Chat = ({ route }) => {
  const [name, setName] = useState(route.params.group);
  const [list, setList] = useState([]);
  const [username, setUsername] = useContext(StateContext);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const q = query(
      collection(db, `groups/${name}/messages`),
      orderBy("timestamp")
    );
    onSnapshot(q, (snapshot) => {
      setList(
        snapshot.docs.map((doc) => {
          return doc.data();
        })
      );
    });
  }, []);

  const addDocToDB = () => {
    setMessage("");
    addDoc(collection(db, `groups/${name}/messages`), {
      username,
      message,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <View style={styles.chat}>
      <View
        style={{
          elevation: 3,
        }}
      >
        <Text
          style={{
            padding: 20,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "white",
          bottom: 0,
          width: "100%",
          alignSelf: "center",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          zIndex: 2,
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={{
            fontSize: 20,
            marginBottom: 10,
            height: 50,
            borderColor: "gray",
            borderWidth: 1,
            padding: 10,
            flex: 0.8,
          }}
          placeholder="Enter Message"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Button onPress={() => addDocToDB()} title="Send" />
      </View>
      <ScrollView>
        <View style={{ marginTop: 10 }}>
          {list?.map((mssg) => (
            <View
              style={{
                padding: 20,
                backgroundColor:
                  username == mssg.username ? "#FAFDD6" : "#E6BA95",
                marginLeft: username === mssg.username ? "auto" : 0,
                marginRight: username === mssg.username ? 0 : "auto",
                position: "relative",
                marginBottom: 20,
              }}
            >
              {username == mssg.username ? null : (
                <Text
                  style={{
                    fontSize: 11,
                    color: "gray",
                    position: "absolute",
                    top: -15,
                  }}
                >
                  {mssg.username}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 18,
                  color: "black",
                }}
              >
                {mssg.message}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  chat: {
    flex: 1,

    marginTop: StatusBar.currentHeight,
    padding: 20,
  },
});
