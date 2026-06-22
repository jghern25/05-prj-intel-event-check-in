let totalCount = 0;
let waterCount = 0;
let zeroCount = 0;
let powerCount = 0;
let attendeeList = [];

const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const progressBar = document.getElementById("progressBar");
const celebrationMessage = document.getElementById("celebrationMessage");
const attendeeListItems = document.getElementById("attendeeListItems");

const teamNames = {
  water: "Team Water Wise",
  zero: "Team Net Zero",
  power: "Team Renewables",
};

function saveToLocalStorage() {
  const data = {
    totalCount: totalCount,
    waterCount: waterCount,
    zeroCount: zeroCount,
    powerCount: powerCount,
    attendeeList: attendeeList,
  };
  localStorage.setItem("eventData", JSON.stringify(data));
}

function loadFromLocalStorage() {
  const savedData = localStorage.getItem("eventData");
  if (savedData) {
    const data = JSON.parse(savedData);
    totalCount = data.totalCount;
    waterCount = data.waterCount;
    zeroCount = data.zeroCount;
    powerCount = data.powerCount;
    attendeeList = data.attendeeList;
  }
}

function updateDisplay() {
  document.getElementById("attendeeCount").textContent = totalCount;
  document.getElementById("waterCount").textContent = waterCount;
  document.getElementById("zeroCount").textContent = zeroCount;
  document.getElementById("powerCount").textContent = powerCount;

  const progressPercent = Math.min(totalCount * 10, 100);
  progressBar.style.width = progressPercent + "%";

  updateAttendeeList();
}

function updateAttendeeList() {
  attendeeListItems.innerHTML = "";
  for (let i = 0; i < attendeeList.length; i++) {
    const attendee = attendeeList[i];
    const li = document.createElement("li");
    li.textContent = attendee.name + " - " + attendee.team;
    attendeeListItems.appendChild(li);
  }
}

function displayCelebration() {
  const winningTeam = getWinningTeam();
  const message = `🎉 Congratulations! We've reached 50 attendees! 🎉 The winning team is ${winningTeam}!`;
  celebrationMessage.textContent = message;
  celebrationMessage.style.display = "block";
}

function getWinningTeam() {
  let maxCount = Math.max(waterCount, zeroCount, powerCount);

  if (waterCount === maxCount) {
    return teamNames.water;
  } else if (zeroCount === maxCount) {
    return teamNames.zero;
  } else {
    return teamNames.power;
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const team = teamSelect.value;

  greeting.textContent = `Welcome, ${name}! You checked in successfully.`;
  greeting.style.display = "block";

  totalCount++;
  saveToLocalStorage();

  const attendee = {
    name: name,
    team: teamNames[team],
  };
  attendeeList.push(attendee);

  if (team === "water") {
    waterCount++;
  } else if (team === "zero") {
    zeroCount++;
  } else if (team === "power") {
    powerCount++;
  }

  saveToLocalStorage();
  updateDisplay();

  if (totalCount === 50) {
    displayCelebration();
  }

  nameInput.value = "";
  teamSelect.value = "";
});

window.addEventListener("load", function () {
  loadFromLocalStorage();
  updateDisplay();
});
