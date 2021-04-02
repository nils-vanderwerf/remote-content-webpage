//Global variable, otherwise it resets each time generateRandom question is called
let freshQuestions = questions.slice(); 

//needs to be a global variable so it can be accessed outside of event
let searchBtn = document.getElementById('spotify-form')
let searchField = document.getElementById('search')
let searchVal; 
let sortedData;
let sortBy = document.getElementById('sortBy')

let emptyHeartText = '<i class="fa fa-heart-o"></i> Like this song'
let fullHeartText = '<i class="fa fa-heart"></i> Song liked!'

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('question-box').innerHTML = `What is your ${generateRandomQuestion()}`
})

function generateRandomQuestion() {
    
    //pick a random value from the array of fresh questions
    let random = Math.floor(Math.random() * freshQuestions.length);

    //capture the random element chosen
    let thisElement = freshQuestions[random];

    //remove it so its not chosen again
    freshQuestions.splice(random, 1)

    //If we run out of questions, reset it to the original array
    if (freshQuestions.length === 0) {
        freshQuestions = questions.slice();
    }
    return thisElement
}

searchBtn.addEventListener('submit', function(event){
    event.preventDefault();
    document.getElementById("results-list").innerHTML = ""; //Remove all previous values before loading new ones
    searchVal = document.getElementById('search').value;

    searchQuery(searchVal, _accessToken); //fetch data
    let showingResults = document.querySelector('#showing-results p')
    showingResults.innerHTML = `Showing Results for <em>${searchVal}</em>`

    document.getElementById('search').value = ''
    
    document.getElementById('question-box').innerHTML = `What is your ${generateRandomQuestion()}`
});

//Populaste the list of results
function populateList(results) {
    let container = document.getElementById('container')
    let noResult = document.getElementById('no-result')
    if (noResult !== null) {
        noResult.remove()
    }
    if (results.length === 0) {
        let para = document.createElement('p');
        para.id="no-result"
        
        let textNode = "No results for this search term"
        para.innerHTML = textNode
        container.appendChild(para)

    }
    results.forEach(track => {
        let newTrack = new Track(track)
            newTrack.makeList();
    });

}

function likerFunction(event) {
    let target = event.target
    let targetParent = target.parentNode 
    if (target.classList.contains( "fa-heart") ) {
        targetParent.innerHTML = emptyHeartText
        }
    else if ( target.classList.contains( "fa-heart-o") ) {
        targetParent.innerHTML = fullHeartText
    }
}

//grab the parent element for event delegation, for the like button
//like button not available on page load
const likerTargetParent = document.getElementById("results-list")
likerTargetParent.addEventListener('click', likerFunction)

//Change event for the filtering selector
sortBy.addEventListener('change', function(){
    if (sortedData !== undefined) {
        sortedData = sortByPreference(sortedData)
    }
 })

 //Compares two elements at a time in the see which is more similar to the users search, 
 //uses the number of words for the test case for relevance
 //each entry into the result is compared with a word from the users input
function sortByRelevance(results, input) {
    return results.map(entry => {
    let points = 0;
    let thisTitle = entry.name
    if (thisTitle.toLowerCase().includes(input.toLowerCase())) {
        points++
    }
    return {...entry, points};
}).sort((a,b) => b.points - a.points)
}

 //Compares two elements at a time in the see which is more popular, 
 //which is sorted using sort in the invoked function when sortby is changed to Popularity
 //If Item A is larger, a negative number will be returned, and it will be moved to the front
 function sortByPopularity(a, b) {
    const itemA = a.popularity 
    const itemB = b.popularity 
    return itemB - itemA
}


 //Sorts in alphabetical order
 //If titles are the same, the artist is used
function sortAlphabetically(a, b) {
    let textTrackA = a.name.toLowerCase()
    let textTrackB = b.name.toLowerCase()
    let textArtistA = a.artists[0]
    let textArtistB = b.artists[0]

    if (textTrackB - textTrackA === 0) {
       return (textArtistA < textArtistB) ? -1 : 1
    } else {
        return (textTrackA < textTrackB) ? -1 : 1
    }
}

//Filter out duplicates in the results - same 
function filterDuplicates(itemsArray) {
    itemsArray = itemsArray.filter((item, index, self) =>
    index === self.findIndex((i) => (
        i.artists[0].name === item.artists[0].name && i.name === item.name
    )
)
)
return itemsArray;
}


