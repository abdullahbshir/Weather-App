document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector('button');
    const cityInput = document.getElementById('cityInput');
    const forecastDiv = document.querySelector('.forcast');
    const datePicker = document.getElementById('datePicker');
    const apiUrl = 'https://weatherapi-com.p.rapidapi.com/history.json';
    const select = document.getElementById("language");

    const languages = {
        "en": "English",
        "ur": "Urdu",
        "hi": "Hindi",
        "es": "Spanish",
        "fr": "French",
        "de": "German",
        "zh": "Chinese",
        "ar": "Arabic",
        "ru": "Russian",
        "ja": "Japanese",
        "ko": "Korean",
        "pt": "Portuguese",
        "it": "Italian",
        "nl": "Dutch",
        "sv": "Swedish",
        "pl": "Polish",
        "no": "Norwegian",
        "tr": "Turkish",
        "he": "Hebrew",
        "th": "Thai",
        "vi": "Vietnamese",
        "id": "Indonesian",
        "ms": "Malay",
        "fa": "Persian",
        "uk": "Ukrainian",
        "el": "Greek",
        "ro": "Romanian",
        "hu": "Hungarian",
        "cs": "Czech",
        "fi": "Finnish",
        "da": "Danish",
        "bg": "Bulgarian",
        "sk": "Slovak",
        "hr": "Croatian",
        "sr": "Serbian",
        "sl": "Slovenian",
        "lt": "Lithuanian",
        "lv": "Latvian",
        "et": "Estonian",
        "bn": "Bengali",
        "ta": "Tamil",
        "te": "Telugu",
        "ml": "Malayalam",
        "mr": "Marathi",
        "kn": "Kannada",
        "gu": "Gujarati",
        "pa": "Punjabi",
        "tl": "Tagalog",
        "sw": "Swahili"
    };

    for (const [code, name] of Object.entries(languages)) {
        const option = document.createElement("option");
        option.value = code;
        option.text = name;
        select.appendChild(option);
    }

    submitButton.addEventListener('click', async () => {
        const cityName = cityInput.value.trim();
        const selectedDate = datePicker.value; 

        if (!cityName) {
            alert('Please enter a city name');
            return;
        }

        if (!selectedDate) {
            alert('Please select a date');
            return;
        }

        const selectedLanguageCode = select.value;

        try {
            const response = await fetch(`${apiUrl}?q=${cityName}&lang=${selectedLanguageCode}&dt=${selectedDate}`, {
                method: 'GET',
                headers: {
                    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
                    "x-rapidapi-key": "01b19762f2mshb8a88e253c75414p14402ajsn80369b94a197"
                }
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Network response was not ok: ${errorDetails}`);
            }

            const data = await response.json();
            updateForecast(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            forecastDiv.innerHTML = `
                <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Error</h5>
                        <p class="card-text">${error.message}</p>
                    </div>
                </div>
            `;
        }
    });

    function updateForecast(data) {
        if (!data || !data.forecast || !data.forecast.forecastday || data.forecast.forecastday.length === 0) {
            forecastDiv.innerHTML = '<p>No forecast data available.</p>';
            return;
        }

        const forecastData = data.forecast.forecastday[0].day; 
        const cityName = data.location.name;
        const countryName = data.location.country;
        const temperature = forecastData.avgtemp_c; 
        const realFeel = forecastData.avgtemp_c; 
        const windSpeed = forecastData.maxwind_kph;
        const weatherCondition = forecastData.condition.text;
        const timezoneOffset = data.location.tz_id;

        forecastDiv.innerHTML = `
            <h5>${cityName}, ${countryName}</h5>
            <img src="img,videos/sun.png" alt="Weather Icon">
            <h3>${temperature}° C</h3>
            <p>RealFeel® ${realFeel}°</p>
            <div class="wind" >
                <h4>Wind speed: ${windSpeed} kph</h4>
                <p>Weather: ${weatherCondition}</p>
                <h4>Timezone: ${timezoneOffset}</h4>
            </div>
        `;
    }

    const menuButton = document.getElementById("menuDots");
    const menu = document.getElementById("settingsMenu");
    menu.style.display = "none";

    menuButton.onclick = function() {
        menu.style.display = (menu.style.display === "none") ? "block" : "none";
    };

    datePicker.addEventListener('change', (event) => {
        const selectedDate = event.target.value;
        console.log('Selected Date:', selectedDate);
    });
});
