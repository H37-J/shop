import express from 'express'
import cors from 'cors'
import {con} from './database.js'
import bodyParser from 'body-parser'

const app = express()
const port = 3001

const users = async () => {
    try {
        const sql = await con()
        const result = await sql.request().query('select * from users')
        console.log(result)
        return result.recordset
    } catch (err) {
        console.log(err)
    }
}

const userId = async (value) => {
    try {
        const sql = await con()
        console.log(value)
        const result = await sql.request().input('email', sql.VarChar, 'these')
            .query('select * from users where email = @email')
        console.log(result)
        return result
    } catch(err) {
        console.log(err)
    }
}

const corsOption = {
    origin: '*',
    Credential: true
}

app.use(cors(corsOption))
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 



app.get('/', async (req, res) => {
    const user = await userId(3)
    res.send(user)
})

app.post('/post', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

app.listen(port, () => {
    console.log('server start')
})