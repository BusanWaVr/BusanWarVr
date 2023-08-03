type TourImageUploadProps = {
  imageNum: number;
  setImageNum: (value: number) => void;
  imageFiles: File[];
  setImageFiles: (value: File[]) => void;
};

const TourImageUpload: React.FC<TourImageUploadProps> = ({
  imageNum,
  setImageNum,
  imageFiles,
  setImageFiles,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedImages = Array.from(files)[0];
    setImageFiles([...imageFiles, selectedImages]);
    if (imageNum < 3) {
      setImageNum(imageNum + 1);
    }
  };

  return (
    <>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />
    </>
  );
};

export default TourImageUpload;
