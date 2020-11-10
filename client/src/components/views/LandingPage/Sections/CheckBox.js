import React from "react";
import { Checkbox, Collapse } from "antd";

const CheckBox = () => {
    const { Panel } = Collapse;

    return (
        <Collapse defaultActiveKey={["1"]} onChange>
            <Panel header="This is panel header 1" key="1">
                <p>asdasd</p>
            </Panel>
        </Collapse>
    );
};

export default CheckBox;
