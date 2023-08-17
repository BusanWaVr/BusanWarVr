import react from "react";
import boogiemung from "../../../assets/boogie_mung.png";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <img
          src={boogiemung}
          alt="Boogie Mung"
          style={{ width: "300px", height: "300px", borderRadius: "50%" }}
        />
        <p className="mt-5">페이지를 찾을 수 없습니다.</p>
      </div>
    </div>
  );
}

export default NotFound;
