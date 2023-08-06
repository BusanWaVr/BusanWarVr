import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import TourListCard from "../../blocks/TourListCard";


function TourBoard() {

    const [tourListData, setTourListData] = useState(null);
    
    useEffect(() => {
const fetchData = async () => {
        try {
          const response = await fetch(
            `http://52.79.93.203/tour`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            console.log("투어데이터 받았어요");
            const data = await response.json();
            setTourListData(data.data.tourDtoList);
            console.log("부모에서 넘겨주고 있음", data.data.tourDtoList);
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [])

    

  return (
    <div>
        <h1>투어 목록 페이지</h1>
        <TourListCard TourData={tourListData}/>
    </div>
  );
}

export default TourBoard;
