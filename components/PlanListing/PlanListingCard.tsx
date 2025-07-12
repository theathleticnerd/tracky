// @ts-nocheck
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PlanDetailsModal from "@/components/PlanListing/PlanDetailsModal";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import TouchableCard from "@/components/ui/TouchableCard";

export default function PlanListingCard(props) {
  const { data, planIndex, modifyPlan, deletePlan, onPress } = props;
  const planDetailsModalRef = useRef<ActionSheetRef>(null);
  const openPlanDetailsModal = () => {
    planDetailsModalRef.current?.show();
  };

  return (
    <>
      <TouchableCard
        className="flex-row items-start"
        onPress={onPress}
        onLongPress={openPlanDetailsModal}
      >
        <View className="flex-1">
          <Text className="mb-4 text-2xl text-primary font-bold">
            {data.name}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-primary font-semibold text-lg gap-4">
              {data.sessions.length} Sessions
            </Text>
            <Text className="text-primary font-semibold text-2xl gap-4">•</Text>
            <Text className="text-primary font-semibold text-lg gap-4">
              0 Exercises
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward-circle" size={35} color="lightgray" />
      </TouchableCard>
      <PlanDetailsModal
        ref={planDetailsModalRef}
        data={data}
        planIndex={planIndex}
        modifyPlan={modifyPlan}
        deletePlan={deletePlan}
      />
    </>
  );
}
