// Main file of the project
require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./db/sequelizeConnection')
const userRouter = require('./routers/user')
const contentRouter = require('./routers/content')
const commentRouter = require('./routers/comment')
const listRouter = require('./routers/list')
const contentUserRouter = require('./routers/content_user')
const ratingRouter = require('./routers/rating')

// Allowed CORS for the frontend
const allowedOrigins = [process.env.ALLOWED_ORIGIN, process.env.ALLOWED_ORIGIN_LOCAL, "http://localhost:2777", "https://api.fliverse.es", "https://api.fliverse.es/api-docs/", "http://localhost:3000"]
const vercelRegex = /^https:\/\/.*\.jaimehedrera25\.vercel\.app$/

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true)
  
        if (allowedOrigins.includes(origin) || vercelRegex.test(origin) ) 
        {
            callback(null, true)
        } 
        else 
        {
            callback(new Error('CORS policy: Origin not allowed'), false)
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true
}

// Express setup
const app = express()
app.set("trust proxy", 3) // Trust first proxy (for Vercel)
app.use(cors(corsOptions))
app.use(express.json())

// Routes
app.use(userRouter)
app.use(contentRouter)
app.use(commentRouter)
app.use(listRouter)
app.use(contentUserRouter)
app.use(ratingRouter)

// Swagger docs
require("./api-docs/swagger")(app)

const PORT = process.env.PORT || 2888

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

module.exports = app