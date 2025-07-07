// @ts-nocheck
import "@/global.css";

import Snackbar from "@/components/Snackbar";
import { WorkoutContext } from "@/components/Workout/WorkoutContext";
import WorkoutExerciseCard from "@/components/Workout/WorkoutExerciseCard";
import { useEffect, useRef, useState } from "react";
import { Platform, SafeAreaView, ScrollView, Text, View } from "react-native";
import BackButton from "@/components/ui/BackButton";
import FloatingAddButton from "@/components/ui/FloatingAddButton";
import AddExerciseModal from "@/components/Workout/AddExerciseModal";
import { useSelector, useDispatch } from "react-redux";
import {
  addExerciseData,
  deleteExerciseData,
  addSetData,
  deleteSetData,
  modifyExerciseData,
  modifySetData,
} from "@/store/slices/workoutSlice";

export default function Workout() {
  // const [workoutData, setWorkoutData] = useState([]);
  const [sidebarData, setSidebarData] = useState({ type: null, message: "" });

  const dispatch = useDispatch();
  const planID = useSelector((state) => state.workout.planID);
  const workoutID = useSelector((state) => state.workout.workoutID);
  const workoutData = useSelector(
    (state) => state.workout.data[planID].sessions[workoutID]
  );
  useEffect(() => {
    // setWorkoutData(data);
  }, []);

  const addExercise = (name, description) => {
    const exerciseObj = { name: name, description: description, sets: [] };
    dispatch(addExerciseData({ exerciseObj }));
  };
  const modifyExercise = (exerciseIndex, exerciseObj) => {
    // setWorkoutData((prev) => {
    //   const data = [...prev];
    //   const oldValue = data[exerciseIndex];
    //   data[exerciseIndex] = {
    //     ...oldValue,
    //     ...obj,
    //   };
    //   return data;
    // });
    dispatch(modifyExerciseData({ exerciseIndex, exerciseObj }));
  };
  const deleteExercise = (exerciseIndex) => {
    // setWorkoutData((prev) => {
    //   const previousData = [...prev];
    //   previousData.splice(exerciseIndex, 1);
    //   return previousData;
    // });
    dispatch(deleteExerciseData({ exerciseIndex }));
  };
  const addSet = (exerciseIndex) => {
    // setWorkoutData((prev) => {
    //   const previousData = [...prev];
    //   const obj = previousData[exerciseIndex];
    //   obj.sets.push({
    //     id: obj.sets.length + 1,
    //     bestLift: null,
    //     weight: "",
    //     reps: "",
    //     isDone: false,
    //   });
    //   return previousData;
    // });
    const setObj = {
      // id: obj.sets.length + 1,
      bestLift: null,
      weight: "",
      reps: "",
      isDone: false,
    };
    dispatch(addSetData({ exerciseIndex, setObj }));
  };
  const modifySet = (exerciseIndex, setIndex, setObj) => {
    // setWorkoutData((prev) => {
    //   const data = [...prev];
    //   const oldValue = data[exerciseIndex].sets[setNumber];
    //   data[exerciseIndex].sets[setNumber] = {
    //     ...oldValue,
    //     ...obj,
    //     isDone: !oldValue.isDone,
    //   };
    //   return data;
    // });
    dispatch(modifySetData({ exerciseIndex, setIndex, setObj }));
  };
  const deleteSet = (exerciseIndex, setIndex) => {
    // setWorkoutData((prev) => {
    //   const previousData = [...prev];
    //   let sets = previousData[exerciseIndex].sets;
    //   sets = sets.splice(setIndex, 1);
    //   return previousData;
    // });
    dispatch(deleteSetData({ exerciseIndex, setIndex }));
  };
  const showSidebar = (type, message) => {
    setSidebarData({ type: type, message: message });
    setTimeout(() => {
      setSidebarData({ type: null, message: null });
    }, 2000);
  };
  const contextValue = {
    modifyExercise,
    deleteExercise,
    addSet,
    modifySet,
    deleteSet,
    showSidebar,
  };

  const addExerciseModalRef = useRef<ActionSheetRef>(null);
  const openAddExerciseModal = () => {
    addExerciseModalRef.current?.show();
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 20 : 0,
      }}
      className="flex-1 px-5 min-w-full"
    >
      <ScrollView className="pt-4">
        <View className="mt-5 mb-10 flex-row gap-4 items-center">
          <BackButton />
          <Text className="text-white text-4xl font-medium">
            {workoutData.name}
          </Text>
        </View>
        <View className="mb-20">
          <WorkoutContext value={contextValue}>
            {workoutData.exercises.map((exercise, index) => (
              <WorkoutExerciseCard
                key={exercise.id}
                index={index}
                exercise={exercise}
              />
            ))}
          </WorkoutContext>
        </View>
      </ScrollView>
      <FloatingAddButton onPress={openAddExerciseModal} />
      <AddExerciseModal ref={addExerciseModalRef} addExercise={addExercise} />
      {sidebarData.type && (
        <Snackbar type={sidebarData.type} message={sidebarData.message} />
      )}
    </SafeAreaView>
  );
}
