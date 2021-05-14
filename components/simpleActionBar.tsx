import React from "react";
import { View, Text } from "react-native";
import BackButton from "./backButton";

const SimpleActionBar = () => {
  return (
    <View
      style={{
        width: "100%",
        paddingTop: 25,
        paddingHorizontal: 15,
      }}
    >
      <BackButton />
    </View>
  );
};

export default SimpleActionBar;
