import refrigerators from "../models/refrigerator.model.js";
import HttpError from "../utils/HttpError.util.js";
import {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_FOUND,
} from "../utils/constants.util.js";

class RefrigeratorsService {
  async getAll() {
    const allRefrigerators = await refrigerators
      .aggregate([
        {
          $lookup: {
            from: "buckets",
            localField: "_id",
            foreignField: "refrigerator_id",
            as: "buckets",
          },
        },
        {
          $unwind: "$buckets",
        },
        {
          $lookup: {
            from: "flavors",
            localField: "buckets.flavor_id",
            foreignField: "_id",
            as: "buckets.flavor",
          },
        },
        {
          $unwind: {
            path: "$buckets.flavor",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "buckets.flavor.category_id",
            foreignField: "_id",
            as: "buckets.flavor.category",
          },
        },
        {
          $group: {
            _id: "$_id",
            updatedAt: { $first: "$updatedAt" },
            createdAt: { $first: "$createdAt" },
            refri_name: { $first: "$refri_name" },
            total_capacity: { $first: "$total_capacity" },
            status: { $first: "$status" },
            buckets: { $push: "$buckets" },
          },
        },
        {
          $project: {
            _id: 1,
            refri_name: 1,
            total_capacity: 1,
            status: 1,
            buckets: "$buckets",
            updatedAt: 1,
            createdAt: 1,
          },
        },
        {
          $sort: { createdAt: 1 },
        },
      ])
      .exec();
    return allRefrigerators;
  }

  async getById(rid) {
    const refrigerator = await refrigerators.findById(rid);
    if (!refrigerator)
      throw new HttpError("Refrigerator not found", HTTP_NOT_FOUND);
    return refrigerator;
  }

  async addOne(payload) {
    const refrigerator = await refrigerators.create(payload);
    if (!refrigerator)
      throw new HttpError("Internal Server Error", HTTP_INTERNAL_SERVER_ERROR);
    return refrigerator;
  }

  async updateOne(rid, payload) {
    const updatedRefrigerator = await refrigerators.findByIdAndUpdate(
      rid,
      payload
    );
    if (!updatedRefrigerator)
      throw new HttpError("Refrigerator not found", HTTP_NOT_FOUND);
    return updatedRefrigerator;
  }

  async updateMany(rid, payload) {
    const updatedRefrigerator = await refrigerators.updateMany(
      { createdAt: { $exists: false } }, // Filtra los documentos que no tienen createdAt
      {
        $set: {
          createdTimestamp: new Date(),
          updatedAt: new Date(), // Agrega también el campo updatedAt si no está presente
        },
      }
    );
    if (!updatedRefrigerator)
      throw new HttpError("Refrigerator not found", HTTP_NOT_FOUND);
    return updatedRefrigerator;
  }

  async deleteOne(rid) {
    const refrigerator = await refrigerators.deleteOne({ _id: rid });
    if (!refrigerator.deletedCount)
      throw new HttpError("Refrigerator not found", HTTP_NOT_FOUND);
    return refrigerator;
  }
}

export default RefrigeratorsService;

// import refrigeratorsJson from "../mock/refrigerators.mock.json" with {type: "json"};

// async getAll(){
//     const refrigerators = refrigeratorsJson;
//     return refrigerators
// }

// async getById(rid){
//     const refrigerator = refrigeratorsJson.find(ref => ref._id === +rid)
//     if(!refrigerator) throw new HttpError('Refrigerator not found', HTTP_NOT_FOUND)
//     return refrigerator
// }

// async addOne(payload){
//     const newRefrigerator = {
//         _id: refrigeratorsJson.length + 1,
//         ...payload
//     }
//     refrigeratorsJson.push(newRefrigerator)
//     return refrigeratorsJson
// }

// async updateOne(rid, payload){
//     const refrigeratorIdx = refrigeratorsJson.findIndex(ref => ref._id === +rid)
//     if(refrigeratorIdx === -1) throw new HttpError('Refrigerator not found', HTTP_NOT_FOUND)
//     refrigeratorsJson[refrigeratorIdx] = { _id: +rid, ...payload}
//     return refrigeratorsJson
// }

// async deleteOne(rid){
//     const refrigeratorIdx = refrigeratorsJson.findIndex(ref => ref._id === +rid)
//     if(refrigeratorIdx === -1) throw new HttpError('Refrigerator not found', HTTP_NOT_FOUND)
//     refrigeratorsJson.splice(refrigeratorIdx, 1)
//     return refrigeratorsJson
// }
