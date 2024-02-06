import flavorsJson from "../mock/flavors.mock.json" with {type: "json"};
import HttpError from "../utils/HttpError.util.js";
import { HTTP_NOT_FOUND } from "../utils/constants.util.js";

class FlavorsService{
    async getAll(){
        const flavors = flavorsJson;
        return flavors
    }

    async getById(fid){
        const flavor = flavorsJson.find(fla => fla._id === +fid)
        if(!flavor) throw new HttpError('Flavor not found', HTTP_NOT_FOUND)
        return flavor
    }

    async addOne(payload){
        const newFlavor = {
            _id: flavorsJson.length + 1,
            ...payload
        }
        flavorsJson.push(newFlavor) 
        return flavorsJson
    }

    async updateOne(fid, payload){
        const flavorIdx = flavorsJson.findIndex(fla => fla._id === +fid)
        if(flavorIdx === -1) throw new HttpError('Flavor not found', HTTP_NOT_FOUND)
        flavorsJson[flavorIdx] = { _id: +fid, ...payload}
        return flavorsJson
    }

    async deleteOne(fid){
        const flavorIdx = flavorsJson.findIndex(fla => fla._id === +fid)
        if(flavorIdx === -1) throw new HttpError('Flavor not found', HTTP_NOT_FOUND)
        flavorsJson.splice(flavorIdx, 1)
        return flavorsJson
    }
}

export default FlavorsService