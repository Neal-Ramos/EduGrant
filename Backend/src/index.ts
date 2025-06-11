import dotenv from "dotenv";
dotenv.config();
import express, {Request, Response, NextFunction} from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import xss from "xss";

import UserAuthRoutes from "./Routes/userAuthRoutes";
import UserPostRoutes from "./Routes/userPostRoutes";
import UserUserRoutes from "./Routes/userUserRoutes";
import AdminAuthRoutes from "./Routes/adminAuthRoutes";
import AdminPostRoutes from "./Routes/adminPostRoutes";
import AdminUserRoutes from "./Routes/adminUserRoutes";

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests, please try again later.'
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
    origin:process.env.CORS_URL_ORIGIN,
    credentials:true
}));
app.use(compression());
app.use(cookieParser());
app.use(express.json({limit:"10kb"}));
app.use(hpp());
app.use((req, res, next) => {
    for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
        req.body[key] = xss(req.body[key]);
        }
    }
    next();
});
app.use(apiLimiter)

app.use("/EduGrant",UserAuthRoutes);
app.use("/EduGrant",UserPostRoutes);
app.use("/EduGrant",UserUserRoutes);

app.use("/AdminRoutes", AdminAuthRoutes)
app.use("/AdminRoutes", AdminPostRoutes)
app.use("/AdminRoutes", AdminUserRoutes)

app.get("/", (req, res) => {
    res.send("TS Express!!");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      status: 'error',
      message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server Listening to http://localhost:${PORT}`);
});