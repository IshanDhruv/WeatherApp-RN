import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";

const SearchScreen = (props) => {
  const [location, setLocation] = useState();
  const [currentWeather, setCurrentWeather] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");

  async function load() {
    try {
      const WEATHER_API_KEY = "a9d7c754be7915021a9c4c79b0da6366";
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weatherUrl);
      const result = await response.json();
      if (response.ok) {
        setCurrentWeather(result);
        props.navigation.navigate("Home", {
          currentWeather: currentWeather,
          city: "Bengaluru",
        });
      } else {
        setErrorMessage(result.message);
        console.log(errorMessage);
      }
    } catch (error) {}
  }

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
            console.log(location);
            await load();
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
});
