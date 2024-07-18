import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { checkout } from "../../redux/slices/cartSlice";
import { userOrders } from "../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CheckOutForm({ total, handlePaymentSuccess }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart.itemList);
  const handleToken = (total) => {
    handlePaymentSuccess();
    dispatch(userOrders(cartitems));
    dispatch(checkout());
    toast.success("Your order is added.");
    navigate("/my-orders");
  };
  return (
    <>
      <StripeCheckout
        token={handleToken}
        stripeKey="pk_test_51PaB3nRsyLH8CHoPFZaKrDHDSFfeRDyxcjE44QOrdzvpZJRfV6zco6Pcoq242IpCHSRzH014e03KaKjhxQflCV9o00wz4FQuJ2"
        amount={total * 100}
        name="Ecommerce Website"
        email="test@gmail.com"
        description="Payment test using stripe"
      >
        <button className="my-3 w-full bg-gray-200 py-3.5 font-medium">
          Pay ${total}
        </button>
      </StripeCheckout>
    </>
  );
}
