const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('enter','click', () => {

    const APIKey = 'cfbb7414b5754ab4b7551608252901';  // Updated API key
    const city = document.querySelector('.search-box input').value;
     
    if (city == '')
        return;

    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`)
        .then(response => response.json())
        .then(json => {

            if (json.error) {
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            
            // Update image based on weather condition
            switch (json.current.condition.text) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;   

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Cloudy':
                    image.src = 'images/cloud.png';
                    break;
                
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                    
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;    

                default:
                    image.src = 'images/cloud.png'
            }

            // Update the UI with weather data
            temperature.innerHTML = `${parseInt(json.current.temp_c)}<span>°C</span>`;
            description.innerHTML = `${json.current.condition.text}`;
            humidity.innerHTML = `${json.current.humidity}%`;
            wind.innerHTML = `${parseInt(json.current.wind_kph)} km/h`;
        });
});
