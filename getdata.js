/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

 var accessToken;
var clientId = '16816dc28118429aad94cb9c64ee01c2'; // Your client id
 var clientSecret = 'd34aa51bb8b6412a9a7dbd7eb776e585'; // Your secret
 getToken();
 
 //Change to a post request
 function getToken() {
     fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        JSON.stringify(data);
        accessToken = data.access_token;
        console.log(accessToken)
    })
    .catch((error) => {
        console.log(error);
    })
    }
 