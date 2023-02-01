import path from "path";
import express from "express";
import morgan from "morgan";
import { create } from "express-handlebars";
import flash from "connect-flash";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


import "./config/passport.js";
import routes from "./routes/routes.js";
//import database from './database.js';
import './database.js';


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
// settings

app.set("views", join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    layoutsDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"), "partials"),
    defaulLayout: "main",
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
	  secret: "secret",
	  resave: true,
	  saveUninitialized: true,
	  store: MongoStore.create({ mongoUrl: 'mongodb+srv://kroskydekellog:y8NjQC4RPNWzlsMA@fidmugal.x8gl0h8.mongodb.net/?retryWrites=true&w=majority' })
	})
  );
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//global variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	res.locals.usr = req.user || null;
	next();
  });
// routes
app.use(routes);

app.listen(PORT, () => {
	console.log('Server listening on new port', PORT);
});

export default app;