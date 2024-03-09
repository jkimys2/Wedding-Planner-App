const QRCode = require("qrcode");

QRCode.toString(
  "https://rendering.mcp.cimpress.com/v2/vp/preview?height=500&instructions_uri=https%3A%2F%2Finstructions.documents.cimpress.io%2Fv3%2Finstructions%3Apreview%3FdocumentUri%3Dhttps%253a%252f%252fstorage.documents.cimpress.io%252fv3%252fdocuments%252f1fa9daa7-f604-40d8-b722-3368137abd49%252frevisions%252f5bde7a87-8562-460c-a0d8-b2e975e09f9c&scene=https%3A%2F%2Fcdn.scenes.documents.cimpress.io%2Fv3%2Fassets%2Fb967df9c-d0e2-44b1-b8d7-edeb69564c90%2Fcontent&width=1000",
  [{ type: "terminal" }, { small: true }],
  function (err, url) {
    console.log(url);
  }
);
