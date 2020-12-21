import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const WEATHER_API_KEY = "";

export default function App() {
  const [location, setLocation] = useState();
  const [currentWeather, setCurrentWeather] = useState();

  // useEffect(() => {
  // load();
  // }, []);

  async function load() {
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weatherUrl);
      const result = await response.json();
      if (response.ok) {
        setCurrentWeather(result);
      } else {
        console.log(result.message);
      }
    } catch (error) {}
  }
  if (currentWeather) {
    const {
      main: { temp },
    } = currentWeather;
    return (
      <View style={styles.container}>
        <Text>{temp}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(location) => setLocation(location)}
          defaultValue={location}
        />
        <View style={styles.checkButton}>
          <Button
            title="Check "
            onPress={() => {
              console.log(location);
            }}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(location) => setLocation(location)}
          defaultValue={location}
        />
        <View style={styles.checkButton}>
          <Button
            title="Check "
            onPress={() => {
              console.log(location);
              load();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
