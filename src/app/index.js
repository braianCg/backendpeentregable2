import express from 'express'
import { CartRouter, ProductRouter } from '../routes/index.js'
import { config } from '../config/index.js'
import { logger } from '../middlewares/logger.js'
import errorHandler from '../middlewares/errorHandling.js'

const initApp = () => {
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(config.dirname + 'src/public'))

app.use(logger)

app.use('/api/product', ProductRouter)
app.use('/api/cart', CartRouter)
app.use(errorHandler)
return app
}

export default initApp
