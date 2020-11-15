import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;
const SearchFeature = (props) => {
    const [inputValue, setValue] = useState("");

    const onChange = (e) => {
        setValue(e.currentTarget.value);
    };
    const onSearch = () => {
        props.handleSubmit(inputValue);
        setValue("");
    };

    return (
        <div>
            <Search
                placeholder="input search text"
                onChange={onChange}
                value={inputValue}
                onSearch={onSearch}
                style={{ width: 200 }}
            />
        </div>
    );
};

export default SearchFeature;
