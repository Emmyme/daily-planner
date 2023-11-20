//date

const date = new Date()
const dateSection = document.querySelector('#date')
dateSection.innerHTML = date.toDateString()

//watch
setInterval(function() {
const time = new Date().toLocaleTimeString()
const timeSection = document.querySelector('#watch')
timeSection.innerHTML = time
}, 1000)


//todo

const btn = document.getElementById('add')
const itemList = document.getElementById('item-list')
const input = document.getElementById('new-item')
const todoContainer = document.getElementById('todo')
const deleteBtn = document.getElementById('delete-completed')
let todos = []

window.addEventListener('DOMContentLoaded', () => {
  let oldTodos = JSON.parse(localStorage.getItem("todos")) || [];

  oldTodos.forEach(todo => {
    let oldItem = document.createElement('li');
    oldItem.innerText = todo.text;
    if (todo.completed) {
      oldItem.style.textDecoration = 'line-through';
      oldItem.setAttribute('class', 'completed');
    }
    itemList.appendChild(oldItem);
    todos.push({ text: oldItem.innerText, completed: todo.completed });

    oldItem.addEventListener('click', () => {
      oldItem.style.textDecoration = 'line-through';
      oldItem.setAttribute('class', 'completed');
      todo.completed = true;
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  });
});

btn.addEventListener('click', () => {
  if (input.value !== '') {
    const newItem = document.createElement('li');
    newItem.innerText = input.value;
    itemList.appendChild(newItem);
    input.value = '';
    todos.push({ text: newItem.innerText, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));

    newItem.addEventListener('click', () => {
      newItem.style.textDecoration = 'line-through';
      newItem.setAttribute('class', 'completed');
      todos.find(todo => todo.text === newItem.innerHTML).completed = true;
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  }
});

deleteBtn.addEventListener('click', () => {
  localStorage.removeItem("todos");
  itemList.innerHTML = '';
  todos = [];
});


//weather
//code inspired by https://youtu.be/MIYQR-Ybrn4?si=c2zMcsS57LDW1BRu
const cityBtn = document.querySelector('.search > button')
const temperature = document.querySelector('.temperature')
const city = document.getElementById('city-value')
const weatherImg = document.querySelector('#display-weather')

apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
apiKey = 'ad200261945b85e1d03a3ab187e6b431'



async function search(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`)
  let weatherData = await response.json()

  console.log(weatherData)

  document.querySelector('.temperature').innerHTML = `${weatherData.main.toFixed(temp)}°C`
  if(weatherData.weather[0].main === 'Drizzle') {
    weatherImg.src = "./CSS/water.svg"
  } if(weatherData.weather[0].main === 'Clouds' && weatherData.weather[0].description === 'few clouds: 11-25%') {
    weatherImg.src = "./CSS/sun (2).svg"
  } if(weatherData.weather[0].main === 'Snow' && weatherData.weather[0].description === 'light rain and snow') {
    weatherImg.src = "./CSS/snow2.svg"
  } if(weatherData.weather[0].main === 'Clear') {
    weatherImg.src = "./CSS/sun (1).svg"
  } if(weatherData.weather[0].main === 'Clouds') {
    weatherImg.src = "./CSS/cloud.svg"
  } if(weatherData.weather[0].main === 'Snow') {
    weatherImg.src = "./CSS/snow.svg"
  } if(weatherData.weather[0].main === 'Thunderstorm') {
    weatherImg.src = "./CSS/rain.svg"
  } if(weatherData.weather[0].main === 'Rain') {
    weatherImg.src = "./CSS/water.svg"
  } if(weatherData.weather[0].main === 'Drizzle') {
    weatherImg.src = "./CSS/water.svg"
  } if(weatherData.weather[0].main === 'Mist') {
    weatherImg.src = "./CSS/mist.svg"
  }

}

cityBtn.addEventListener('click', () => {
  search(city.value)
})

//Mood

const happy = document.querySelector('#happy')
const medium = document.querySelector('#medium')
const sad = document.querySelector('#sad')
const refreshBtn = document.querySelector('#refresh-button')
let happyStorage = 0
let mediumStorage = 0
let sadStorage = 0

function displayRefreshBtn () {
  refreshBtn.style.display = 'flex'
}

refreshBtn.addEventListener('click', () => {
  window.location.reload()
})

happy.addEventListener('click', () => {
  happyStorage = localStorage.getItem("happy")
  happyStorage++
  localStorage.setItem("happy", happyStorage)
  displayRefreshBtn()
})

medium.addEventListener('click', () => {
  mediumStorage = localStorage.getItem("medium")
  mediumStorage++
  localStorage.setItem("medium", mediumStorage)
  displayRefreshBtn()
})

sad.addEventListener('click', () => {
  sadStorage = localStorage.getItem("sad")
  sadStorage++
  localStorage.setItem("sad", sadStorage)
  displayRefreshBtn()
})



//Mood-statistics

const moodChart = document.querySelector('#myChart');

new Chart(moodChart, {
  type: 'pie',
  data: {
    labels: [],
    datasets: [{
      data: [localStorage.getItem("happy"), localStorage.getItem("medium"), localStorage.getItem("sad")],
      backgroundColor: [
        'rgb(0, 150, 0)',
        'rgb(270,100,0)',
        'rgb(220,0,0)'
      ]}]

    },
  options: {
    responsive: true,
    maintainAspectRatio: false
  },
})
