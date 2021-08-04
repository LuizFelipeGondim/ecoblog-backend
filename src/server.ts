import 'reflect-metadata'
require("dotenv").config() 
import express from 'express'
import cors from 'cors'
import routes from './routes'
const bodyParser  = require('body-parser')
import uploadConfig from './config/upload'

import './database'

const app = express()

app.use(cors())

/* Aqui */
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.listen(process.env.PORT || 3333, () => {
    console.log('O servidor está funcionando!')
})