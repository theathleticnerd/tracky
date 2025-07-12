import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default function Snackbar(props) {
  const { type, message } = props;
  return (
    <View
      style={styles.container}
      className="absolute top-20 left-1/2 flex-row items-center justify-center bg-red-800/80 rounded-md px-4 py-3 max-w-96 "
    >
      <Ionicons
        name={type === "success" ? "checkmark-circle" : "close-circle"}
        size={24}
        color="#f2f2f2"
        className="mr-4"
      />
      {/* <Ionicons  size={24} color="black" /> */}
      <Text className="font-bold text-primary text-lg flex-1">
        {message || "An error occurred."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    transform: "translate(-50%,00)",
  },
});
