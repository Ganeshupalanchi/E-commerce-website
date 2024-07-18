import React from "react";
import { BiChart, BiChat } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { BodyOne, Title } from "../common/CustomComponents";

const additionalInfo = [
  {
    id: 1,
    title: "FREE SHIPPING",
    description:
      "Enjoy Free Shipping On All Orders - No Minimum Purchase Required.",
    icon: <FaShippingFast size={50} />,
  },
  {
    id: 2,
    title: "24/7 SUPPORT",
    description:
      "Our Team Is Available 24/7 To Help With Any Questions Or Concerns.",
    icon: <MdOutlineMarkUnreadChatAlt size={50} />,
  },
  {
    id: 3,
    title: "MONEY BACK",
    description: "We Offer A 100% Money-Back Guarantee For Your Satisfaction.",
    icon: <FaCircleDollarToSlot size={50} />,
  },
];

export default function ShippingInfo() {
  return (
    <>
      <section className="container">
        <div className="grid grid-cols-1 gap-8 py-32 sm:grid-cols-2 md:grid-cols-3">
          {additionalInfo.map((info) => (
            <div
              className="flex flex-col items-center justify-center gap-3 text-center"
              key={info.id}
            >
              <div className="text-primary-green">{info.icon}</div>
              <h3 className="mt-4 text-xl font-bold">{info.title}</h3>
              <p className="mt-2">{info.description}</p>
            </div>
          ))}
        </div>

        <div className="box flex flex-col items-center justify-between bg-primary p-8 lg:flex-row">
          <div className="left flex items-center gap-3">
            <BiChat size={100} className="" color="white" />
            <div>
              <h3 className="text-[20px] font-[500] uppercase leading-[1.2] text-white lg:text-[28px]">
                SUBSCRIBE TO OUR NEWSLETTER
              </h3>
              <p className="mb-4 font-normal capitalize text-primary-gray lg:text-lg">
                get latest news, Offers and discounts.
              </p>
            </div>
          </div>
          <div className="left w-full py-3 sm:p-5 sm:px-8 lg:w-1/2">
            <input
              type="text"
              className="w-full p-3 outline-none"
              placeholder="Enter Your Email"
            />
          </div>
        </div>
      </section>
    </>
  );
}
