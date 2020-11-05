import React, { useState } from "react";
import FileUpload from "../../utils/FileUpload";
import "antd/dist/antd.css";
import { Form, Input, Button, Typography, Select } from "antd";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const UploadProductPage = () => {
    const [productName, setName] = useState("");
    const [productDescription, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [continent, setContinent] = useState("");

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
            <Form>
                {/* DropZone */}
                <FileUpload />
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
                <Button>제출</Button>
            </Form>
        </div>
    );
};

export default UploadProductPage;
