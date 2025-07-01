// @ts-nocheck
import "@/global.css";

import Snackbar from "@/components/Snackbar";
import { WorkoutContext } from "@/components/Workout/WorkoutContext";
import WorkoutExerciseCard from "@/components/Workout/WorkoutExerciseCard";
import { useCallback, useEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, Text } from "react-native";

const data = [
  {
    id: 1,
    name: "Lateral Raise",
    description: "Targets the lateral deltoids for width and definition.",
    sets: [
      {
        id: 1,
        bestLift: null,
        weight: "",
        reps: "",
        isDone: false,
      },
      {
        id: 2,
        bestLift: null,
        weight: "5",
        reps: "10",
        isDone: false,
      },
      {
        id: 3,
        bestLift: null,
        weight: "5",
        reps: "8",
        isDone: false,
      },
    ],
  },
  {
    id: 2,
    name: "Overhead Dumbbell Press",
    description: "Works the front and side delts along with triceps.",
    sets: [
      {
        id: 1,
        bestLift: null,
        weight: "10",
        reps: "12",
        isDone: false,
      },
      {
        id: 2,
        bestLift: null,
        weight: "12.5",
        reps: "10",
        isDone: false,
      },
      {
        id: 3,
        bestLift: null,
        weight: "15",
        reps: "8",
        isDone: false,
      },
    ],
  },
  {
    id: 3,
    name: "Front Raise",
    description: "Isolates the anterior deltoids.",
    sets: [
      {
        id: 1,
        bestLift: null,
        weight: "5",
        reps: "12",
        isDone: false,
      },
      {
        id: 2,
        bestLift: null,
        weight: "7.5",
        reps: "10",
        isDone: false,
      },
      {
        id: 3,
        bestLift: null,
        weight: "10",
        reps: "8",
        isDone: false,
      },
    ],
  },
  {
    id: 4,
    name: "Reverse Pec Deck Fly",
    description: "Targets the rear delts and upper back.",
    sets: [
      {
        id: 1,
        bestLift: null,
        weight: "20",
        reps: "15",
        isDone: false,
      },
      {
        id: 2,
        bestLift: null,
        weight: "25",
        reps: "12",
        isDone: false,
      },
      {
        id: 3,
        bestLift: null,
        weight: "30",
        reps: "10",
        isDone: false,
      },
    ],
  },
  {
    id: 5,
    name: "Arnold Press",
    description:
      "A dynamic pressing movement that hits all three heads of the deltoid.",
    sets: [
      {
        id: 1,
        bestLift: null,
        weight: "10",
        reps: "10",
        isDone: false,
      },
      {
        id: 2,
        bestLift: null,
        weight: "12.5",
        reps: "8",
        isDone: false,
      },
      {
        id: 3,
        bestLift: null,
        weight: "15",
        reps: "6",
        isDone: false,
      },
    ],
  },
];

export default function HomeScreen() {
  const [workoutData, setWorkoutData] = useState([]);
  const [sidebarData, setSidebarData] = useState({ type: null, message: "" });
  useEffect(() => {
    setWorkoutData(data);
  }, []);

  const changeSetData = useCallback((exerciseIndex, setNumber, obj) => {
    setWorkoutData((prev) => {
      const data = [...prev];
      const oldValue = data[exerciseIndex].sets[setNumber];
      data[exerciseIndex].sets[setNumber] = {
        ...oldValue,
        ...obj,
        isDone: !oldValue.isDone,
      };
      return data;
    });
  }, []);
  const changeExerciseData = useCallback((exerciseIndex, obj) => {
    setWorkoutData((prev) => {
      const data = [...prev];
      const oldValue = data[exerciseIndex];
      data[exerciseIndex] = {
        ...oldValue,
        ...obj,
      };
      return data;
    });
  }, []);
  const deleteExercise = (exerciseIndex) => {
    setWorkoutData((prev) => {
      const previousData = [...prev];
      previousData.splice(exerciseIndex, 1);
      return previousData;
    });
  };
  const addSet = (exerciseIndex) => {
    setWorkoutData((prev) => {
      const previousData = [...prev];
      const obj = previousData[exerciseIndex];
      obj.sets.push({
        id: obj.sets.length + 1,
        bestLift: null,
        weight: "",
        reps: "",
        isDone: false,
      });
      return previousData;
    });
  };
  const deleteSet = (exerciseIndex, setIndex) => {
    setWorkoutData((prev) => {
      const previousData = [...prev];
      let sets = previousData[exerciseIndex].sets;
      sets = sets.splice(setIndex, 1);
      return previousData;
    });
  };

  const showSidebar = (type, message) => {
    setSidebarData({ type: type, message: message });
    setTimeout(() => {
      setSidebarData({ type: null, message: null });
    }, 2000);
  };

  const contextValue = {
    changeSetData,
    changeExerciseData,
    deleteExercise,
    addSet,
    deleteSet,
    showSidebar,
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 20 : 0,
      }}
      className="flex-1 px-5 min-w-full"
    >
      <ScrollView className="pt-4">
        <Text className="text-white text-4xl mt-5 mb-10">Shoulders</Text>
        {/* <Test /> */}
        <WorkoutContext value={contextValue}>
          {/* Exercise Card View */}
          {workoutData.map((exercise, index) => (
            <WorkoutExerciseCard
              key={exercise.id}
              index={index}
              exercise={exercise}
            />
          ))}
        </WorkoutContext>
      </ScrollView>
      {sidebarData.type && (
        <Snackbar type={sidebarData.type} message={sidebarData.message} />
      )}
    </SafeAreaView>
  );
}
