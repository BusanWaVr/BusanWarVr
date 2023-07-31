import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TourCourseInfo = {
  lon: number;
  lat: number;
  title: string;
  content: string;
  image: any;
};

interface TourCourseState {
  courses: TourCourseInfo[];
}

const initialState: TourCourseState = {
  courses: [],
};

const tourCourseSlice = createSlice({
  name: "tourCourse",
  initialState,
  reducers: {
    setCourses(
      state,
      action: PayloadAction<{ index: number; course: TourCourseInfo }>
    ) {
      const { index, course } = action.payload;
      state.courses[index] = course;
    },
  },
});

export const { setCourses } = tourCourseSlice.actions;
export default tourCourseSlice.reducer;
