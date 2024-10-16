//https://openweathermap.org/forecast5
//https://openweathermap.org/current#min

const apikey = "41f40954f49a1c0f78acc0db356fddcd";
let city = "tooele";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`;
let apiURLFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=imperial`;
let deg = "\u00B0";
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
let nextFiveDays = [];
let nextFiveWd = [];
let place, clouds, visibility, wind, weather, main, coord;
let summaryImage = document.querySelector(".summary-img");

fetch(apiURL)
    .then((response) => response.json())
        .then((jsObject) => {
            updateWeather(jsObject);
        });
fetch(apiURLFiveDay)
    .then((response) => response.json())
        .then((jsObject) => {
            updateFiveDay(jsObject);
        }
    );

function updateWeather(weather){
    document.querySelector("#five-city").innerText = startCap(city);
    document.querySelector("#current-temp").innerText = Math.floor(weather.main.temp) +deg;
    document.querySelector("#current-windChill").innerText = Math.floor(weather.main.feels_like) +deg;
    document.querySelector("#current-desc").innerText = startCap(weather.weather[0].description);
    document.querySelector("#current-humid").innerText = weather.main.humidity + "%";
    document.querySelector("#current-windSpeed").innerText = Math.floor(weather.wind.speed) +" MPH";
    iconID = weather.weather[0].icon;
    let weatherImg = getWeatherImgFromDescription(weather.weather[0].description);
    summaryImage.innerHTML += `<img src="images/${weatherImg}" class="summary-img"/>`
        
}
function getWeatherImgFromDescription(desc){
        if(desc.match(/clear/)){
            return "Sunny.jpg";
        }
        if (desc.match(/cloud/)){
            return "partlyCloudy.jpg";
        }
        if(desc.match(/overcast/)){
            console.log("here");
            return "overcast.jpg";
        }
        if(desc.match(/rain/)){
            return "Umbrella.jpg";
        }
        if(desc.match(/snow/)){
            return "snowy.jpg";
        }
        if(desc.match(/thunder/)){
            return "thunderStorms.jpg";
        }
        if(desc.match(/wind/)){
            return "Windy.jpg";
        }

}

function getCurrentDateInCorrectFormat(increment){

    const today = new Date() 
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + increment)
    nextFiveWd.push(days[tomorrow.getDay()]);
    let currentDate = tomorrow.toDateString().match(/\w{3}\s\d+\s\d+/);
    for (let j = 0; j < months.length; j++){
        if(currentDate[0].match(months[j])){
            let dayyear = tomorrow.toDateString().match(/(\d+)\s(\d+)/);
            currentDate = dayyear[2] + "-" + (j+1) + "-" + dayyear[1];
            
            //mdy -> ymd
        }
    }
    return currentDate;
}


function updateFiveDay(fiveday){
    let temps1 = [];
    let temps2 = [];
    let temps3 = [];
    let temps4 = [];
    let temps5 = [];
    let desc1 = [];
    let desc2 = [];
    let desc3 = [];
    let desc4 = [];
    let desc5 = [];
    let dates = [];
    let currentDate = getCurrentDateInCorrectFormat(0);
    for (let i = 1; i < 6; i++){
        nextFiveDays.push(getCurrentDateInCorrectFormat(i));
    }
    for(let i = 0; i < fiveday.list.length; i++){

        let dte = fiveday.list[i].dt_txt.match(/(^\d+-\d+-\d+)/);

        if (dte[0] == nextFiveDays[0]){
            temps1.push(fiveday.list[i].main.temp);
            desc1.push(fiveday.list[i].weather[0].description);
        }
        if (dte[0] == nextFiveDays[1]){
            temps2.push(fiveday.list[i].main.temp);
            desc2.push(fiveday.list[i].weather[0].description);
        }
        if (dte[0] == nextFiveDays[2]){
            temps3.push(fiveday.list[i].main.temp);
            desc3.push(fiveday.list[i].weather[0].description);
            
        }
        if (dte[0] == nextFiveDays[3]){
            temps4.push(fiveday.list[i].main.temp);
            desc4.push(fiveday.list[i].weather[0].description);
        }
        if (dte[0] == nextFiveDays[4]){
            temps5.push(fiveday.list[i].main.temp);
            desc5.push(fiveday.list[i].weather[0].description);
        }
    }
    

    temps1.sort((a, b) => a - b);
    temps2.sort((a, b) => a - b);
    temps3.sort((a, b) => a - b);
    temps4.sort((a, b) => a - b);
    temps5.sort((a, b) => a - b);
    
    let day1High = temps1[temps1.length-1];
    let day1Low = temps1[0];
    let day2High = temps2[temps2.length-1];
    let day2Low = temps2[0];
    let day3High = temps3[temps3.length-1];
    let day3Low = temps3[0];
    let day4High = temps4[temps4.length-1];
    let day4Low = temps4[0];
    let day5High = temps5[temps5.length-1];
    let day5Low = temps5[0];

    document.querySelector("#data1").innerText = "High: " + Math.floor(day1High) + deg;
    document.querySelector("#data2").innerText = "High: " + Math.floor(day2High) + deg;
    document.querySelector("#data3").innerText = "High: " + Math.floor(day3High) + deg;
    document.querySelector("#data4").innerText = "High: " + Math.floor(day4High) + deg;
    document.querySelector("#data5").innerText = "High: " + Math.floor(day5High) + deg;

    let day1Desc = getMostRepeatedValue(desc1);
    let day2Desc = getMostRepeatedValue(desc2);
    let day3Desc = getMostRepeatedValue(desc3);
    let day4Desc = getMostRepeatedValue(desc4);
    let day5Desc = getMostRepeatedValue(desc5);


    let day1img = getWeatherImgFromDescription(day1Desc);
    
    let day2img = getWeatherImgFromDescription(day2Desc);
    
    let day3img = getWeatherImgFromDescription(day3Desc);
    console.log(day3Desc);
    console.log(day3img);
    let day4img = getWeatherImgFromDescription(day4Desc);
    let day5img = getWeatherImgFromDescription(day5Desc);

    document.querySelector("#image1").innerHTML = `<img src="images/${day1img}" class="fd-image" >`
    document.querySelector("#image2").innerHTML = `<img src="images/${day2img}" class="fd-image" >`
    document.querySelector("#image3").innerHTML = `<img src="images/${day3img}" class="fd-image" >`
    document.querySelector("#image4").innerHTML = `<img src="images/${day4img}" class="fd-image" >`
    document.querySelector("#image5").innerHTML = `<img src="images/${day5img}" class="fd-image" >`
    
    for (let i = 1; i < 6; i++){
        document.querySelector("#dayTitle"+ i).innerText = nextFiveWd[i-1];
    }
}

function startCap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getMostRepeatedValue(array){

    array.sort();
    let repetitions = new Array(array.length).fill(0);
    let repeated = [];
    let mostRepeated;
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length; j++){
            if(i != j){
                if(array[i] == array[j]){
                    repeated.push(array[i]);
                    repetitions[i] ++;
                }
            }
        }
    }
    
    let sortedRepetitions = [];
    repetitions.forEach(e => {
        sortedRepetitions.push(e);
    });

    sortedRepetitions.sort((a, b) => a - b);
    for (let i = 0; i < repetitions.length; i++){
        if(repetitions[i] == sortedRepetitions[sortedRepetitions.length-1]){
            mostRepeated = repeated[i];
        }
    }

    return mostRepeated;
}