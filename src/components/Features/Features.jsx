import React from "react";
import { FiBox } from "react-icons/fi";
import { IoIosColorFilter } from "react-icons/io";
import { IoBagRemoveOutline } from "react-icons/io5";
import { MdOutlineLocalShipping } from "react-icons/md";
import { instagramPosts } from "../../assets/data/data";
import { Caption, Title } from "../common/CustomComponents";

export default function Features() {
  return (
    <>
      <section className="post mt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
        {instagramPosts.map((post) => (
          <div className="h-72 overflow-hidden lg:h-80" key={post.id}>
            <img
              src={post.image}
              alt="1"
              className="h-full w-full object-cover transition-transform ease-in-out hover:-rotate-12 hover:scale-125"
            />
          </div>
        ))}
      </section>
      <FilterDiscover />
    </>
  );
}

export const FilterDiscover = () => {
  const filterDiscoverItems = [
    {
      id: 1,
      title: "Filter & Discover",
      icon: <IoIosColorFilter size={70} />,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
      id: 2,
      title: "Add To Cart",
      icon: <IoBagRemoveOutline size={70} />,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
      id: 3,
      title: "Fast Shipping",
      icon: <MdOutlineLocalShipping size={70} />,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
      id: 4,
      title: "Enjoy The Product",
      icon: <FiBox size={70} />,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
  ];
  return (
    <>
      <section className="grid grid-cols-1 bg-white-100 md:grid-cols-2 lg:grid-cols-4">
        {filterDiscoverItems.map((item) => (
          <div
            key={item.id}
            className="relative flex items-center gap-8 p-8 py-12"
          >
            <div className="icon">
              <i>{item.icon}</i>
            </div>
            <div>
              <Title level={5}>{item.title}</Title>
              <Caption>{item.description}</Caption>
              <Title
                level={1}
                className={"absolute -bottom-5 right-0 opacity-10"}
              >
                0{item.id}
              </Title>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
