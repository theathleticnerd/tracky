// @ts-nocheck
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { SwipeToDeleteItem } from "@/components/Workout/SwipeToDelete";
import { WorkoutContext } from "@/components/Workout/WorkoutContext";
import ExerciseDetailModal from "@/components/Workout/ExerciseDetailModal";
import WorkoutSetCard from "@/components/Workout/WorkoutSetCard";
import { ActionSheetRef } from "react-native-actions-sheet";

export default function WorkoutExerciseCard(props) {
  const { id, name, description, sets } = props.exercise;
  const exerciseIndex = props.index;
  const workout = useContext(WorkoutContext);

  const openExerciseModal = () => {
    actionSheetRef.current?.show();
  };

  const addSet = () => {
    workout.addSet(exerciseIndex);
  };
  const deleteSet = (item, index) => {
    workout.deleteSet(exerciseIndex, index);
  };
  const actionSheetRef = useRef<ActionSheetRef>(null);
  return (
    <View className="bg-neutral-900 py-6 mb-12 px-4 rounded-lg w-full relative">
      <View className="flex-row justify-between mb-8 items-start">
        <View className="flex-1">
          <Text className="text-white text-2xl">{name}</Text>
          <Text className="text-white mt-1 text-lg">{description}</Text>
        </View>
        <Pressable className="" onPress={openExerciseModal}>
          <Ionicons name="ellipsis-vertical" size={24} color="#f2f2f2" />
        </Pressable>
      </View>
      {sets.length > 0 ? (
        <View className="items-center justify-start min-h-40">
          <View className="flex-row justify-between mb-2 gap-2 w-full">
            <Text className="text-gray-200 font-bold tracking-widest text-center w-1/12 ">
              SET
            </Text>
            <Text className="text-gray-200 font-bold tracking-widest text-center w-2/12">
              BEST
            </Text>
            <Text className="text-gray-200 font-bold tracking-widest text-center w-3/12">
              WEIGHT
            </Text>
            <Text className="text-gray-200 font-bold tracking-widest text-center w-3/12">
              REPS
            </Text>
            <Text className="text-gray-200 font-bold tracking-widest text-center w-1/12">
              ✓
            </Text>
          </View>
          <View className="gap-12 mb-4">
            {sets.map((item, index) => (
              <SwipeToDeleteItem
                key={item.id}
                item={item}
                index={index}
                deleteText="Delete Set"
                onDelete={deleteSet}
                deleteThreshold={0.25}
              >
                <WorkoutSetCard
                  data={item}
                  index={index}
                  exerciseIndex={exerciseIndex}
                />
              </SwipeToDeleteItem>
            ))}
          </View>
        </View>
      ) : (
        <View className="min-h-40 justify-center items-center">
          <Text className="text-3xl font-bold text-neutral-200 text-center mb-2">
            No Sets Added
          </Text>
          <Text className="text-center text-neutral-400 text-lg">
            Click on the + icon to add a new set.
          </Text>
        </View>
      )}

      <View
        className="absolute left-4 bottom-0 bg-neutral-900 p-1 rounded-full"
        style={[
          {
            transform: [{ translateX: 0 }, { translateY: "50%" }],
          },
        ]}
      >
        <Pressable className="" onPress={addSet}>
          <Ionicons name="add-circle" size={36} color="#f2f2f2" />
        </Pressable>
      </View>
      <ExerciseDetailModal
        ref={actionSheetRef}
        name={name}
        exerciseIndex={exerciseIndex}
        description={description}
      />
    </View>
  );
}
