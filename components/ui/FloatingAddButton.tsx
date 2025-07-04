// @ts-nocheck
import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function FloatingAddButton(props) {
  const { onPress } = props;
  return (
    <Pressable
      className="bg-blue-500 w-auto absolute bottom-16 right-10 p-2 rounded-full"
      onPress={onPress}
    >
      <Ionicons name="add" size={40} color="#f2f2f2" />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
