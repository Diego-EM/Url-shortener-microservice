const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./db');

const routes = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.set('port', process.env.PORT || 3000);

app.use('/api/shorturl',routes);
app.use('/',express.static('./public'));

app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
})