import categoriesJson from "../mock/categories.mock.json" with {type: "json"};
import HttpError from "../utils/HttpError.util.js";
import { HTTP_NOT_FOUND } from "../utils/constants.util.js";

class CategoriesService{
    async getAll(){
        const categories = categoriesJson;
        return categories
    }

    async getById(cid){
        const category = categoriesJson.find(cat => cat._id === +cid)
        if(!category) throw new HttpError('Category not found', HTTP_NOT_FOUND)
        return category
    }

    async addOne(payload){
        const newCategory = {
            _id: categoriesJson.length + 1,
            ...payload
        }
        categoriesJson.push(newCategory) 
        return categoriesJson
    }

    async updateOne(cid, payload){
        const categoryIdx = categoriesJson.findIndex(cat => cat._id === +cid)
        if(categoryIdx === -1) throw new HttpError('Category not found', HTTP_NOT_FOUND)
        categoriesJson[categoryIdx] = { _id: +cid, ...payload}
        return categoriesJson
    }

    async deleteOne(cid){
        const categoryIdx = categoriesJson.findIndex(cat => cat._id === +cid)
        if(categoryIdx === -1) throw new HttpError('Category not found', HTTP_NOT_FOUND)
        categoriesJson.splice(categoryIdx, 1)
        return categoriesJson
    }
}

export default CategoriesService