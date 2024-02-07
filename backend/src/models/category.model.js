import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    unique: true,
  },
});

const categories = mongoose.model("categories", categorySchema);

export default categories;
