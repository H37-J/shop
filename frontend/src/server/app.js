import express from 'express'
import cors from 'cors'

const app = express()
const port = 3001

const corsOption = {
    origin: '*',
    Credential: true
}

app.use(cors(corsOption))


app.get('/', (req, res) => {
    res.send('test344')
})

app.post('/post', (req, res) => {
    console.log(req)
    return res

})

app.listen(port, () => {
    console.log('server start')
})