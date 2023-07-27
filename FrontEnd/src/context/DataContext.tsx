import React, { createContext, useContext, useState } from "react";

// 데이터 타입 정의
interface Data {
  youtubeLink: string;
  setYouTubeLink: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

// DataContext 생성
const DataContext = createContext<Data | undefined>(undefined);

// DataProvider 컴포넌트 생성
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [youtubeLink, setYouTubeLink] = useState("");
  const [userName, setUserName] = useState(
    `부기${Math.floor(Math.random() * 100)}`
  );

  const data: Data = {
    youtubeLink,
    setYouTubeLink,
    userName,
    setUserName,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

// 커스텀 훅 생성
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
