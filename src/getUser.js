

const decryptPhoneNumber = (encryptedPhoneNumber, shift) => {
  // Check if the input is a valid encrypted phone number
  if (!/^\d{10}$/.test(encryptedPhoneNumber)) {
    return;
  }

  let decryptedPhoneNumber = "";
  for (let i = 0; i < encryptedPhoneNumber.length; i++) {
    const digit = parseInt(encryptedPhoneNumber[i], 10);
    const decryptedDigit = (digit - shift + 10) % 10; // Apply inverse shift to decrypt each digit
    decryptedPhoneNumber += decryptedDigit.toString();
  }
  return decryptedPhoneNumber;
};

const getUser = async (ph) => {
  console.log(decryptPhoneNumber(ph,3))
  // const resp = await fetch(`http://127.0.0.1:3005/signup/user?ph=${decryptPhoneNumber(ph,3)}`);
  const resp = await fetch(`https://vh-apis.onrender.com/signup/user?ph=${decryptPhoneNumber(ph,3)}`);
  const jsonresp = await resp.json()
  // console.log(jsonresp)
  return jsonresp.user;
};

const addToCartRequest = async (ph, id) => {
  const decPh = decryptPhoneNumber(ph, 3);

  const resp = await fetch(
    `https://vh-apis.onrender.com/signup/addToCart?ph=${decPh}&id=${id}`
  );

  const jsonResp = await resp.json();
  console.log(jsonResp);
  return jsonResp;
};

const getCart = async (ph) => {
    const decPh = decryptPhoneNumber(ph, 3);

    
  const resp = await fetch(
    `https://vh-apis.onrender.com/signup/getCart?ph=${decPh}`
  );

  const jsonResp = await resp.json();


  return jsonResp.cart;
};

const getProducts = async()=>{
  const response = await fetch(
    "https://vh-apis.onrender.com/getAllProducts"
  );
  const data = await response.json();

  // console.log(data.allProducts)

  return data.allProducts
}

const removeFromCart = async (id)=>{
  const response = await fetch(`https://vh-apis.onrender.com/signup/removeFromCart?ph=${decryptPhoneNumber(localStorage.getItem("c"), 3)}&id=${id}`)

  const jsonData = await response.json()

  console.log(jsonData)

  return jsonData.cart
}

const createOrderRequest = async (pId,cPh,pp)=>{



  // const resp = await fetch(`http://127.0.0.1:3005/payment/createOrder?cPh=${localStorage.getItem("c")}&pId=${pId}`)
  const resp = await fetch(`https://vh-apis.onrender.com/payment/createOrder?cPh=${localStorage.getItem("c")}&pId=${pId}`)

  const respJSON = await resp.json()

  console.log(respJSON.msg.payment_session_id
  )

  return respJSON.msg.payment_session_id
}

const verifyAccessToken = async (at)=>{
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
    return userDetails.phoneNo
  } catch (error) {
    console.error("Fetch error:", error);
  }

}

module.exports = { getUser, addToCartRequest, getCart, getProducts, removeFromCart, createOrderRequest, verifyAccessToken};
