type TourImageUploadProps = {
  imageFiles: File[];
  setImageFiles: (value: File[]) => void;
};

const TourImageUpload: React.FC<TourImageUploadProps> = ({
  imageFiles,
  setImageFiles,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedImages = Array.from(files)[0];
    setImageFiles([...imageFiles, selectedImages]);
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
