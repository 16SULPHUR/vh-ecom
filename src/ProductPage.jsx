import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { addToCartRequest } from "./getUser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ProductPage = () => {
  const [selectedVariant, setSelectedVariant] = useState({});
  const [amount, setAmount] = useState(1);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllBulletPoints, setShowAllBulletPoints] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://vh-apis.onrender.com/getProduct?id=${id}`
        );
        const data = await response.json();
        console.log(data.product[0]);
        setProduct(data.product[0]);
        setSelectedVariant(data.product[0].variations[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const incrementAmount = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const decrementAmount = () => {
    if (amount > 1) {
      setAmount((prevAmount) => prevAmount - 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = async (id) => {
    if (!localStorage.getItem("phone")) {
      window.location.href = "https://varietyheaven.vercel.app/login";
    }
    await addToCartRequest(localStorage.getItem("phone"), id);
  };

  const toggleBulletPoints = () => {
    setShowAllBulletPoints((prevState) => !prevState);
  };

  // Calculate the discount percentage
  const discountPercentage = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  return (
    <div className="flex-flex-col mb-20">
      <div className="flex flex-col lg:flex-row gap-10 lg:items-start lg:mx-10 mx-4 lg:my-20 mt-5">
        <div className="lg:w-7/12 w-[370px] lg:sticky lg:top-5 self-center lg:self-start">
          <Swiper
            spaceBetween={10}
            centeredSlides={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1.3,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            loop={true}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper mb-6"
          >
            {selectedVariant.images?.length ? (
              selectedVariant.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="h-[550px] object-contain w-full"
                    src={image}
                    alt={`Slide ${index}`}
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div>No images available</div>
              </SwiperSlide>
            )}
            {product.video1 && (
              <SwiperSlide>
                <div className="flex justify-center">
                  <iframe
                    src={product.video1}
                    allowFullScreen={true}
                    className="w-60 lg:w-5/6 h-[493px] lg:h-[557px]"
                  ></iframe>
                </div>
              </SwiperSlide>
            )}
            {product.video2 && (
              <SwiperSlide className="">
                <div className="flex justify-center">
                  <iframe
                    src={product.video2}
                    allowFullScreen={true}
                    className="w-60 lg:w-5/6 h-[493px] lg:h-[557px]"
                  ></iframe>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        <div className="flex flex-col gap-4 lg:w-2/4">
          <div>
            <span className="text-violet-600 font-semibold">
              {product.category.toUpperCase() || "Category Not Specified"}
            </span>
            <h1 className="lg:text-3xl text-lg font-bold">{product.title}</h1>
          </div>
          <div>
            <div className="flex gap-4 flex-wrap">
              {product.variations.map((variant) => (
                <div
                  key={variant._id}
                  className={`cursor-pointer ${
                    selectedVariant._id === variant._id
                      ? "border-2  border-violet-600"
                      : "border "
                  }`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  <img
                    src={variant.images[0]}
                    alt={`${variant.color} thumbnail`}
                    className="lg:h-32 h-20 object-contain w-full"
                  />
                  <p className="text-center lg:text-sm text-xs">
                    {variant.color}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="my-10">
            <div className="flex flex-col lg:flex-row lg:gap-10 gap-3">
              <div className="flex gap-2 items-baseline justify-center">
                <p className="mt-1 text-3xl font-medium text-gray-900">
                  ₹ {product.discountedPrice}
                </p>
                <strike className="mt-1 text-lg font-medium text-gray-900">
                  ₹ {product.price}
                </strike>
                <p className="mt-1 text-2xl font-medium text-green-600">
                  ({discountPercentage}% off)
                </p>
              </div>
              <div className="flex lg:flex-row flex-col items-center gap-12 mb-5">
                <Link
                  to={`/buy/${id}/${product.variations.indexOf(
                    selectedVariant
                  )}`}
                >
                  <button className="bg-violet-800 text-white font-semibold py-3 lg:px-16 px-32 rounded-xl h-full">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
            <ul className="list-disc ms-5 lg:text-xl flex flex-col gap-4">
              {(showAllBulletPoints
                ? product.bulletPoints
                : product.bulletPoints.slice(0, 1)
              ).map((point, index) => (
                <li key={index}>
                  <div className={!showAllBulletPoints && "cl line-clamp-2"}>
                    {point}
                  </div>
                </li>
              ))}
            </ul>
            {product.bulletPoints.length >= 5 && (
              <div className="">
                <button
                  onClick={toggleBulletPoints}
                  className="text-violet-600 font-semibold mt-4"
                >
                  {showAllBulletPoints ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </div>
          {/* <p className="text-gray-700 ms-4">
          <details>
            <summary className="">Description </summary>
            {product.description}
          </details>
        </p> */}
        </div>
      </div>
      <div>
        <p onClick={()=>{setShowDescription(!showDescription)}} className={showDescription?"text-gray-700 lg:mx-10 mx-5 cursor-pointer text-sm":"line-clamp-2 lg:mx-10 mx-5  cursor-pointer text-gray-700 text-sm"}>Description: {product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
