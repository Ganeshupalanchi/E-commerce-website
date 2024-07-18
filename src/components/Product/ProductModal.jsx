import React, { useState } from "react";
import { RenderRatingstars } from "./ProductCard";
import { BodyOne, Title } from "../common/CustomComponents";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

export default function ProductModal({
  id,
  title,
  description,
  images,
  price,
  discount,
  rating,
  featured,
  category,
  color,
  openModal,
  closeModal,
  isModalOpen,
}) {
  if (isModalOpen) {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const discountPrice = (
      price[0].value -
      (price[0].value * discount) / 100
    ).toFixed(2);

    return (
      <>
        <div className="overlay-bg quickView" onClick={closeModal}>
          <div className="modal-overlay overflow-auto">
            <div
              className="modal-content flex flex-col justify-between md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-[100%] md:h-[500px] md:w-1/2 md:overflow-hidden">
                <img
                  src={images[0].image}
                  alt={id}
                  className="modal-image h-full w-full object-contain xl:object-cover"
                />
              </div>
              <div className="modal-details w-100% p-6 md:h-[500px] md:w-1/2 md:overflow-y-auto">
                <button className="feature-btn bg-indigo-500">
                  SALE {discount}% OFF
                </button>
                <Title level={2} className="mt-1">
                  {title}
                </Title>
                <div className="-mt-2 flex items-center gap-1">
                  {RenderRatingstars(rating)}
                </div>
                {price.slice(0, 1).map((priceItem, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <BodyOne className={"mt-4 line-through"}>
                      $ {priceItem.value}
                    </BodyOne>
                    <Title level={3} className="text-primary-green">
                      {(
                        priceItem.value -
                        (priceItem.value * discount) / 100
                      ).toFixed(2)}
                    </Title>
                  </div>
                ))}
                <BodyOne className="text-sm leading-6">{description}</BodyOne>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="h-12 w-20 border-2 border-primary px-4 text-primary outline-none"
                  />
                  <button
                    className="primary-btn uppercase"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id,
                          title,
                          price: discountPrice,
                          images,
                          quantity: Number(qty),
                        }),
                      )
                    }
                  >
                    Add to cart
                  </button>
                </div>
                <hr className="my-5" />
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <Title level={5} className={"text-lg"}>
                      Category :
                      <span className="font-normal"> Wooden Product</span>
                    </Title>
                  </div>
                  <div className="flex items-center">
                    <Title level={5} className={"text-lg"}>
                      Tag :<span className="font-normal"> Wooden</span>
                    </Title>
                  </div>
                  <div className="flex items-center">
                    <Title level={5} className={"text-lg"}>
                      Share :
                    </Title>
                    <div className="-mt-1 flex items-center gap-3">
                      <FaFacebookF />
                      <AiFillInstagram />
                      <FaTwitter />
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="close-btn absolute right-0 top-0 flex h-12 w-12 items-center justify-center bg-primary-green text-white"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
