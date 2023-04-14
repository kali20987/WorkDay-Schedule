

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?

// document.getElementById("hour-9").addEventListener("click", userInput);
// function userInput(){
//   console.log("In userInput: "+this);
//   localStorage.setItem("9 am", document.getElementById("hour-9-text").value); 
// }

// document.getElementsByClassName("saveBtn").addEventListener("click", saveInput);
// function saveInput(){
//   console.log("In saveInput: "+this.id);
//   localStorage.setItem(this.id, document.getElementById(this.id).value); 
// }

var saveButtons = document.getElementsByClassName('saveBtn');



for (var i = 0; i < saveButtons.length; i++) {
  (function (savedBtnIndex) {
    saveButtons[savedBtnIndex].addEventListener("click", function () {
      console.log("savedBtnIndex: " + savedBtnIndex);
      //localStorage.setItem(this.parentElement.querySelector('.hour').innerText,
      //  this.parentElement.querySelector('.description').value);

      var newScheduleItem = {
        text: this.parentElement.querySelector('.description').value,
        index: savedBtnIndex,
      };

      // newScheduleItem.scheduleText = ;
      // newScheduleItem.scheduleIndex = ;
      //scheduleItems.push(this.parentElement.querySelector('.description').value);

      scheduleItems.push(newScheduleItem);
      saveScheduleItemsToStorage(scheduleItems);
    })
  })(i);
}

// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?

// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?


// add project to local storage
var scheduleItems = readScheduleItemsFromStorage();



function readScheduleItemsFromStorage() {
  var scheduleItems = localStorage.getItem('scheduleItems');
  if (scheduleItems) {
    scheduleItems = JSON.parse(scheduleItems);
  } else {
    scheduleItems = [];
  }
  return scheduleItems;
}


function saveScheduleItemsToStorage(scheduleItems) {
  localStorage.setItem('scheduleItems', JSON.stringify(scheduleItems));
}
//window.addEventListener("load", (event) => {

//document.querySelectorAll('textarea').forEach((elem) => elem.value = "Desiered value");

loadSchedule();

function loadSchedule() {
  var items = readScheduleItemsFromStorage();
  console.log(items);
  //var descriptionList = document.getElementsByClassName('description');
  var descriptionList = document.querySelectorAll('.description');
  for (var i = 0; i < descriptionList.length; i++) {
    for (var j = 0; j < items.length; j++) {
      if (items[j].index == i) {
        descriptionList[i].innerHTML = items[j].text;
      }
    }
  }

  // for (var i = 0; i < descriptionList.length; i++) {
  //   (function (descriptionIndex) {
  //     descriptionList[descriptionIndex].addEventListener("load", function () {
  //       console.log("descriptionIndex: " + i);
  //       localStorage.getItem(this.parentElement.querySelector('.hour').innerText,
  //         this.parentElement.querySelector('.description').value);
  //     }
  // )})}
}


// $('#userInput').append("<br>");
// for (var i = 0; i < localStorage.length; i++){
//     $('#userInput').append(localStorage.key(i));
//     $('#userInput').append(":");
//     $('#userInput').append(localStorage.getItem(localStorage.key(i)));
//     $('#userInput').append("<br>");

// }




//displays date
var todayDisplay = dayjs().format("dddd, MMMM D");
$("#currentDay").text(todayDisplay);

var currentTime = dayjs().format("H");

var hourBlocks = document.querySelectorAll('.hour');

for (var i = 0; i<hourBlocks.length; i++) {
  if (hourBlocks[i].id < currentTime) {
    hourBlocks[i].parentElement.setAttribute('class','past');
  }
  if (hourBlocks[i].id == currentTime) {
    hourBlocks[i].parentElement.setAttribute('class', 'present');
  }
  if (hourBlocks[i].id > currentTime) {
    hourBlocks[i].parentElement.setAttribute('class', 'future');
  }

}


