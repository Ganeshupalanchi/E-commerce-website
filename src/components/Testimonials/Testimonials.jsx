import React from "react";
import { BodyOne, Title } from "../common/CustomComponents";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="slider-btn absolute bottom-0 right-0 rounded-full bg-transparent text-black sm:bg-white lg:-right-5 xl:bottom-0 xl:right-0"
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
      className="slider-btn absolute bottom-0 z-10 rounded-full bg-transparent text-black sm:bg-white lg:-ml-5 xl:right-20"
      onClick={onClick}
    >
      <button className="prev">
        <MdKeyboardArrowLeft size={50} />
      </button>
    </div>
  );
}

export default function Testimonials() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // responsive: [
    //   {
    //     breakpoint: 1200,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 1,
    //       intialSlide: 3,
    //     },
    //   },
    // ],
  };
  return (
    <>
      <section className="testimonials" id="services">
        <div className="container flex h-full items-center justify-center gap-12">
          <div className="relative z-50 hidden w-1/2 self-start lg:flex">
            <div className="box z-50 h-80 w-80 rounded-full bg-white lg:h-96 lg:w-96">
              <img
                src="../images/hero/girl.png"
                alt=""
                className="absolute left-0 z-10 rounded-b-full"
              />
            </div>
            <div className="absolute z-50 ml-24 mt-56 w-max rounded-lg bg-[rgba(255,255,255,0.5)] p-3 px-5 backdrop-blur-sm lg:ml-[125px] lg:mt-[265px]">
              <BodyOne className={"leading-none"}>Our Satisfied User</BodyOne>
              <div className="flex items-center">
                <img
                  src="../images/testimonial/pic1-2.png"
                  alt=""
                  className="h-14 w-14 rounded-full border-2 border-gray-100"
                />
                <img
                  src="../images/testimonial/pic2-2.png"
                  alt=""
                  className="z-10 -ml-3 h-14 w-14 rounded-full border-2 border-gray-100"
                />
                <span className="z-10 -ml-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  +12k
                </span>
              </div>
            </div>
          </div>

          <div className="left relative z-50 w-full lg:w-1/2">
            <Title level={2} className="pb-10">
              {" "}
              What our clients say about us
            </Title>
            <BodyOne className="mb-4 text-lg font-normal text-primary-gray">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters,.
            </BodyOne>
            <Slider {...settings}>
              <TestimonialsCard
                name="Kenneth Fong "
                post="Undergraduate Student"
                cover="../images/testimonial/pic5.jpg"
              />
              <TestimonialsCard
                name="Joe Do "
                post="Postgraduate Student"
                cover="../images/testimonial/pic6.jpg"
              />
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}

const TestimonialsCard = ({ name, post, cover }) => {
  return (
    <div className="flex items-center justify-center gap-8 xl:justify-normal">
      <div className="h-20 w-20">
        <img
          src={cover}
          alt=""
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="details">
        <Title className={"font-medium leading-none"} level={5}>
          {name}
        </Title>
        <p>{post}</p>
      </div>
    </div>
  );
};
