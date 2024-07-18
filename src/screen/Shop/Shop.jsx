import React, { useEffect } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { productlists } from "../../assets/data/data";

export default function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mt-16 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  );
}
