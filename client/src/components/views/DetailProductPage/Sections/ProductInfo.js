import React from "react";
import { Descriptions, Button } from "antd";

const ProductInfo = (props) => {
    const handleClick = () => {
        alert("asdasd");
    };

    return (
        <div>
            <Descriptions title="Product Info" bordered>
                <Descriptions.Item label="Price">
                    {props.data.price}
                </Descriptions.Item>
                <Descriptions.Item label="Sold">
                    {props.data.sold}
                </Descriptions.Item>
                <Descriptions.Item label="View">
                    {props.data.views}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                    {props.data.description}
                </Descriptions.Item>
            </Descriptions>
            <br />
            <br />
            <br />

            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                    size="large"
                    shape="round"
                    type="danger"
                    onClick={handleClick}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default ProductInfo;
