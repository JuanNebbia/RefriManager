import mongoose from "mongoose";

const refrigeratorSchema = mongoose.Schema(
  {
    total_capacity: {
      type: Number,
      required: true,
    },
    refri_name: {
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

const refrigerators = mongoose.model("refrigerators", refrigeratorSchema);

export default refrigerators;
