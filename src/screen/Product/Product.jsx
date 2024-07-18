import React from "react";
import { BodyOne, Title } from "../../components/common/CustomComponents";
import { productlists } from "../../assets/data/data";
import ProductCard from "../../components/Product/ProductCard";

export default function Product() {
  return (
    <div className="bg-white-100 py-20">
      <div className="container">
        <Title level={4}> Most Popular Product</Title>
        <div className="flex items-center gap-3 uppercase">
          <BodyOne className={"text-sm"}>All Products (39)</BodyOne>
          <BodyOne className={"text-sm text-primary-green"}>
            Wooden Products (15)
          </BodyOne>
        </div>

        <div className="content grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        </div>
      </div>
    </div>
  );
}
