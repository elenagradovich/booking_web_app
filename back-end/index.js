const express = require('express')
const path = require('path')
let cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')//middleware
const MongoStore = require('connect-mongodb-session')(session)//connect-mongodb-session синхронизирует session с БД
//const csrf = require('csurf')
const corsМiddleware = require('./middleware/cors-middleware')

//Routes
const hotelsRoutes = require('./routes/hotels')
const ordersRoutes = require('./routes/orders')
const commentsRoutes = require('./routes/comments')
const userRoutes = require('./routes/user')


const app = express()
const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://127.0.0.1:27017/book_hotels'


app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
// handle unsupported routes
// app.use((req, res, next) => {
//   return next(new HttpError('could not find this route', 404));
// });

const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI
})

//app use добавление middleware в проект
app.use(session({
  secret: 'SECRET_KEY',
  resave: false,
  saveUninitialized: false,
  store
}))

// app.use(csrf())
app.use(corsМiddleware)
app.use(bodyParser.json());

// Регистрация роутов
app.use('/hotels', hotelsRoutes)
app.use('/orders', ordersRoutes)
app.use('/comments', commentsRoutes)
app.use('/user', userRoutes)

const DEFAULT_PORT = 9500
const PORT = process.env.PORT || DEFAULT_PORT

async function start () {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })//открыть соединение с БД
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()

