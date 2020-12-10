import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";
import UserCartBlock from "./Sections/UserCardBlock";

const CartPage = (props) => {
    const dispatch = useDispatch();
    const [totalPrice, setTotal] = useState(0);
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
                    }
                );
            }
        }
    }, [props.user.userData, dispatch]);

    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <h1>User Cart</h1>
            <UserCartBlock products={props.user.cartDetail} />
            <h2>Total Price : ${totalPrice}</h2>
        </div>
    );
};

export default CartPage;
