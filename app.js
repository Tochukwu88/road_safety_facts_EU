const express = require('express');
const app = express()
const morgan = require('morgan');




const dataRoutes = require('./routes/data.js')

const { errorResponse } = require('./utils/responseHandler');

app.use(morgan('dev'))
require('dotenv').config()


app.use(express.static('data'))
app.use(express.json())
app.use('/',dataRoutes)

app.use('*', (req, res) => {
    return errorResponse(res, "route not found", 404)
})


const port = process.env.PORT || 8000
app.listen(port, async () => {
    try {
        console.log('server started')
       
       
       
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
})
module.exports = app