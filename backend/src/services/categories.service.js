import categories from "../models/category.model.js";
import HttpError from "../utils/HttpError.util.js";
import {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_FOUND,
} from "../utils/constants.util.js";

class CategoriesService {
  async getAll() {
    const allCategories = await categories.find({});
    return allCategories;
  }

  async getById(cid) {
    const category = await categories.findById(cid);
    if (!category) throw new HttpError("Category not found", HTTP_NOT_FOUND);
    return category;
  }

  async addOne(payload) {
    const category = await categories.create(payload);
    if (!category)
      throw new HttpError("Internal Server Error", HTTP_INTERNAL_SERVER_ERROR);
    return category;
  }

  async updateOne(cid, payload) {
    const category = await categories.findByIdAndUpdate(cid, payload);
    if (!category) throw new HttpError("Category not found", HTTP_NOT_FOUND);
    return category;
  }

  async deleteOne(cid) {
    const category = await categories.deleteOne({ _id: cid });
    if (category.deletedCount === 0)
      throw new HttpError("Category not found", HTTP_NOT_FOUND);
    return category;
  }
}

export default CategoriesService;

// async getAll(){
//     const categories = categoriesJson;
//     return categories
// }

// async getById(cid){
//     const category = categoriesJson.find(cat => cat._id === +cid)
//     if(!category) throw new HttpError('Category not found', HTTP_NOT_FOUND)
//     return category
// }

// async addOne(payload){
//     const newCategory = {
//         _id: categoriesJson.length + 1,
//         ...payload
//     }
//     categoriesJson.push(newCategory)
//     return categoriesJson
// }

// async updateOne(cid, payload){
//     const categoryIdx = categoriesJson.findIndex(cat => cat._id === +cid)
//     if(categoryIdx === -1) throw new HttpError('Category not found', HTTP_NOT_FOUND)
//     categoriesJson[categoryIdx] = { _id: +cid, ...payload}
//     return categoriesJson
// }

// async deleteOne(cid){
//     const categoryIdx = categoriesJson.findIndex(cat => cat._id === +cid)
//     if(categoryIdx === -1) throw new HttpError('Category not found', HTTP_NOT_FOUND)
//     categoriesJson.splice(categoryIdx, 1)
//     return categoriesJson
// }
