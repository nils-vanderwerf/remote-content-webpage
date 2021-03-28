console.log(_accessToken)
//Global variable, otherwise it resets each time generateRandom question is called
let freshQuestions = questions.slice(); 

let searchVal; //needs to be a global variable so it can be accessed outside of event
let sortedData;
let sortByValue = document.getElementById('sortBy').value
let sortBy = document.getElementById('sortBy')

sortBy.addEventListener('change', function(){

    sortByValue = document.getElementById('sortBy').value
        document.getElementById("results-list").innerHTML = ""
        if (sortByValue === 'relevance') {
          
            sortedData = sortByRelevance(sortedData, searchVal)
            populateList(sortedData)
        }
        else if (sortByValue === 'popularity') {
            sortedData = sortedData.sort(sortByPopularity)
            populateList(sortedData)
        }
 })

function generateRandomQuestion() {
    
    //pick a random value from the array of fresh questions
    let random = Math.floor(Math.random() * freshQuestions.length);

    //capture the random element chosen
    let thisElement = freshQuestions[random];
    console.log(freshQuestions, random, thisElement)
    //remove it so its not chosen again
    freshQuestions.splice(random, 1)

    //If we run out of questions, reset it to the original array
    if (freshQuestions.length === 0) {
        freshQuestions = questions.slice();
    }
    return thisElement
}

document.addEventListener('DOMContentLoaded', function(){
    setInputText();
})



function sortByPopularity(a, b) {
    const itemA = a.popularity 
    const itemB = b.popularity 

    return itemB - itemA
}


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


function setInputText() {
    let inputText = document.getElementById('search').setAttribute('placeholder', `What is your ${generateRandomQuestion()}`);
}
  
let searchBtn = document.getElementById('spotify-form')
let searchField = document.getElementById('search')

searchField.addEventListener('focus', function() {
document.getElementById('search').value  = ""
})

searchBtn.addEventListener('submit', function(event){
    event.preventDefault();
    document.getElementById("results-list").innerHTML = ""; //Remove all previous values before loading new ones
    searchVal = document.getElementById('search').value;

    searchQuery(searchVal, _accessToken); //fetch data
    let showingResults = document.querySelector('#showing-results p')
    showingResults.innerHTML = `Showing Results for <em>${searchVal}</em>`

    document.getElementById('search').value = ''
    
    document.getElementById('search').setAttribute('placeholder', `What is your ${generateRandomQuestion()}`)
});


function filterDuplicates(itemsArray) {
    itemsArray = itemsArray.filter((item, index, self) =>
    index === self.findIndex((i) => (
        i.artists[0].name === item.artists[0].name && i.name === item.name
    )
)
)
return itemsArray;
}


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