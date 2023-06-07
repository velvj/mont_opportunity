import { Router } from "express";
const holdRouter = Router();
import holdControllers from "../../controllers/holdControllers";
import {
  validateSchema,
  commonModSchema,
  holdSchema,
} from "../../middleware/validate";

//hold routers
holdRouter.post(
  "/createHold",
  validateSchema(commonModSchema, holdSchema),
  (req, res, next) => holdControllers.createHold(req, res, next)
);
holdRouter.get("/holdList", (req, res, next) =>
  holdControllers.holdList(req, res, next)
);
export default holdRouter;
