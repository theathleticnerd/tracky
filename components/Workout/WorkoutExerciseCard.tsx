// @ts-nocheck
import WorkoutSetCard from "@/components/Workout/WorkoutSetCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { WorkoutContext } from "./WorkoutContext";
import WorkoutExerciseModal from "./WorkoutExerciseModal";

export default function WorkoutExerciseCard(props) {
  const { id, name, description, sets } = props.exercise;
  const exerciseIndex = props.index;
  const workout = useContext(WorkoutContext);

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const addSet = () => {
    workout.addSet(exerciseIndex);
  };

  return (
    <View className="bg-gray-200/10 py-6 mb-12 px-2 rounded-lg w-full">
      <View className="flex-row justify-between mb-8 items-start">
        <View className="flex-1">
          <Text className="text-white text-2xl">{name}</Text>
          <Text className="text-white mt-1 text-lg">{description}</Text>
        </View>
        <Pressable className="" onPress={toggleModal}>
          <Ionicons name="ellipsis-vertical" size={24} color="#f2f2f2" />
        </Pressable>
      </View>
      <View className="items-center justify-center">
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
          {sets.map((data, index) => (
            <WorkoutSetCard
              key={data.id}
              data={data}
              index={index}
              exerciseIndex={exerciseIndex}
            />
          ))}
        </View>
        {/* <Pressable
          className="self-start flex-row items-center bg-gray-950 py-4 px-4 rounded-lg border border-neutral-800 w-1/3"
          onPress={addSet}
        >
          <Ionicons name="add-circle" size={24} color="#f2f2f2" />
          <Text className="text-xl text-white ml-4 flex-1">Add Set</Text>
        </Pressable> */}
        <Pressable className="self-start mx-2" onPress={addSet}>
          <Ionicons name="add-circle" size={32} color="#f2f2f2" />
        </Pressable>
      </View>
      <WorkoutExerciseModal
        name={name}
        exerciseIndex={exerciseIndex}
        description={description}
        modalVisible={modalVisible}
        toggleModal={toggleModal}
      />
    </View>
  );
}
