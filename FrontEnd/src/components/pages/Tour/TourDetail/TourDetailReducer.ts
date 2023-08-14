import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TourDetailState {
  reviewData: any;
  commentData: any;
}

const initialState: TourDetailState = {
  reviewData: null,
  commentData: null,
};

const TourDetailSlice = createSlice({
  name: "tourDetail",
  initialState,
  reducers: {
    setReviewData: (state, action: PayloadAction<any>) => {
      state.reviewData = action.payload;
    },
    setCommentData: (state, action: PayloadAction<any>) => {
      state.commentData = action.payload;
    },
  },
});

export const { setReviewData, setCommentData } = TourDetailSlice.actions;
export default TourDetailSlice.reducer;
