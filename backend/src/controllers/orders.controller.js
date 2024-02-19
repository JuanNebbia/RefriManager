import OrdersService from "../services/orders.service.js";
import { HTTP_CREATED, HTTP_SUCCESS } from "../utils/constants.util.js";

const ordersService = new OrdersService();

class OrdersController {
  static getAllOrders = async (req, res, next) => {
    try {
      const orders = await ordersService.getAll();
      res.status(HTTP_SUCCESS).send(orders);
    } catch (error) {
      next(error);
    }
  };

  static getOrdersById = async (req, res, next) => {
    const { oid } = req.params;
    try {
      const order = await ordersService.getById(oid);
      res.status(HTTP_SUCCESS).send(order);
    } catch (error) {
      next(error);
    }
  };

  static addOrder = async (req, res, next) => {
    const payload = req.body;
    try {
      const orders = await ordersService.addOne(payload);
      res.status(HTTP_CREATED).send(orders);
    } catch (error) {
      next(error);
    }
  };

  static updateOrder = async (req, res, next) => {
    const payload = req.body;
    const { oid } = req.params;
    try {
      const orders = await ordersService.updateOne(oid, payload);
      res.status(HTTP_SUCCESS).send(orders);
    } catch (error) {
      next(error);
    }
  };

  static deleteOrder = async (req, res, next) => {
    const { oid } = req.params;
    try {
      const orders = await ordersService.deleteOne(oid);
      res.status(HTTP_SUCCESS).send(orders);
    } catch (error) {
      next(error);
    }
  };
}

export default OrdersController;
