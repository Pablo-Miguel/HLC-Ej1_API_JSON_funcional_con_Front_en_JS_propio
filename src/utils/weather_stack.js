const fs = require("fs");
const request = require("postman-request");

const jsonList = fs.readFileSync("./claves_APIs.json");
const keyWeatherStack = JSON.parse(jsonList).WeatherStack;

const weather_stack = (locality, callback) => {
    request(`http://api.weatherstack.com/current?access_key=${keyWeatherStack}&query=${locality}&units=m`, (error, response, body) => {
        
        if(response.statusCode == 200){

            const objRes = JSON.parse(body);

            if(!objRes.hasOwnProperty('request')){
                callback(-1, {
                    error: -1,
                    errorDescrption: 'Imposible de encontrar la localización buscada. Pruebe de nuevo.',
                    internalErrorDetail: error
                });
            } else {

                callback(0, {
                    error: 0,
                    locationType: objRes.request.type,
                    localityName: objRes.location.name,
                    localityCountry: objRes.location.country,
                    localityRegion: objRes.location.region,
                    localityTemprerature: objRes.current.temperature,
                    localityWindSpeed: objRes.current.wind_speed,
                    localityPressure: objRes.current.pressure,
                    localityPrecipitations: objRes.current.precip,
                    localityHumidity: objRes.current.humidity,
                    localityUVIndex: objRes.current.uv_index,
                    localityVisibility: objRes.current.visibility,
                    localityWeatherDescriptions: objRes.current.weather_descriptions
                });

            }

        } else {
            callback(-1, {
                error: -1,
                errorDescrption: '¡No se ha podido conectar al servidor de localizaciones!',
                internalErrorDetail: error
            });
        }
    })
}

module.exports = weather_stack;
