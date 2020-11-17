import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

const ProductImage = (props) => {
    const [Images, setImages] = useState([]);

    useEffect(() => {
        if (props.data.images && props.data.images.length > 0) {
            const images = props.data.images.map((image) => {
                return {
                    original: `http://localhost:5000/${image}`,
                    thumbnail: `http://localhost:5000/${image}`,
                };
            });
            setImages(images);
        }
    }, [props.data.images]);

    return <ImageGallery items={Images} />;
};

export default ProductImage;
