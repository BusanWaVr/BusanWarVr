import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TourCourseInfo = {
  lon: number;
  lat: number;
  title: string;
  content: string;
  image: any;
  imageFile: File | null,
};

interface TourCourseState {
  courses: TourCourseInfo[];
}

const initialState: TourCourseState = {
  courses: [{ lon: 0, lat: 0, title: "", content: "", image: null, imageFile: null}],
};

const tourCourseSlice = createSlice({
  name: "tourCourse",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<{ index: number; title: string }>) {
      const { index, title } = action.payload;
      state.courses[index].title = title;
    },
    setLongitude(state, action: PayloadAction<{ index: number; lon: number }>) {
      const { index, lon } = action.payload;
      state.courses[index].lon = lon;
    },
    setLatitude(state, action: PayloadAction<{ index: number; lat: number }>) {
      const { index, lat } = action.payload;
      state.courses[index].lat = lat;
    },
    setContent(
      state,
      action: PayloadAction<{ index: number; content: string }>
    ) {
      const { index, content } = action.payload;
      state.courses[index].content = content;
    },
    setImage(state, action: PayloadAction<{ index: number; image: string }>) {
      const { index, image } = action.payload;
      state.courses[index].image = image;
    },
    setCourses(state, action: PayloadAction<TourCourseInfo>) {
      const course = action.payload;
      state.courses = [...state.courses, course];
    },
    setImageFile(state, action: PayloadAction<{ index: number; imageFile: File | null }>) {
      const { index, imageFile } = action.payload;
      state.courses[index].imageFile = imageFile;
    },
  },
});

export const {
  setTitle,
  setContent,
  setImage,
  setLatitude,
  setLongitude,
  setCourses,
  setImageFile,
} = tourCourseSlice.actions;
export default tourCourseSlice.reducer;
