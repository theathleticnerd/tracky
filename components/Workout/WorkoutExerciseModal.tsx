import { WorkoutContext } from "@/components/Workout/WorkoutContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";

export default function WorkoutExerciseModal({ ref, ...props }) {
  const { name, description, exerciseIndex } = props;

  const [nameUI, setNameUI] = useState(name);
  const [descriptionUI, setDescriptionUI] = useState(description);

  const workout = useContext(WorkoutContext);
  const changeExerciseData = () => {
    workout.changeExerciseData(exerciseIndex, {
      name: nameUI,
      description: descriptionUI,
    });
    ref.current?.hide();
  };
  const deleteExercise = () => {
    workout.deleteExercise(exerciseIndex);
    ref.current?.hide();
  };

  return (
    <ActionSheet ref={ref}>
      <View className="bg-neutral-800">
        <View className=" px-6 pt-12 pb-20">
          <View className="gap-8">
            <Text className="text-4xl text-white font-bold">{name}</Text>
            <View>
              <Text className="text-white text-lg font-semibold mb-1">
                Exercise Name:
              </Text>
              <TextInput
                value={nameUI}
                className="bg-white pl-2 rounded-lg h-16 text-xl font-medium"
                placeholder="Exercise Name"
                onChangeText={setNameUI}
              />
            </View>
            <View>
              <Text className="text-white text-lg font-semibold mb-1">
                Description:
              </Text>
              <TextInput
                value={descriptionUI}
                style={{ textAlignVertical: "top" }}
                className="bg-white pl-2 rounded-lg h-40 text-xl font-medium"
                placeholder="Description"
                multiline
                onChangeText={setDescriptionUI}
              />
            </View>
            <Pressable
              className="flex flex-row items-center"
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
              onPress={() => changeExerciseData()}
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
