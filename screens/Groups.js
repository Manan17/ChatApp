import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { StateContext } from "../StateContext";
import { updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { TextInput } from "react-native-gesture-handler";

const Groups = ({ navigation }) => {
  const [username, setUsername] = useContext(StateContext);
  const [groups, setGroups] = useState([]);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      updateProfile(user, {
        displayName: username,
      });
    });
  }, []);
  useEffect(() => {
    onSnapshot(collection(db, "groups"), (snapshot) => {
      setGroups(
        snapshot.docs.map((doc) => {
          console.log(doc.id);
          return doc.id;
        })
      );
    });
  }, []);
  const [groupName, setGroupName] = useState("");

  const modalOpenClose = () => {
    setModal(!modal);
  };

  const addGroup = () => {
    setDoc(doc(db, "groups", groupName), {});
    modalOpenClose();
  };

  return (
    <View style={styles.groups}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>Groups</Text>
      <Modal animationType="slide" visible={modal} transparent={true}>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              height: 300,
              backgroundColor: "white",
              padding: 20,
              justifyContent: "center",
            }}
          >
            <TextInput
              value={groupName}
              onChangeText={(text) => setGroupName(text)}
              style={{
                fontSize: 20,
                marginBottom: 20,
                borderColor: "gray",
                borderWidth: 1,
                height: 50,
              }}
              placeholder="Enter Group Name"
            />
            <Button onPress={addGroup} title="Add" />
          </View>
        </View>
      </Modal>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <Text onPress={modalOpenClose} style={styles.addGrpText}>
            Add Group
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          {groups.map((group) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
              onPress={() => {
                navigation.navigate("Chat", {
                  group,
                });
              }}
            >
              <Image
                source={{
                  uri: `https://ui-avatars.com/api/?color=ff0000&name=${group}`,
                }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                }}
              />
              <Text style={{ marginLeft: 20 }}>{group}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Button title="SignOut" onPress={() => auth.signOut()} />
    </View>
  );
};

export default Groups;

const styles = StyleSheet.create({
  groups: {
    marginTop: StatusBar.currentHeight,
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
  },
  addGrpText: {
    fontSize: 20,
  },
});
