import React from "react";

import { View, StyleSheet } from "react-native";
import Logo from "../../components/logoBanner";
import Text from "../../components/text";

interface HomeProps {}

const Header: React.FC<HomeProps> = (props) => {
  return (
    <View style={styles.container}>
      <Logo />
      <Text bold>Gotta scroll through them all!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: "15%" },
});

export default Header;
