import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LiveStreamState {
  youtubeLink: string;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isFullScreen: boolean;
  isChatOpen: boolean;
  isVoteOpen: boolean;
  tourId: string | null;
  tourUID: string | null;
  // 음성 채팅
  isListening: boolean;
  // 투표 항목 1번, 2번
  option1: string | null;
  option2: string | null;
  // 투표 수
  option1Cnt: number;
  option2Cnt: number;
}

const initialState: LiveStreamState = {
  // userName: nickname ? nickname : `부기${Math.floor(Math.random() * 100)}`,
  youtubeLink: "",
  isAudioEnabled: true,
  isVideoEnabled: true,
  isFullScreen: false,
  isChatOpen: false,
  isVoteOpen: false,
  tourId: null,
  tourUID: null,
  isListening: false,
  option1: "1번 선택지",
  option2: "2번 선택지",
  option1Cnt: 0,
  option2Cnt: 0,
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
    setIsVoteOpen: (state, action: PayloadAction<boolean>) => {
      state.isVoteOpen = action.payload;
    },
    setTourId: (state, action: PayloadAction<string | null>) => {
      state.tourId = action.payload;
    },
    setTourUID: (state, action: PayloadAction<string | null>) => {
      state.tourUID = action.payload;
    },
    setIsListening: (state, action: PayloadAction<boolean>) => {
      state.isListening = action.payload;
    },
    setOption1: (state, action: PayloadAction<string | null>) => {
      state.option1 = action.payload;
    },
    setOption2: (state, action: PayloadAction<string | null>) => {
      state.option2 = action.payload;
    },
    // 투표 값을 1씩 늘림
    setOption1Cnt: (state, action: PayloadAction<number>) => {
      state.option1Cnt += action.payload;
    },
    setOption2Cnt: (state, action: PayloadAction<number>) => {
      state.option2Cnt += action.payload;
    },
    // 투표 값 초기화
    setNewOption1Cnt: (state, action: PayloadAction<number>) => {
      state.option1Cnt = action.payload;
    },
    setNewOption2Cnt: (state, action: PayloadAction<number>) => {
      state.option2Cnt = action.payload;
    },
    addVoteToBoard: (state, action: PayloadAction<any>) => {
      state.voteBoard = [...state.voteBoard, action.payload.data];
    },
  },
});

export const {
  setYoutubeLink,
  setIsAudioEnabled,
  setIsVideoEnabled,
  setIsFullScreen,
  setIsChatOpen,
  setIsVoteOpen,
  setTourId,
  setTourUID,
  setIsListening,
  setOption1,
  setOption2,
  setOption1Cnt,
  setOption2Cnt,
  setNewOption1Cnt,
  setNewOption2Cnt,
} = LiveStreamSlice.actions;
export default LiveStreamSlice.reducer;
