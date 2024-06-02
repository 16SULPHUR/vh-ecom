import React, { useState } from "react";

const faqs = [
  {
    category: "ORDER",
    icon: (
      <svg
        aria-hidden="true"
        focusable="false"
        fill="none"
        strokeWidth="1.6"
        width="20"
        className="icon icon-picto-box mr-2"
        viewBox="0 0 24 24"
      >
        <path
          clipRule="evenodd"
          d="M.75 5.25 12 9.75l11.25-4.5L12 .75.75 5.25Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          clipRule="evenodd"
          d="M.75 5.25v13.5L12 23.25V9.75L.75 5.25v0Zm22.5 0v13.5L12 23.25V9.75l11.25-4.5v0Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="m18.187 7.275-11.25-4.5M20.625 16.5l-1.875.75"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
    items: [
      {
        question: "I need general assistance?",
        answer: (
          <>
            Mail - <a href="mailto: supatil1975@gmail.com" className="text-blue-500 underline">supatil1975@gmail.com</a>. We will reply within 12 hours. <strong>Sunday off.</strong>
          </>
        ),
      },
      {
        question: "Can I get a colour exchange?",
        answer: (
          <>
            We don't have an exchange or return policy. So kindly order your colour correctly.
          </>
        ),
      },
      {
        question: "Where is my order?",
        answer: (
          <>
            Tracking ID is sent to your email and on WhatsApp within 4 days after the order has been placed. You can track your orders online with the tracking number provided by the respective courier company. 📌 Check spam folder too in email.<br/><br/> You can also track your order status in the 'My Orders' section on our website.
          </>
        ),
      },
      {
        question: "Do you provide COD?",
        answer: "No COD. Prepay Only.",
      },
    ],
  },
  {
    category: "EXCHANGES",
    icon: (
      <svg
        aria-hidden="true"
        focusable="false"
        fill="none"
        strokeWidth="1.6"
        width="20"
        className="icon icon-picto-return mr-2"
        viewBox="0 0 24 24"
      >
        <path
          d="m1.25 15.08 2.207-3.384 3.385 2.206"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M13.13 2.5a9.525 9.525 0 1 1 0 19.049 9.68 9.68 0 0 1-9.673-9.853"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
    items: [
      {
        question: "Can I get a different product?",
        answer: "Company does not have any exchange or return policy. So customers are requested to order your product correctly.",
      },
    ],
  },
  {
    category: "DOMESTIC SHIPPING",
    icon: (
      <svg
        aria-hidden="true"
        focusable="false"
        fill="none"
        strokeWidth="1.6"
        width="20"
        className="icon icon-picto-delivery-truck mr-2"
        viewBox="0 0 24 24"
      >
        <path
          d="M23.25 13.5V6a1.5 1.5 0 0 0-1.5-1.5h-12A1.5 1.5 0 0 0 8.25 6v6m0 0V6h-3a4.5 4.5 0 0 0-4.5 4.5v6a1.5 1.5 0 0 0 1.5 1.5H3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M.75 12h3a1.5 1.5 0 0 0 1.5-1.5V6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          clipRule="evenodd"
          d="M7.5 19.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm12 0a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M12 18h3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
    items: [
      {
        question: "What is my shipping cost & delivery time?",
        answer: (
          <>
            Free delivery anywhere in India. Please expect the following delivery times:
            <ul className="list-disc list-inside ml-4">
              <li>Gujarat – 4-7 working days.</li>
              <li>India– 7-12 Working Days.</li>
              <li>Village area -10 - 15 days.</li>
            </ul>
            Certain pin codes in J&K, Punjab or Northeast India may take slightly longer. Sundays, National & State specific holidays may affect delivery times.
          </>
        ),
      },
      {
        question: "Can I get express shipping?",
        answer: "We don't have any express shipping for now.",
      },
      {
        question: "How to track my order?",
        answer: (
          <>
            Tracking Number will be sent to your email ID in 4 days when your order is shipped, not when it is placed. Please check your email inbox for the tracking ID (Check Spam folder too). WhatsApp us if you need the tracking ID to be resent or need any help.<br/><br/> You can also track your order status in the 'My Orders' section on our website.
          </>
        ),
      },
    ],
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      {faqs.map((faqCategory, categoryIndex) => (
        <div key={categoryIndex} className="mb-8">
          <div className="flex items-center mb-2">
            {faqCategory.icon}
            <h3 className="text-xl font-semibold">{faqCategory.category}</h3>
          </div>
          {faqCategory.items.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 mb-2">
              <button
                onClick={() => toggleAccordion(`${categoryIndex}-${index}`)}
                className="w-full text-left py-4 flex justify-between items-center"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <span className="ml-2">{openIndex === `${categoryIndex}-${index}` ? "-" : "+"}</span>
              </button>
              {openIndex === `${categoryIndex}-${index}` && (
                <div className="py-2 text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
