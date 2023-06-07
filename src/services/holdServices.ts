import { HoldMod } from "../models/holds";

//hold services
class HoldServices {
  //create hold
  async createHold(payload: any, data?: any) {
    try {
      let result: any = await HoldMod.create(payload, data);
      return result;
    } catch (e) {
      return e;
    }
  }

  //list of holds
  async holdList(data?: any) {
    try {
      let result: any = await HoldMod.findAll(data);
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default new HoldServices();
