// @ts-nocheck
import { WorkoutContext } from "@/components/Workout/WorkoutContext";
import React, { useContext, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function WorkoutSetCard(props: any) {
  const { id, bestLift, weight, reps, isDone } = props.data;
  const index = props.index;
  const exerciseIndex = props.exerciseIndex;
  const workout = useContext(WorkoutContext);

  // const [isDone, setIsDone] = useState(false);
  const [weightUI, setWeightUI] = useState("");
  const [repsUI, setRepsUI] = useState("");

  const verifyData = () => {
    const weightValue = parseInt(weightUI);
    const repsValue = parseInt(repsUI);
    if (!(weightValue > 0) && !(repsValue > 0)) {
      workout.showSidebar(
        "error",
        "Please enter the weight and reps before completing a set."
      );
      return false;
    } else if (!(weightValue >= 0)) {
      workout.showSidebar(
        "error",
        "Please enter the weight before completing a set."
      );
      return false;
    } else if (!(repsValue > 0)) {
      workout.showSidebar(
        "error",
        "Please enter the reps before completing a set."
      );
      return false;
    }

    return true;
  };
  const changeSetData = () => {
    const isVerified = verifyData();
    if (isVerified) {
      const obj = {
        reps: repsUI,
        weight: weightUI,
      };
      workout.changeSetData(exerciseIndex, index, obj);
    }
  };

  return (
    <View className="flex-row items-center justify-between w-full gap-2 space-between">
      <Text className="text-gray-200 font-bold text-center w-1/12 ">
        {index + 1}
      </Text>
      <View className="text-center w-2/12 text-sm flex items-center justify-center">
        <Text className="text-gray-200 font-semibold">4 x 20 kgs</Text>
      </View>
      <Text className="text-gray-200 font-bold text-center w-3/12">
        <TextInput
          keyboardType="numeric"
          value={weightUI}
          className="bg-white/50 w-full rounded-lg h-12 text-center text-xl font-semibold"
          placeholder="40"
          onChangeText={setWeightUI}
        />
      </Text>
      <Text className="text-gray-200 font-bold text-center w-3/12">
        <TextInput
          value={repsUI}
          keyboardType="numeric"
          className="bg-white/50 w-full rounded-lg h-12 text-center text-xl font-semibold"
          placeholder="12"
          onChangeText={setRepsUI}
        />
      </Text>
      <View className={"text-gray-200 font-bold text-center w-1/12"}>
        <Pressable
          className={`flex items-center justify-center size-11 rounded-lg ${isDone ? "bg-green-500" : "bg-white/40"}`}
          onPress={() => {
            changeSetData();
          }}
        >
          <Text
            className={`text-2xl  ${isDone ? "text-gray-50" : "text-gray-800"}`}
          >
            ✓
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
