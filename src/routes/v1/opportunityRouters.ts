import { Router } from "express";
const opportunityRouter = Router();
import opportunityControllers from "../../controllers/opportunityControllers";
import { validateSchema, commonModSchema } from "../../middleware/validate";

//opportunity router
opportunityRouter.post(
  "/createOpportunity",
  validateSchema(commonModSchema),
  (req, res, next) => opportunityControllers.createOpportunity(req, res, next)
);
opportunityRouter.get("/listOpportunities", (req, res, next) =>
  opportunityControllers.listOpportunities(req, res, next)
);

export default opportunityRouter;
