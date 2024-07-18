import React from "react";
import { promotionalInfo } from "../../assets/data/data";
import { BodyOne, Title } from "../common/CustomComponents";

export default function Banner() {
  return (
    <>
      <hr className="mt-10 border-b-2" />
      <h2 className="mt-5 pb-1 text-center text-3xl font-medium uppercase">
        should ALSO BUY
      </h2>
      <section className="flex flex-col items-center justify-between gap-5 p-8 pt-12 lg:flex-row lg:gap-0 lg:p-0 lg:pt-12">
        {promotionalInfo.map((info) => (
          <div className="box w-full sm:relative" key={info.id}>
            <div className="h-max w-full lg:h-[400px]">
              <img
                src={info.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="left-0 top-0 w-full p-3 sm:absolute md:w-2/3 md:p-8">
              <span className="hidden bg-white px-6 py-2 text-sm sm:inline-block">
                {info.title}
              </span>
              <Title className={"my-5"} level="2">
                {info.title}
              </Title>
              <BodyOne>{info.description}</BodyOne>
              <button className="secondary-btn">Shop Now</button>
            </div>
          </div>
        ))}
      </section>

      <hr className="my-10 border-b-2" />
    </>
  );
}
