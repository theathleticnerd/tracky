import { createSlice } from "@reduxjs/toolkit";
import data from "@/data/data.json";

const initialState = {
  data: data,
  planID: 0,
  workoutID: 0,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setPlanID: (state, action) => {
      state.planID = action.payload;
    },
    setWorkoutID: (state, action) => {
      state.workoutID = action.payload;
    },
    // Plan
    addPlanData: (state, action) => {
      const { planObj } = action.payload;
      const data = state.data;
      data.push(planObj);
    },
    modifyPlanData: (state, action) => {
      const { planID, planObj } = action.payload;
      const data = state.data;
      data[planID].name = planObj.name;
    },
    deletePlanData: (state, action) => {
      const { planID } = action.payload;
      const data = state.data;
      data.splice(planID, 1);
    },
    // Workout
    addWorkoutData: (state, action) => {
      const { workoutObj } = action.payload;

      const planID = state.planID;
      const planData = state.data[planID].sessions;
      // Add new ID
      // TODO: Include ids to sessions.

      planData.push(workoutObj);
    },
    modifyWorkoutData: (state, action) => {
      const { workoutID, workoutObj } = action.payload;
      const planID = state.planID;
      const planData = state.data[planID].sessions;
      planData[workoutID].name = workoutObj.name;
      planData[workoutID].description = workoutObj.description;
    },
    deleteWorkoutData: (state, action) => {
      const { workoutID } = action.payload;
      const planID = state.planID;
      const planData = state.data[planID].sessions;
      planData.splice(workoutID, 1);
    },
    // Exercise
    addExerciseData: (state, action) => {
      const { exerciseObj } = action.payload;
      const planID = state.planID;
      const workoutID = state.workoutID;
      const exerciseData = state.data[planID].sessions[workoutID].exercises;
      // Add new ID
      const newID = exerciseData.length
        ? exerciseData[exerciseData.length - 1].id + 1
        : 0;
      exerciseObj.id = newID;

      exerciseData.push(exerciseObj);
    },
    modifyExerciseData: (state, action) => {
      const { exerciseIndex, exerciseObj } = action.payload;
      const planID = state.planID;
      const workoutID = state.workoutID;
      const exerciseData = state.data[planID].sessions[workoutID].exercises;
      exerciseData[exerciseIndex].name = exerciseObj.name;
      exerciseData[exerciseIndex].description = exerciseObj.description;
    },
    deleteExerciseData: (state, action) => {
      const { exerciseIndex } = action.payload;
      const planID = state.planID;
      const workoutID = state.workoutID;
      const exerciseData = state.data[planID].sessions[workoutID].exercises;
      exerciseData.splice(exerciseIndex, 1);
    },
    // Sets
    addSetData: (state, action) => {
      const { exerciseIndex, setObj } = action.payload;
      const planID = state.planID;
      const workoutID = state.workoutID;
      const setData =
        state.data[planID].sessions[workoutID].exercises[exerciseIndex].sets;
      // Add id to setObj
      const newID = setData.length ? setData[setData.length - 1].id + 1 : 0;
      setObj.id = newID;

      setData.push(setObj);
    },
    modifySetData: (state, action) => {
      const { exerciseIndex, setIndex, setObj } = action.payload;
      const planID = state.planID;
      const workoutID = state.workoutID;
      const setData =
        state.data[planID].sessions[workoutID].exercises[exerciseIndex].sets;

      // Check if best lift => if new weight is greater than previously recorded best lift
      if (setObj.weight > setData[setIndex].weight) {
      }

      setData[setIndex].weight = setObj.weight;
      setData[setIndex].reps = setObj.reps;
      setData[setIndex].isDone = setObj.isDone;
    },
    deleteSetData: (state, action) => {
      const { exerciseIndex, setIndex } = action.payload;
      const planID = state.planID;
      const workoutID = state.workoutID;
      const setData =
        state.data[planID].sessions[workoutID].exercises[exerciseIndex].sets;
      setData.splice(setIndex, 1);
    },
  },
});

export default workoutSlice.reducer;
export const {
  setPlanID,
  setWorkoutID,
  addPlanData,
  modifyPlanData,
  deletePlanData,
  addWorkoutData,
  modifyWorkoutData,
  deleteWorkoutData,
  addExerciseData,
  modifyExerciseData,
  deleteExerciseData,
  addSetData,
  modifySetData,
  deleteSetData,
} = workoutSlice.actions;
