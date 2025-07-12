// @ts-nocheck
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import WorkoutListingCard from "@/components/WorkoutListing/WorkoutListingCard";
import AddWorkoutModal from "@/components/WorkoutListing/AddWorkoutModal";
import { ActionSheetRef } from "react-native-actions-sheet";
import BackButton from "@/components/ui/BackButton";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addWorkoutData,
  deleteWorkoutData,
  modifyWorkoutData,
  setWorkoutID,
} from "@/store/slices/workoutSlice";

import { router } from "expo-router";
import FloatingAddButton from "@/components/ui/FloatingAddButton";
export default function WorkoutListing() {
  const planID = useSelector((state) => state.workout.planID);
  const planData = useSelector((state) => state.workout.data[planID]);

  const addWorkoutModalRef = useRef<ActionSheetRef>(null);
  const openAddWorkoutModal = () => {
    addWorkoutModalRef.current?.show();
  };

  const dispatch = useDispatch();
  const goToWorkout = (id) => {
    dispatch(setWorkoutID(id));
    router.push("/workout");
  };
  const addWorkout = (name, description) => {
    const workoutObj = { name: name, description: description, exercises: [] };
    dispatch(addWorkoutData({ workoutObj }));
  };
  const modifyWorkout = (workoutIndex, workoutObj) => {
    dispatch(
      modifyWorkoutData({ workoutID: workoutIndex, workoutObj: workoutObj })
    );
  };
  const deleteWorkout = (workoutIndex) => {
    dispatch(deleteWorkoutData({ workoutID: workoutIndex }));
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 20 : 0,
      }}
      className="flex-1 px-5 min-w-full relative"
    >
      <ScrollView className="pt-4 px-2 ">
        <View className="mt-5 mb-10 flex-row gap-4 items-center">
          <BackButton />
          <Text className="text-primary text-4xl font-medium">
            {planData.name}
          </Text>
        </View>
        <View className="gap-8 mb-20">
          {planData.sessions.map((workout, index) => (
            <WorkoutListingCard
              key={`${workout.name}-${index}`}
              data={workout}
              workoutIndex={index}
              goToWorkout={goToWorkout}
              modifyWorkout={modifyWorkout}
              deleteWorkout={deleteWorkout}
            />
          ))}
        </View>
      </ScrollView>

      <FloatingAddButton onPress={openAddWorkoutModal} />
      <AddWorkoutModal ref={addWorkoutModalRef} addWorkout={addWorkout} />
    </SafeAreaView>
  );
}
