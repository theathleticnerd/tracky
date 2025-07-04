import { Platform, SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useCallback, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import PlanListingCard from "@/components/PlanListing/PlanListingCard";
import FloatingAddButton from "@/components/ui/FloatingAddButton";
import { ActionSheetRef } from "react-native-actions-sheet";
import AddPlanModal from "@/components/PlanListing/AddPlanModal";

export default function PlanListing() {
  const addPlanModalRef = useRef<ActionSheetRef>(null);
  const openAddPlanModal = useCallback(() => {
    addPlanModalRef.current?.show();
  }, []);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 20 : 0,
      }}
      className="flex-1 px-5 min-w-full relative"
    >
      <ScrollView className="pt-4 px-2">
        <View className="mt-5 mb-8 flex-row gap-4 items-center">
          <Text className="text-white text-4xl font-medium">Select a Plan</Text>
        </View>
        <View className="gap-8 mb-20">
          {[1, 2].map((workout) => (
            <PlanListingCard key={workout} />
          ))}
        </View>
      </ScrollView>
      <FloatingAddButton onPress={openAddPlanModal} />
      <AddPlanModal ref={addPlanModalRef} />
    </SafeAreaView>
  );
}
