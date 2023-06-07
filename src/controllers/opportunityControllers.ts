import { Request, Response, NextFunction } from "express";
import { BaseController } from "./baseController";
import opportunityServices from "../services/opportunityServices";
import { CommonMod } from "../models/commonMod";

//opportunity controller
class OpportunityController extends BaseController {
  //create opportunity
  async createOpportunity(req: Request, res: Response, next: NextFunction) {
    try {
      const { commonData } = req.body;
      const savedOpportunity = await opportunityServices.createOpportunity(
        {
          commonModDatas: {
            ...commonData,
          },
        },
        {
          include: [{ model: CommonMod, as: "commonModDatas" }],
        }
      );

      return this.success(
        req,
        res,
        this.status.HTTP_CREATED,
        savedOpportunity,
        "Opportunity successfully created"
      );
    } catch (e) {
      return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }
  //list of opportunity
  async listOpportunities(req: Request, res: Response, next: NextFunction) {
    try {
      let opportunitiesData = await opportunityServices.listOpportunities({
        include: [
          {
            model: CommonMod,
            as: "commonDataList",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      return this.success(
        req,
        res,
        this.status.HTTP_CREATED,
        opportunitiesData,
        "Opportunity list successfully viewed "
      );
    } catch (e) {
      return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }
}

export default new OpportunityController();
