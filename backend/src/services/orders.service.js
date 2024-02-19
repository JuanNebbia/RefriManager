import flavors from "../models/flavor.model.js";
import orders from "../models/order.model.js";
import HttpError from "../utils/HttpError.util.js";
import {
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_FOUND,
} from "../utils/constants.util.js";

class OrdersService {
  async getAll() {
    const allOrders = await orders.find({}).populate("items.flavor_id");
    return allOrders;
  }

  async getById(oid) {
    const order = await orders.findById(oid).populate("items.flavor_id");
    if (!order) throw new HttpError("Order not found", HTTP_NOT_FOUND);
    return order;
  }

  async addOne(payload) {
    for (let i = 0; i < payload.items.length; i++) {
      const flavor = await flavors.findById(payload.items[i].flavor_id);
      if (!flavor) throw new HttpError("Inexisting flavor", HTTP_BAD_REQUEST);
    }
    payload.total_amount = 0;
    for (let i = 0; i < payload.items.length; i++) {
      payload.total_amount += payload.items[i].amount;
    }
    const order = await orders.create(payload);
    if (!order)
      throw new HttpError("Internal Server Error", HTTP_INTERNAL_SERVER_ERROR);
    return order;
  }

  async updateOne(oid, payload) {
    const order = await orders.findByIdAndUpdate(oid, payload);
    if (!order) throw new HttpError("Order not found", HTTP_NOT_FOUND);
    return order;
  }

  async deleteOne(oid) {
    const order = await orders.deleteOne({ _id: oid });
    if (order.deletedCount === 0)
      throw new HttpError("Order not found", HTTP_NOT_FOUND);
    return order;
  }
}

export default OrdersService;
