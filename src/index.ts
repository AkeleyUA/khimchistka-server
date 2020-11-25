import express from "express";
import { userRouter } from "./routes/User/User";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { authRouter } from "./routes/Auth/Auth";
import { checkTokenMiddleware } from "./middlewares/Token";
import { executorRounter } from "./routes/Executor/Executor";
import { orderRounter } from "./routes/Order/Oreder";

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/users", checkTokenMiddleware, userRouter);
app.use("/executor", checkTokenMiddleware, executorRounter);
app.use("/orders", checkTokenMiddleware, orderRounter);

const start = async () => {
  await mongoose.connect(process.env.MONGO_PATH!, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(port, (err?: Error) => {
    if (err) {
      console.error(err);
    }
    console.log(`Started, port: ${port}`);
  });
};

start();
