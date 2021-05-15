import React, { useEffect, useRef } from "react";
import { Text, Image, Animated, StyleSheet } from "react-native";

const LoadingScreen: React.FC<{
  version?: string;
}> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        source={{
          uri: "https://i.gifer.com/4xjS.gif",
        }}
        style={styles.img}
      />
      <Text style={styles.text}>{props.version}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 80,
    resizeMode: "contain",
  },
  text: { position: "absolute", bottom: 10, color: "grey", fontSize: 8 },
});

export default LoadingScreen;
