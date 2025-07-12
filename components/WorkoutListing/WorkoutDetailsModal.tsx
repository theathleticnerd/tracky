// @ts-nocheck
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import { Ionicons } from "@expo/vector-icons";

export default function WorkoutDetailsModal({ ref, ...props }) {
  const { data, workoutIndex, modifyWorkout, deleteWorkout } = props;
  const [workoutName, setWorkoutName] = useState(data.name);
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
  const changeWorkout = () => {
    if (workoutName === data.name) {
      // If nothing has changed... Just close the modal
      ref.current.hide();
    }

    const isValid = validateWorkoutData();
    if (isValid) {
      const workoutObj = { name: workoutName, description: workoutDescription };
      modifyWorkout(workoutIndex, workoutObj);
      ref.current.hide();
    } else {
    }
  };
  return (
    <ActionSheet ref={ref}>
      <View className="px-6 pt-10 pb-20 bg-neutral-800">
        <Text className="text-primary text-3xl font-semibold mb-4">
          {data.name}
        </Text>
        <View className="gap-3 mb-12">
          <View>
            <Text className="text-primary text-lg font-semibold mb-2">
              Name:
            </Text>
            <TextInput
              value={workoutName}
              className="bg-white pl-2 rounded-lg h-16 text-xl font-medium"
              placeholder="Push 2"
              onChangeText={setWorkoutName}
            />
            {errorMessages.workoutName ? (
              <Text className="text-red-600 mt-2 font-medium">
                {errorMessages.workoutName}
              </Text>
            ) : (
              ""
            )}
          </View>

          <View>
            <Text className="text-primary text-lg font-semibold mb-2">
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
        <TouchableOpacity
          className="flex-row py-4 px-2 rounded-lg bg-red-900/20 border border-red-600"
          onPress={() => deleteWorkout(workoutIndex)}
        >
          <Ionicons name="trash" size={24} color="#dc2626" className="mr-4" />
          <Text className="text-red-600 text-2xl font-semibold">
            Delete Exercise
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-lg py-3.5 mt-12 bg-blue-600"
          onPress={changeWorkout}
        >
          <Text className="text-primary text-center text-xl font-bold">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({});
