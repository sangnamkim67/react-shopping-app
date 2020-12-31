import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../../../_actions/user_actions";
import UserCartBlock from "./Sections/UserCardBlock";
import { Empty, Button, Icon } from "antd";

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
        dispatch(removeCartItem(id)).then((res) => {
            if (res.payload.productInfo.length <= 0) {
                setEmpty(false);
            }
        });
    };

    const requestPayment = () => {
        var IMP = window.IMP; // 생략가능
        IMP.init("imp19723009"); // "가맹점 식별코드"
        IMP.request_pay(
            {
                pg: "inicis", // version 1.1.0부터 지원.
                pay_method: "card",
                merchant_uid: `PAYID_${new Date().getTime()}`,
                name: `${props.user.cartDetail[0].title} 외 ${
                    props.user.cartDetail.length - 1
                }개`,
                amount: totalPrice,
                buyer_email: `${props.user.userData.email}`,
                buyer_name: `${props.user.userData.name}`,
            },
            function (res) {
                var msg;
                if (res.success) {
                    msg = "결제가 완료되었습니다.\n";
                    msg += "결제 금액 : " + res.paid_amount;
                } else {
                    msg = "결제에 실패하였습니다.\n";
                    msg += "에러내용 : " + res.error_msg;
                }
                alert(msg);
            }
        );
    };

    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <h1>User Cart</h1>
            <UserCartBlock
                products={props.user.cartDetail}
                removeFromCart={removeFromCart}
            />
            {isEmpty ? (
                <div>
                    <h2>Total Price : ${totalPrice}</h2>
                    <Button onClick={requestPayment}>
                        <Icon type="credit-card" />
                        결제하기
                    </Button>
                </div>
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
