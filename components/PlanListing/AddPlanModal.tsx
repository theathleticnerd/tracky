// @ts-nocheck
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import { TextInput } from "react-native-gesture-handler";

export default function AddPlanModal({ ref, ...props }) {
  const { addPlan } = props;
  const [planName, setPlanName] = useState("");
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
  const createPlan = () => {
    const isValid = validatePlanData();
    if (isValid) {
      addPlan(planName);
      ref.current.hide();
      setPlanName("");
    } else {
    }
  };
  return (
    <ActionSheet ref={ref}>
      <View className="px-6 pt-12 pb-20 bg-neutral-800">
        <Text className="text-primary text-3xl font-semibold mb-6">
          Create a new plan
        </Text>

        <View>
          <Text className="text-primary text-lg font-semibold mb-2">Name:</Text>
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
        <Pressable
          className="rounded-lg py-3.5 mt-12 bg-blue-600"
          onPress={createPlan}
        >
          <Text className="text-primary text-center text-xl font-bold">
            Create Workout
          </Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({});
