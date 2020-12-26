import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import { getWeather } from "../services/weatherService";

const SearchScreen = (props) => {
  const [location, setLocation] = useState();
  const [currentWeather, setCurrentWeather] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const saveLocation = async (location) => {
    try {
      await AsyncStorage.setItem("location", location);
    } catch (e) {
      alert("Failed to save the data to the storage");
      console.log(e);
    }
  };

  useEffect(() => {
    async function readLocation() {
      try {
        const temp = await AsyncStorage.getItem("location");
        if (temp !== null) {
          console.log(temp);
          setLocation(temp);
          await load(temp);
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (location == null) readLocation();
  });

  async function load(location) {
    setIsLoading(true);
    try {
      console.log(location);
      const response = await getWeather(location);
      // console.log(response);
      if (response != null) {
        saveLocation(location);
        setCurrentWeather(response);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (currentWeather != null) {
      props.navigation.navigate("Home", {
        currentWeather: currentWeather,
        city: location,
      });
    }
  }, [currentWeather]);

  if (isLoading == true)
    return (
      <View style={styles.screen}>
        <ActivityIndicator
          color="#bc2b78"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    );
  return (
    <View style={styles.screen}>
      <Text>Search for a city</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(location) => setLocation(location)}
        defaultValue={location}
      />
      <View style={styles.checkButton}>
        <Button
          title="Check "
          onPress={async () => {
            await load(location);
          }}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
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
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
});
