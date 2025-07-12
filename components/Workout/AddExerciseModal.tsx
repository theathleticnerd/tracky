// @ts-nocheck
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

export default function AddExerciseModal({ ref, ...props }) {
  const { addExercise } = props;
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const validateExerciseData = () => {
    setErrorMessages({});
    if (!exerciseName) {
      const errorMessage = "Please add a exercise name.";
      setErrorMessages((prev) => {
        return { ...prev, exerciseName: errorMessage };
      });
      return false;
    }
    if (exerciseName.length < 3) {
      const errorMessage = "Exercise name should be at least 3 characters.";
      setErrorMessages((prev) => {
        return { ...prev, exerciseName: errorMessage };
      });
      return false;
    }

    return true;
  };
  const createExercise = () => {
    const isValid = validateExerciseData();
    if (isValid) {
      addExercise(exerciseName, exerciseDescription);
      ref.current.hide();
    } else {
    }
  };
  return (
    <ActionSheet ref={ref}>
      <View className="px-6 pt-12 pb-20 bg-neutral-800">
        <Text className="text-primary text-3xl font-semibold mb-6">
          Add Exercise
        </Text>
        <View className="gap-8">
          <View>
            <Text className="text-primary text-lg font-semibold mb-2">
              Exercise Name:
            </Text>
            <TextInput
              value={exerciseName}
              className="bg-white pl-2 rounded-lg h-16 text-xl font-medium"
              placeholder="Bench Press"
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
            <Text className="text-primary text-lg font-semibold mb-2">
              Description:
            </Text>
            <TextInput
              value={exerciseDescription}
              style={{ textAlignVertical: "top" }}
              className="bg-white pl-2 rounded-lg h-40 text-xl font-medium"
              placeholder="Focus on form, not weight..."
              multiline
              onChangeText={setExerciseDescription}
            />
          </View>
        </View>
        <TouchableOpacity
          className="rounded-lg py-3.5 mt-12 bg-blue-600"
          onPress={createExercise}
        >
          <Text className="text-primary text-center text-xl font-bold">
            Create Exercise
          </Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
}
