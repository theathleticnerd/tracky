// @ts-nocheck
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function WorkoutListingCard(props) {
  const { openWorkoutDetailsModal } = props;
  return (
    <TouchableOpacity
      className="bg-neutral-800 rounded-lg py-6 px-4 flex-row justify-between items-start"
      onPress={() => {
        router.push("/workout");
      }}
      onLongPress={openWorkoutDetailsModal}
    >
      <View>
        <Text className="text-white text-3xl font-semibold mb-1.5">
          Shoulder
        </Text>
        <Text className="text-lg text-neutral-200 mb-4 font-bold">
          4 Exercises
        </Text>
        <Text className="text-lg text-neutral-200 italic">
          Last Worked On: 02 July 2025
        </Text>
      </View>
      <Ionicons name="chevron-forward-circle" size={35} color="lightgray" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
