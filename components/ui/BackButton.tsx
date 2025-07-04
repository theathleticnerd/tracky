import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function BackButton() {
  return (
    <Pressable
      className="bg-neutral-800 p-2 rounded-full"
      onPress={() => router.back()}
    >
      <Ionicons name="arrow-back" size={30} color="#f2f2f2" />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
