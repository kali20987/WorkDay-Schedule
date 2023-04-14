
var saveButtons = document.getElementsByClassName('saveBtn');


//this is for the save button so when the user clicks on it then their input is saved to the local storage.
for (var i = 0; i < saveButtons.length; i++) {
  (function (savedBtnIndex) {
    saveButtons[savedBtnIndex].addEventListener("click", function () {
      console.log("savedBtnIndex: " + savedBtnIndex);
      

      var newScheduleItem = {
        text: this.parentElement.querySelector('.description').value,
        index: savedBtnIndex,
      };

      scheduleItems.push(newScheduleItem);
      saveScheduleItemsToStorage(scheduleItems);
    })
  })(i);
}


//this code reads and saves the user inputed items from the local storage.
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


loadSchedule();
//I used a nested for loop here in order to have the items load and display
function loadSchedule() {
  var items = readScheduleItemsFromStorage();
  console.log(items);
  
  var descriptionList = document.querySelectorAll('.description');
  for (var i = 0; i < descriptionList.length; i++) {
    for (var j = 0; j < items.length; j++) {
      if (items[j].index == i) {
        descriptionList[i].innerHTML = items[j].text;
      }
    }
  }
}


//this displays the current date and time
var todayDisplay = dayjs().format("dddd, MMMM D");
$("#currentDay").text(todayDisplay);

var currentTime = dayjs().format("H");

var hourBlocks = document.querySelectorAll('.hour');
//this sets the class for the blocks
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


