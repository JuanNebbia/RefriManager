import mongoose from "mongoose";

const flavorSchema = mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    default: "active",
    enum: ["active", "inactive"],
  },
});

const flavors = mongoose.model("flavors", flavorSchema);

export default flavors;
