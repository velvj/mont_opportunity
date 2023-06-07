import { Express } from "express";

import opportunities from "./v1/opportunityRouters";
import holds from "./v1/holdRouters";

const initializeRoutes = (app: Express) => {
  console.log("inside route");
  // Routes

  app.use("/opportunities", opportunities);
  app.use("/holds", holds);
};

export default initializeRoutes;
