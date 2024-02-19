import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    items: [
      {
        flavor_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "flavors",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    date: {
      type: Date,
      default: new Date(),
    },
    total_amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const orders = mongoose.model("orders", orderSchema);

export default orders;
