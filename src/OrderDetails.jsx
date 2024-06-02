import React, { useState, useEffect } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const [product, setProduct] = useState({});
  const [selectedVariation, setSelectedVariation] = useState({});
  const [thumbnail, setThumbnail] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [houseNumberAndStreetAddress, setHouseNumberAndStreetAddress] =
    useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [customerGSTIN, setCustomerGSTIN] = useState("");
  const [at, setAt] = useState(localStorage.getItem("accessToken"));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();
  console.log(id);
  const { varient } = useParams();
  console.log(typeof parseInt(varient));

  let cashfree;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "production",
    });
  };
  initializeSDK();

  const doPayment = async (sid, details) => {
    if (sid) {
      let checkoutOptions = {
        paymentSessionId: `${sid}`,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then((result) => {
        console.log("doing payment" + sid);
        if (result.error) {
          // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
          console.log(
            "User has closed the popup or there is some payment error, Check for Payment Status"
          );
          console.log(result.error);
          setIsSubmitting(false);
        }
        if (result.redirect) {
          // This will be true when the payment redirection page couldnt be opened in the same window
          // This is an exceptional case only when the page is opened inside an inAppBrowser
          // In this case the customer will be redirected to return url once payment is completed
          console.log("Payment will be redirected");
          setIsSubmitting(false);
        }
        if (result.paymentDetails) {
          // This will be called whenever the payment is completed irrespective of transaction status
          console.log("Payment has been completed, Check for Payment Status");
          console.log(result.paymentDetails);
          setIsSubmitting(false);

          // const data = {
          //  details: details
          // };

          // // const url = "http://127.0.0.1:3005/payment/registerOrder";
          // const url = "https://vh-apis.onrender.com/payment/registerOrder";

          // const options = {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json", // Specify the content type as JSON
          //   },
          //   body: JSON.stringify(data), // Convert the data to JSON string
          // };

          // fetch(url, options)
          //   .then((response) => {
          //     if (!response.ok) {
          //       throw new Error("Network response was not ok");
          //     }
          //     return response.json(); // Parse the JSON response
          //   })
          //   .then((data) => {
          //     console.log(data.msg);
          // window.location.href = "https://varietyheaven.in/orders"
          //     // Handle the response data
          //   })
          //   .catch((error) => {
          //     console.error("Error creating order:", error);
          //     // Handle errors
          //   });

          window.location.href = "https://varietyheaven.in/orders";
        }
      });
    } else {
      console.log("session id not available");
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const encryptPhoneNumber = (phoneNumber, shift) => {
      // Check if the input is a valid phone number
      if (!/^\d{10}$/.test(phoneNumber)) {
        throw new Error("Invalid phone number");
      }

      let encryptedPhoneNumber = "";
      for (let i = 0; i < phoneNumber.length; i++) {
        const digit = parseInt(phoneNumber[i], 10);
        const encryptedDigit = (digit + shift) % 10; // Shift each digit by the specified amount
        encryptedPhoneNumber += encryptedDigit.toString();
      }

      localStorage.setItem("c", encryptedPhoneNumber);
      return encryptedPhoneNumber;
    };

    if (at) {
      const httpRequest = async () => {
        try {
          const url = "https://eapi.phone.email/getuser";
          const data = new FormData();

          data.append("access_token", at);
          data.append("client_id", "14168416091898906021");

          const response = await fetch(url, { method: "POST", body: data });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const responseData = await response.json();

          if (responseData.status !== 200) {
            console.error(responseData);
          }

          const phEmailJwt = responseData.ph_email_jwt;

          const userDetails = {
            countryCode: responseData.country_code,
            phoneNo: responseData.phone_no,
            phEmailJwt: phEmailJwt,
          };

          setPhone(userDetails.phoneNo);

          document.cookie = `c=${encryptPhoneNumber(
            userDetails.phoneNo,
            3
          )}; path=/; `;
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };

      httpRequest();
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://vh-apis.onrender.com/getProduct?id=${id}`
          // `http://127.0.0.1:3005/getProduct?id=${id}`
        );
        const data = await response.json();
        console.log(data.product[0].variations[varient]);
        // console.log(localStorage.getItem(
        //     "idToBuy"
        //   ))
        setThumbnail(data.product[0].variations[varient].images[0]);
        setSelectedVariation(data.product[0].variations[varient]);
        setProduct(data.product[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // You can now access all form field values from state variables
    // Perform submission logic here, e.g., send data to server
    console.log({
      phone,
      email,
      fullName,
      houseNumberAndStreetAddress,
      area,
      city,
      state,
      pin,
      customerGSTIN,
    });

    if (!phone) {
      alert("Please varify your phone number");
      setIsSubmitting(false);
      return;
    }

    const data = {
      phone: phone,
      email: email,
      fullName: fullName,
      houseNumberAndStreetAddress: houseNumberAndStreetAddress,
      area: area,
      city: city,
      state: state,
      pin: pin,
      pId: id,
      varient: varient,
      customerGSTIN: customerGSTIN,
    };

    const url = "https://vh-apis.onrender.com/payment/createOrder";
    // const url = "https://vh-apis.onrender.com/payment/createOrder";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(data), // Convert the data to JSON string
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        localStorage.setItem("sessionId", data.msg.payment_session_id);
        console.log(data.msg.payment_session_id);
        doPayment(data.msg.payment_session_id, data.msg);
        // Handle the response data
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        // Handle errors
      });

    // Reset form fields
    setPhone("");
    setEmail("");
    setFullName("");
    setHouseNumberAndStreetAddress("");
    setArea("");
    setCity("");
    setState("");
    setPin("");
    setCustomerGSTIN("");

    // setIsSubmitting(false);
  };

  const verifyPhone = async () => {
    const CLIENT_ID = "14168416091898906021";
    // const redirectURL = `http://127.0.0.1:3000/buy/${id}/${varient}`;
    const redirectURL = `https://varietyheaven.in/buy/${id}/${varient}`;
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

  if (product) {
    // console.log(product.variations[parseInt(varient)])
  }
  return (
    <div>
      {/* Loading overlay */}
      {isSubmitting && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <img
            src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif"
            alt="loading"
          />
        </div>
      )}

      {/* Checkout form */}
      <div className="relative mx-auto w-full bg-slate-200">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Checkout
                <span className="mt-2 block h-1 w-10 bg-blue-600 sm:w-20"></span>
              </h1>
              <form
                className="mt-10 flex flex-col space-y-4"
                onSubmit={handleSubmit}
              >
                {/* Phone input */}
                <div>
                  {phone ? (
                    <div className="flex gap-4">
                      <label
                        htmlFor="phone"
                        className="text-lg font-semibold text-gray-500 self-center"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                        disabled
                      />
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <label
                        htmlFor="phone"
                        className="text-lg font-semibold text-gray-500 self-center"
                      >
                        Phone
                      </label>
                      <button
                        type="button"
                        className="bg-green-600 hover:bg-green-800 px-4 py-2 rounded-lg font-semibold text-white"
                        onClick={verifyPhone}
                      >
                        Verify phone
                      </button>
                    </div>
                  )}
                </div>

                {/* Full Name input */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customerGSTIN"
                    className="text-xs font-semibold text-gray-500"
                  >
                    GSTIN (If Available)
                  </label>
                  <input
                    type="text"
                    id="customerGSTIN"
                    name="customerGSTIN"
                    value={customerGSTIN}
                    onChange={(e) => setCustomerGSTIN(e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email input */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john.capler@fang.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Address inputs */}
                <div className="pt-10">
                  <label className="text-lg font-semibold text-gray-800">
                    Address
                  </label>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="form-group col-span-2">
                      <label
                        htmlFor="streetAddress"
                        className="text-xs font-semibold text-gray-500"
                      >
                        House No. and Street Address:
                      </label>
                      <input
                        onChange={(e) =>
                          setHouseNumberAndStreetAddress(e.target.value)
                        }
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        required
                        className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="area"
                        className="text-xs font-semibold text-gray-500"
                      >
                        Area / Locality:
                      </label>
                      <input
                        required
                        onChange={(e) => setArea(e.target.value)}
                        type="text"
                        id="area"
                        name="area"
                        className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="city"
                        className="text-xs font-semibold text-gray-500"
                      >
                        City:
                      </label>
                      <input
                        onChange={(e) => setCity(e.target.value)}
                        type="text"
                        id="city"
                        name="city"
                        required
                        className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="state"
                        className="text-xs font-semibold text-gray-500"
                      >
                        State:
                      </label>
                      <input
                        onChange={(e) => setState(e.target.value)}
                        type="text"
                        id="state"
                        name="state"
                        required
                        className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="pin"
                        className="text-xs font-semibold text-gray-500"
                      >
                        PIN Code:
                      </label>
                      <input
                        onChange={(e) => setPin(e.target.value)}
                        type="text"
                        id="pin"
                        name="pin"
                        required
                        className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {/* <div className="form-group">
                      <label htmlFor="country">Country:</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        required
                        className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
                      />
                    </div> */}
                  </div>
                </div>

                {/* Add other form fields here */}

                {/* Submit button */}
                <p class="mt-10 text-center text-sm font-semibold text-gray-500">
                  By placing this order you agree to the{" "}
                  <a
                    href="#"
                    class="whitespace-nowrap text-blue-400 underline hover:text-blue-600"
                  >
                    Terms and Conditions
                  </a>
                </p>
                <div className="text-center">
                  <button
                    type="submit"
                    class="mt-4 w-fit lg:w-full rounded-3xl px-6 bg-green-700 py-2.5 font-semibold text-white text-3xl"
                  >
                    <div className="flex justify-center content-center">
                      <div className="flex flex-col">
                        <span className="text-2xl">Pay Now</span>
                        {/* <span className="flex gap-2 text-xs">
                          Powered By Cashfree
                          <img src="/cashfreeLogo.svg" alt="" />
                        </span> */}
                      </div>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Add order summary section here */}
          <div class="relative h-full col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 class="sr-only">Order summary</h2>
            <div>
              <img
                src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
                class="absolute inset-0 h-full w-full object-cover"
              />
              <div class="absolute inset-0 h-full w-full bg-gradient-to-t from-blue-800 to-blue-400 opacity-95"></div>
            </div>
            <div class="relative">
              <h1 class="relative text-2xl font-medium text-white sm:text-3xl mb-4">
                Order summary
              </h1>
              <div className="flex gap-6 text-white">
                <img src={thumbnail} alt="" className="h-36" />
                <div className="flex flex-col gap-">
                  <h2 className="text-lg font-medium text-white mb-4">
                    <span>{product.title} </span>
                    <span>({selectedVariation.color})</span>
                  </h2>
                  <div className="flex gap-2 items-baseline">
                    <p className="mt-1 text-3xl font-medium">
                      ₹ {product.discountedPrice}
                    </p>
                    <strike className="mt-1 text-lg font-medium">
                      ₹ {product.price}
                    </strike>
                  </div>
                </div>
              </div>
              <div class="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div class="space-y-2">
                <p class="flex justify-between text-lg font-bold text-white">
                  <span>Total price:</span>
                  <span>₹ {product.discountedPrice}</span>
                </p>
              </div>
            </div>
            <div class="relative mt-10 text-white">
              <h3 class="mb-5 text-lg font-bold">Support</h3>
              <p class="text-sm font-semibold">+91 8160185875</p>
              <p class="mt-1 text-sm font-semibold">
                ankit@varietyheaven.in <span class="font-light">(Email)</span>
              </p>
              <p class="mt-2 text-xs font-medium">
                Call us now for payment related issues
              </p>
            </div>
            {/* <div class="relative mt-10 flex">
              <p class="flex flex-col">
                <span class="text-sm font-bold text-white">
                  Money Back Guarantee
                </span>
                <span class="text-xs font-medium text-white">
                  within 30 days of purchase
                </span>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
