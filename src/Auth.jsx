import React, { useEffect } from "react";

const Auth = () => {
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

  const searchParams = new URLSearchParams(window.location.search);
  const accessToken = searchParams.get("access_token");

  console.log(accessToken);

  const CLIENT_ID = "14168416091898906021";

  const httpRequest = async () => {
    try {
      const url = "https://eapi.phone.email/getuser";
      const data = new FormData();

      data.append("access_token", accessToken);
      data.append("client_id", CLIENT_ID);

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

      //   console.log(userDetails)

      localStorage.setItem(
        "logedInUser",
        encryptPhoneNumber(userDetails.phoneNo, 3)
      );
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("logedIn", true);

      document.cookie = `c=${encryptPhoneNumber(
        userDetails.phoneNo,
        3
      )}; path=/;`;

      console.log(userDetails);

      //   const cookieExpire = new Date(
      //     Date.now() + 180 * 24 * 60 * 60 * 1000
      //   ).toUTCString();
      //   document.cookie = `ph_email_jwt=${phEmailJwt}; expires=${cookieExpire}; path=/`;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const cookieString = document.cookie;
  const cookies = cookieString.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    console.log(cookie)
  }

  httpRequest();

  if (accessToken) {
    document.cookie = `at=${accessToken}; path=/;`;
  }

  return <div>Authenticating</div>;
};

export default Auth;
