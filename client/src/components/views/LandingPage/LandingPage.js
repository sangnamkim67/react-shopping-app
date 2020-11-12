import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Row, Card, Button } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import { Prices } from "./Sections/Datas";

function LandingPage() {
    const { Meta } = Card;
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(8);
    const [Limit] = useState(8);
    const [prodList, setProdList] = useState([]);
    const [postSize, setPostSize] = useState(0);
    const [continents, setContinents] = useState([]);
    const [price, setPrice] = useState(Prices[0]);

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
        setContinents(value);
        const continents = value;
        if (price.key === 1) {
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
        } else {
            if (continents.length === 0) {
                const selectedInAll = products.filter((product) => {
                    return (
                        product.price >= price.array[0] &&
                        product.price < price.array[1]
                    );
                });
                setProdList(selectedInAll);
                setSkip(8);
                setPostSize(products.length);
            } else {
                const selected = continents
                    .map((continent) => {
                        return products.filter(
                            (product) => product.continent === continent
                        );
                    })
                    .flat()
                    .filter(
                        (product) =>
                            product.price >= price.array[0] &&
                            product.price < price.array[1]
                    );
                setProdList(selected);
            }
        }
    };
    const handleRadioBox = (value) => {
        const priceValue = Prices[value];
        setPrice(Prices[value]);

        const selectedInAll = products.filter((product) => {
            return (
                product.price >= priceValue.array[0] &&
                product.price < priceValue.array[1]
            );
        });
        let selectedInList = [];

        if (continents.length === 0) {
            selectedInList = selectedInAll;
        } else {
            selectedInList = continents
                .map((continent) => {
                    return selectedInAll.filter(
                        (product) => product.continent === continent
                    );
                })
                .flat();
        }

        setProdList(selectedInList);
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
                    <RadioBox handleRadio={handleRadioBox} />
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
