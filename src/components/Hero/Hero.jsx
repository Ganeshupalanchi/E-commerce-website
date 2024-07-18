import React, { useState } from "react";
import { herolist } from "../../assets/data/data";
import { BodyOne, Caption, Title } from "../common/CustomComponents";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="slider-btn absolute bottom-0 left-[50%] hidden sm:grid"
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
      className="slider-btn absolute bottom-0 right-[50%] z-10 hidden bg-white text-black sm:grid"
      onClick={onClick}
    >
      <button className="next">
        <MdKeyboardArrowLeft size={50} />
      </button>
    </div>
  );
}
export default function Hero() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          dots: true,
          // slidesToShow: 1,
          // slidesToScroll: 1,
          // initialSlide: 1,
        },
      },
    ],
  };
  return (
    <>
      <div>
        <section className="z-1 relative h-max bg-white-100 sm:h-[100vh] md:h-[70vh] lg:h-[90vh]">
          <Slider {...settings}>
            {herolist.map((item) => (
              <HeroItem
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                prices={item.price}
                colors={item.color}
              />
            ))}
          </Slider>
        </section>
      </div>
      <Banner />
    </>
  );
}

export const HeroItem = ({ title, description, image, prices, colors }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const [selectedPrice, setSelectedPrice] = useState(
    prices.find((price) => price.color === colors[0].value),
  );
  const handleColorClick = (color) => {
    const newSelectedPrice = prices.find((price) => price.color === color);
    setSelectedColor(color);
    setSelectedPrice(newSelectedPrice);
  };
  return (
    <div>
      <section className="content relative z-20 flex flex-col-reverse justify-between sm:h-[100vh] sm:flex-row md:h-[70vh] lg:h-[90vh] lg:px-16">
        <div className="left h-full w-full p-8 sm:w-1/2 lg:pb-64 lg:pt-20">
          {/* <Title
            level={1}
            className="font-medium leading-none md:text-3xl lg:text-[52px] lg:leading-snug"
          >
            {title}
          </Title> */}
          <h1 className="mb-2 text-3xl font-medium leading-none lg:text-[52px] lg:leading-snug">
            {title}
          </h1>
          <BodyOne>{description}</BodyOne>
          <div className="my-5 flex items-start gap-8">
            <div>
              <Caption>Prices</Caption>
              <div className="mt-3">
                <Title level={5}>${selectedPrice.value.toFixed(2)}</Title>
              </div>
            </div>
            <div>
              <Caption>Colors</Caption>
              <div className="mt-5 flex items-center justify-center gap-3">
                {colors.map((color, i) => (
                  <div
                    onClick={() => handleColorClick(color.value)}
                    key={i}
                    className={`h-4 w-4 cursor-pointer rounded-full border-gray-300 ${selectedColor === color.value ? "selected" : ""} `}
                    style={{ backgroundColor: color.value }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button className="primary-btn uppercase">view details</button>
            <button className="secondary-btn uppercase">view Shop</button>
          </div>
        </div>
        <div className="right relative z-50 flex h-full w-full items-center justify-center bg-white p-5 sm:w-1/2">
          <img
            src={image}
            alt=""
            className="h-[30%] w-[30%] object-contain sm:h-[80%] sm:w-[80%] md:h-full lg:h-[60vh] xl:w-full"
          />
        </div>
        <div className="lg:absolute lg:right-0 lg:top-0 lg:-z-10 lg:h-[90vh] lg:w-1/3 lg:bg-black"></div>
      </section>
    </div>
  );
};

const Banner = () => {
  return (
    <>
      <div className="container flex flex-col items-center gap-5 py-20 lg:flex-row">
        <div>
          <BannerCard
            title="Wooden Water Bottles"
            desc="UP TO 60% OFF"
            cover="./images/hero/product1-1.png"
          />
        </div>
        <div className={"hidden flex-col justify-between gap-8 sm:flex"}>
          <BannerCard
            title="Bamboo Toothbrushes"
            desc="UP TO 60% OFF"
            cover="./images/hero/product2.png"
            className={true}
          />
          <BannerCard
            title="Reusable Eco Friendly Bags"
            desc="UP TO 60% OFF"
            cover="./images/hero/product3.png"
            className={true}
            classSecond={true}
          />
        </div>
      </div>
    </>
  );
};
const BannerCard = ({ title, desc, cover, className, classSecond }) => {
  return (
    <>
      <div className="relative h-full w-full">
        <img src={cover} alt="" />
        {/* <div
          className={`${className ? "absolute bottom-0 w-full p-8" : className === true && classSecond === true ? "top-0 max-w-[70%] p-5 lg:left-48 xl:left-52" : "absolute bottom-0 flex w-full flex-col p-8"} `}
        > */}
        <div
          className={`${className && classSecond ? "absolute bottom-0 left-64 top-0 max-w-[70%] p-5 pt-2 lg:left-44 xl:left-52" : className ? "absolute bottom-0 w-full p-8" : "absolute bottom-0 flex w-full flex-col p-8 xl:flex-row"}`}
        >
          {classSecond ? (
            <>
              <div>
                <h2 className="text-[30px] font-medium lg:text-[24px] xl:text-[30px]">
                  {title}
                </h2>
                <p className="text-lg font-normal leading-none lg:text-base xl:text-lg">
                  {desc}
                </p>
              </div>
              <div className="xxl:w-1/2 mt-5 w-full lg:mt-2 xl:mt-5">
                <button className="secondary-btn flex justify-end capitalize">
                  shop now
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-[30px] font-medium xl:text-[35px]">
                  {title}
                </h2>
                <p className="text-lg font-normal leading-none">{desc}</p>
              </div>
              <div className="mt-5 lg:w-1/2">
                <button className="secondary-btn flex justify-end capitalize">
                  shop now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
