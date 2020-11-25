import { Router, Response, Request } from "express";
import { executorControler } from "../../controllers/Executor/Executor";

export const executorRounter = Router({
  strict: true,
});

executorRounter.post("/add", (req: Request, res: Response) => {
  executorControler.add(req, res);
});

executorRounter.get("/all", (req: Request, res: Response) => {
  executorControler.getAll(req, res);
});
