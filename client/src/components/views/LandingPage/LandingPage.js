import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Row, Card, Button } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";

function LandingPage() {
    const { Meta } = Card;
    const [products, setProducts] = useState([]);
    const [limits, setLimits] = useState(8);
    const [skips, setSkips] = useState(0);
    const [postSize, setPostsize] = useState(0);

    const LoadProducts = (body) => {
        axios.post("/api/products/product", body).then((res) => {
            if (res.data.productSuccess) {
                if (body.loadMore === true) {
                    setProducts([...products, ...res.data.productInfo]);
                } else {
                    setProducts(res.data.productInfo);
                }
                setPostsize(res.data.postSize);
            } else {
                alert("상품을 가져오는데 실패했습니다.");
            }
        });
    };

    useEffect(() => {
        let body = {
            skip: skips,
            limit: limits,
        };
        LoadProducts(body);
    }, []);

    const handleLoadMore = () => {
        const newSkip = skips + limits;
        let body = {
            skip: newSkip,
            limit: limits,
            loadMore: true,
        };
        LoadProducts(body);
        setSkips(newSkip);
    };

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
            {/* CheckBox */}
            <CheckBox />
            {/* RadioBox */}

            {/* Search */}

            {/* Cards */}
            <Row gutter={[16, 16]}>{renderCards}</Row>
            <br />
            <br />
            {postSize >= 8 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={handleLoadMore}> Load More </Button>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
