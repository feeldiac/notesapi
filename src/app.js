import express from 'express'
import { create } from 'express-handlebars'
import indexRoutes from './routes/index.routes'
import path from 'path'
import morgan from 'morgan'

const app = express()

app.set('views', path.join(__dirname, 'views'));

const hbs = create({
    helpers: {
        inc: function (value, options) {
            return parseInt(value) + 1;
        }
    },
    layoutsDir: path.join(app.get("views"), "layouts"),
    //One can config the partialsDir too
    defaultLayout: "main",
    extname: ".hbs",
})
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
//Routes
app.use(indexRoutes)
//Static files
app.use(express.static(path.join(__dirname, 'public')))

export default app