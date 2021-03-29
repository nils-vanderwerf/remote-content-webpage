* AUTHETICATION *

Done in js/getData.js
Register your application at https://developer.spotify.com/dashboard/login
Use your own _clientID and _clientSecret

Need to generate an accessToken to access Spotify Data by making a POST request to the API

* Use the IIFE getToken() 
* Endpoint https://accounts.spotify.com/api/token
* Method POST
* Config Object - 
* headers need to be base 64 encoded
* body needs to be set to 'grant_type=client_credentials'

        {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(_clientId + ':' + _clientSecret)
        },
        body: 'grant_type=client_credentials'
    })

    response - json object with data token

    * GETTING THE DATA *

    * Use function searchQuery()
    * Parameters of the accessToken and users search value, to get to the search endpoint of the API
    * searchQuery invoked by user clicking Submit or enter within the input field
    * Query to the search enpoin of Spotify API, is the users input https://api.spotify.com/v1/search? 20 results retrieved
    * In the header of the request - 'Authorization': 'Bearer ' + _accessToken
    * When the callback returnds data, it is filtered using the filterDuplicates function - removes duplicates where the Artist and Track Name are the same.
    * Checks the value the sortBy dropdown and runs the appropriate function
