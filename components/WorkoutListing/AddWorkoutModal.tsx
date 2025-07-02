// @ts-nocheck
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

export default function AddWorkoutModal({ ref, ...props }) {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const validateWorkoutData = () => {
    setErrorMessages({});
    if (!workoutName) {
      const errorMessage = "Please add a workout name.";
      setErrorMessages((prev) => {
        return { ...prev, workoutName: errorMessage };
      });
      return false;
    }
    if (workoutName.length < 3) {
      const errorMessage = "Workout name should be at least 3 characters.";
      setErrorMessages((prev) => {
        return { ...prev, workoutName: errorMessage };
      });
      return false;
    }

    return true;
  };
  const createWorkout = () => {
    const isValid = validateWorkoutData();
    if (isValid) {
      ref.current.hide();
    } else {
    }
  };
  return (
    <ActionSheet ref={ref}>
      <View className="px-6 pt-12 pb-20 bg-neutral-800">
        <Text className="text-white text-3xl font-semibold mb-6">
          Add Workout
        </Text>
        <View className="gap-8">
          <View>
            <Text className="text-white text-lg font-semibold mb-2">Name:</Text>
            <TextInput
              value={workoutName}
              className="bg-white pl-2 rounded-lg h-16 text-xl font-medium"
              placeholder="Push 2"
              onChangeText={setWorkoutName}
            />
            <Text className="text-red-600 mt-2 font-medium text-lg">
              {errorMessages.workoutName || ""}
            </Text>
          </View>

          <View>
            <Text className="text-white text-lg font-semibold mb-2">
              Description:
            </Text>
            <TextInput
              value={workoutDescription}
              style={{ textAlignVertical: "top" }}
              className="bg-white pl-2 rounded-lg h-40 text-xl font-medium"
              placeholder="A more shoulder focused push day..."
              multiline
              onChangeText={setWorkoutDescription}
            />
          </View>
        </View>
        <Pressable
          className="rounded-lg py-3.5 mt-12 bg-blue-600"
          onPress={createWorkout}
        >
          <Text className="text-white text-center text-xl font-bold">
            Create Workout
          </Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({});
