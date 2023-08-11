import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LiveStreamState {
  youtubeLink: string;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isFullScreen: boolean;
  isChatOpen: boolean;
  tourId: string | null;
  tourUID: string | null;
  stompClient: any;
}

const initialState: LiveStreamState = {
  // userName: nickname ? nickname : `부기${Math.floor(Math.random() * 100)}`,
  youtubeLink: "",
  isAudioEnabled: true,
  isVideoEnabled: true,
  isFullScreen: false,
  isChatOpen: true,
  tourId: null,
  tourUID: null,
  stompClient: null,
};

const LiveStreamSlice = createSlice({
  name: "liveStream",
  initialState,
  reducers: {
    setYoutubeLink: (state, action: PayloadAction<string>) => {
      state.youtubeLink = action.payload;
    },
    setIsAudioEnabled: (state, action: PayloadAction<boolean>) => {
      state.isAudioEnabled = action.payload;
    },
    setIsVideoEnabled: (state, action: PayloadAction<boolean>) => {
      state.isVideoEnabled = action.payload;
    },
    setIsFullScreen: (state, action: PayloadAction<boolean>) => {
      state.isFullScreen = action.payload;
    },
    setIsChatOpen: (state, action: PayloadAction<boolean>) => {
      state.isChatOpen = action.payload;
    },
    setTourId: (state, action: PayloadAction<string | null>) => {
      state.tourId = action.payload;
    },
    setTourUID: (state, action: PayloadAction<string | null>) => {
      state.tourUID = action.payload;
    },
    setStompClient: (state, action: PayloadAction<any | null>) => {
      state.stompClient = action.payload;
    },
  },
});

export const {
  setYoutubeLink,
  setIsAudioEnabled,
  setIsVideoEnabled,
  setIsFullScreen,
  setIsChatOpen,
  setTourId,
  setTourUID,
  setStompClient,
} = LiveStreamSlice.actions;
export default LiveStreamSlice.reducer;
