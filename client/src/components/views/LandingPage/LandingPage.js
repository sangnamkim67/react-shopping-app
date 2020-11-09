import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Row, Card } from "antd";
import ImageSlider from "../../utils/ImageSlider";

function LandingPage() {
    const { Meta } = Card;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.post("/api/products/product").then((res) => {
            if (res.data.productSuccess) {
                setProducts(res.data.productInfo);
            } else {
                alert("상품을 가져오는데 실패했습니다.");
            }
        });
    }, []);

    const renderCards = products.map((product, index) => {
        return (
            <Col key={index} lg={6} md={16} xs={24}>
                <Card cover={<ImageSlider images={product.images} />}>
                    <Meta
                        title={product.title}
                        description={product.description}
                    />
                </Card>
            </Col>
        );
    });

    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>
                    Let's Travel Anywhere <Icon type="rocket" />
                </h2>
            </div>
            {/* Filter */}
            {/* Search */}
            {/* Cards */}
            <Row gutter={[16, 16]}>{renderCards}</Row>
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button> 더보기 </button>
            </div>
        </div>
    );
}

export default LandingPage;
