import { configureStore } from "@reduxjs/toolkit";
import workoutSlice from "@/store/slices/workoutSlice";

const store = configureStore({
  reducer: {
    workout: workoutSlice,
  },
});

export default store;
