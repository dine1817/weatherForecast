const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const mainContent = document.querySelector('.content > p');

const byContent = setTimeout(()=>{
    document.getElementById("ddText").style.display = "none";
    document.getElementById("byText").style.display = "block";
},3000)

const logoContent = setTimeout(()=>{
    document.getElementById("ddText").style.display = "none";
    document.getElementById("byText").style.display = "none";
    document.getElementById("logoContent").style.display = "block";
},5000)

const mainArea = setTimeout(()=>{
    document.getElementById("startupPage").style.display = "none";
    document.getElementById("mainPage").style.display = "block";
},10000);

search.addEventListener('click', ()=>{
    const APIKey = 'b06b04e8a5b884fe202c8fded6c1e978';
    const city = document.querySelector('.search-box input').value;

    if(city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if(json.cod === '404'){
                container.style.height = '450px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                container.style.marginBottom = '0px';
                mainContent.style.marginTop = '20px';
                return;
            }
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch(json.weather[0].main){
                case 'Clear':
                    image.src='images/clear.png';
                    break;
                    case 'Rain':
                    image.src='images/rain.png';
                    break;
                    case 'Snow':
                    image.src='images/snow.png';
                    break;
                    case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                    case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                    default:
                        image.src='';
            }
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '500px';
            container.style.marginBottom = '0px';
            mainContent.style.marginTop = '20px';
    });
});