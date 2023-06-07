import { Request, Response, NextFunction } from "express";
import { BaseController } from "./baseController";
import holdServices from "../services/holdServices";
import opportunityServices from "../services/opportunityServices";
import { CommonMod } from "../models/commonMod";
import { HoldMod } from "../models/holds";

//Hold controller
class HoldController extends BaseController {
  //create hold
  async createHold(req: Request, res: Response, next: NextFunction) {
    try {
      const { commonData, holdData, createHoldData } = req.body;
      let savedCommonData: any,
        savedHoldData: any,
        savedOpportunity: any,
        dataExists: any;
      if (holdData && holdData.opportunity_id) {
        dataExists = await holdServices.holdList({
          where: { opportunity_id: holdData.opportunity_id },
        });
        if (dataExists.length > 0) {
          return res
            .status(404)
            .json({ status: 404, message: "opportunity already mapped" });
        }
        savedHoldData = await holdServices.createHold({
          ...holdData,
          opportunity_id: holdData.opportunity_id,
        });
      }
      if (commonData && holdData && !holdData.opportunity_id) {
        savedOpportunity = await opportunityServices.createOpportunity(
          {
            commonModDatas: {
              ...commonData,
            },
            holdDatas: {
              ...holdData,
            },
          },
          {
            include: [
              { model: CommonMod, as: "commonModDatas" },
              { model: HoldMod, as: "holdDatas" },
            ],
          }
        );
      }
      if (createHoldData && commonData) {
        savedHoldData = await holdServices.createHold(
          {
            commonDatas: {
              ...commonData,
            },
            ...createHoldData,
          },
          {
            include: [{ model: CommonMod, as: "commonDatas" }],
          }
        );
      }
      return this.success(
        req,
        res,
        this.status.HTTP_CREATED,
        { savedCommonData, savedHoldData, savedOpportunity },
        "Hold created successfully"
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
  //hold list
  async holdList(req: Request, res: Response, next: NextFunction) {
    try {
      let listHoldData = await holdServices.holdList({
        include: [
          {
            model: CommonMod,
            as: "holdCommonDatalists",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });

      return this.success(
        req,
        res,
        this.status.HTTP_CREATED,
        { listHoldData },
        "Hold list successfully viewed"
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

export default new HoldController();
