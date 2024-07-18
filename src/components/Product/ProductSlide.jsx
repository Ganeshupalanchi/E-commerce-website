import React from "react";
import { BodyOne, Title } from "../common/CustomComponents";
import { productlists } from "../../assets/data/data";
import ProductCard from "./ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="slider-btn absolute -right-5 top-[32%] rounded-full lg:-right-32"
      onClick={onClick}
    >
      <button className="next">
        <MdKeyboardArrowRight size={50} />
      </button>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="slider-btn absolute -left-5 top-[32%] z-10 rounded-full lg:-left-32"
      onClick={onClick}
    >
      <button className="next">
        <MdKeyboardArrowLeft size={50} />
      </button>
    </div>
  );
}
export default function ProductSlide() {
  return (
    <>
      <section className="slideproduct bg-white py-20">
        <div className="container">
          <Title level="3" className={"uppercase"}>
            What is Tranding now
          </Title>
          <div className="flex items-center gap-3 uppercase">
            <BodyOne className={"text-sm"}>
              DISCOVER THE MOST TRENDING PRODUCTS IN MOONCART.
            </BodyOne>
          </div>

          <ProductSlideCart />
        </div>
      </section>
    </>
  );
}

export const ProductSlideCart = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          intialSlide: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          intialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          intialSlide: 1,
        },
      },
      //   {
      //     breakpoint: 500,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       nextArrow: null,
      //       prevArrow: null,
      //     },
      //   },
    ],
  };
  return (
    <>
      <Slider {...settings}>
        {/* <div className="content grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4"> */}
        {productlists.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            title={product.title}
            description={product.description}
            images={product.images}
            price={product.price}
            discount={product.discount}
            rating={product.rating}
            featured={product.featured}
            category={product.category}
            color={product.color}
          />
        ))}
        {/* </div> */}
      </Slider>
    </>
  );
};
