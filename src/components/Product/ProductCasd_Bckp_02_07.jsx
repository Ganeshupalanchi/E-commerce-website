import React, { useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { BodyOne, Title } from "../common/CustomComponents";
import {
  FaFacebookF,
  FaRegStar,
  FaStar,
  FaStarHalf,
  FaStarHalfAlt,
  FaTwitter,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
export const RenderRatingstars = (rating) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfstars = rating % 1 !== 0;
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} color="#ff8a00" />);
    } else if (hasHalfstars && i === fullStars + 1) {
      stars.push(<FaStarHalfAlt key="half-star" color="#ff8a00" />);
    } else {
      stars.push(<FaRegStar key={i} color="#ff8a00" />);
    }
  }
  return stars;
};
export default function ProductCard({
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
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const [qty, setQty] = useState(1);
  return (
    <>
      <div className="product card">
        <div className="images h-96">
          {/* {images.map((cover, i) => {
          console.log("cover: ", cover);
          return (
            <img
              key={i}
              src={cover?.image}
              alt=""
              className="h-full w-full object-cover"
            />
          );
        })} */}
          <img
            src={images[0].image}
            alt={id}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-0 top-0 flex w-full justify-between p-5">
            {discount && (
              <button className="discount-btn cursor-default">
                {discount}%
              </button>
            )}
            {featured && (
              <button className="feature-btn cursor-default">
                {featured && "Featured"}
              </button>
            )}
          </div>

          <div className="overlay absolute bottom-0 left-0 right-0 m-5 flex items-center justify-center gap-2">
            <button
              className="quick-view-btn product-btn primary-btn"
              onClick={openModal}
            >
              Quick View
            </button>
            <button className="add-to-cart product-btn primary-btn">
              <IoCart size={23} />
            </button>
            {/* <button className="love-brn product-btn remove-wish">
            <IoMdHeart size={23} />
          </button> */}
            <button className="love-brn product-btn add-wish">
              <IoMdHeart size={23} />
            </button>
          </div>
        </div>

        <div className="details flex flex-col items-center bg-white pt-6">
          <NavLink to={"/roduct-details/" + id}>
            <BodyOne>{title}</BodyOne>
          </NavLink>
          <div className="-mt-2 mb-2 flex items-center gap-2">
            {RenderRatingstars(rating)}
          </div>
          <div className="flex items-center gap-3">
            {price.slice(0, 1).map((priceItem, i) => (
              <div key={i}>
                <BodyOne className={"line-through"}>
                  $ {priceItem.value}
                </BodyOne>
                <BodyOne>
                  ${" "}
                  {(
                    priceItem.value -
                    (priceItem.value * discount) / 100
                  ).toFixed(2)}
                </BodyOne>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="overlay-bg" onClick={closeModal}>
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content flex justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-[500px] w-1/2 overflow-hidden">
                  <img
                    src={images[0].image}
                    alt={id}
                    className="modal-image h-full w-full object-cover"
                  />
                </div>
                <div className="modal-details h-[500px] w-1/2 overflow-y-auto p-6">
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
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value="1"
                      onChange={(e) => setQty(e.target.value)}
                      className="h-12 w-20 border-2 border-primary px-4 text-primary outline-none"
                    />
                    <button className="primary-btn uppercase">
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
      )}
    </>
  );
}
