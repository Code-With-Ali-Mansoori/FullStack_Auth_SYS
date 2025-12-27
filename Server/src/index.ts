import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { DB_Connection } from "./model/DB_Conn";
import "../src/controller/oAuth";  // OAuth
import { OAuth_route } from "./routes/oauth_Route";   // OAuth Route
import route from "./routes/routes";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from 'cors';
// import path from "path";

const app = express();
const PORT: string = process.env.PORT || '9000';
const MONGO_URI: string = process.env.MONGO_URI || '';
DB_Connection(MONGO_URI);

// Session Setup 
// app.use(session({
//   secret : 'somethingSecret',
//   resave : false,
//   saveUninitialized : false
// }));

//Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({
  origin: process.env.CLIENT_URL, // your frontend URL
  credentials: true                // 🔑 allow cookies
}));

// app.use(passport.session());

//EJS
// app.set('view engine', 'ejs');
// app.set("views", path.join(__dirname, "views"));
// app.set("views", path.resolve('./views'))

//Routing

app.use('/', route);
app.use('/oauthorize', OAuth_route);

app.listen(PORT, () => console.log('Server Running on PORT :',PORT));