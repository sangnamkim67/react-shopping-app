import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../../../_actions/user_actions";
import UserCartBlock from "./Sections/UserCardBlock";
import { Empty } from "antd";

const CartPage = (props) => {
    const dispatch = useDispatch();
    const [totalPrice, setTotal] = useState(0);
    const [isEmpty, setEmpty] = useState(false);
    useEffect(() => {
        let cartList = [];
        let price = 0;

        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach((cart) => {
                    cartList.push(cart.id);
                });
                dispatch(getCartItems(cartList, props.user.userData.cart)).then(
                    (res) => {
                        res.payload.forEach((item) => {
                            price += item.price * item.quantity;
                        });
                        setTotal(price);
                        setEmpty(true);
                    }
                );
            }
        }
    }, [props.user.userData, dispatch]);
    const removeFromCart = (id) => {
        console.log(id);
        dispatch(removeCartItem(id)).then((res) => {
            if (res.payload.productInfo.length <= 0) {
                setEmpty(false);
            }
        });
    };
    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <h1>User Cart</h1>
            <UserCartBlock
                products={props.user.cartDetail}
                removeFromCart={removeFromCart}
            />
            {isEmpty ? (
                <h2>Total Price : ${totalPrice}</h2>
            ) : (
                <div>
                    <Empty description={false} />
                    <h2 style={{ textAlign: "center" }}>
                        No Items In the CART
                    </h2>
                </div>
            )}
        </div>
    );
};

export default CartPage;
