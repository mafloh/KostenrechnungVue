if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const produkteRouter = require('../routes/produkte.routes')
const jahreskennzahlenRouter = require('../routes/jahreskennzahlen.routes')
const extraEinnahmenRouter = require('../routes/extraEinnahmen.routes')
const calculateResultsRouter = require('../routes/calculateResults.routes')

const app = express()



//Middleware

const corsOptions = {
    origin: "http://localhost:8080"
}

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('hi')
})

//Datenbank MongoDB

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true   })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

const port = process.env.PORT || 5000

//Routes
app.use('/api/produkte', produkteRouter)
app.use('/api/jahreskennzahlen', jahreskennzahlenRouter)
app.use('/api/extraeinnahmen', extraEinnahmenRouter)
app.use('/api/calculateResults', calculateResultsRouter)


app.listen(port, () => console.log(`Server started on port ${port}`)) 