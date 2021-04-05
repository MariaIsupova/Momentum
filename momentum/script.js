// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

// Options

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Suturday'];

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]

var pictures = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg']

// Show Time
function showTime() {

  let today = new Date(),
    weekday = today.getDay(),
    day = today.getDate(),
    month = today.getMonth(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  date.innerHTML = `${days[weekday]}<span> </span>${day}<span> </span>${months[month]}`;
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var dayPicture = []
var dayPart = ['night', 'morning', 'day', 'evening']

// Set Background and Greeting
function setBgGreet() {
  // choose random day picture
  base = 'assets/images/'
  dayPart.forEach(element => {
    shuffle(pictures)
    for (let i = 0; i < 6; i++) {
      dayPicture.push(base + element + '/' + pictures[i])
    }
  });

  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    // Night
    base = 'assets/images/night'
    document.body.style.backgroundImage = 'url(' + dayPicture[hour] + ')';
    greeting.textContent = 'Good Night ';
    document.body.style.color = 'white';
  } else if (hour < 12) {
    // Morning
    base = 'assets/images/morning'
    document.body.style.backgroundImage = 'url(' + dayPicture[hour] + ')';    
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    base = 'assets/images/day'
    document.body.style.backgroundImage = 'url(' + dayPicture[hour] + ')';
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'white';
  } else {
    // Evening
    base = 'assets/images/evening/'
    document.body.style.backgroundImage = 'url(' + dayPicture[hour] + ')';
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}


function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}
let i = 0

function getImage() {

  let today = new Date(),
    hour = today.getHours();
  i++;
  const index = (hour + i) % dayPicture.length;
  const imageSrc = dayPicture[index];
  viewBgImage(imageSrc);

  btn.disabled = true;
  setTimeout(function () {
    btn.disabled = false
  }, 1000);
}
const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);


name.onclick = function () {
  name.textContent = "";
  console.log(name.textContent)
}

focus.onclick = function () {
  focus.textContent = "";
  console.log(focus.textContent)
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (name.textContent.trim() !== '') {
        localStorage.setItem('name', e.target.innerText);
      }
      name.blur();
    }
  } else {
    getName()
  }
}

// Get Focus
function getFocus() {
  console.log('focus ' + localStorage.getItem('focus'))
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (focus.textContent.trim() !== '') {
        localStorage.setItem('focus', e.target.innerText);
      }
      focus.blur();
    }
  } else {
    getFocus()
  }
}

// localStorage.clear()
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
console.log(name)

// Run
showTime();
setBgGreet();
getName();
getFocus();

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const realTemperature = document.querySelector('.real_temperature');
const wind = document.querySelector('.wind_speed');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const message = document.querySelector('.message')


function setCity(event) {
  if (event.code === 'Enter') {
    if (city.innerText.trim() !== '') {
      localStorage.setItem('city', city.textContent);
      console.log(localStorage.getItem('city'))
      getWeather();
      city.blur();
    } else {
      getWeather()
      city.blur();
    }
  }
}

async function getWeather() {
  if (localStorage.getItem('city') === null) {
    city.textContent = 'Moscow';
    console.log(localStorage.setItem('city', city.textContent))
  } else {
    city.textContent = localStorage.getItem('city')
  }
  // console.log(localStorage.getItem('city'))

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('city')}&lang=en&appid=1f96940ed79171eb9754416e585e6ca6&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  
  if (data.cod === '404') {
    console.log('err')
    message.textContent = data.message;
    weatherIcon.className = '';
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    realTemperature.textContent = ``
    wind.textContent = ``;
    humidity.textContent = ``
  } else {
    message.textContent = ``;
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = `${data.main.temp}°C`;
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherDescription.textContent = data.weather[0].description;
    realTemperature.textContent = `Feels like ${data.main.feels_like}°C`
    wind.textContent = `Wind speed ${data.wind.speed} m/s`;
    humidity.textContent = `Air humidity ${data.main.humidity} %`
  }


}
getWeather()

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);




// Quotes
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn1 = document.querySelector('.btn1');

async function getQuote() {
  const url = `https://type.fit/api/quotes`;
  const res = await fetch(url);
  const data = await res.json();
  let selectedQuote = Math.floor(Math.random() * data.length)
  blockquote.textContent = `"${data[selectedQuote].text}"`;
  figcaption.textContent = data[selectedQuote].author;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn1.addEventListener('click', getQuote);