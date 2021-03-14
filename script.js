
let spotifyWebApi = require('spotify-web-api-node');
const expres
let spotifyWebApi = new spotifyWebApi ({
    clientId: '16816dc28118429aad94cb9c64ee01c2',
    clientSecret: '6effbf2c96514ec7b006252324db6a33',

})
function loadData() {
    const configurationObject = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }
    const spotifyURL = ' https://api.spotify.com.';
    fetch(spotifyURL, configurationObject)
        .then(res => res.json())
        .then(results => {
            results.message.forEach(image => addImage(image))
        });
    }

