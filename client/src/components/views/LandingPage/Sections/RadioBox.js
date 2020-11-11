import React from "react";
import { Checkbox, Collapse } from "antd";
import { Continents } from "./Datas";

const RadioBox = (props) => {
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
            </Panel>
        </Collapse>
    );
};

export default RadioBox;
