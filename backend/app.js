require('dotenv').config();
require('express-async-errors');
const cors = require('cors');

const express = require('express');
const app = express();

//connect db
const connectDB = require('./db/connect');

// routers
const authRoutes = require('./routes/auth')
const jobsRoutes = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/authentication')

app.use(express.json());
//extra packages

//cors
app.use(cors({
  origin: 'http://localhost:3000', // Reemplaza con tu dominio.
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}))

// routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/jobs', authenticateUser, jobsRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    //db connect
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Listening in port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()




