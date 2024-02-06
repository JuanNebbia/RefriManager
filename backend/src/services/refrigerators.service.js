import refrigeratorsJson from "../mock/refrigerators.mock.json" with {type: "json"};
import HttpError from "../utils/HttpError.util.js";
import { HTTP_NOT_FOUND } from "../utils/constants.util.js";

class RefrigeratorsService{
    async getAll(){
        const refrigerators = refrigeratorsJson;
        return refrigerators
    }

    async getById(rid){
        const refrigerator = refrigeratorsJson.find(ref => ref._id === +rid)
        if(!refrigerator) throw new HttpError('Refrigerator not found', HTTP_NOT_FOUND)
        return refrigerator
    }

    async addOne(payload){
        const newRefrigerator = {
            _id: refrigeratorsJson.length + 1,
            ...payload
        }
        refrigeratorsJson.push(newRefrigerator) 
        return refrigeratorsJson
    }

    async updateOne(rid, payload){
        const refrigeratorIdx = refrigeratorsJson.findIndex(ref => ref._id === +rid)
        if(refrigeratorIdx === -1) throw new HttpError('Refrigerator not found', HTTP_NOT_FOUND)
        refrigeratorsJson[refrigeratorIdx] = { _id: +rid, ...payload}
        return refrigeratorsJson
    }

    async deleteOne(rid){
        const refrigeratorIdx = refrigeratorsJson.findIndex(ref => ref._id === +rid)
        if(refrigeratorIdx === -1) throw new HttpError('Refrigerator not found', HTTP_NOT_FOUND)
        refrigeratorsJson.splice(refrigeratorIdx, 1)
        return refrigeratorsJson
    }
}

export default RefrigeratorsService