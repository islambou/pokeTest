import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native-gesture-handler";

const BackButton: React.FC = () => {
  const navigation = useNavigation();
  const handler = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity onPress={handler}>
      <Ionicons name="arrow-back" size={32} color="white" />
    </TouchableOpacity>
  );
};

export default BackButton;
