import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Row, Card, Button } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";

function LandingPage() {
    const { Meta } = Card;
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(8);
    const [Limit, setLimit] = useState(8);
    const [prodList, setProdList] = useState([]);
    const [postSize, setPostSize] = useState(0);

    const LoadProducts = () => {
        axios.post("/api/products/product").then((res) => {
            if (res.data.productSuccess) {
                setProducts(res.data.productInfo);
                setProdList(res.data.productInfo.slice(0, 8));
                setPostSize(res.data.postSize);
            } else {
                alert("상품을 가져오는데 실패했습니다.");
            }
        });
    };

    useEffect(() => {
        LoadProducts();
    }, []);

    const handleLoadMore = () => {
        const newSkip = skip + Limit;
        setProdList([...prodList, ...products.slice(skip, newSkip)]);
        setSkip(newSkip);
        setPostSize(prodList.length);
    };

    const renderCards = prodList.map((product, index) => {
        return (
            <Col key={index} lg={6} md={16} xs={24}>
                <Card cover={<ImageSlider images={product.images} />}>
                    <Meta
                        title={product.title}
                        description={product.description}
                    />
                    <p>${product.price}</p>
                </Card>
            </Col>
        );
    });

    const handleCheckBox = (value) => {
        const continents = value;
        if (continents.length === 0) {
            setProdList(products.slice(0, 8));
            setSkip(8);
            setPostSize(products.length);
        } else {
            const selected = continents
                .map((continent) => {
                    return products.filter(
                        (product) => product.continent === continent
                    );
                })
                .flat();
            setProdList(selected);
        }
    };

    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>
                    Let's Travel Anywhere <Icon type="rocket" />
                </h2>
            </div>
            {/* Filter */}
            <Row gutter={[16, 16]}>
                {/* CheckBox */}
                <Col lg={12} xs={24}>
                    <CheckBox handleCheck={handleCheckBox} />
                </Col>
                {/* RadioBox */}
                <Col lg={12} xs={24}>
                    <RadioBox handleCheck={handleCheckBox} />
                </Col>
            </Row>
            <br />

            {/* Search */}

            {/* Cards */}
            <Row gutter={[16, 16]}>{renderCards}</Row>

            <br />
            <br />
            {products.length >= prodList.length && postSize > Limit && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={handleLoadMore}> Load More </Button>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
