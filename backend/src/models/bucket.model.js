import mongoose from "mongoose";

const bucketSchema = mongoose.Schema({
  refrigerator_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "refrigerators",
  },
  flavor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "flavors",
    default: null,
  },
  position: {
    type: Number,
    required: true,
  },
  side: {
    type: Number,
    required: true,
    enum: [0, 1],
  },
});

const buckets = mongoose.model("buckets", bucketSchema);

export default buckets;
