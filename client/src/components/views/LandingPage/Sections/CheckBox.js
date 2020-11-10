import React from "react";
import { Checkbox, Collapse } from "antd";
import { Continents } from "./Datas";

const CheckBox = (props) => {
    const { Panel } = Collapse;
    const ContinentName = Continents.map((continent) => {
        return continent.value;
    });

    const handleChange = (checkedValues) => {
        props.handleCheck(checkedValues);
    };

    return (
        <Collapse defaultActiveKey={["1"]}>
            <Panel header="Continents" key="1">
                <Checkbox.Group
                    options={ContinentName}
                    onChange={handleChange}
                />
                {/* {Continents.map((continent, index) => {
                    return (
                        <Checkbox key={index} onChange={handleChange}>
                            {continent.value}
                        </Checkbox>
                    );
                })} */}
            </Panel>
        </Collapse>
    );
};

export default CheckBox;
