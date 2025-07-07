// @ts-nocheck
import { WorkoutContext } from "@/components/Workout/WorkoutContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

export default function WorkoutExerciseModal({ ref, ...props }) {
  const workout = useContext(WorkoutContext);
  const { name, description, exerciseIndex } = props;
  const [exerciseName, setExerciseName] = useState(name);
  const [exerciseDescription, setExerciseDescription] = useState(description);
  const [errorMessages, setErrorMessages] = useState({});

  const validateExerciseData = () => {
    setErrorMessages({});
    if (!exerciseName) {
      const errorMessage = "Please add an exercise name.";
      setErrorMessages((prev) => ({ ...prev, exerciseName: errorMessage }));
      return false;
    }
    if (exerciseName.length < 3) {
      const errorMessage = "Exercise Name should at least be 3 characters.";
      setErrorMessages((prev) => ({ ...prev, exerciseName: errorMessage }));
      return false;
    }

    return true;
  };
  const modifyExercise = () => {
    const isValid = validateExerciseData();
    if (isValid) {
      const exerciseObj = {
        name: exerciseName,
        description: exerciseDescription,
      };
      workout.modifyExercise(exerciseIndex, exerciseObj);
      ref.current?.hide();
    } else {
    }
  };
  const deleteExercise = () => {
    workout.deleteExercise(exerciseIndex);
    ref.current?.hide();
  };

  return (
    <ActionSheet ref={ref}>
      <View className="bg-neutral-800">
        <View className="px-6 pt-12 pb-20">
          <View className="gap-8">
            <Text className="text-4xl text-white font-bold">{name}</Text>
            <View>
              <Text className="text-white text-lg font-semibold mb-2">
                Exercise Name:
              </Text>
              <TextInput
                value={exerciseName}
                className="bg-white pl-2 rounded-lg h-16 text-xl font-medium"
                placeholder="Exercise Name"
                onChangeText={setExerciseName}
              />
              {errorMessages.exerciseName ? (
                <Text className="text-red-600 mt-2 font-medium">
                  {errorMessages.exerciseName}
                </Text>
              ) : (
                ""
              )}
            </View>
            <View>
              <Text className="text-white text-lg font-semibold mb-1">
                Description:
              </Text>
              <TextInput
                value={exerciseDescription}
                style={{ textAlignVertical: "top" }}
                className="bg-white pl-2 rounded-lg h-40 text-xl font-medium"
                placeholder="Description"
                multiline
                onChangeText={setExerciseDescription}
              />
            </View>

            <Pressable
              className="flex-row py-4 px-2 rounded-lg bg-red-900/20 border border-red-600"
              onPress={deleteExercise}
            >
              <Ionicons
                name="trash"
                size={24}
                color="#dc2626"
                className="mr-4"
              />
              <Text className="text-red-600 text-2xl font-semibold">
                Delete Exercise
              </Text>
            </Pressable>
            <Pressable
              className="rounded-lg py-3.5 mt-12 bg-blue-600"
              onPress={modifyExercise}
            >
              <Text className="text-white text-center text-xl font-bold">
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ActionSheet>
  );
}
