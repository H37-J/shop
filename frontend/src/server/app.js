import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port = 3001

const corsOption = {
    origin: '*',
    Credential: true
}

app.use(cors(corsOption))
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 



app.get('/', (req, res) => {
    res.send('test344')
})

app.post('/post', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

app.listen(port, () => {
    console.log('server start')
})