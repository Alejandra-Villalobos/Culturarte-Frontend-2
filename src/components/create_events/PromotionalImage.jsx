import React from "react";
import { FileImageFilled } from "@ant-design/icons";
import { message, Upload } from "antd";
import { addImage } from "../../services/Image";

const { Dragger } = Upload;
const token = localStorage.getItem("token");

function PromotionalImage() {
  const handleUpload = (file) => {
    addImage(file, token)
      .then((response) => {
        message.success(`${file.name} file uploaded successfully.`);
        localStorage.setItem("Image", response);
      })
      .catch((error) => {
        message.error(
          `${file.name} file upload failed. Error: ${error.message}`
        );
      });
  };

  const beforeUpload = (file) => {
    handleUpload(file);
    return false; // Evita la subida automática del archivo
  };

  return (
    <div
      className="bg-gray-200 p-2 rounded w-60 h-28"
      style={{ background: "#d9d9d9" }}
    >
      <Dragger
        name="file"
        multiple={false}
        headers={{
          authorization: "authorization-text",
        }}
        listType="picture"
        accept=".png,.jpeg,.gif,.jpg"
        beforeUpload={beforeUpload}
        onDrop={(e) => console.log("Dropped files", e.dataTransfer.files)}
        style={{ borderColor: "#707070", height: "100%", width: "100%" }}
      >
        <div className="flex justify-around items-center">
          <div className="bg-sky-950 rounded-md p-3 text-white">
            <p>SELECT</p>
            <p>IMAGE</p>
          </div>
          <p className="ant-upload-drag-icon font-montserrat">
            <FileImageFilled style={{ color: "#707070" }} />
          </p>
        </div>
      </Dragger>
    </div>
  );
}

export default PromotionalImage;
