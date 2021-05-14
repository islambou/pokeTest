import React, { FC } from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import SimpleActionBar from "../../components/simpleActionBar";

interface GenericScreen extends ViewProps {}
const GenericScreen: FC<GenericScreen> = (props) => {
  return (
    <View style={[styles.screen, props.style]}>
      <SimpleActionBar />
      <View style={styles.container}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GenericScreen;
