import flavors from "../models/flavor.model.js";
import HttpError from "../utils/HttpError.util.js";
import {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_FOUND,
} from "../utils/constants.util.js";

class FlavorsService {
  async getAll() {
    const allFlavors = await flavors.find({});
    return allFlavors;
  }

  async getById(fid) {
    const flavor = await flavors.findById(fid);
    if (!flavor) throw new HttpError("Flavor not found", HTTP_NOT_FOUND);
    return flavor;
  }

  async addOne(payload) {
    const flavor = await flavors.create(payload);
    if (!flavor)
      throw new HttpError("Internal Server Error", HTTP_INTERNAL_SERVER_ERROR);
    return flavor;
  }

  async updateOne(fid, payload) {
    const flavor = await flavors.findByIdAndUpdate(fid, payload);
    if (!flavor) throw new HttpError("Flavor not found", HTTP_NOT_FOUND);
    return flavor;
  }

  async deleteOne(fid) {
    const flavor = await flavors.deleteOne({ _id: fid });
    if (flavor.deletedCount === 0)
      throw new HttpError("Flavor not found", HTTP_NOT_FOUND);
    return flavor;
  }
}

export default FlavorsService;

// import flavorsJson from "../mock/flavors.mock.json" with {type: "json"};

// async getAll(){
//     const flavors = flavorsJson;
//     return flavors
// }

// async getById(fid){
//     const flavor = flavorsJson.find(fla => fla._id === +fid)
//     if(!flavor) throw new HttpError('Flavor not found', HTTP_NOT_FOUND)
//     return flavor
// }

// async addOne(payload){
//     const newFlavor = {
//         _id: flavorsJson.length + 1,
//         ...payload
//     }
//     flavorsJson.push(newFlavor)
//     return flavorsJson
// }

// async updateOne(fid, payload){
//     const flavorIdx = flavorsJson.findIndex(fla => fla._id === +fid)
//     if(flavorIdx === -1) throw new HttpError('Flavor not found', HTTP_NOT_FOUND)
//     flavorsJson[flavorIdx] = { _id: +fid, ...payload}
//     return flavorsJson
// }

// async deleteOne(fid){
//     const flavorIdx = flavorsJson.findIndex(fla => fla._id === +fid)
//     if(flavorIdx === -1) throw new HttpError('Flavor not found', HTTP_NOT_FOUND)
//     flavorsJson.splice(flavorIdx, 1)
//     return flavorsJson
// }
