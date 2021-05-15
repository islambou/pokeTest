import React from "react";
import { View, StyleSheet } from "react-native";
import BackButton from "./backButton";

const SimpleActionBar = () => {
  return (
    <View style={styles.container}>
      <BackButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 25,
    paddingHorizontal: 15,
  },
});

export default SimpleActionBar;
