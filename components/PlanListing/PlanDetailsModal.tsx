// @ts-nocheck
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import ActionSheet from "react-native-actions-sheet";

export default function PlanDetailsModal(props) {
  const { ref, data, planIndex, modifyPlan, deletePlan } = props;
  const [planName, setPlanName] = useState(data.name);
  const [errorMessages, setErrorMessages] = useState({});
  const validatePlanData = () => {
    setErrorMessages({});
    if (!planName) {
      const errorMessage = "Please add a plan name.";
      setErrorMessages((prev) => ({ ...prev, planName: errorMessage }));
      return false;
    }
    if (planName.length < 3) {
      const errorMessage = "Plan name should be at least 3 characters.";
      setErrorMessages((prev) => ({ ...prev, planName: errorMessage }));
      return false;
    }

    return true;
  };
  const changePlan = () => {
    if (planName === data.name) {
      // If no changes...just close the modal
      ref.current.hide();
    }

    const isValid = validatePlanData();
    if (isValid) {
      const planObj = {
        name: planName,
      };
      modifyPlan(planIndex, planObj);
      ref.current.hide();
    } else {
    }
  };
  return (
    <ActionSheet ref={ref}>
      <View className="px-6 pt-10 pb-20 bg-neutral-800">
        <Text className="text-white text-3xl font-semibold mb-4">
          {data.name}
        </Text>
        <View>
          <Text className="text-white text-lg font-semibold mb-2">Name:</Text>
          <TextInput
            value={planName}
            className="bg-white pl-2 rounded-lg h-16 text-xl font-medium"
            placeholder="Push Pull Legs"
            onChangeText={setPlanName}
          />
          {errorMessages.planName ? (
            <Text className="text-red-600 mt-2 font-medium">
              {errorMessages.planName}
            </Text>
          ) : (
            ""
          )}
        </View>
        <TouchableOpacity
          className="mt-12 flex-row py-4 px-2 rounded-lg bg-red-900/20 border border-red-600"
          onPress={() => deletePlan(planIndex)}
        >
          <Ionicons name="trash" size={24} color="#dc2626" className="mr-4" />
          <Text className="text-red-600 text-2xl font-semibold">
            Delete Exercise
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-24 rounded-lg py-3.5 bg-blue-600">
          <Text
            className="text-white text-center text-xl font-bold"
            onPress={changePlan}
          >
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
}
