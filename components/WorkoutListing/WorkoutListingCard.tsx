// @ts-nocheck
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActionSheetRef } from "react-native-actions-sheet";
import WorkoutDetailsModal from "@/components/WorkoutListing/WorkoutDetailsModal";
import { useRef } from "react";

export default function WorkoutListingCard(props) {
  const { data, workoutIndex, goToWorkout } = props;
  const workoutDetailsModalRef = useRef<ActionSheetRef>(null);
  const openWorkoutDetailsModal = (index) => {
    workoutDetailsModalRef.current?.show();
  };
  return (
    <>
      <TouchableOpacity
        className="bg-neutral-800 rounded-lg py-6 px-4 flex-row justify-between items-start"
        onPress={() => goToWorkout(workoutIndex)}
        onLongPress={openWorkoutDetailsModal}
      >
        <View>
          <Text className="text-white text-3xl font-semibold mb-1.5">
            {data.name}
          </Text>
          <Text className="text-lg text-neutral-200 mb-4 font-bold">
            {data.exercises.length} Exercises
          </Text>
          <Text className="text-lg text-neutral-200 italic">
            Last Worked On: 02 July 2025
          </Text>
        </View>
        <Ionicons name="chevron-forward-circle" size={35} color="lightgray" />
      </TouchableOpacity>
      <WorkoutDetailsModal ref={workoutDetailsModalRef} data={data} />
    </>
  );
}
