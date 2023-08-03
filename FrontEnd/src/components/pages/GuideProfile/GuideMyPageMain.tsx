import GuideMyPage from "./GuideMyPage";
import GuideMyPageRestriction from "./GuideMyPageRestriction";
import { useSelector } from "react-redux";

const GuideMyPageMain = () => {
  const { userId } = useSelector((state: any) => state.userInfo);
  console.log(userId);

  const extractUserIdFromURL = (): string | null => {
    const urlParts = window.location.href.split("/");
    const userIdIndex = urlParts.indexOf("guide") + 1;
    if (userIdIndex < urlParts.length) {
      return urlParts[userIdIndex];
    }
    return null;
  };

  const urlUserId = extractUserIdFromURL();

  return (
    <div>
      <h1>업데이트페이지</h1>
      {/* userId와 urlUserId 비교하여 페이지 표시 */}
      {userId === urlUserId ? <GuideMyPage /> : <GuideMyPageRestriction />}
    </div>
  );
};

export default GuideMyPageMain;
