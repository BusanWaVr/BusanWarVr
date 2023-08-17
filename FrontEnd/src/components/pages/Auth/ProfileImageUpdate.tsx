import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { toast } from "react-toastify";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ProfileImageUpload: React.FC = ({
  selectedImageFile,
  handleImageChange,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (selectedImageFile && selectedImageFile != "") {
      setFileList([
        {
          uid: "1",
          name: URL.createObjectURL(selectedImageFile).split("/").pop(),
          status: "done",
          url: URL.createObjectURL(selectedImageFile),
          originFileObj: selectedImageFile,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [selectedImageFile]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const isAllValid = newFileList.every((file) => {
      const filetype = file.name.split(".")[1].toLowerCase();
      return filetype === "jpg" || filetype === "png" || filetype === "jpeg";
    });

    if (!isAllValid) {
      toast.warning("JPG, PNG, JPEG의 이미지 파일만 선택 가능합니다.");
      return;
    }

    setFileList(newFileList);
    handleImageChange(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        accept=".jpg,.png,.jpeg,.JPG,.PNG,.JPEG"
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={(files) => handleChange(files)}
      >
        {fileList.length == 1 ? null : uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ProfileImageUpload;
