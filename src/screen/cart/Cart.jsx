import React, { useEffect } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { BodyOne, Title } from "../../components/common/CustomComponents";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { BiMinus, BiPlus } from "react-icons/bi";
import { CgCross } from "react-icons/cg";
import { RxCross1, RxCross2 } from "react-icons/rx";
import StripeCheckout from "react-stripe-checkout";
import { Link } from "react-router-dom";
export default function Cart() {
  const dispatch = useDispatch();
  const productsCart = useSelector((state) => state.cart.itemList);
  const subTotal = productsCart
    .map((item) => item.quantity * +item.price)
    .reduce((a, c) => a + c, 0)
    .toFixed(2);
  const loggedInUser = sessionStorage.getItem("loggedInUser")
    ? JSON.parse(sessionStorage.getItem("loggedInUser"))
    : "";
  const handleToken = (subTotal) => {
    // handlePaymentSuccess();
    dispatch(clearCart());
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="cart mt-16">
      <div className="h-[40vh]">
        <div className="absolute left-0 top-0 h-1/2 w-full">
          <img
            src="../../src/assets/common/Frame.png"
            alt=""
            className="h-full w-full"
          />
          <h3 className="heading">Shopping Cart</h3>
        </div>
      </div>
      {productsCart.length ? (
        <div className="container">
          <button
            className="primary-btn mt-5"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
          <div className="flex justify-between">
            <div className="w-2/3 overflow-x-auto">
              <table className="w-full text-left text-sm rtl:text-right">
                <thead>
                  <tr>
                    <th scope="col" className="px-16 py-5">
                      THUMBNAIL
                    </th>
                    <th className="px-6 py-5">PRODUCT</th>
                    <th className="px-6 py-5">PRICE</th>
                    <th className="px-6 py-5">QUANTITY</th>
                    <th className="px-6 py-5">SUBTOTAL</th>
                    <th className="px-6 py-5"></th>
                  </tr>
                </thead>
                <tbody>
                  {productsCart.map((item, i) => (
                    <tr key={i}>
                      <td className="inline-block p-4 text-center">
                        <img
                          src={item.images[0].image}
                          className="h-24 w-24"
                          alt=""
                        />
                      </td>
                      <td className="p-4">
                        <BodyOne>{item.title}</BodyOne>
                      </td>
                      <td className="p-4">
                        <BodyOne>{item.price}</BodyOne>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <button
                            className="grid h-12 w-12 place-items-center border border-gray-300 bg-gray-100 text-primary"
                            onClick={() => dispatch(increaseQty(item.id))}
                          >
                            <BiPlus size={20} />
                          </button>
                          <span
                            disabled="disabled"
                            // onChange={() => setQty(e.target.value)}
                            className="grid h-12 w-16 place-items-center border border-gray-300 text-primary outline-none"
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(decreaseQty(item.id))}
                            className="grid h-12 w-12 place-items-center border border-gray-300 bg-gray-100 text-primary"
                          >
                            <BiMinus size={20} />
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        <BodyOne>
                          {(item.quantity * item.price).toFixed(2)}
                        </BodyOne>
                      </td>
                      <td className="p-4">
                        <button
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-green text-white"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <RxCross2 size={25} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ml-5 h-max w-1/3 bg-[#F3F4F6]">
              <div className="p-5">
                <p className="text-lg font-medium text-primary">Cart Totals</p>
                <hr className="my-2 h-[2px] bg-gray-200" />
                <div className="flex">
                  <p className="flex-1 text-lg font-medium text-primary">
                    Subtotal
                  </p>
                  <p className="flex-1 font-normal text-primary-gray">
                    $ {subTotal}
                  </p>
                </div>
                <hr className="my-2 h-[2px] bg-gray-200" />
                <div className="flex">
                  <p className="flex-1 text-lg font-medium text-primary">
                    Total
                  </p>
                  <p className="flex-1 font-normal text-primary-gray">
                    $ {subTotal}
                  </p>
                </div>
                {loggedInUser ? (
                  <StripeCheckout
                    token={handleToken}
                    stripeKey="pk_test_51PaB3nRsyLH8CHoPFZaKrDHDSFfeRDyxcjE44QOrdzvpZJRfV6zco6Pcoq242IpCHSRzH014e03KaKjhxQflCV9o00wz4FQuJ2"
                    amount={subTotal * 100}
                    name="Ecommerce Website"
                    email="test@gmail.com"
                    description="Payment test using stripe"
                  >
                    <button className="primary-btn mt-5">
                      Proceed To Checkout
                    </button>
                  </StripeCheckout>
                ) : (
                  <Link to="/login">
                    <button className="primary-btn mt-5">
                      Login To Checkout
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-medium"> Cart is empty.</h1>
          <br />
          <p>Add products to cart to show it.</p>
          <br />
          <Link to={"/shop"} className="text-[15px] text-primary-green">
            Go to Shop.
          </Link>
        </div>
      )}
    </section>
  );
}
