// @ts-nocheck
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function TouchableCard(props) {
  const { children, className, onPress, onLongPress } = props;
  return (
    <TouchableOpacity
      className={`bg-neutral-800 px-3 py-4 rounded-lg ${className}`}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {children}
    </TouchableOpacity>
  );
}
