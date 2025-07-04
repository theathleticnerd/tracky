// @ts-nocheck
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useCallback, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import WorkoutListingCard from "@/components/WorkoutListing/WorkoutListingCard";
import AddWorkoutModal from "@/components/WorkoutListing/AddWorkoutModal";
import { ActionSheetRef } from "react-native-actions-sheet";
import WorkoutDetailsModal from "@/components/WorkoutListing/WorkoutDetailsModal";
import BackButton from "@/components/ui/BackButton";

export default function WorkoutListing() {
  const addWorkoutModalRef = useRef<ActionSheetRef>(null);
  const openAddWorkoutModal = () => {
    addWorkoutModalRef.current?.show();
  };

  const workoutDetailsModalRef = useRef<ActionSheetRef>(null);
  const openWorkoutDetailsModal = useCallback(() => {
    workoutDetailsModalRef.current?.show();
  }, []);
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
          <Text className="text-white text-4xl font-medium">
            5 Day Workout Plan
          </Text>
        </View>
        <View className="gap-8 mb-20">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((workout) => (
            <WorkoutListingCard
              key={workout}
              openWorkoutDetailsModal={openWorkoutDetailsModal}
            />
          ))}
        </View>
      </ScrollView>

      <Pressable
        className="bg-blue-500 w-auto absolute bottom-20 right-10 p-2 rounded-full"
        onPress={openAddWorkoutModal}
      >
        <Ionicons name="add" size={40} color="#f2f2f2" />
      </Pressable>
      <AddWorkoutModal ref={addWorkoutModalRef} />
      <WorkoutDetailsModal ref={workoutDetailsModalRef} />
    </SafeAreaView>
  );
}
