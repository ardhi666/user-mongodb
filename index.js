const express = require('express')
const port = 5000
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes')

require('dotenv/config')

app.use(express.json())
app.use(cors())
app.use('/api', router)

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser:true,
    useUnifiedTopology: true    
})

db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('MongoDB Connected'))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`))