import { API_BASE_URL } from "../../utils/Env";
import { PlusCircleOutlined } from "@ant-design/icons";
import { message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useField } from "formik";

const FileInput = (props) => {
  const { name, placeholder, data } = props;
  const [, { value }, { setValue }] = useField(name);

  const uploadProps = {
    name: "file",
    data,
    multiple: true,
    action: `${API_BASE_URL}/api/pet/fileupload/public-upload`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // Handle non-uploading states if necessary
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);

        setValue([...value, info.file.response.imagePath]);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Dragger
    multiple={false}
    style={{
      marginBottom: "10px",
      border: "1.5px dashed #1890ff",
      borderRadius: "5px",
      padding: "5px",
      transition: "border-color 0.11s ease-in-out",
    }}
    {...uploadProps} >
      <PlusCircleOutlined style={{ fontSize: '38px', color: '#40a9ff' , opacity:"0.7", textalign:"center"}} />
      <p className="ant-upload-text">{placeholder || "Add an Attachment"}</p>
    </Dragger>
  );
};

export default FileInput;
