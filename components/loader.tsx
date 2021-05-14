import React, { FC } from "react";
import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tinyLogo: {
    alignSelf: "center",
    width: 32,
    height: 32,
  },
});

const Loader: FC = () => {
  return (
    <Image
      style={styles.tinyLogo}
      source={{
        uri: "https://i.gifer.com/4xjS.gif",
      }}
    />
  );
};

export default Loader;
