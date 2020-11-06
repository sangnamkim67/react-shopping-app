import React, { useState } from "react";
import FileUpload from "../../utils/FileUpload";
import "antd/dist/antd.css";
import { Form, Input, Button, Typography, Select } from "antd";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const UploadProductPage = (props) => {
    const [productName, setName] = useState("");
    const [productDescription, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [continent, setContinent] = useState("");
    const [images, setImages] = useState([]);

    const Continents = [
        { key: 1, value: "Asia" },
        { key: 2, value: "Europe" },
        { key: 3, value: "North America" },
        { key: 4, value: "South America" },
        { key: 5, value: "Australia" },
        { key: 6, value: "Africa" },
    ];
    const handleName = (e) => {
        setName(e.currentTarget.value);
    };
    const handleDescription = (e) => {
        setDescription(e.currentTarget.value);
    };
    const handlePrice = (e) => {
        setPrice(e.currentTarget.value);
    };
    const handleSelect = (value) => {
        setContinent(value);
    };
    const updateImages = (images) => {
        setImages(images);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !productName ||
            !productDescription ||
            !price ||
            !continent ||
            !images
        ) {
            return alert("모든 값을 입력하셔야 됩니다.");
        }

        const body = {
            writer: props.user.userData._id,
            title: productName,
            description: productDescription,
            continent: continent,
            price: price,
            images: images,
        };

        axios.post("/api/products", body).then((res) => {
            if (res.data.success) {
                alert("상품 업로드에 성공 했습니다.");
                props.history.push("/");
            } else {
                alert("상품 업로드에 실패 했습니다.");
            }
        });
    };

    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "2rem auto",
            }}
        >
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <Title level={2}>여행 상품 업로드</Title>
            </div>
            <Form onSubmit={handleSubmit}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>상품명</label>
                <Input onChange={handleName} value={productName} />
                <br />
                <br />
                <label>상품설명</label>
                <TextArea
                    onChange={handleDescription}
                    value={productDescription}
                />
                <br />
                <br />
                <label>가격($)</label>
                <Input onChange={handlePrice} value={price} />
                <br />
                <br />
                <label>지역</label>
                <br />
                <Select
                    style={{ width: 140 }}
                    onChange={handleSelect}
                    value={continent}
                >
                    {Continents.map((continent) => {
                        return (
                            <Option key={continent.key} value={continent.value}>
                                {continent.value}
                            </Option>
                        );
                    })}
                </Select>
                <br />
                <br />
                <Button type="primary" htmlType="submit">
                    제출
                </Button>
            </Form>
        </div>
    );
};

export default UploadProductPage;
