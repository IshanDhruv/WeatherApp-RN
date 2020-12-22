import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  StatusBar,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/homeScreen";
import SearchScreen from "./screens/searchScreen";

export default function App() {
  const [location, setLocation] = useState();
  const [currentWeather, setCurrentWeather] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  textInput: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    margin: 40,
  },
  checkButton: {
    width: 90,
  },
});
