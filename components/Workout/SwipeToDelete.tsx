// @ts-nocheck
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { width: screenWidth } = Dimensions.get("window");

export const SwipeToDeleteItem = ({
  item,
  index,
  onDelete,
  children,
  deleteThreshold = 0.3,
  backgroundColor = "#ff4444",
  deleteText = "Delete",
  textColor = "white",
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const itemHeight = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    const { state, translationX } = event.nativeEvent;

    if (state === State.END) {
      const threshold = screenWidth * deleteThreshold;

      if (Math.abs(translationX) > threshold) {
        // Swipe threshold reached - delete item
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: translationX > 0 ? screenWidth : -screenWidth,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(itemHeight, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onDelete(item, index);
        });
      } else {
        // Snap back to original position
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    }
  };

  const handleDeletePress = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -screenWidth,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(itemHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDelete(item, index);
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scaleY: itemHeight }],
          opacity: opacity,
        },
      ]}
    >
      <View style={styles.deleteBackground}>
        <TouchableOpacity
          onPress={handleDeletePress}
          className="bg-red-600 w-full h-full flex items-center flex-row justify-center"
          activeOpacity={0.8}
        >
          <Ionicons name="trash" size={20} color="#f2f2f2" className="mr-2" />
          <Text
            // style={[styles.deleteText, { color: textColor }]}
            className="text-primary text-lg font-semibold"
          >
            {deleteText}
          </Text>
        </TouchableOpacity>
      </View>

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        activeOffsetX={[-10, 10]}
      >
        <Animated.View
          style={[
            {
              transform: [{ translateX }],
            },
          ]}
          className="bg-neutral-900"
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    // overflow: "hidden",
  },
  deleteBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 100,
  },
  deleteText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
