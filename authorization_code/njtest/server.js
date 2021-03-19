
  /* Load the HTTP library */
  var http = require("http");

    /* Create an HTTP server to handle responses */

    http.createServer(function(request, response) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
      }).listen(8888);



// document.addEventListener("DOMContentLoaded", getToken());
//   console.log("Hello")
//     const clientId = '16816dc28118429aad94cb9c64ee01c2';
//     const clientSecret = 'd34aa51bb8b6412a9a7dbd7eb776e585';
//     let myToken;

// // Acquire Access token
// const getToken = async () => { 
//     const result = await fetch('https://accounts.spotify.com/api/token', {
//         method: 'POST',   
//         headers: {
//             'Content-Type' : 'application/x-www.form-urlencoded',
//             'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret) //btoa Encodes data to base 64
//         },
//         body: 'grant_type=client_credentials'
//     });
//     const data = await result.json();
//     myToken = getToken(token);
//     return data.access_token;
// }
// myToken = getToken();
// console.log(myToken);



// /*


//     //Using this token, get data
//     const searchArtists = async(token) => {
//     const result = await fetch ('https://api.spotify.com/v1/search?query=glass+animals&offset=0&limit=20&type=artist', {
//         method: 'GET',
//         headers: {'Authorization' : 'Bearer ' + token}
//     });

//     const data = await result.json();
//     const stringifyData = JSON.stringify(data);
//     console.log(stringifyData); 
//     return stringifyData.artists;
//     }

//     searchArtists(myToken);
// })();


//     /*

//     // private methods
//     let accessToken = fetch('')
//     let getData = fetch('https://api.spotify.com/v1/artists/21E3waRsmPlU7jZsS13rcj', {
//         method: 'GET', 
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer: ${btoa(clientId+clientSecret)}`
//         },
//         body: {
//                 "external_urls": {
//                   "spotify": "https://open.spotify.com/artist/0TnOYISbd1XYRBk9myaseg"
//                 },
//                 "followers": {...},
//                 "genres": ["pop","latin",...],
//                 "href": "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg",
//                 "id": "0TnOYISbd1XYRBk9myaseg",
//                 "images": [
//                   {
//                     "height": 640,
//                     "url": "https://i.scdn.co/image/89863fff0d540475d6fd25e7435138a4e5bd7216",
//                     "width": 640
//                   },
//                   {
//                     "height": 320,
//                     "url": "https://i.scdn.co/image/38e8be4aed5050c7b0bcf197a86b0e7b5cbb5ddc",
//                     "width": 320
//                   },
//                   {
//                     "height": 160,
//                     "url": "https://i.scdn.co/image/8573757d9c37eb5178ba8d34a6d6239b055fdf99",
//                     "width": 160
//                   }
//                 ],
//                 "name": "Pitbull",
//                 "popularity": 85,
//                 "type": "artist",
//                 "uri": "spotify:artist:0TnOYISbd1XYRBk9myaseg"
//               }
//     })
//         .then((response) => {
//             console.log(response.json()).then(
//                 (data) => { console.log(JSON.stringify(data)) })
//                 .catch((error) => console.error(`The error is ${error}`))
//         })
//     }

//     console.log(getData);

//     });
// });

// */