import { OpportunityMod } from "../models/opportunity";

//opportunity services
class OpportunityServices {
  //create opportunities
  async createOpportunity(payload: any, data?: any) {
    try {
      let result: any = await OpportunityMod.create(payload, data);
      return result;
    } catch (e) {
      return e;
    }
  }

  //list of opportunities
  async listOpportunities(data?: any) {
    try {
      let result: any = await OpportunityMod.findAll(data);
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default new OpportunityServices();
