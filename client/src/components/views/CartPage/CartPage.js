import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";

const CartPage = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        let cartList = [];
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach((cart) => {
                    cartList.push(cart.id);
                });
                dispatch(getCartItems(cartList, props.user.userData.cart)).then(
                    (res) => {
                        console.log(res);
                    }
                );
            }
        }
    }, [props.user.userData, dispatch]);

    return <div>cartpage</div>;
};

export default CartPage;
