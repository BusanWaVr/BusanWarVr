import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type wishTour = {
  category: string[];
  currentMember: Number;
  guide: { id: Number; name: string };
  maxMember: Number;
  startDate: string;
  title: string;
  tourId: string;
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [] as wishTour[],
  reducers: {
    setWishlist: (state, action: PayloadAction<wishTour[]>) => {
      return action.payload;
    },
    addToWishlist: (state, action: PayloadAction<wishTour>) => {
      state.push(action.payload);
    },
    removeFromWishlist: (state, action: PayloadAction<wishTour>) => {
      return state.filter(
        (tour) => JSON.stringify(tour) === JSON.stringify(action.payload)
      );
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
