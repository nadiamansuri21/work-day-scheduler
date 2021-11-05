let timeBlockArray = [
  { id: 1, info: "", startTime: 9, endTime: "10am" },
  { id: 2, info: "", startTime: 10, endTime: "11am" },
  { id: 3, info: "", startTime: 11, endTime: "12pm" },
  { id: 4, info: "", startTime: 12, endTime: "1pm" },
  { id: 5, info: "", startTime: 13, endTime: "2pm" },
  { id: 6, info: "", startTime: 14, endTime: "3pm" },
  { id: 7, info: "", startTime: 15, endTime: "4pm" },
  { id: 8, info: "", startTime: 16, endTime: "5pm" },
  { id: 9, info: "", startTime: 17, endTime: "6pm" },
]

function amPmConverter(val) {
  if (val < 12) {
    val = val + "am"
  } else {
    if (val > 12) {
      val = val - 12
    }
    val = val + "pm"
  }
  return val
}


function changeBgColorClass(startTime){
  // let currentHour = moment().hour()
  let currentHour = 13

  console.log(currentHour)

  if (startTime < currentHour) {
    return 'past';
  }
  
  if (startTime > currentHour) {
    return 'future';
  }

  if (startTime === currentHour) {
    return 'present';
  }

}





function timeBlockGenerator() {
  let timeBlock = ""

  if (localStorage.getItem("timeBlockArray") !== null) {
    timeBlockArray = JSON.parse(localStorage.getItem("timeBlockArray")) // convert timeBlockArray string into object again
  }

  for (let i = 0; i < timeBlockArray.length; i++) {
    timeBlock += `
                <div class="time-block">
                    <div class="hour"> ${amPmConverter(
                      timeBlockArray[i].startTime
                    )}</div>

                    <div class="info-area ${changeBgColorClass(timeBlockArray[i].startTime)}">
                        <textarea id="textarea${timeBlockArray[i].id}">${
      timeBlockArray[i].info
    }</textarea>
                    </div>

                    <div class="button-block"> 
                        <i class="fas fa-save fa-2x floppy" onclick="saveInfo('${
                          timeBlockArray[i].id
                        }')"></i>
                    </div>
                </div>`
  }

  $(".container").html(timeBlock)
}

function init() {
  timeBlockGenerator()
  currentDay()
}

$(document).ready(init)

function currentDay() {
  $("#currentDay").html(moment().format("dddd, MMMM Do, h:mm a"))
}

function saveInfo(id) {
  let val = $("#textarea" + id).val()
  modifyTimeBlockArray(id, val)
}

function modifyTimeBlockArray(id, value) {
  id = parseInt(id)

  for (let i = 0; i < timeBlockArray.length; i++) {
    if (timeBlockArray[i].id === id) {
      timeBlockArray[i].info = value
    }
  }

  console.log("timeBLockAray", timeBlockArray)
  localStorage.setItem("timeBlockArray", JSON.stringify(timeBlockArray))
}