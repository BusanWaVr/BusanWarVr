import React from "react";

type TourImageUploadProps = {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
};

const TourImageUpload: React.FC<TourImageUploadProps> = ({
  imageFile,
  setImageFile,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedImage = files[0];
    setImageFile(selectedImage);
  };

  const handleImageDelete = () => {
    setImageFile(null);
  };

  return (
    <>
      {typeof imageFile != "string" && imageFile ? (
        <div>
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Tour Image"
            style={{ maxWidth: "200px" }}
          />
          <button onClick={handleImageDelete}>Delete</button>
        </div>
      ) : (
        <input type="file" accept="image/*" onChange={handleImageChange} />
      )}
    </>
  );
};

export default TourImageUpload;
