import React, { useState } from "react";
import { Radio, Collapse } from "antd";
import { Prices } from "./Datas";

const RadioBox = (props) => {
    const { Panel } = Collapse;
    const [prices, setPrice] = useState();
    const pricesName = Prices.map((price) => {
        return price.name;
    });

    const handleChange = (e) => {
        setPrice(e.target.value);
        props.handleRadio(e.target.value);
    };

    return (
        <Collapse defaultActiveKey={["0"]}>
            <Panel header="Prices" key="1">
                <Radio.Group
                    onChange={handleChange}
                    option={pricesName}
                    value={prices}
                >
                    {pricesName.map((price, index) => {
                        return (
                            <Radio key={index} value={index}>
                                {price}
                            </Radio>
                        );
                    })}
                </Radio.Group>
            </Panel>
        </Collapse>
    );
};

export default RadioBox;
