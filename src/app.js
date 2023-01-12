const express = require('express');
const path = require('path');
const weather_stack = require('./utils/weather_stack');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.get('/weather', (req, res) => {
    if(!req.query.locality){
        return res.send({
            errorDescrption: 'No ha introducido localidad.',
            internalErrorDetail: 'URL_ERROR: locality param at fetch query doesn\'t exists, please repeat the query with correct params.'
        });
    }

    weather_stack(req.query.locality, (cod_res, resObj) => {
        if(cod_res === -1){
            return res.send(resObj);
        }
        
        res.send(resObj);

    })

});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});