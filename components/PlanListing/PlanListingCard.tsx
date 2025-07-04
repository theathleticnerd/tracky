import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function PlanListingCard() {
  return (
    <TouchableOpacity
      className="bg-neutral-800 px-3 py-4 rounded-lg flex-row items-start"
      onPress={() => router.push("/workout-listing")}
    >
      <View className="flex-1">
        <Text className="mb-4 text-2xl text-white font-bold">
          Push Pull Legs
        </Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-white font-semibold text-lg gap-4">
            4 Sessions
          </Text>
          <Text className="text-white font-semibold text-2xl gap-4">•</Text>
          <Text className="text-white font-semibold text-lg gap-4">
            20 Exercises
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward-circle" size={35} color="lightgray" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
