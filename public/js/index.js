let txtLocation, btnSend, content;

const fetchWeatherDataHandler = (event) => {
    if(txtLocation.value != ''){
        fetch(`http://localhost:3000/weather?locality=${txtLocation.value}`)
        .then((res) => {
            return res.json();
        })
        .then((obj) => {
            if(obj.error === -1){
                console.log(`INTERNAL_ERROR_DESCRIPTION: ${obj.internalErrorDetail}`);
                content.innerHTML = `
                <p>${obj.errorDescrption}<p>
                `;
            } else {
                content.innerHTML = `
                <h4>${obj.localityName}, ${obj.localityRegion}, ${obj.localityCountry}</h4>
                <p>- Tipo: ${obj.locationType}</p>
                <p>- Temperatura: ${obj.localityTemprerature}°C</p>
                <p>- Velocidad del viento: ${obj.localityWindSpeed}km/h</p>
                <p>- Presión atmosférica: ${obj.localityPressure}MB</p>
                <p>- Precipitaciones: ${obj.localityPrecipitations}MM</p>
                <p>- Humedad: ${obj.localityHumidity}</p>
                <p>- Índece de UV: ${obj.localityUVIndex}</p>
                <p>- Visibilidad: ${obj.localityVisibility}km/h</p>
                <p>- Descripción: ${obj.localityWeatherDescriptions[0]}</p>
                `;
            }
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        content.innerHTML = `
        <p>Por favor, no deje el campo localidad vacío<p>
        `;
    }
    
}

const main = (event) => {
    txtLocation = document.querySelector("#txtLocation");
    btnSend = document.querySelector("#btnSend");
    content = document.querySelector("#content");

    btnSend.addEventListener('click', fetchWeatherDataHandler);

}

window.addEventListener('load', main);