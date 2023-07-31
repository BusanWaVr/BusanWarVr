// types.ts

export interface ScheduledTour {
  tourId: number;
  title: string;
  image: string;
  isLiked: boolean;
}

export interface endedTour {
  tourId: number;
  title: string;
  image: string;
  isLiked: boolean;
}

export interface Review {
  tourId: number;
  tourTitle: string;
  date: string;
  content: string;
  score: number;
  user: {
    userId: number;
    nickname: string;
  };
}

export interface GuideData {
  userId: string | null;
  nickname: string;
  profileImg: string;
  isFollowing: boolean;
  followers: number;
  toursCount: number;
  introduction: string;
  scheduledTours: ScheduledTour[];
  endedTours: ScheduledTour[];
  reviews: Review[];
}
