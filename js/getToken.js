let _accessToken;
const _clientId = '16816dc28118429aad94cb9c64ee01c2'; // Your client id
const _clientSecret = 'd34aa51bb8b6412a9a7dbd7eb776e585'; // Your secret
 
//IIFE which retrieves token
let getToken = function(){
    
     fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(_clientId + ':' + _clientSecret)
        },
        body: 'grant_type=client_credentials'
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        JSON.stringify(data);
        _accessToken = data.access_token;
        return _accessToken;
    })
    .catch((error) => {
        console.log(error);
        let container = document.getElementById('spotify-container')
        let errorMsg = document.createElement('p')
        errorMsg.innerHTML('Error: unable to process results')
        container.appendChild(errorMsg);
    })
    }();


//Using access token in getdata.js
function searchQuery(searchValue, token) {

    //   const log = document.getElementById('log');
    //   form.addEventListener('submit', logSubmit);

    let searchBtn = document.getElementById('spotify-form');

    if (token != undefined) {
        //replace spaces with + signs as thats what url accepts for string
        let concatString = searchValue.split(' ').join('+');
        fetch(`https://api.spotify.com/v1/search?q=${searchValue}&offset=0&limit=20&type=track`, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            }
            })
        .then(response => {
            return response.json()
        })
        .then(data => {  
            //change to a function for filterDuplicates, sortDatas
       
            //Filter out duplicates i.e tracks with the same artist
            //https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
           const filteredData = filterDuplicates(data.tracks.items)
        
            
            if (sortByValue === 'relevance') {
                sortedData = sortByRelevance(data.tracks.items, searchValue)
                populateList(sortedData);
            } 

            else if (sortByValue === 'popularity') {
                sortedData = filteredData
                sortedData = sortedData.sort(sortByPopularity)
            }

            })

        .catch(error => {
            console.log(error);
        });
    }
}