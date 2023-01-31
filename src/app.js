import path from "path";
import express from "express";
import morgan from "morgan";
import { create } from "express-handlebars";
import flash from "connect-flash";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

import "./config/passport.js";
import routes from "./routes/routes.js";
//import database from './database.js';

const app = express();

// settings
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
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
	  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/trivial-app' })
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
	res.locals.user = req.user || null;
	next();
  });
// routes
app.use(routes);

app.listen(process.env.PORT, () => {
	console.log('Server listening on new port', process.env.PORT);
});

export default app;