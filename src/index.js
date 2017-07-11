import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// CLOCK SETUP
let hour = 5;
let minute = "00";
let timeValue = `${hour}${minute}`;
let timeFormatted = `${hour}:${minute}`;
let nextTrains = [];

const incrementMinute = () => {
  minute++;
  if (minute < 10) {
    minute = "0" + minute;
  }
}

const checkAndUpdateHour = () => {
  if (minute === 60) {
    if (hour === 23) {
      hour = "00";
    } else {
      hour++;
    }
    minute = "00";
  }
}

// GET NEXT TRAINS
const trains = [
  {
    name: "Central Station",
    timeToNext: 20,
    frequency: 20,
    upperTimeLimit: null,
    lowerTimeLimit: null
  },
  {
    name: "Circular",
    timeToNext: 60,
    frequency: 60,
    upperTimeLimit: null,
    lowerTimeLimit: null
  },
  {
    name: "North Square",
    timeToNext: 12,
    frequency: 12,
    upperTimeLimit: 2200,
    lowerTimeLimit: 700
  },
  {
    name: "West Market",
    timeToNext: 6,
    frequency: 6,
    upperTimeLimit: 130,
    lowerTimeLimit: 530
  }
]

const updateTrainTimeToNext = () => {
  trains.map((train) => {

    if (train.upperTimeLimit && train.upperTimeLimit < timeValue && train.lowerTimeLimit > timeValue) {
      train.timeToNext = train.lowerTimeLimit - timeValue;
    } else {
      train.timeToNext--;
    }

    if (train.timeToNext === 0) {
      train.timeToNext = train.frequency;
    }

    return train;
  })
}

const getNextTrains = () => {
  nextTrains = trains.sort((a, b) => {
    return a.timeToNext - b.timeToNext;
  });

  return nextTrains;
}

const updateTime = () => {
  let formattedHour = hour < 10 ? `0${hour}` : hour;

  timeFormatted = `${formattedHour}:${minute}`;
  timeValue = `${hour}${minute}`;
}

const updateNextTrains = () => {
  updateTrainTimeToNext();
  getNextTrains();
}

const renderAndUpdateTimeAndTrainData = () => {
  incrementMinute();
  checkAndUpdateHour();
  updateTime();
  updateNextTrains();
  
  // With more time I would figure out why this isn't updating in the component but is in the console
  //console.log(timeFormatted);

  ReactDOM.render(
    <App nextTrains={nextTrains} time={timeFormatted}/>,
    document.getElementById('root')
  );
}
// END

// set the 'clock' and component updating
setInterval(renderAndUpdateTimeAndTrainData, 1000);

