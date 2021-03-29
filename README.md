* AUTHENTICATION *

    Done in js/getData.js
    Register your application at https://developer.spotify.com/dashboard/login
    Use your own _clientID and _clientSecret

    Need to generate an accessToken to access Spotify Data by making a POST request to the API

    * Use the IIFE getToken() 
    * Endpoint https://accounts.spotify.com/api/token
    * Method POST
    * Config Object 
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

* QUESTIONS *
    * The list of questions is stored in the questions.js file
    * The generateRandomQuestion() function  
* GETTING THE DATA *

    * Use function searchQuery()
    * Parameters of the accessToken and users search value, to get to the search endpoint of the API
    * searchQuery invoked by user clicking Submit or enter within the input field
    * Query to the search enpoin of Spotify API, is the users input https://api.spotify.com/v1/search? 20 results retrieved
    * In the header of the request - 'Authorization': 'Bearer ' + _accessToken
    * Once the callback returns data, it is filtered using the filterDuplicates function - removes duplicates where the Artist and Track Name are the same.
    * Checks the value the sortBy dropdown and runs the appropriate function

* APPENDING IT TO THE DOM
    * Once the data is filtered, and sorted in the user's desired way, it is added to the dom
    * This is done using an Object Constructor method defined in js/makeTrackList
    * The class is called Track, and once called, it takes in the argument of thisTrack, and adds an album cover and a link (when the user clicks the album cover), track name (as a h3), artist name and album namd (both as h4s) as well as an audio element featuring a 30 second sample

    * The makeList method of track is calleby the populateList function in js/script.js

* SORTING BY

The sort by selection has event handlers on change called sortByPopularity, SortByRelevance, and sortAlphabetically(). Sorting alphabetically backwords uses the inbuilt reverse() function on the alphabetical result. Each function is used as a callback function in populateList
