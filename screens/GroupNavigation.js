import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "./Chat";
import Groups from "./Groups";
const Stack = createStackNavigator();
const GroupNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          component={Groups}
          name="Groups"
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          component={Chat}
          name="Chat"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GroupNavigation;

const styles = StyleSheet.create({});
