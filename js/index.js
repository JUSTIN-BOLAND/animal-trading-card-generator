$(function() {
  $('[data-toggle="popover"]').popover()
})

//Generating empty script elements which will be used for API implementation up to the query input.
window.onload = function() {
  let information = document.createElement('script')
  information.id = 'information'
  information.type = 'text/javascript'
  document.head.append(information)

  let facts = document.createElement('script')
  facts.id = 'facts'
  facts.type = 'text/javascript'
  document.head.append(facts)

  let scientificName = document.createElement('script')
  scientificName.id = 'scientificName'
  scientificName.type = 'text/javascript'
  document.head.append(scientificName)

  let lifespan = document.createElement('script')
  lifespan.id = 'lifespan'
  lifespan.type = 'text/javascript'
  document.head.append(lifespan)
}

// reloads the page which can be triggered "Reset" button.
// In myFunc() "Submit" will be hidden to force user to push "Reset" for a brand new search.

function reLoad() {
  location.reload()
}

//first function which will be triggered with submit button, It would be implemented first API
//(which will be used for general information) and calling back information(response).
//All of the API's are using queryinput as a seach term.

function myFunc() {
  const hideSubmit = document.getElementById('submit')
  hideSubmit.style.display = 'none'
  const queryInput = document.getElementById('query').value
  let scriptChange = document.getElementById('information')
  scriptChange.src =
    'https://www.googleapis.com/customsearch/v1?key=AIzaSyDt0R1NakICIfNoUjNBjQEU3BlIr_QhtHY&cx=partner-pub-4004792896178081:8406642760&q=' +
    queryInput +
    '&siteSearch=https://en.wikipedia.org/wiki/&callback=information'
  document.getElementById('title').innerHTML = queryInput.toUpperCase()
  document.getElementById('image').setAttribute('alt', queryInput)
  let colorBackGround =
    'background-color:' + document.getElementById('colorPicker').value
  document.getElementById('shiftColor').setAttribute('style', colorBackGround)
  let colorCardBackGround =
    'background-color:' + document.getElementById('colorPickerCard').value
  document
    .getElementById('shiftCardColor')
    .setAttribute('style', colorCardBackGround)
}

//This function gathers information from search results and manipulating DOM.
//Also image which will be shown into the card choosen from the search results into this function.
//At the end It would be implemented second API (which will be used for gathering facts or interesting facts)
//and calling back facts(response)

function information(response) {
  //searching for information
  //to store information in an array (snippetOut[])
  //searching for image

  let snippetOut = []
  let pagemapOut = []
  console.log(response)
  for (let i = 0; i < response.items.length; i++) {
    let item = response.items[i]
    let snippet = item.snippet
    let pagemap = item.pagemap
    snippetOut.push(snippet)
    pagemapOut.push(pagemap)
  }

  //eliminating values which won't lead to the image
  //to store values which have possibilities to have an image in an array (pagemapOutFiltered[])

  let pagemapOutFiltered = []

  pagemapOut.forEach(function(pagemapOut) {
    if (pagemapOut !== undefined) {
      pagemapOutFiltered.push(pagemapOut)
    }
  })

  //eliminating values which is not an image
  //to store images in an array (cseimagefiltered[])

  let cseimagefiltered = []

  pagemapOutFiltered.forEach(function(pagemapOutFiltered) {
    let filter = pagemapOutFiltered.cse_image
    if (filter !== undefined) {
      cseimagefiltered.push(filter)
    }
  })

  //choosing a random image from an array which has generated in previous step

  let a = Math.floor(Math.random() * cseimagefiltered.length)
  let choose = cseimagefiltered[a]
  let image = choose[0].src

  //choosing a random information from an array whicn has already generated (snippetOut[])
  //manipulating DOM
  //setting following script to do proper search for interesting facts

  let b = Math.floor(Math.random() * snippetOut.length)
  document.getElementById('informationString').innerHTML = snippetOut[b]
  document.getElementById('image').setAttribute('src', image)
  const queryInput = document.getElementById('query').value
  let scriptChange = document.getElementById('facts')
  scriptChange.src =
    'https://www.googleapis.com/customsearch/v1?key=AIzaSyDt0R1NakICIfNoUjNBjQEU3BlIr_QhtHY&cx=partner-pub-4004792896178081:8406642760&q=' +
    queryInput +
    '&exactTerms=interesting+facts&callback=facts'
}

//This function gathers facts or interesting facts from search results and manipulating DOM .
//At the end It would be implemented third API (which will be used for gathering scientific name)
//and calling back function scientificName(response)

function facts(response) {
  //calling back snippetOut(response)

  let getFacts = snippetOut(response)

  //choosing a random facts from an array whicn has already generated (snippetOut[])
  //manipulating DOM
  //setting following script to do proper search for scientific name

  let b = Math.floor(Math.random() * getFacts.length)
  document.getElementById('factsString').innerHTML = getFacts[b]
  const queryInput = document.getElementById('query').value
  let scriptChange = document.getElementById('scientificName')
  scriptChange.src =
    'https://www.googleapis.com/customsearch/v1?key=AIzaSyDt0R1NakICIfNoUjNBjQEU3BlIr_QhtHY&cx=partner-pub-4004792896178081:8406642760&q=' +
    queryInput +
    '&exactTerms=scientific+name&callback=scientificName'
}

//This function gathers scientific name from search results and manipulating DOM.
//At the end It would be implemented forth API (which will be used for gathering lifespan)
//and calling back function lifespan(response)

function scientificName(response) {
  //calling back snippetOut(response)

  let scientificNameArray = snippetOut(response)

  //Checking If there are any relevant search result
  //setting following script to do proper search for lifespan

  if (
    scientificNameArray ===
    "Sorry, there is not any relevant search results to be shown :'("
  ) {
    document.getElementById('scientificNameString').innerHTML =
      'Scientific Name:' + scientificNameArray
    const queryInput = document.getElementById('query').value
    let scriptChange = document.getElementById('lifespan')
    scriptChange.src =
      'https://www.googleapis.com/customsearch/v1?key=AIzaSyDt0R1NakICIfNoUjNBjQEU3BlIr_QhtHY&cx=partner-pub-4004792896178081:8406642760&q=' +
      queryInput +
      '&exactTerms=lifespan&callback=handlerrr'
  } else {
    let scientific = []
    let scientificSingle = []

    //searching exact term "scientific name" (incase sensitive) in previously generated array (scientificNameArray[])
    //to slice all the elements of arrays from the begining of "scientific name"
    //generating two different arrays (scientific[] and scientificSingle[])
    //scientific[] 's elements generated as two words after "scientific name"
    //scientificSingle[] ' s elements generated as a single word after "scientific name"

    for (let i = 0; i < scientificNameArray.length; i++) {
      let findName = scientificNameArray[i].search(/Scientific name/i)

      if (findName !== -1) {
        let nameString = scientificNameArray[i].slice(
          findName,
          scientificNameArray[i].length
        )
        let arrayName = nameString.split(' ')

        let arrayNameFiltered = []
        for (let w = 2; w < arrayName.length; w++) {
          if (arrayName[w].replace(/[^A-Za-z0-9_]/g, '') !== undefined) {
            arrayNameFiltered.push(
              arrayName[w].replace(/[^A-Za-z0-9_]/g, '').toUpperCase()
            )
          }
        }

        let findNameValue = arrayNameFiltered[0] + ' ' + arrayNameFiltered[1]
        let findNameValueSingle = arrayNameFiltered[0]
        scientific.push(findNameValue)
        scientificSingle.push(findNameValueSingle)
      }
    }

    let scientificSingleFiltered = scientificSingle
      .filter(filter => filter !== '')
      .filter(filter => filter !== undefined)
    let scientificFiltered = scientific
      .filter(filter => filter !== '')
      .filter(filter => filter !== undefined)
      .filter(filter => filter !== 'undefined undefined')

    //Checking If both arrays have any element

    if (
      scientificFiltered.length !== 0 ||
      scientificSingleFiltered.length !== 0
    ) {
      //Calling back mostRelevantIndex(array)

      let callDouble = mostRelevantIndex(scientificFiltered)
      let callSingle = mostRelevantIndex(scientificSingleFiltered)

      //Checking If there are any repeated result
      //manipulating DOM

      if (callDouble[0] === 1 && callSingle[0] === 1) {
        //If all of the results are unique , choosing a random result from the array scientificSingleFiltered[]

        let c = Math.floor(Math.random() * scientificSingleFiltered.length)
        document.getElementById('scientificNameString').innerHTML =
          '<br>' +
          'Scientific Name:' +
          '<em>' +
          ' ' +
          scientificSingleFiltered[c] +
          '</em>'

        //Checking If the results which have two words repeated more then single words
        //manipulating DOM with the most repeated two word element from scientific[] array
      } else if (callDouble[0] >= callSingle[0] || callDouble[0] >= 3) {
        document.getElementById('scientificNameString').innerHTML =
          '<br>' +
          'Scientific Name:' +
          '<em>' +
          ' ' +
          scientificFiltered[callDouble[1]] +
          '</em>'

        //Checking If the results which have single word repeated more then two words
        //manipulating DOM with the most repeated single word element from scientificSingleFiltered[] array
      } else if (callDouble[0] < callSingle[0]) {
        document.getElementById('scientificNameString').innerHTML =
          '<br>' +
          'Scientific Name:' +
          '<em>' +
          ' ' +
          scientificSingleFiltered[callSingle[1]] +
          '</em>'
      }

      //setting following script to do proper search for scientific name

      const queryInput = document.getElementById('query').value
      let scriptChange = document.getElementById('lifespan')
      scriptChange.src =
        'https://www.googleapis.com/customsearch/v1?key=AIzaSyDt0R1NakICIfNoUjNBjQEU3BlIr_QhtHY&cx=partner-pub-4004792896178081:8406642760&q=' +
        queryInput +
        '&exactTerms=lifespan&callback=lifespan'
    }
  }
}

//This function gathers lifespan from search results and manipulating DOM.

function lifespan(response) {
  //calling back snippetOut(response)

  let getLifespan = snippetOut(response)

  //Checking If there are any relevant search result
  //Manipulating DOM

  if (
    getLifespan ===
    "Sorry, there is not any relevant search results to be shown :'("
  ) {
    document.getElementById('lifespanString').innerHTML =
      '<br>' + 'Lifespan:' + getLifespan
  } else {
    let arrayLifespanOut = []
    let lifespanStringOut = []

    //searching exact term "lifespan" (incase sensitive) in previously generated array (getLifespan[])

    getLifespan.forEach(function(getLifespan) {
      let findLifespan = getLifespan.search(/lifespan/i)

      //Generating an array which have lifespan word in all of its elements (lifespanString[])

      if (findLifespan !== -1) {
        let lifespanString = getLifespan.slice(findLifespan, getLifespan.length)
        let arrayLifespan = lifespanString.split(' ')
        arrayLifespanOut.push(arrayLifespan)
        lifespanStringOut.push(lifespanString)
      }
    })

    //calling back searchLifespan(arrString, timeperiod)
    //searching exact strings with this order --> "years","months","weeks","days","hours"
    //A string will be shown in the card which includes on of previous words. (in order to which one found first)
    //manipulating DOM properly

    let timePeriodArray = searchLifespan(lifespanStringOut, 'years')

    if (timePeriodArray.length !== 0) {
      let d = Math.floor(Math.random() * timePeriodArray.length)
      document.getElementById('lifespanString').innerHTML =
        '<br>' +
        timePeriodArray[d].charAt(0).toUpperCase() +
        timePeriodArray[d].slice(1)
    } else {
      let timePeriodArray = searchLifespan(lifespanStringOut, 'months')

      if (timePeriodArray.length !== 0) {
        let d = Math.floor(Math.random() * timePeriodArray.length)
        document.getElementById('lifespanString').innerHTML =
          '<br>' +
          timePeriodArray[d].charAt(0).toUpperCase() +
          timePeriodArray[d].slice(1)
      } else {
        let timePeriodArray = searchLifespan(lifespanStringOut, 'weeks')

        if (timePeriodArray.length !== 0) {
          let d = Math.floor(Math.random() * timePeriodArray.length)
          document.getElementById('lifespanString').innerHTML =
            '<br>' +
            timePeriodArray[d].charAt(0).toUpperCase() +
            timePeriodArray[d].slice(1)
        } else {
          let timePeriodArray = searchLifespan(lifespanStringOut, 'days')

          if (timePeriodArray.length !== 0) {
            let d = Math.floor(Math.random() * timePeriodArray.length)
            document.getElementById('lifespanString').innerHTML =
              '<br>' +
              timePeriodArray[d].charAt(0).toUpperCase() +
              timePeriodArray[d].slice(1)
          } else {
            let timePeriodArray = searchLifespan(lifespanStringOut, 'hours')

            if (timePeriodArray.length !== 0) {
              let d = Math.floor(Math.random() * timePeriodArray.length)
              document.getElementById('lifespanString').innerHTML =
                '<br>' +
                timePeriodArray[d].charAt(0).toUpperCase() +
                timePeriodArray[d].slice(1)
            }
          }
        }
      }
    }
  }
}

//searching a given string "timeperiod", inside a given array "arrString[]"

function searchLifespan(arrString, timeperiod) {
  let findLifespanValue = []
  let stringTimeperiodOut = []

  for (let i = 0; i < arrString.length; i++) {
    let lifespanValue = arrString[i].search(timeperiod)

    if (lifespanValue !== -1) {
      let stringTimeperiod = arrString[i].slice(
        arrString[0],
        lifespanValue + timeperiod.length
      )
      stringTimeperiodOut.push(stringTimeperiod)
    }
  }
  return stringTimeperiodOut
}

//this function is being used inside other functions to find the index number which has maximum value in an array.

function indexMax(array) {
  if (array.length === 0) {
    return -1
  }
  let max = array[0]
  let maxIndex = 0

  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      maxIndex = i
      max = array[i]
    }
  }
  return maxIndex
}

//this function is being used to find a relevant scientific name inside the results.

function mostRelevantIndex(array) {
  let findHighestObject = []
  let scientificDuplicate = array.slice(0)

  for (let i = 0; i < array.length; i++) {
    let count = 0

    for (let w = 0; w < scientificDuplicate.length; w++) {
      if (array[i] === scientificDuplicate[w]) {
        count++
      }
    }

    if (count > 0) {
      let findHighest = new Object()
      findHighest.value = array[i]
      findHighest.count = count
      findHighestObject.push(findHighest)
    }
  }
  let arrayFindHighest = []

  findHighestObject.forEach(function(findHighestObject) {
    let findHighestCount = findHighestObject.count
    arrayFindHighest.push(findHighestCount)
  })
  let highestIndex = indexMax(arrayFindHighest)
  let highestCount = findHighestObject[highestIndex].count
  return [highestCount, highestIndex]
}

// this function is being used to gather first mass data from the search results and
// store all to an array which is calling snippetOut.

function snippetOut(response) {
  let snippetOut = []

  if (response.items !== undefined) {
    for (let i = 0; i < response.items.length; i++) {
      let item = response.items[i]
      let snippet = item.snippet
      snippetOut.push(snippet)
    }
    return snippetOut
  } else {
    return "Sorry, there is not any relevant search results to be shown :'("
  }
}
/*
// Get the modal
let queryModal = document.getElementById('queryModal');
let resetModal = document.getElementById('resetModal');
// Get the button that opens the modal
let btn = document.getElementById("query");
let resetBtn = document.getElementById("reload");

// Get the <span> element that closes the modal
let killQuery = document.getElementsByClassName("closeQuery")[0];
let killReset = document.getElementsByClassName("closeReset")[0];


// When the user clicks the button, open the modal
btn.onclick = function() {
    queryModal.style.display = "block";
  resetBtn.onmouseover = function () {
  resetModal.style.display = "block";
}
}



// When the user clicks on <span> (x), close the modal
killQuery.onclick = function() {
    queryModal.style.display = "none";

}

killReset.onclick = function() {
   resetModal.style.display = "none";
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == queryModal || event.target == resetModal) {
        queryModal.style.display = "none";
        resetModal.style.display = "none";
    }
}


window.onwheel = function(event) {
    if (event.target == queryModal || event.target == resetModal) {
        queryModal.style.display = "none";
        resetModal.style.display = "none";
    }
}*/
/*let resetBtn = document.getElementById("reload");
 resetBtn.onmouseover = function () {
 resetBtn.popover();
}*/
