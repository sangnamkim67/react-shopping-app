import React from "react";
import "./UserCardBlock.css";

const UserCardBlock = (props) => {
    const renderCardImage = (src) => {
        return `http://localhost:5000/${src}`;
    };
    const renderItem = () =>
        props.products &&
        props.products.map((item, index) => {
            return (
                <tr key={index}>
                    <td>
                        <img
                            style={{ width: "70px", height: "70px" }}
                            alt="product"
                            src={renderCardImage(item.images[0])}
                        />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.quantity} EA</td>
                    <td>$ {item.price}</td>
                    <td>
                        <button onClick={() => props.removeFromCart(item._id)}>
                            Remove
                        </button>
                    </td>
                </tr>
            );
        });
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Title</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>{renderItem()}</tbody>
            </table>
            <br />
            <br />
        </div>
    );
};

export default UserCardBlock;
