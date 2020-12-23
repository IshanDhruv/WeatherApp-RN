import React from "react";
import { View, Text, StyleSheet } from "react-native";

function HomeScreen({ route, navigation }) {
  const { currentWeather, city } = route.params;
  if (currentWeather != null) {
    const temp = currentWeather.main.temp;
    return (
      <View style={styles.screen}>
        <Text>{temp} C</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <Text>Something went wrong</Text>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
