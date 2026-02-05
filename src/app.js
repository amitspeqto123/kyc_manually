import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

//import authRoutes from "./routes/authRoute.js";
import authRoute from "./routes/user.route.js"
import profileRoute from "./routes/profile.route.js"


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));

// app.use(session({
//   secret: "mysecretkey",
//   resave: false,
//   saveUninitialized: false
// }));

// import "./config/passport.js";
// app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.use("/v1/auth", authRoute);
app.use("/v1/profile", profileRoute);

// send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//   next(new ApiError(404, "Not found"));
// });

export default app;
