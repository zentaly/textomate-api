window.addEventListener("message", orderCheckout, false);

function orderCheckout(event) {
  if (event.origin == "textomate.com") {
  	var order = JSON.parse(event.data);
    
    // order has following details:

 	// {
	//   "customerName": "Alexander",
	//   "customerEmail": "alexander@gmail.com",
	//   "creationDate": "2017-12-28T15:47:28.145Z",
	//   "slang": "English",
	//   "tlang": "French,German,Italian",
	//   "estimatedPrice": 603.4,
	//   "industryName": "Finance",
	//   "serviceTypeName": "Editing",
	//   "orderAttachments": [
	//     {
	//       "fileName": "knolly-page.pdf",
	//       "md5": "1bb5cf39281744dd7a73f3bbcdcdccb6",
	//       "wordCount": 878
	//     },
	//     {
	//       "fileName": "knolly-spec.pdf",
	//       "md5": "cb2487a413455ed8c4b3b5e48cd3ddef",
	//       "wordCount": 28
	//     }
	//   ]
	// }

  }
}

