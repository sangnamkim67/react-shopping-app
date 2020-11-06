import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import "antd/dist/antd.css";
import { Icon } from "antd";

const FileUpload = (props) => {
    const [images, setImages] = useState([]);

    const handleDrop = (acceptedFiles) => {
        const formData = new FormData();
        const config = {
            header: { "content-type": "multipart/fomr-data" },
        };
        formData.append("file", acceptedFiles[0]);

        axios.post("/api/products/image", formData, config).then((res) => {
            if (res.data.success) {
                // 저장
                setImages([...images, res.data.filePath]);
                props.refreshFunction([...images, res.data.filePath]);
            } else {
                alert("파일 업로드 실패");
            }
        });
    };
    const onDelete = (e) => {
        let newImages = [...images];
        newImages.splice(e.currentTarget.id, 1);
        setImages(newImages);
        props.refreshFunction(newImages);
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            style={{
                                width: "300px",
                                height: "240px",
                                border: "1px solid lightgray",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: "3rem" }} />
                        </div>
                    </section>
                )}
            </Dropzone>
            <div
                style={{
                    display: "flex",
                    width: "300px",
                    height: "260px",
                    overflowX: "scroll",
                }}
            >
                {images.map((image, index) => {
                    return (
                        <div key={index} id={index} onClick={onDelete}>
                            <img
                                style={{
                                    minWidth: "300px",
                                    width: "300px",
                                    height: "240px",
                                }}
                                src={`http://localhost:5000/${image}`}
                                alt={image}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FileUpload;
