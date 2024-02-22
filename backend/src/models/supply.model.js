import mongoose from "mongoose";

const supplySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  {
    timestamps: true,
  }
);

const supplies = mongoose.model("supplies", supplySchema);

export default supplies;
