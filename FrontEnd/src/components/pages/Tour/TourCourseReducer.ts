import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TourCourseState {
  lon: number | null;
  lat: number | null;
  title: string;
  content: string;
  image: any;
  courses: TourCourseInfo[];
}

const initialState: TourCourseState = {
  lon: 128.85357686495757,
  lat: 35.096171208475724,
  title: "",
  content: "",
  image: "",
  courses: [],
};

const tourCourseSlice = createSlice({
  name: "tourCourse",
  initialState,
  reducers: {
    setLongitude(state, action: PayloadAction<number>) {
      state.lon = action.payload;
    },
    setLatitude(state, action: PayloadAction<number>) {
      state.lat = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setContent(state, action: PayloadAction<string>) {
      state.content = action.payload;
    },
    setImage(state, action: PayloadAction<any>) {
      state.image = action.payload;
    },
  },
});

export const { setLongitude, setLatitude, setTitle, setContent, setImage } =
  tourCourseSlice.actions;
export default tourCourseSlice.reducer;
