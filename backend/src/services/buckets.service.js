import buckets from "../models/bucket.model.js";
import HttpError from "../utils/HttpError.util.js";
import { HTTP_NOT_FOUND } from "../utils/constants.util.js";

class BucketsService {
  async getAll() {
    const allBuckets = await buckets.find({});
    return allBuckets;
  }

  async getById(bid) {
    const bucket = await buckets.findById(bid).populate("flavor_id");
    if (!bucket) throw new HttpError("Bucket not found", HTTP_NOT_FOUND);
    return bucket;
  }

  async addOne(payload) {
    const bucket = await buckets.create(payload);
    if (!bucket)
      throw new HttpError("Internal Server Error", HTTP_INTERNAL_SERVER_ERROR);
    return bucket;
  }

  async updateOne(bid, payload) {
    const bucket = await buckets.findByIdAndUpdate(bid, payload);
    if (!bucket) throw new HttpError("Bucket not found", HTTP_NOT_FOUND);
    return bucket;
  }

  async deleteOne(bid) {
    const bucket = await buckets.deleteOne({ _id: bid });
    if (bucket.deletedCount === 0)
      throw new HttpError("Bucket not found", HTTP_NOT_FOUND);
    return bucket;
  }
}

export default BucketsService;

// async getAll(){
//     const buckets = bucketsJson;
//     return buckets
// }

// async getById(bid){
//     const bucket = bucketsJson.find(buck => buck._id === +bid)
//     if(!bucket) throw new HttpError('Bucket not found', HTTP_NOT_FOUND)
//     return bucket
// }

// async addOne(payload){
//     const newBucket = {
//         _id: bucketsJson.length + 1,
//         ...payload
//     }
//     bucketsJson.push(newBucket)
//     return bucketsJson
// }

// async updateOne(bid, payload){
//     const bucketIdx = bucketsJson.findIndex(buck => buck._id === +bid)
//     if(bucketIdx === -1) throw new HttpError('Bucket not found', HTTP_NOT_FOUND)
//     bucketsJson[bucketIdx] = { _id: +bid, ...payload}
//     return bucketsJson
// }

// async deleteOne(bid){
//     const bucketIdx = bucketsJson.findIndex(buck => buck._id === +bid)
//     if(bucketIdx === -1) throw new HttpError('Bucket not found', HTTP_NOT_FOUND)
//     bucketsJson.splice(bucketIdx, 1)
//     return bucketsJson
// }
