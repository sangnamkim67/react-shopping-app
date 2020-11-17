import React, { useEffect, useState } from "react";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { Row, Col } from "antd";
import axios from "axios";

const DetailProductPage = (props) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios
            .get(
                `/api/products/detail?id=${props.location.state.id}&type=single`
            )
            .then((res) => {
                if (res.data.success) {
                    setProduct(res.data.product[0]);
                } else {
                    alert("상세 정보 가져오기를 실패했습니다.");
                }
            });
    }, [props.location.state.id]);

    return (
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>{product.title}</h1>
            </div>
            <br />

            {/* 반응형으로 만들기 위해 antd의 Row, Col 사용 */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* product Image */}
                    <ProductImage data={product} />
                </Col>

                <Col lg={12} xs={24}>
                    {/* product Info */}
                    <ProductInfo />
                </Col>
            </Row>
        </div>
    );
};

export default DetailProductPage;
