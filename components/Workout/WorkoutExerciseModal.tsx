import { WorkoutContext } from "@/components/Workout/WorkoutContext";
import React, { useContext, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function WorkoutExerciseModal(props) {
  const { name, description, exerciseIndex, modalVisible, toggleModal } = props;

  const workout = useContext(WorkoutContext);

  const [nameUI, setNameUI] = useState(name);
  const [descriptionUI, setDescriptionUI] = useState(description);

  const changeExerciseData = () => {
    workout.changeExerciseData(exerciseIndex, {
      name: nameUI,
      description: descriptionUI,
    });
    toggleModal();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // setModalVisible(!modalVisible);
        toggleModal();
      }}
    >
      <View className="flex-1 justify-center items-center">
        <View
          style={styles.modalView}
          className="m-10 bg-neutral-800 border  border-neutral-700 rounded-lg py-10 items-center w-10/12"
        >
          <View className="mb-8">
            <Text className="text-white mb-1">Exercise Name:</Text>
            <TextInput
              value={nameUI}
              className="bg-white/80 w-96 pl-2 rounded-lg h-12 text-lg"
              placeholder="Exercise Name"
              onChangeText={setNameUI}
            />
          </View>
          <View className="mb-8">
            <Text className="text-white mb-1">Description:</Text>
            <TextInput
              value={descriptionUI}
              style={{ textAlignVertical: "top" }}
              className="bg-white/80 w-96 pl-2 rounded-lg h-32 align-start text-lg"
              placeholder="Description"
              multiline
              onChangeText={setDescriptionUI}
            />
          </View>
          <Pressable
            className="rounded-lg w-40 py-2 bg-blue-500"
            onPress={() =>
              // setModalVisible(!modalVisible)/
              changeExerciseData()
            }
          >
            <Text className="text-white text-center bold">Save</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
