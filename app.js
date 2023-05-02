const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const session = require("express-session")
const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })
const path = require("path")

const AppError = require("./utils/appError")
const itemsRoutes = require("./routes/itemRoutes")
const coursevilleRoutes = require("./routes/coursevilleRoutes")

const app = express()

const sessionOptions = {
  secret: "my-secret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    // setting this false for http connections
    secure: false,
    // sameSite: "none",
  },
}

const corsOptions = {
  origin: true,
  credentials: true,
}

app.use(express.static("static"))
app.use(cors(corsOptions))
app.use(session(sessionOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/items", itemsRoutes)
app.use("/courseville", coursevilleRoutes)
app.use(
  "/",
  express.static(path.join("../compengess-2022-2-activity-8-frontend-group-17"))
)

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

module.exports = app

