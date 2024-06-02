import React from 'react';

const Invoice = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const src = searchParams.get("src");

  return (
    <div>
      {/* <h1>Invoice</h1> */}
      {src ? (
        <object data={src} type="application/pdf" width="100%" height="700px">
          <p>Your browser does not support PDFs. <a href={src}>Download the PDF</a>.</p>
        </object>
      ) : (
        <p>No invoice source provided.</p>
      )}
    </div>
  );
};

export default Invoice;
