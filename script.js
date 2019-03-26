//query form
var form  = document.getElementById('query-form');

//input text field
var query  = document.getElementById('query');

//append to list data 
var list  = document.getElementById('data');

// list of keywords to guess from
var keywords = ['Blackpink', 'Dinosaurs', 'Cars', 'Fish', 'Sports', 'Architecture', 'Food', 'Drinks'];

//onload
var answerText = getGuessButton();
getDefaultPhotos(answerText);


function getGuessButton(){
    
    var list = document.getElementById('list');
    let answer = "";

    for(let i = 0; i < 4; i++){
        const randomNo = Math.floor(Math.random() * keywords.length); 
        
        guessBtnName = keywords[randomNo];
        // set answer
        answer = guessBtnName;

        var guessBtn = document.createElement('button');
        guessBtn.innerHTML = guessBtnName;
        //guessBtn.setAttribute('onclick','getUserClickedBtn()')
        list.appendChild(guessBtn);    
        
        guessBtn.onclick = getUserClickedBtn // refer to getUserClickedBtn but not calling that function to run
    }

    return answer; 
}

function getDefaultPhotos(answer){
    fetch('https://api.tumblr.com/v2/tagged?tag=' + answer + '&api_key=VRgx3qGqUkHZrGiUWS0kHrnm3ZNJXrIHCfRsymAuLfAXrepoin')
    .then(function(response){
        return response.json(); // convert the raw response into a JSON
      })
    .then(function(result){
        console.log(result)      
        //clear list 
        list.innerHTML = '';

        var items = result.response;
        
        for(let i = 0; i < items.length; i++){
            var item = items[i];

            //check if item.photos[0] is undefined
            if(item.photos != undefined){
                var altSizes = item.photos[0].alt_sizes;
                var imgSrc = altSizes[altSizes.length - 2].url;
                var imgTimestmp = timestmpToDate(item.timestamp);

                var img = document.createElement('img');
                img.src = imgSrc;

                var caption = document.createElement('p');
                caption.innerHTML = imgTimestmp;

                var li = document.createElement('div');
    
                list.appendChild(li);
                li.appendChild(img);
            }
        }
    })
}
function getUserClickedBtn(event){
  var clickBtnText = event.target.innerHTML;
  
  if(clickBtnText == answerText){
    alert("Well done!");
  }
  else{
    alert("Boo! Try again..");
  }

  window.location.reload();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
form.onsubmit = function(event){
    event.preventDefault();

    //get value from input field
    const queryText = query.value;

    getTaggedPhotos(queryText);
}
*/

//convert timestamp to readable Time(Except Date)
function timestmpToDate(t){
    var dt = new Date(t*000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);
}
