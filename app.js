const express = require('express')
const app = express()
const port = 3000
const mongoose=require('mongoose')
var cors = require('cors')

//file upload is missing

app.use(cors())
app.use(express.json())
app.use(require('./routes/register.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/home.routes'))
app.use(require('./routes/sendMessage.routes'))
mongoose.connect('mongodb://localhost:27017/SarahahProjectAPI',{useNewUrlParser:true,useUnifiedTopology:true})
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => console.log(`Example app listening on port port!`))