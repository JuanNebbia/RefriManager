import supplies from "../models/supply.model.js";
import HttpError from "../utils/HttpError.util.js";
import { HTTP_NOT_FOUND } from "../utils/constants.util.js";

class SuppliesService {
  async getAll() {
    const allSupplies = await supplies.find({});
    return allSupplies;
  }

  async getById(sid) {
    const supply = await supplies.findById(sid);
    if (!supply) throw new HttpError("Supply not found", HTTP_NOT_FOUND);
    return supply;
  }

  async addOne(payload) {
    const supply = await supplies.create(payload);
    if (!supply)
      throw new HttpError("Internal Server Error", HTTP_INTERNAL_SERVER_ERROR);
    return supply;
  }

  async deleteOne(sid) {
    const supply = await supplies.deleteOne({ _id: sid });
    if (supply.deletedCount === 0)
      throw new HttpError("Supply not found", HTTP_NOT_FOUND);
    return supply;
  }
}

export default SuppliesService;
