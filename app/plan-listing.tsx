// @ts-nocheck
import { Platform, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useCallback, useRef } from "react";
import { router } from "expo-router";
import PlanListingCard from "@/components/PlanListing/PlanListingCard";
import FloatingAddButton from "@/components/ui/FloatingAddButton";
import { ActionSheetRef } from "react-native-actions-sheet";
import AddPlanModal from "@/components/PlanListing/AddPlanModal";

import { useSelector, useDispatch } from "react-redux";
import {
  addPlanData,
  deletePlanData,
  modifyPlanData,
  setPlanID,
} from "@/store/slices/workoutSlice";

export default function PlanListing() {
  const addPlanModalRef = useRef<ActionSheetRef>(null);
  const openAddPlanModal = useCallback(() => {
    addPlanModalRef.current?.show();
  }, []);

  const planData = useSelector((state) => state.workout.data);
  const dispatch = useDispatch();
  const selectPlan = (index) => {
    dispatch(setPlanID(index));
    router.push("/workout-listing");
  };
  const addPlan = (name) => {
    const planObj = { name: name, sessions: [] };
    dispatch(addPlanData({ planObj }));
  };
  const modifyPlan = (planIndex, planObj) => {
    dispatch(modifyPlanData({ planID: planIndex, planObj: planObj }));
  };
  const deletePlan = (planIndex) => {
    dispatch(deletePlanData({ planID: planIndex }));
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 20 : 0,
      }}
      className="flex-1 px-5 min-w-full relative"
    >
      <ScrollView className="pt-4 px-2">
        <Text className="mt-5 mb-12 text-white text-5xl font-medium">
          Welcome
        </Text>
        <View className="mb-8 flex-row gap-4 items-center">
          <Text className="text-white text-4xl font-medium">Select a Plan</Text>
        </View>
        <View className="gap-8 mb-20">
          {planData.map((plan, index) => (
            // TODO: Change index to plan.id.
            <PlanListingCard
              key={`${plan.name}-${index}`}
              data={plan}
              planIndex={index}
              modifyPlan={modifyPlan}
              onPress={selectPlan}
              deletePlan={deletePlan}
            />
          ))}
        </View>
      </ScrollView>
      <FloatingAddButton onPress={openAddPlanModal} />
      <AddPlanModal ref={addPlanModalRef} addPlan={addPlan} />
    </SafeAreaView>
  );
}
