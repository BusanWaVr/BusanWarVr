import React, { useState } from "react";
import axios from "axios";

interface EditProfileProps {
  // 필요한 다른 프롭스들을 여기에 추가하세요
}

function GeneralUpdate(props: EditProfileProps) {
  const [name, setName] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isNickname, setIsNickname] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const [categoryMessage, setCategoryMessage] = useState(""); // 카테고리 메시지

  // 카테고리
  const MaxAllowedCategories = 5;
  const MinRequiredCategories = 3;
  const categoriesList = [
    { name: "힐링", label: "힐링" },
    { name: "액티비티", label: "액티비티" },
    { name: "체험", label: "체험" },
    { name: "도보", label: "도보" },
    { name: "캠핑", label: "캠핑" },
    { name: "호캉스", label: "호캉스" },
    { name: "맛집", label: "맛집" },
    { name: "도시", label: "도시" },
    { name: "자연", label: "자연" },
    { name: "문화", label: "문화" },
    { name: "쇼핑", label: "쇼핑" },
    { name: "역사", label: "역사" },
    { name: "축제", label: "축제" },
    { name: "핫플", label: "핫플" },
    { name: "카페", label: "카페" },
  ];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCategory, setIsCategory] = useState(false);

  const handleCategoryChange = (category: string) => {
    const updatedCategories = [...selectedCategories] as string[];
    const categoryIndex = updatedCategories.indexOf(category);

    if (categoryIndex > -1) {
      updatedCategories.splice(categoryIndex, 1);
    } else {
      if (updatedCategories.length < MaxAllowedCategories) {
        updatedCategories.push(category);
      }
    }

    setSelectedCategories(updatedCategories);

    if (updatedCategories.length < MinRequiredCategories) {
      setCategoryMessage("카테고리는 최소 3개 이상 선택해 주세요.");
      setIsCategory(false);
    } else if (updatedCategories.length > MaxAllowedCategories) {
      setCategoryMessage("");
      setIsCategory(false);
    } else {
      setCategoryMessage("");
      setIsCategory(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      setSelectedImageFile(imageFile); // 이미지 파일을 selectedImageFile로 설정
      setSelectedImage(URL.createObjectURL(imageFile));
    }
    console.log(selectedImage);
  };

  async function handleSubmitName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const requestBody = {
        nickname: name,
      };
      console.log(requestBody);
      const response = await fetch("http://52.79.93.203/auth/nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log(response);
      const data = await response.json();

      if (data.code === "200") {
        setNicknameMessage("사용 가능한 닉네임입니다.");
        setIsNickname(true);
      } else if (data.status === "409") {
        setNicknameMessage("중복된 닉네임입니다. 다른 닉네임을 사용해 주세요.");
        setIsNickname(false);
      } else {
        setNicknameMessage("죄송합니다. 잠시 후 다시 시도해 주세요.");
        setIsNickname(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSave = async () => {
    try {
      const categoriesString = selectedCategories.join(",");

      const formData = new FormData();
      formData.append("nickname", name);
      formData.append("category", categoriesString);
      console.log(formData);
      // 이미지를 선택한 경우에만 FormData에 추가
      if (selectedImageFile) {
        formData.append("profileImg", selectedImageFile);
      }

      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.put("http://52.79.93.203/user", formData, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("response", response.data);
      console.log("저장되었습니다!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmitName}>
          <label>
            닉네임:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <button type="submit">닉네임 확인</button>
        </form>
        <p>{nicknameMessage}</p>
      </div>
      <div>
        <div className="form-el">
          <label>관심 카테고리를 선택해주세요. (최소 3개, 최대 5개)</label>{" "}
          <p>{categoryMessage}</p>
          <br />
          {categoriesList.map((category, index) => (
            <React.Fragment key={category.name}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                />
                {category.label}
              </label>{" "}
              {index % 5 === 4 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div>
        <form>
          <label>프로필 이미지 업로드:</label>
          <input type="file" onChange={handleImageUpload} accept="image/*" />
        </form>
        {selectedImage && (
          <div>
            <p>미리보기:</p>
            <img
              src={selectedImage}
              alt="Uploaded"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        )}
      </div>
      <div>
        <button onClick={handleSave}>저장하기</button>
      </div>
    </div>
  );
}

export default GeneralUpdate;
