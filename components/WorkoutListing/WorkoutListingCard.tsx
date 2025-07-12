// @ts-nocheck
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ActionSheetRef } from "react-native-actions-sheet";
import WorkoutDetailsModal from "@/components/WorkoutListing/WorkoutDetailsModal";
import { useRef } from "react";
import TouchableCard from "@/components/ui/TouchableCard";

export default function WorkoutListingCard(props) {
  const { data, workoutIndex, goToWorkout, modifyWorkout, deleteWorkout } =
    props;
  const workoutDetailsModalRef = useRef<ActionSheetRef>(null);
  const openWorkoutDetailsModal = (index) => {
    workoutDetailsModalRef.current?.show();
  };
  return (
    <>
      <TouchableCard
        className="flex-row justify-between items-start"
        onPress={() => goToWorkout(workoutIndex)}
        onLongPress={openWorkoutDetailsModal}
      >
        <View>
          <Text className="text-primary text-3xl font-semibold mb-1.5">
            {data.name}
          </Text>
          <Text className="text-lg text-primary mb-4 font-bold">
            {data.exercises.length} Exercises
          </Text>
          <Text className="text-lg text-primary italic">
            Last Worked On: 02 July 2025
          </Text>
        </View>
        <Ionicons name="chevron-forward-circle" size={35} color="lightgray" />
      </TouchableCard>
      <WorkoutDetailsModal
        ref={workoutDetailsModalRef}
        data={data}
        workoutIndex={workoutIndex}
        modifyWorkout={modifyWorkout}
        deleteWorkout={deleteWorkout}
      />
    </>
  );
}
