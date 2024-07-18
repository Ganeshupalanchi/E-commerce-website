import React, { useEffect, useState } from "react";
import { IoCartOutline, IoHeart } from "react-icons/io5";
import { Badges } from "../common/CustomComponents";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import CheckOutForm from "../checkout/CheckOutForm";
import { removeFromWishlist } from "../../redux/slices/Wishlist";

export default function CartModal() {
  const loggedInUser = sessionStorage.getItem("loggedInUser")
    ? JSON.parse(sessionStorage.getItem("loggedInUser"))
    : "";
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");
  const [isOpen, setIsOpen] = useState(false);
  const cartToggleMenu = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(!isOpen);
        setIsClosing(false);
      }, 300);
    } else {
      setIsOpen(!isOpen);
    }
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);
  const dispatch = useDispatch();
  const productsCart = useSelector((state) => state.cart.itemList);
  const wishlistProducts = useSelector((state) => state.wishlist.itemList);
  const subTotal = productsCart
    .map((item) => item.quantity * +item.price)
    .reduce((a, c) => a + c, 0)
    .toFixed(2);

  const handlePaymentSuccess = () => {
    console.log("payment Success");
  };
  return (
    <>
      <div
        className="relative z-20 cursor-pointer"
        onClick={() => {
          cartToggleMenu();
          setActiveTab("wishlist");
        }}
      >
        <IoHeart size={23} />
        <div className="absolute -right-1.5 -top-2">
          <Badges color="bg-primary-green text-white">
            {wishlistProducts.length}
          </Badges>
        </div>
      </div>

      <div
        className="relative z-20 cursor-pointer"
        onClick={() => {
          cartToggleMenu();
          setActiveTab("cart");
        }}
      >
        <IoCartOutline size={25} />
        <div className="absolute -right-1.5 -top-2">
          <Badges color="bg-primary-green text-white">
            {productsCart.length}
          </Badges>
        </div>
      </div>
      {isOpen && (
        <>
          <div className="cartoverlay" onClick={cartToggleMenu}>
            <div
              className={`cart-menu z-90 fixed right-0 top-0 h-[100vh] w-[90%] overflow-auto bg-white px-6 py-12 sm:w-[50%] sm:px-12 md:w-[40%] lg:w-[35%] xl:w-[25%] ${isClosing ? "closing" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              {" "}
              <button
                onClick={cartToggleMenu}
                className="close-btn absolute right-0 top-0 flex h-12 w-12 items-center justify-center bg-primary-green text-white"
              >
                <RxCross2 size={25} />
              </button>
              <div className="flex justify-between gap-5 text-primary">
                <button
                  className={`flex items-center gap-2 font-medium`}
                  onClick={() => setActiveTab("cart")}
                >
                  Shopping Cart
                  <span className="grid h-7 w-7 place-content-center rounded-full bg-primary text-[11px] font-normal text-white">
                    {productsCart.length}
                  </span>
                </button>
                <button
                  className={`flex items-center gap-2 font-medium`}
                  onClick={() => setActiveTab("wishlist")}
                >
                  Wishlist{" "}
                  <span className="grid h-7 w-7 place-content-center rounded-full bg-gray-200 text-[11px] font-normal text-primary">
                    {wishlistProducts.length}
                  </span>
                </button>
              </div>
              <div className="flex">
                <div
                  className={`line ${activeTab === "cart" ? "active" : ""}`}
                ></div>
                <div
                  className={`line ${activeTab === "wishlist" ? "active" : ""}`}
                ></div>
              </div>
              {activeTab === "cart" ? (
                productsCart.length ? (
                  <div>
                    {productsCart?.map((item, i) => (
                      <div
                        className="mt-5 border-b-2 border-gray-200 pb-5"
                        key={i}
                      >
                        <div className="flex items-center gap-5">
                          <div className="images h-full w-20">
                            <img src={item.images[0].image} alt="" />
                          </div>
                          <div className="deatils w-1/2">
                            <p className="mb-2 text-lg font-normal text-primary-gray">
                              {item.title}
                            </p>
                            <p className="text-primary-green">
                              {item.quantity} x $ {item.price}
                            </p>
                          </div>
                          <button
                            className="flex h-9 w-10 items-center justify-center rounded-full bg-gray-200 text-primary"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            <RxCross2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="mt-5">
                      <div className="total flex w-full justify-between">
                        <h3 className="text-xl font-medium">Subtotal </h3>
                        <h3 className="text-xl font-medium">$ {subTotal} </h3>
                      </div>
                      <div className="checkout text-primary">
                        {loggedInUser ? (
                          <CheckOutForm
                            total={subTotal}
                            handlePaymentSuccess={handlePaymentSuccess}
                          />
                        ) : (
                          <Link to={"checkout"}>
                            <button className="my-3 w-full bg-gray-200 py-3 font-medium">
                              Checkout
                            </button>
                          </Link>
                        )}
                      </div>
                      <Link to="/cart">
                        <button className="w-full bg-primary py-3 font-medium text-white">
                          View Cart
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-52 items-center justify-center text-xl">
                    Cart is empty
                  </div>
                )
              ) : wishlistProducts.length ? (
                <div>
                  {wishlistProducts?.map((item, i) => (
                    <div
                      className="mt-5 border-b-2 border-gray-200 pb-5"
                      key={i}
                    >
                      <div className="flex items-center gap-5">
                        <div className="images h-full w-20">
                          <img src={item.images[0].image} alt="" />
                        </div>
                        <div className="deatils w-1/2">
                          <p className="mb-2 text-lg font-normal text-primary-gray">
                            {item.title}
                          </p>
                          <p className="text-primary-green">
                            {item.quantity} x $ {item.price}
                          </p>
                        </div>
                        <button
                          className="flex h-9 w-10 items-center justify-center rounded-full bg-gray-200 text-primary"
                          onClick={() => dispatch(removeFromWishlist(item.id))}
                        >
                          <RxCross2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-52 items-center justify-center text-xl">
                  Wishlist is Empty
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
