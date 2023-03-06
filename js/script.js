const name = document.querySelector('.name');
var lang = "eng";
var BGsource = "GitHub";
var BGtag = "nature";
const city = document.querySelector('.city');
city.value = lang === 'eng' ? 'Minsk' : 'Минск';

const todoSelectBtn = document.querySelector(".todo-select__toggle");
var taskHolder=document.getElementById("task-list");
var taskInput=document.getElementById("new-task");//Add a new task.

document.querySelectorAll(".block-visibility").forEach(checkbox => {
  checkbox.checked = true;
});
/*------ Local storage ------*/
function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
  if (document.querySelector(".inbox-task")) {
    var inboxTasks = [];
    for (const child of document.querySelectorAll(".inbox-task")) {
      inboxTasks.push(child.innerText);
    };
    localStorage.setItem('inboxTasks', JSON.stringify(inboxTasks));
  };

  if (document.querySelector(".today-task")) {
    var todayTasks = [];
    for (const child of document.querySelectorAll(".today-task")) {
      todayTasks.push(child.innerText);
    };
    localStorage.setItem('todayTasks', JSON.stringify(todayTasks));
  };

  var inboxDoneTasks = [];
  for (const child of document.querySelectorAll(".inbox-done-task")) {
    inboxDoneTasks.push(child.innerText);
  };
  localStorage.setItem('inboxDoneTasks', JSON.stringify(inboxDoneTasks));


  var todayDoneTasks = [];
  for (const child of document.querySelectorAll(".today-done-task")) {
    todayDoneTasks.push(child.innerText);
  };
  localStorage.setItem('todayDoneTasks', JSON.stringify(todayDoneTasks));

  localStorage.setItem('taskSelect', todoSelectBtn.dataset.index);
};

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  };
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  };
  document.getElementById(lang).checked = true;
  document.getElementById(BGsource).checked = true;
  document.getElementById(BGtag).checked = true;
};
window.addEventListener('load', getLocalStorage);

if (localStorage.getItem('lang')) {
  lang = localStorage.getItem('lang');
};
if (localStorage.getItem('city')) {
  city.value = localStorage.getItem('city');
};
if (localStorage.getItem('BGsource')) {
  BGsource = localStorage.getItem('BGsource');
};
if (localStorage.getItem('BGtag')) {
  BGtag = localStorage.getItem('BGtag');
};
if (localStorage.getItem('TimeBlock')) {
  document.querySelector(".time").style.opacity = 0;
  document.querySelector(".time").style.visibility = "hidden";
  document.getElementById('time-block').checked = false;
};
if (localStorage.getItem('DateBlock')) {
  document.querySelector(".date").style.opacity = 0;
  document.querySelector(".date").style.visibility = "hidden";
  document.getElementById('date-block').checked = false;
};
if (localStorage.getItem('GreetingBlock')) {
  document.querySelector(".greeting-container").style.opacity = 0;
  document.querySelector(".greeting-container").style.visibility = "hidden";
  document.getElementById('greeting-block').checked = false;
};
if (localStorage.getItem('QuoteBlock')) {
  document.querySelector(".quote-container").style.opacity = 0;
  document.querySelector(".quote-container").style.visibility = "hidden";
  document.getElementById('quote-block').checked = false;
};
if (localStorage.getItem('WeatherBlock')) {
  document.querySelector(".weather").style.opacity = 0;
  document.querySelector(".weather").style.visibility = "hidden";
  document.getElementById('weather-block').checked = false;
};
if (localStorage.getItem('PlayerBlock')) {
  document.querySelector(".player").style.opacity = 0;
  document.querySelector(".player").style.visibility = "hidden";
  document.getElementById('player-block').checked = false;
};
if (localStorage.getItem('TodoBlock')) {
  document.querySelector(".todo-container").style.opacity = 0;
  document.querySelector(".todo-container").style.visibility = "hidden";
  document.getElementById('todo-block').checked = false;
};
//Setting tasks from local storage
if (localStorage.getItem('inboxTasks')) {
  var myclass = 'inbox-task';
  JSON.parse(localStorage.getItem("inboxTasks")).forEach(e=>{
    addTask(e,myclass);
  });
};
if (localStorage.getItem('todayTasks')) {
  JSON.parse(localStorage.getItem("todayTasks")).forEach(e=>{
    addTask(e,'today-task');
  });
};
if (localStorage.getItem('inboxDoneTasks')) {
  JSON.parse(localStorage.getItem("inboxDoneTasks")).forEach(e=>{
    addTask(e,'inbox-done-task');
  });
};
if (localStorage.getItem('todayDoneTasks')) {
  JSON.parse(localStorage.getItem("todayDoneTasks")).forEach(e=>{
    addTask(e,'today-done-task');
  });
};
if (localStorage.getItem('taskSelect')) {
  todoSelectBtn.dataset.index = localStorage.getItem('taskSelect');
};
//setting tasks from local storage
const langLabel = document.querySelector(".lang-label");
langLabel.textContent = translation.language[lang];

const bgLabel = document.querySelector(".bg-label");
bgLabel.textContent = translation.background[lang];

const bgTagLabel = document.querySelector(".bgTag-label");
bgTagLabel.textContent = translation.tag[lang];

document.querySelector(".block-label").textContent = translation.block[lang];
document.getElementById("time-blockLB").textContent = translation.blocks.time[lang];
document.getElementById("date-blockLB").textContent = translation.blocks.date[lang];
document.getElementById("greeting-blockLB").textContent = translation.blocks.greeting[lang];
document.getElementById("quote-blockLB").textContent = translation.blocks.quote[lang];
document.getElementById("weather-blockLB").textContent = translation.blocks.weather[lang];
document.getElementById("player-blockLB").textContent = translation.blocks.player[lang];
document.getElementById("todo-blockLB").textContent = translation.blocks.todo[lang];
/*------ local storage ------*/

/*-- Time --*/
function showTime() {
  const time = document.querySelector('.time');
  const date = new Date();
  time.textContent = date.toLocaleTimeString('ru-RU');
  showDate();
  showGreeting(lang);
  setTimeout(showTime, 1000);
};
showTime();

/*-- Date --*/
function showDate() {
  const dateBox = document.querySelector('.date');
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  if(lang=="eng") {
    dateBox.textContent = date.toLocaleDateString('en-Br', options);
  } else if (lang=="ru") {
    dateBox.textContent = date.toLocaleDateString('ru-RU', options);
  }
};

/*-- Time of day --*/
function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 6) {
    return 'night';
  } else if (hours >= 6 && hours < 12) {
    return 'morning';
  } else if (hours >= 12 && hours < 18) {
    return 'afternoon';
  } else if (hours >= 18) {
    return 'evening';
  }
};

/*-- Greeting --*/
import translation from './translation.js';
function showGreeting() {
  getTimeOfDay();
  const greeting = document.querySelector('.greeting');
  const timeOfDay = getTimeOfDay();
  const greetingText = translation.greeting[timeOfDay][lang] + ',';
  greeting.textContent = greetingText;
};

/*-- Random number --*/
function getRandomNum() {
  return Math.floor((Math.random() * 20) + 1);
};
let randomNum = getRandomNum();

/*-- фоновая заставка --*/
function setBg() {
  randomNum = randomNum.toString().padStart(2, "0");
  var timeOfDay = getTimeOfDay();
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Viktoriia-code/momentum-bgpics/assets/images/${timeOfDay}/${randomNum}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = "url('" + img.src + "')";
  }; 
};

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

if (BGsource=="GitHub") {
  setBg();
  document.querySelectorAll('.bgTag').forEach(e => {e.disabled=true});
} else if (BGsource=="UnsplashAPI"||BGsource=="FlickrAPI") {
  getLinkToImage();
  slideNext.removeEventListener('click', getSlideNext);
  slidePrev.removeEventListener('click', getSlidePrev);
  slideNext.addEventListener('click', getLinkToImage);
  slidePrev.addEventListener('click', getLinkToImage);
  document.querySelectorAll('.bgTag').forEach(e => {e.disabled=false});
};
//следующая фон.заставка
function getSlideNext() {
  if (randomNum == 20) {
    randomNum = 1
  } else { randomNum = parseInt(randomNum)+1};
  setBg();
}
//предыдущая фон.заставка
function getSlidePrev() {
  if (randomNum == 1) {
    randomNum = 20
  } else {randomNum -= 1};
  setBg();
}

async function getLinkToImage() {
  var timeOfDay = getTimeOfDay();
  if (BGsource == "UnsplashAPI") {
    var url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${BGtag}&client_id=so-IARfKuPnKwh-ZD_ic8gFPej9bjF0yH8rVJJ3qie0`;
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = data.urls.regular;
    img.onload = () => {
      document.body.style.backgroundImage = "url('" + data.urls.regular + "')";
    };
  } else if (BGsource == "FlickrAPI") {
    var url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4b4a8ab4d204b950ed1db12cb697f645&tags=${BGtag}&extras=url_l&format=json&nojsoncallback=1`;
    var res = await fetch(url);
    var data = await res.json();
    var randomNum = getRandomNum();
    const img = new Image();
    img.src = data.photos.photo[randomNum].url_l;
    if (img.src == undefined) {
      getLinkToImage();
    } else {
      img.onload = () => {
        document.body.style.backgroundImage = "url('" + data.photos.photo[randomNum].url_l + "')";
      };
    };
  };
}


/*----- Weather -----*/
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=5cd9ea420404c00407d7db8f984512e6&units=metric`;
  const res = await fetch(url);
  if(!res.ok) {
    weatherError.textContent = "Error! "+ res.statusText;
    humidity.textContent = '';
    wind.textContent = '';
    return weatherIcon.className = '',
    temperature.textContent = '',
    weatherDescription.textContent = '';
  };
  weatherError.textContent = "";
  const data = await res.json();
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  if(lang==="eng") {
    humidity.textContent = `Humidity: ${data.main.humidity.toFixed(0)}%`;
    wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
  } else if(lang==="ru") {
    humidity.textContent = `Влажность: ${data.main.humidity.toFixed(0)}%`;
    wind.textContent = `Скорость ветра: ${data.wind.speed.toFixed(0)} м/с`;
  }
}
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('change', getWeather);

//цитата
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

async function getQuotes() {  
  if(lang=="eng") {
    const quotes = 'quotesENG.json';
    var res = await fetch(quotes);
  } else if (lang=="ru") {
    const quotes = 'quotesRU.json';
    var res = await fetch(quotes);
  };
  const data = await res.json();
  const randomNum = Math.floor(Math.random() * data.length);
  quote.textContent = `${data[randomNum].text}`;
  author.textContent = `${data[randomNum].author}`;
}
getQuotes();
const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', getQuotes);

/* --Settings of language --*/
const settingsBtn = document.querySelector(".settings-toggler");
const settingWrapper = document.querySelector(".setting-container");
name.placeholder = translation.placeholder.name[lang];
city.placeholder = translation.placeholder.city[lang];

settingsBtn.addEventListener("click", () => {
  settingsBtn.classList.toggle("active");
  settingWrapper.classList.toggle("open");
});

document.querySelectorAll(".lang").forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value == "ru") {
      lang = "ru";
      localStorage.setItem('lang', 'ru');
    } else if (radio.value == "eng") {
      lang = "eng";
      localStorage.setItem('lang', 'eng');
    };
    translate();
  })
});

function translate() {
  showTime();
  getWeather();
  showDate();
  getQuotes();
  setToDo();
  name.placeholder = translation.placeholder.name[lang];
  city.placeholder = translation.placeholder.city[lang];
  if (city.value=='Minsk'||city.value=='Минск') {
    city.value = translation.city[lang];
  };
  langLabel.textContent = translation.language[lang];
  bgLabel.textContent = translation.background[lang];
  bgTagLabel.textContent = translation.tag[lang];
  document.getElementById('natureTagLB').textContent = translation.tags.naturetag[lang];
  document.getElementById('catsTagLB').textContent = translation.tags.catstag[lang];
  document.getElementById('dogsTagLB').textContent = translation.tags.dogstag[lang];
  document.querySelector(".block-label").textContent = translation.block[lang];
  document.getElementById("time-blockLB").textContent = translation.blocks.time[lang];
  document.getElementById("date-blockLB").textContent = translation.blocks.date[lang];
  document.getElementById("greeting-blockLB").textContent = translation.blocks.greeting[lang];
  document.getElementById("quote-blockLB").textContent = translation.blocks.quote[lang];
  document.getElementById("weather-blockLB").textContent = translation.blocks.weather[lang];
  document.getElementById("player-blockLB").textContent = translation.blocks.player[lang];
  document.getElementById("todo-blockLB").textContent = translation.blocks.todo[lang];
};

/*------ Settings of background picture ------*/
document.querySelectorAll(".bgSource").forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value == "GitHub") {
      BGsource = "GitHub";
      setBg();
      localStorage.setItem('BGsource', 'GitHub');
      slideNext.removeEventListener('click', getLinkToImage);
      slidePrev.removeEventListener('click', getLinkToImage);
      slideNext.addEventListener('click', getSlideNext);
      slidePrev.addEventListener('click', getSlidePrev);
      document.querySelectorAll('.bgTag').forEach(e => {e.disabled=true});
    } else if (radio.value == "UnsplashAPI") {
      BGsource = "UnsplashAPI";
      getLinkToImage();
      localStorage.setItem('BGsource', 'UnsplashAPI');
      slideNext.removeEventListener('click', getSlideNext);
      slidePrev.removeEventListener('click', getSlidePrev);
      slideNext.addEventListener('click', getLinkToImage);
      slidePrev.addEventListener('click', getLinkToImage);
      document.querySelectorAll('.bgTag').forEach(e => {e.disabled=false});
    } else if (radio.value == "FlickrAPI") {
      BGsource = "FlickrAPI";
      getLinkToImage();
      localStorage.setItem('BGsource', 'FlickrAPI');
      slideNext.removeEventListener('click', getSlideNext);
      slidePrev.removeEventListener('click', getSlidePrev);
      slideNext.addEventListener('click', getLinkToImage);
      slidePrev.addEventListener('click', getLinkToImage);
      document.querySelectorAll('.bgTag').forEach(e => {e.disabled=false});
    }
  })
});

/*------ Settings of tags for background picture ------*/
document.querySelectorAll(".bgTag").forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value == "nature") {
      BGtag = "nature";
      localStorage.setItem('BGtag', 'nature');
      getLinkToImage();
    } else if (radio.value == "cats") {
      BGtag = "cats";
      localStorage.setItem('BGtag', 'cats');
      getLinkToImage();
    } else if (radio.value == "dogs") {
      BGtag = "dogs";
      localStorage.setItem('BGtag', 'dogs');
      getLinkToImage();
    }
  })
});

/*------ Settings of block visibility ------*/
document.querySelectorAll(".block-visibility").forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    //time block
    if (document.getElementById('time-block').checked == false) {
      document.querySelector(".time").classList.add('hidden');
      document.querySelector(".time").classList.remove('show');
      localStorage.setItem('TimeBlock', 'hidden');
    } else if (document.getElementById('time-block').checked == true) {
      document.querySelector(".time").classList.remove('hidden');
      document.querySelector(".time").classList.add('show');
      localStorage.removeItem('TimeBlock');
    };
    //date block
    if (document.getElementById('date-block').checked == false) {
      document.querySelector(".date").classList.add('hidden');
      document.querySelector(".date").classList.remove('show');
      localStorage.setItem('DateBlock', 'hidden');
    } else if (document.getElementById('date-block').checked == true) {
      document.querySelector(".date").classList.remove('hidden');
      document.querySelector(".date").classList.add('show');
      localStorage.removeItem('DateBlock');
    };
    //greeting block
    if (document.getElementById('greeting-block').checked == false) {
      document.querySelector(".greeting-container").classList.add('hidden');
      document.querySelector(".greeting-container").classList.remove('show');
      localStorage.setItem('GreetingBlock', 'hidden');
    } else if (document.getElementById('greeting-block').checked == true) {
      document.querySelector(".greeting-container").classList.remove('hidden');
      document.querySelector(".greeting-container").classList.add('show');
      localStorage.removeItem('GreetingBlock');
    };
    //quote block
    if (document.getElementById('quote-block').checked == false) {
      document.querySelector(".quote-container").classList.add('hidden');
      document.querySelector(".quote-container").classList.remove('show');
      localStorage.setItem('QuoteBlock', 'hidden');
    } else if (document.getElementById('quote-block').checked == true) {
      document.querySelector(".quote-container").classList.remove('hidden');
      document.querySelector(".quote-container").classList.add('show');
      localStorage.removeItem('QuoteBlock');
    };
    //weather block
    if (document.getElementById('weather-block').checked == false) {
      document.querySelector(".weather").classList.add('hidden');
      document.querySelector(".weather").classList.remove('show');
      localStorage.setItem('WeatherBlock', 'hidden');
    } else if (document.getElementById('weather-block').checked == true) {
      document.querySelector(".weather").classList.remove('hidden');
      document.querySelector(".weather").classList.add('show');
      localStorage.removeItem('WeatherBlock');
    };
    //player block
    if (document.getElementById('player-block').checked == false) {
      document.querySelector(".player").classList.add('hidden');
      document.querySelector(".player").classList.remove('show');
      localStorage.setItem('PlayerBlock', 'hidden');
    } else if (document.getElementById('player-block').checked == true) {
      document.querySelector(".player").classList.remove('hidden');
      document.querySelector(".player").classList.add('show');
      localStorage.removeItem('PlayerBlock');
    };
    //todo block
    if (document.getElementById('todo-block').checked == false) {
      document.querySelector(".todo-container").classList.add('hidden');
      document.querySelector(".todo-container").classList.remove('show');
      localStorage.setItem('TodoBlock', 'hidden');
    } else if (document.getElementById('todo-block').checked == true) {
      document.querySelector(".todo-container").classList.remove('hidden');
      document.querySelector(".todo-container").classList.add('show');
      localStorage.removeItem('TodoBlock');
    };
  })
});

/*------ To Do Block ------*/
const todoBtn = document.querySelector(".todo-toggler");
const todoWrapper = document.querySelector(".todo");

taskInput.placeholder = translation.todo.inboxPH[lang];

todoBtn.addEventListener("click", () => {
  todoBtn.classList.toggle("active");
  todoWrapper.classList.toggle("open");
});

let addButton=document.querySelector(".add-task");//Button to ass a new task.
let taskClass=document.querySelector(".todo-select__toggle").dataset.id;

//***Creating task item***
function createNewTaskElement(taskString, tclass){
  var listItem=document.createElement("li");//container for the task elements
  var checkBox=document.createElement("input");//input (checkbox)
  var label=document.createElement("label");//label
  var editInput=document.createElement("input");//input (text)
  var moveButton=document.createElement("div");//move button
  var editButton=document.createElement("div");//edit button
  var deleteButton=document.createElement("div");//delete button
  //setting elements
  listItem.className=tclass;
  label.innerText=taskString;
  checkBox.type="checkbox";
  if (tclass=="today-done-task"||tclass=="inbox-done-task") {
    checkBox.checked = true;
  };
  checkBox.addEventListener('click',taskCompleted);
  editInput.type="text";
  editInput.className="task";
  moveButton.className="move";
  moveButton.addEventListener('click',moveTask);
  editButton.className="edit";
  editButton.addEventListener('click',editTask);
  deleteButton.className="delete";
  deleteButton.style.backgroundImage="assets/icons/add.png";
  deleteButton.addEventListener('click',deleteTask);
  //appending elements
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(moveButton);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

addButton.addEventListener("click", addTaskWithClick);

//Set the enter handler to the addTask function.
taskInput.addEventListener("keypress", addTaskWithEnter);

function addTaskWithEnter() {
  if (event.keyCode === 13 && taskInput.value) {
    addTask(taskInput.value,taskClass);
  };
};

function addTaskWithClick() {
  addTask(taskInput.value,taskClass);
};

function addTask(taskText,tclass) {
  if (!taskText) {
    return
  } else {
    var listItem=createNewTaskElement(taskText,tclass);
    taskHolder.appendChild(listItem);
    taskInput.value="";
  }
};

function moveTask() {
  var listItem=this.parentNode;
  if (listItem.classList.contains("inbox-task")) {
    if (confirm(`Do you want to move task "${listItem.children[1].textContent}" from Inbox to Today?`) == true) {
      listItem.classList.remove("inbox-task");
      listItem.classList.add("today-task");
      setToDo();
    }else{
      return;
    };
  } else if (listItem.classList.contains("today-task")) {
    if (confirm(`Do you want to move task "${listItem.children[1].textContent}" from Today to Inbox?`) == true) {
      listItem.classList.remove("today-task");
      listItem.classList.add("inbox-task");
      setToDo();
    }else{
      return;
    };
  } else if (listItem.classList.contains("inbox-done-task")) {
    if (confirm(`Do you want to move task "${listItem.children[1].textContent}" from Inbox to Today?`) == true) {
      listItem.classList.remove("inbox-done-task");
      listItem.classList.add("today-done-task");
      setToDo();
    }else{
      return;
    };
  } else if (listItem.classList.contains("today-done-task")) {
    if (confirm(`Do you want to move task "${listItem.children[1].textContent}" from Today to Inbox?`) == true) {
      listItem.classList.remove("today-done-task");
      listItem.classList.add("inbox-done-task");
      setToDo();
    }else{
      return;
    };
  }
};

function editTask() {
  var listItem=this.parentNode;
  var editInput=listItem.querySelector('input[type=text]');
  var label=listItem.querySelector("label");
  var editBtn=listItem.querySelector(".edit");
  var containsClass=listItem.classList.contains("edit-mode");
  //If class of the parent is .edit-mode
  if(containsClass && !editInput.value){
    if (confirm("Your task is empty. Do you want to delete this task?") == true) {
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
    }else{
    editBtn.innerText="Edit";}
  }else if(containsClass){
    //switch to .edit-mode
    //label becomes the inputs value.
    label.innerText=editInput.value;
  }else{
    editInput.value=label.innerText;
  };
  //toggle .edit-mode on the parent.
  listItem.classList.toggle("edit-mode");
  editInput.focus();
};

function deleteTask(){
  var listItem=this.parentNode;
  if (confirm(`Do you want to delete task "${listItem.children[1].textContent}"?`) == true) {
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
  }else{
    return;
  }
};

function taskCompleted(){
  var listItem=this.parentNode;
  if (listItem.classList.contains("inbox-task")) {
    listItem.classList.remove("inbox-task");
    listItem.classList.add("inbox-done-task");
  } else if (listItem.classList.contains("today-task")) {
    listItem.classList.remove("today-task");
    listItem.classList.add("today-done-task");
  } else if (listItem.classList.contains("inbox-done-task")) {
    listItem.classList.remove("inbox-done-task");
    listItem.classList.add("inbox-task");
  } else if (listItem.classList.contains("today-done-task")) {
    listItem.classList.remove("today-done-task");
    listItem.classList.add("today-task");
  }
  listItem.children[1].classList.toggle("done");
  listItem.classList.toggle("done-task");
}

const todoselect = document.getElementById("todo-select");
todoselect.value = 'Inbox';
todoselect.selectedIndex = 0;

todoSelectBtn.addEventListener("click", () => {
  todoselect.classList.toggle("todo-select_show");
});

document.querySelectorAll(".todo-select__option").forEach(li => {
  li.addEventListener('click', (e) => {
    todoselect.classList.toggle("todo-select_show");
    todoSelectBtn.textContent = e.target.dataset.value;
    todoSelectBtn.dataset.index = e.target.dataset.index;
    todoSelectBtn.value = e.target.value;
    todoSelectBtn.dataset.id = e.target.dataset.id;
    taskClass=todoSelectBtn.dataset.id;
    if (todoSelectBtn.dataset.index==0) {
      taskInput.placeholder = translation.todo.inboxPH[lang];
      document.querySelector(".newtask-container").style.visibility = "visible";
      document.querySelectorAll(".today-task").forEach(li => {
        li.style.display = "none";
      });
      document.querySelectorAll(".today-done-task").forEach(li => {
        li.style.display = "none";
      });
      document.querySelectorAll(".inbox-task").forEach(li => {
        li.style.display = "flex";
      });
      document.querySelectorAll(".inbox-done-task").forEach(li => {
        li.style.display = "flex";
      });
    } else if (todoSelectBtn.dataset.index==1) {
      taskInput.placeholder = translation.todo.todayPH[lang];
      document.querySelector(".newtask-container").style.visibility = "visible";
      document.querySelectorAll(".today-task").forEach(li => {
        li.style.display = "flex";
      });
      document.querySelectorAll(".today-done-task").forEach(li => {
        li.style.display = "flex";
      });
      document.querySelectorAll(".inbox-task").forEach(li => {
        li.style.display = "none";
      });
      document.querySelectorAll(".inbox-done-task").forEach(li => {
        li.style.display = "none";
      });
    } else if (todoSelectBtn.dataset.index==2) {
      document.querySelector(".newtask-container").style.visibility = "hidden";
      //document.querySelector(".newtask-container").classList.add('show');
      document.querySelectorAll(".today-task").forEach(li => {
        li.style.display = "none";
      });
      document.querySelectorAll(".inbox-task").forEach(li => {
        li.style.display = "none";
      });
      document.querySelectorAll(".inbox-done-task").forEach(li => {
        li.style.display = "flex";
      });
      document.querySelectorAll(".today-done-task").forEach(li => {
        li.style.display = "flex";
      });
    }
  })
});

function setToDo() {
  todoSelectBtn.innerText = translation.todo[todoSelectBtn.dataset.index][lang];
  for (let i = 0; i < 3; i++) {
    document.querySelector(".todo-select__options").children[i].textContent = translation.todo[i][lang];
    document.querySelector(".todo-select__options").children[i].dataset.value = translation.todo[i][lang];
  };
  if (todoSelectBtn.dataset.index==0) {
    taskInput.placeholder = translation.todo.inboxPH[lang];
    document.querySelector(".newtask-container").style.visibility = "visible";
    document.querySelectorAll(".today-task").forEach(li => {
      li.style.display = "none";
    });
    document.querySelectorAll(".today-done-task").forEach(li => {
      li.style.display = "none";
    });
    document.querySelectorAll(".inbox-task").forEach(li => {
      li.style.display = "flex";
    });
    document.querySelectorAll(".inbox-done-task").forEach(li => {
      li.style.display = "flex";
    });
  } else if (todoSelectBtn.dataset.index==1) {
    taskInput.placeholder = translation.todo.todayPH[lang];
    document.querySelector(".newtask-container").style.visibility = "visible";
    document.querySelectorAll(".today-task").forEach(li => {
      li.style.display = "flex";
    });
    document.querySelectorAll(".today-done-task").forEach(li => {
      li.style.display = "flex";
    });
    document.querySelectorAll(".inbox-task").forEach(li => {
      li.style.display = "none";
    });
    document.querySelectorAll(".inbox-done-task").forEach(li => {
      li.style.display = "none";
    });
  } else if (todoSelectBtn.dataset.index==2) {
    document.querySelector(".newtask-container").style.visibility = "hidden";
    //document.querySelector(".newtask-container").classList.add('show');
    document.querySelectorAll(".today-task").forEach(li => {
      li.style.display = "none";
    });
    document.querySelectorAll(".inbox-task").forEach(li => {
      li.style.display = "none";
    });
    document.querySelectorAll(".inbox-done-task").forEach(li => {
      li.style.display = "flex";
    });
    document.querySelectorAll(".today-done-task").forEach(li => {
      li.style.display = "flex";
    });
  }
};

setToDo();