import bucketsJson from "../mock/buckets.mock.json" with {type: "json"};
import HttpError from "../utils/HttpError.util.js";

class BucketsService{
    async getAll(){
        const buckets = bucketsJson;
        return buckets
    }

    async getById(bid){
        const bucket = bucketsJson.find(buck => buck._id === +bid)
        if(!bucket) throw new HttpError('Bucket not found', 404)
        return bucket
    }

    async addOne(payload){
        const newBucket = {
            id: bucketsJson.length + 1,
            ...payload
        }
        bucketsJson.push(newBucket) 
        return bucketsJson
    }

    async updateOne(bid, payload){
        const bucketIdx = bucketsJson.findIndex(buck => buck._id === +bid)
        if(bucketIdx === -1) throw new HttpError('Bucket not found', 404)
        bucketsJson[bucketIdx] = { _id: +bid, ...payload}
        return bucketsJson
    }

    async deleteOne(bid){
        const bucketIdx = bucketsJson.findIndex(buck => buck._id === +bid)
        if(bucketIdx === -1) throw new HttpError('Bucket not found', 404)
        bucketsJson.splice(bucketIdx, 1)
        return bucketsJson
    }
}

export default BucketsService