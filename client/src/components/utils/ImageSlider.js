import React from "react";
import { Carousel } from "antd";

const ImageSlider = (props) => {
    return (
        <Carousel autoplay>
            {props.images.map((image, index) => {
                return (
                    <div key={index}>
                        <img
                            style={{
                                width: "100%",
                                maxHeight: "200px",
                            }}
                            src={`http://localhost:5000/${image}`}
                            alt=""
                        ></img>
                    </div>
                );
            })}
        </Carousel>
    );
};

export default ImageSlider;
