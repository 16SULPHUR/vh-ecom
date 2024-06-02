import { load } from "@cashfreepayments/cashfree-js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// const OrdersTable = ({ph}) => {
//   const [orders, setOrders] = useState([]);
//   const [phone, setPhone] = useState(ph);

// //   setPhone(localStorage.getItem("phone"))

//   useEffect(() => {
//     // Retrieve phone number from localStorage
//     const storedPhone = localStorage.getItem("phone");
//     console.log(storedPhone);
//     console.log(storedPhone && !phone)
//     if (storedPhone && !phone) {
//       setPhone(storedPhone);
//     }
//     // else{
//         // setPhone(ph)
//     // }
//   }, []);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const resp = await fetch(
//           `http://127.0.0.1:3005/orders/trackOrders?cid=${phone}`
//         );
//         const data = await resp.json();
//         setOrders(data.orders);
//       } catch (e) {
//         console.error(e);
//       }
//     };

//     if (phone) {
//       fetchOrders();
//     }
//   }, [phone]); // Re-fetch orders whenever phone number changes

//   return (
//     <>
//       {phone && (
//         <div className="mt-10">
//           <div className="flex items-center justify-center">
//             <div className="overflow-x-auto">
//               <table className="w-full min-w-max text-left border-2 border-blue-500 shadow-2xl">
//                 <thead>
//                   <tr>
//                     <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                       <p className="font-semibold text-sm text-blue-gray-900">
//                         Product Details
//                       </p>
//                     </th>
//                     <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                       <p className="font-semibold text-sm text-blue-gray-900">
//                         Order Details
//                       </p>
//                     </th>
//                     <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                       <p className="font-semibold text-sm text-blue-gray-900">
//                         Status
//                       </p>
//                     </th>
//                     <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                       <p className="font-semibold text-sm text-blue-gray-900">
//                         Shipment Details
//                       </p>
//                     </th>
//                     <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                       <p className="font-semibold text-sm text-blue-gray-900">
//                         Invoice
//                       </p>
//                     </th>
//                     <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map((order, index) => (
//                     <tr key={index}>
//                       <td className="p-4 border-b border-blue-gray-100">
//                         <div className="flex items-center gap-3">
//                           <img
//                             src={order.productDetails.thumbnail}
//                             alt={order.productDetails.title}
//                             className="h-20 rounded-lg"
//                           />
//                           <div className="flex flex-col">
//                             <Link to={`/productpage?id=${order.productDetails._id}`}>
//                                 <p className="text-sm font-bold text-blue-700 hover:underline w-40 line-clamp-1">
//                                   {order.productDetails.title}
//                                 </p>
//                             </Link>
//                             <p className="text-sm font-bold text-green-600 w-40 line-clamp-1">
//                             ₹ {order.orderDetails.order_amount}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="p-4 border-b border-blue-gray-100">
//                         <div className="flex flex-col gap-4">
//                             <p className="text-sm text-blue-gray-900">
//                               CF Order Id: <span className="font-semibold text-gray-800">{order.orderDetails.cf_order_id}</span>
//                             </p>
//                             <p className="text-sm text-blue-gray-900 w-32">
//                               Order Date: {order.date}
//                             </p>
//                         </div>
//                       </td>
//                       <td className="p-4 border-b border-blue-gray-100">
//                         <div className="w-max">
//                           <div className="rounded-md bg-green-500 text-white py-1 px-2 text-xs uppercase font-semibold">
//                           {order.orderStatus}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="p-4 border-b border-blue-gray-100">
//                       <div className="flex flex-col gap-4">
//                             <p className="text-sm text-blue-gray-900">
//                               Courier: <span className="font-semibold text-gray-800">{order.shipmentDetails.shippingProvider}</span>
//                             </p>
//                             <p className="text-sm text-blue-gray-900 w-32">
//                               Tracking Id: <span className="font-semibold text-gray-800">{order.shipmentDetails.trackingId}</span>
//                             </p>
//                             <p className="text-sm text-blue-gray-900 ">
//                                 <Link to={order.shipmentDetails.trackingLink} target="_blank" className="bg-orange-600 py-2 px-3 rounded-md font-bold text-white">
//                               Track Your Order Here
//                               </Link>
//                             </p>
//                         </div>
//                       </td>
//                       <td className="p-4 border-b border-blue-gray-100">
//                         <div className="flex items-center gap-3">
//                         <div className="rounded-md bg-blue-500 text-white py-1 px-2 text-xs uppercase font-semibold">
//                           Download Invoice
//                           </div>

//                         </div>
//                       </td>
//                       {/* <td className="p-4 border-b border-blue-gray-100">
//                         <button
//                           className="w-10 h-10 rounded-lg text-xs text-gray-900 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
//                           type="button"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             fill="currentColor"
//                             className="w-4 h-4"
//                           >
//                             <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
//                           </svg>
//                         </button>
//                       </td> */}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

const Orders = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const accessToken = searchParams.get("access_token");
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
  const [phone, setPhone] = useState(localStorage.getItem("phone"));
  const [loading, setLoading] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);

  const [at, setAt] = useState(localStorage.getItem("accessToken"));

  const [orders, setOrders] = useState([]);
  //   const [phone, setPhone] = useState(ph);

  //   setPhone(localStorage.getItem("phone"))

  //   useEffect(() => {
  //     // Retrieve phone number from localStorage
  //     const storedPhone = localStorage.getItem("phone");
  //     console.log(storedPhone);
  //     console.log(storedPhone && !phone)
  //     if (storedPhone && !phone) {
  //       setPhone(storedPhone);
  //     }
  //     // else{
  //         // setPhone(ph)
  //     // }
  //   }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`https://vh-apis.onrender.com/orders/trackOrders?cid=${phone}`);
      const data = await resp.json();
      console.log(data.orders);
      setOrders(data.orders);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    // const fetchOrders = async () => {
    //   setLoading(true);
    //   try {
    //     const resp = await fetch(
    //       // `https://vh-apis.onrender.com/orders/trackOrders?cid=${phone}`
    //       `http://127.0.0.1:3005/orders/trackOrders?cid=${phone}`
    //     );
    //     const data = await resp.json();
    //     console.log(data.orders);
    //     setOrders(data.orders);
    //     setLoading(false);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // };

    if (phone != "undefined" && phone) {
      fetchOrders();
    }
  }, [phone]);

  if (at) {
    console.log(at);

    const httpRequest = async (at) => {
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

        localStorage.setItem("phone", userDetails.phoneNo);
        setPhone(userDetails.phoneNo);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    httpRequest(at);
  }

  const verifyPhone = async () => {
    const CLIENT_ID = "14168416091898906021";
    const redirectURL = "https://varietyheaven.in/orders";
    // const redirectURL = "http://127.0.0.1:3000/orders";
    // const redirectURL = "https://varietyheaven.in/buy";
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

  const generateInvoice = async (oid, cid) => {
    setLoading(true);
    try {
      // const result = await fetch(`http://127.0.0.1:3005/generateInvoice?oid=${oid}&cid=${cid}`);
      const result = await fetch(`https://vh-apis.onrender.com/generateInvoice?oid=${oid}&cid=${cid}`);
      const data = await result.json();
      console.log(data.orders);
      if (data) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center mb-5 font-semibold text-gray-600 text-lg">📦 Customer can track the order with the tracking number to the respective courier company.</h1>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-500 text-white px-6 py-4">
          <h2 className="text-xl font-semibold">Search Orders</h2>
          <p className="text-sm">
            Enter your mobile number to search for orders:
          </p>
        </div>
        <div className="px-6 py-4">
          <div>
            {phone != "null" && phone != "undefined" && phone ? (
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
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-lg placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500"
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
                  Enter phone Number
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <OrdersTable phone={phone || ""} /> */}
      <>
        {loading && (
          <div className="w-full h-full flex justify-center">
            {/* Loading... */}
            <img
              src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif"
              alt="Loading..."
            />
          </div>
        )}
        {phone && !loading && (
          <div className="mt-10">
            <div className="flex items-center justify-center">
              <div className="overflow-x-auto">
                <table className="w-full min-w-max text-left border-2 border-blue-500 shadow-2xl">
                  <thead>
                    <tr>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <p className="font-semibold text-sm text-blue-gray-900">
                          Product Details
                        </p>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <p className="font-semibold text-sm text-blue-gray-900">
                          Order Details
                        </p>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <p className="font-semibold text-sm text-blue-gray-900">
                          Address
                        </p>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <p className="font-semibold text-sm text-blue-gray-900">
                          Status and Shipment Details
                        </p>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <p className="font-semibold text-sm text-blue-gray-900">
                          Invoice
                        </p>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index}>
                        <td className="p-4 border-b border-blue-gray-100">
                          <div className="flex items-center gap-3">
                            <img
                              src={order.productDetails.thumbnail}
                              alt={order.productDetails.title}
                              className="h-20 rounded-lg"
                            />
                            <div className="flex flex-col">
                              <Link
                                to={`/productpage?id=${order.productDetails._id}`}
                              >
                                <p className="text-sm font-bold text-blue-700 hover:underline w-40 line-clamp-2">
                                  {order.productDetails.title}
                                </p>
                              </Link>
                              <p className="text-sm font-bold text-green-600 w-40 line-clamp-1">
                                ₹ {order.orderDetails.order_amount}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100">
                          <div className="flex flex-col gap-4">
                            <p className="text-sm text-blue-gray-900">
                              CF Order Id:{" "}
                              <span className="font-semibold text-gray-800">
                                {order.orderDetails.cf_order_id}
                              </span>
                            </p>
                            <p className="text-sm text-blue-gray-900 w-32">
                              Order Date: {order.date}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100">
                          <div className="w-40">
                            <div className="font-semibold">
                              {order.address || "No Address Specified"}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-100 w-56">
                          <div className="w-max flex gap-3">
                            <span>Status: </span>
                            <div className="rounded-md bg-green-500 text-white py-1 px-2 text-xs uppercase font-semibold">
                              <span>{order.orderStatus}</span>
                            </div>
                          </div>
                          {order.shipmentDetails.trackingId ? (
                            <div className="flex flex-col gap-4">
                              <div className="text-sm text-blue-gray-900 flex gap-2">
                                <span>Courier: </span>
                                <span className="font-semibold text-gray-800">
                                  {order.shipmentDetails.shippingProvider ||
                                    "Available when order is shipped"}
                                </span>
                              </div>
                              <div className="text-sm text-blue-gray-900 flex gap-2">
                                <span>Tracking Id: </span>
                                <span className="font-semibold text-gray-800">
                                  {order.shipmentDetails.trackingId ||
                                    "Available when order is shipped"}
                                </span>
                              </div>
                              <p className="text-sm text-blue-gray-900 ">
                                <Link
                                  to={order.shipmentDetails.trackingLink}
                                  target="_blank"
                                  className="bg-orange-600 py-2 px-3 rounded-md font-bold text-white"
                                >
                                  Track Your Order Here
                                </Link>
                              </p>
                            </div>
                          ) : (
                            <div>
                              Shipment Details are Available when order is
                              shipped
                            </div>
                          )}
                        </td>
                        <td className="p-4 border-b border-blue-gray-100">
                          <div className="flex items-center gap-3">
                            {
                              order.invoice ? (
                                <Link
                                  to={`/invoice?src=${order.invoice}` || ""}
                                  target="_blank"
                                >
                                  <div className="rounded-md bg-blue-500 text-white py-1 px-2 text-xs uppercase font-semibold">
                                    Download Invoice
                                  </div>
                                </Link>
                              ) : (
                                <div>
                                  {order.orderStatus != "payment received" ? (
                                    <div>Payment not received</div>
                                  ) : (
                                    <div>
                                      <button
                                        onClick={() =>
                                          generateInvoice(
                                            order._id,
                                            order.phone
                                          )
                                        }
                                      >
                                        Generate Invoice
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )
                            }
                          </div>
                        </td>
                        {/* <td className="p-4 border-b border-blue-gray-100">
                        <button
                          className="w-10 h-10 rounded-lg text-xs text-gray-900 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                          </svg>
                        </button>
                      </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Orders;
