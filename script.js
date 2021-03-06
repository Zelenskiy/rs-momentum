// DOM Elements
const time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    dateString = document.querySelector('.day__string'),
    btn = document.querySelector('.btn'),
    blockquote = document.querySelector('blockquote'),
    figcaption = document.querySelector('figcaption'),
    btn2 = document.querySelector('.btn2');
    btn_2 = document.querySelector('.btn_2');
  

// Images
var randomImage = [
    '01.jpg',
    '02.jpg',
    '03.jpg',
    '04.jpg',
    '05.jpg',
    '06.jpg',
    '07.jpg',
    '08.jpg',
    '09.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg',
    '13.jpg',
    '14.jpg',
    '15.jpg',
    '16.jpg',
    '17.jpg',
    '18.jpg',
    '19.jpg',
    '20.jpg'
 ];

// Options
const showAmPm = false;
// const showAmPm = true;


// Smooth image change
function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {      
        document.body.style.backgroundImage = `url(${src})`
    }; 
  }

  function getImage(bgImage) {
    const index = i % bgImage.length;
    const imageSrc = bgImage;
    viewBgImage(imageSrc);
    i++;
  } 

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds()
    ;
    // if (sec % 10 < 1)
    if (min == 0 && sec < 1)
        setBgGreet();
        
    let options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      };

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
//   hour = hour % 12 || 12;

  // 24hr Format
  hour = hour

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;


   dateString.innerText = today.toLocaleString("en", options);
   

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
let i = 0;

function setBgGreet() {
    

    let today = new Date(),
        hour = today.getHours();
    let bgImage="";

    
    if (hour > 5 && hour < 12) {
        // Morning
        bgImage = "assets/images/morning/"+get_random(randomImage);
        greeting.textContent = 'Good Morning, ';
    } else if (hour > 11 && hour < 18) {
        // Afternoon
        bgImage = "assets/images/day/"+get_random(randomImage);
        greeting.textContent = 'Good Afternoon, ';
    } else if (hour > 17 && hour < 24) {
        // Evening
        bgImage = "assets/images/evening/"+get_random(randomImage);
        greeting.textContent = 'Good Evening, ';
    } else {
        // Night
        bgImage = "assets/images/night/"+get_random(randomImage);
        greeting.textContent = 'Good Night, ';
        document.body.style.color = 'white';
    }    
    getImage(bgImage)  
    setQuote();
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
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
    // console.log(333);
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

get_random = function (list) {
    return list[Math.floor((Math.random()*list.length))];
} 


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
btn.addEventListener('click', setBgGreet);
btn2.addEventListener('click', setQuote);
btn_2.addEventListener('click', setQuote);

async function setQuote() {  
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    const res = await fetch(url);
    const data = await res.json(); 
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}

async function getWeather() {  
    let city = 'London,uk';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=`+city+
                `&lang=ru&appid=e18d58f53ae4e3152a24e733c75c4c3f&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
  }

  getWeather()





// Run
showTime();
setBgGreet();
getName();
getFocus();
setQuote();
