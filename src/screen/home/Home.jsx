import React, { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import Product from "../Product/Product";
import ShippingInfo from "../../components/Product/ShippingInfo";
import Banner from "../../components/Banner/Banner";
import ProductSlide from "../../components/Product/ProductSlide";
import Testimonials from "../../components/Testimonials/Testimonials";
import Features from "../../components/Features/Features";

export default function Home() {
  return (
    <>
      <Hero />
      <Product />
      <ShippingInfo />
      <Banner />
      <ProductSlide />
      <Testimonials />
      <Features />
    </>
  );
}
