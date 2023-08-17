import { Card, CardHeader, CardFooter, Image, Chip } from "@nextui-org/react";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const MainTourCard = ({ tour, index, t }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <>
      <Card
        key={index}
        isFooterBlurred
        className="w-[250px] h-[300px] bg-zinc-800"
        style={{ minWidth: "250px" }}
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <div className="w-full flex justify-between items-center">
            <p className="text-xs text-gray-200">
              {formatDate(tour.startDate)}
            </p>
          </div>

          <h4 className="text-black font-medium text-lg/5 text-left mb-1 text-white">
            {tour.title}
          </h4>
          <div className="mb-2 opacity-80">
            {tour.category.map(
              (c, i) =>
                i < 3 && (
                  <span
                    key={i}
                    className="p-1 px-2 mr-1 text-xs font-semibold text-blue-700 bg-sky-100 rounded-full border-1 border-blue-500"
                  >
                    #{c}
                  </span>
                )
            )}
          </div>
        </CardHeader>
        <Link to={`/tour/${tour.tourId}`} className="h-full">
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover data-[loaded=true]:opacity-50"
            src={
              tour.tourImgs.length != 0
                ? tour.tourImgs[0]
                : "https://datacdn.ibtravel.co.kr/files/2023/05/09182530/226b2f068fe92fe9e423f7f17422d994_img-1.jpeg"
            }
          />
        </Link>
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 block flex justify-between">
          <div></div>
          <Chip size="sm" color="primary" variant="solid">
            <span className="text-xs flex items-center gap-1">
              <TeamOutlined />
              <div>
                {tour.currentMember} / {tour.maxMember}
              </div>
            </span>
          </Chip>
        </CardFooter>
      </Card>
    </>
  );
};

export default MainTourCard;
