import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productlists } from "../../assets/data/data";
import { Caption, Title } from "../../components/common/CustomComponents";
import { RenderRatingstars } from "../../components/Product/ProductCard";
import { BiHeart, BiMinus, BiPlus } from "react-icons/bi";
import ShippingInfo from "../../components/Product/ShippingInfo";
import Features from "../../components/Features/Features";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/Wishlist";

const colorsValue = {
  red: "#fe7fef",
  yellow: "#ffff00",
  green: "#008000",
  blue: "#0000ff",
  white: "#f8f8f8",
  brown: "#a52a2a",
  clear: "#ffffff",
  "dark brown": "#654321",
  light: "#f5f5dc",
  black: "#000000",
  natural: "#8b4513",
  "light brown": "#deb887",
  dark: "#696969",
  gray: "#808080",
  beige: "#f5f5dc",
};
export default function ProductDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { productId } = useParams();
  const product = productlists.find((product) => {
    return product.id === Number(productId);
  });

  if (!product) {
    return (
      <Title className="mt-32 text-center" level={1}>
        Product not Found
      </Title>
    );
  }
  const { id, title, images, price, description, discount, rating, color } =
    product;
  const [selectedColor, setSelectedColor] = useState(color[0].value);
  const [selectedPrice, setSelectedPrice] = useState(
    price.find((item) => item.color === selectedColor),
  );

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
    setSelectedPrice(price.find((item) => item.color === newColor));
  };
  const CustomePage = ({ index, onClick }) => (
    <div>
      <img src={images[index].image} onClick={onClick} alt="" />
    </div>
  );
  const settings = {
    customPaging: (i) => <CustomePage index={i} />,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [qty, setQty] = useState(1);
  const discountPrice = (
    selectedPrice.value -
    (selectedPrice.value * discount) / 100
  ).toFixed(2);
  // dispatch
  const dispatch = useDispatch();
  const wishListItems = useSelector((state) => state.wishlist.itemList);
  const isitemExist = wishListItems.some((item) => item.id === id);
  return (
    <>
      <div>
        <section className="slideproduct slide product container mt-7">
          <div
            className="flex flex-col justify-between lg:flex-row"
            key={productId}
          >
            <div className="images lg:w-1/2">
              <div>
                <Slider {...settings}>
                  {images.map((image, i) => (
                    <img
                      src={`${image.image}`}
                      alt=""
                      key={i}
                      className="h-full w-full"
                    />
                  ))}
                </Slider>
              </div>
            </div>

            <div className="details px-16 pt-8 lg:w-1/2">
              <button className="feature-btn bg-indigo-500">
                SALE {discount}% OFF
              </button>
              <Title level={2} className="my-2 font-normal">
                {title}
              </Title>
              <div className="-mt-5 mb-5 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {RenderRatingstars(rating)}
                </div>
                <p>{rating} Review</p>
              </div>
              <p className="text-[15px]">{description}</p>
              <br />
              {/* <div>
                <p className="text-sm font-normal text-primary-gray">Colors</p>
                <div className="mt-5 flex items-center gap-3">
                  {color.map((item, i) => (
                    <div
                      key={i}
                      className={`-mt-3 h-4 w-4 cursor-pointer rounded-full border-gray-300 ${selectedColor === item.value ? "selected" : ""}`}
                      style={{ backgroundColor: colorsValue[item.value] }}
                      onClick={() => handleColorChange(item.value)}
                    ></div>
                  ))}
                </div>
              </div> */}
              <div className="mt-5">
                <p className="text-sm font-normal text-primary-gray">Prices</p>
                <div className="flex items-center gap-3">
                  <p className="mb-4 mt-4 text-lg font-normal text-primary-gray line-through">
                    $ {selectedPrice.value}
                  </p>
                  <Title level={4} className="text-primary-green">
                    $ {discountPrice}
                  </Title>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="grid h-12 w-12 place-items-center border border-gray-300 bg-gray-100 text-primary"
                  onClick={() => setQty(qty + 1)}
                >
                  <BiPlus size={20} />
                </button>
                <span className="grid h-12 w-16 place-items-center border border-gray-300 text-primary outline-none">
                  {qty}
                </span>
                <button
                  onClick={() => (qty > 1 ? setQty(qty - 1) : setQty(qty))}
                  className="grid h-12 w-12 place-items-center border border-gray-300 bg-gray-100 text-primary"
                >
                  <BiMinus size={20} />
                </button>

                <button
                  className="primary-btn flex items-center gap-2"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id,
                        title,
                        price: discountPrice,
                        images,
                        quantity: qty,
                      }),
                    )
                  }
                >
                  Add to Cart
                </button>
              </div>
              <div className="mt-6 flex items-center gap-3">
                {isitemExist ? (
                  <button
                    className="secondary-btn flex items-center gap-2"
                    onClick={() => dispatch(removeFromWishlist(id))}
                  >
                    <BiHeart size={20} /> Remove From Wishlist{" "}
                  </button>
                ) : (
                  <button
                    className="secondary-btn flex items-center gap-2"
                    onClick={() =>
                      dispatch(
                        addToWishlist({
                          id,
                          title,
                          price: discountPrice,
                          images,
                        }),
                      )
                    }
                  >
                    <BiHeart size={20} /> Add to Wishlist{" "}
                  </button>
                )}
              </div>

              <hr className="my-5" />
            </div>
          </div>

          <div className="my-10 flex flex-col justify-between lg:flex-row">
            <div className="lg:w-1/2">
              <Title level={3}>Fits Your Child</Title>
              <Caption>
                Designed for superior child comfort, OneFit™ provides extra
                rear-facing legroom and multiple recline options in every mode
                of use. With the widest range of height adjustments, the
                easy-adjust headrest system adjusts with the harness to grow
                with your child. OneFit™ accommodates tiny passengers from the
                very start with a removable head and body support insert for
                newborns weighing 5-11 lb
              </Caption>
              <Title level={3} className="mt-5">
                Specifications
              </Title>
              <div className="mt-3 flex flex-col gap-4">
                <Caption>
                  Assembled Dimensions (L x W x H): 21.5″ x 19″ x 27″
                </Caption>
                <Caption>Assembled Product Weight: 25 lbs.</Caption>
                <Caption>Harness Mode – Rear-Facing5-40 lbs</Caption>
                <Caption>Harness Mode – Forward-Facing25-65 lbs</Caption>
                <Caption>Booster Mode – Harness + Booster40-100 lbs</Caption>
                <Caption>Booster Mode – Backlessn/a</Caption>
                <Caption>Rear-Facing Child Max Height Capacity43 in</Caption>
                <Caption>Forward-Facing Child Max Height Capacity54 in</Caption>
              </div>
            </div>
            <div></div>
          </div>
        </section>
      </div>
      <Features />
    </>
  );
}
