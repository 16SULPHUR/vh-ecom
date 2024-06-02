import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "My Orders", href: "/orders" },
  { name: "Policies", href: "/policies" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    localStorage.setItem("logedIn", false);
    localStorage.setItem("logedInUser", "");
    localStorage.setItem("accessToken", "");

    navigate("/signedout");
  };

  const login = async () => {
    const CLIENT_ID = "14168416091898906021";
    const redirectURL = "https://varietyheaven.vercel.app";
    const AUTH_URL = `https://auth.phone.email/log-in?client_id=${CLIENT_ID}&redirect_url=${redirectURL}`;

    window.open(
      AUTH_URL,
      "VARIETY HEAVEN",
      "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0, width=500, height=560, top=" +
        (window.screen.height - 600) / 2 +
        ", left=" +
        (window.screen.width - 500) / 2
    );
  };

  const searchParams = new URLSearchParams(window.location.search);
  const accessToken = searchParams.get("access_token");

  if (searchParams.get("access_token")) {
    localStorage.setItem("accessToken", accessToken);
  }

  return (
    <div className="z-50">
      <div className="py-1 bg-sky-500 lg:text-md text-sm font-semibold text-white">
        <Swiper
          spaceBetween={10}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          loop={true}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper lg:w-3/6"
        >
          <SwiperSlide>
            <div className="text-center">✈️ Shipping Pan India</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center">
              📌 No Exchange / No Return/ No cancellation
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center">🚚 Free Delivery All Over India</div>
          </SwiperSlide>
        </Swiper>
      </div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link to={"/"}>
                  <img
                    className="h-14 w-auto self-center"
                    src="/logo.png"
                    alt="VARIETY HEAVEN"
                  />
                </Link>
              </div>
              <div className="hidden self-center sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="grid grid-cols-2 px-2 pb-3 pt-2 gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium bg-gray-700 text-white rounded-md text-center"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <Outlet />
    </div>
  );
}
