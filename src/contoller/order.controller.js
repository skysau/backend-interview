const Joi = require("joi");
const lodash = require("lodash");
const orderDao = new (require("../dao/order.dao"))();
const utils = require("../commonServices/utils");
const validation = new (require("../commonServices/validation"))();

class Order {
  async create(req, res, next) {
    try {
      const orderSchema = Joi.object({
    orderBy: Joi.string().required(),
    services: Joi.array().items(
          Joi.object({
            id: Joi.number(),
            name:Joi.string()
          })
        )
      });
      const error = await validation.check(orderSchema, req.body);
      if (lodash.isBoolean(error) && !error) {
        const result = await orderDao.create(req.body);
        if (result.error) {
          return res.status(400).json(utils.prepareRes(400, result))
        } else {
          const output = result.toJSON();
          output.message = "Order added successfully";
          req.res = utils.prepareRes(200, output);
          return res.status(200).json(utils.prepareRes(200, result));
        }
      } else {
        return next(utils.prepareRes(400, error));
      }
    } catch (error) {
      if (lodash.isObject(error) && !Array.isArray(error)) {
        error.data = {
          error: "Internal Server Error",
        };
      }
      return next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const id = req.headers.id;
      const schema = Joi.string().required();
      const error = await validation.check(schema, id);
      if (lodash.isBoolean(error) && !error) {
        const result = await orderDao.getById({ _id: id });
        if (!result) {
          const error="no record founf"
          return res.status(404).json(utils.prepareRes(404, error))
        } else if (result.error) {
          return res.status(400).json(utils.prepareRes(400, result))
        } else {
          req.res = utils.prepareRes(200, result);
          return next();
        }
      } else {
        return next(utils.prepareRes(400, error));
      }
    } catch (error) {
      if (lodash.isObject(error) && !Array.isArray(error)) {
        error.data = {
          error: "Internal Server Error",
        };
      }
      return next(error);
    }
  }

  async deleteById(req, res, next) {
    try {
      const id = req.headers.id;
      const schema = Joi.string().required();
      const error = await validation.check(schema, id);
      if (lodash.isBoolean(error) && !error) {
        const result = await orderDao.deleteById({ _id: id });
        if (!result) {
          return next(
            utils.prepareRes(404, {
              error: "Order not found",
            })
          );
        } else if (result.error) {
          return next(utils.prepareRes(400, result));
        } else {
          req.res = utils.prepareRes(200, result);
          return res.status(200).json(utils.prepareRes(200, result));
        }
      } else {
        return next(utils.prepareRes(400, error));
      }
    } catch (error) {
      if (lodash.isObject(error) && !Array.isArray(error)) {
        error.data = {
          error: "Internal Server Error",
        };
      }
      return next(error);
    }
  }

  async updateById(req, res, next) {
    try {
      const id = req.headers.id;
      const body = req.body;
      const orderSchema = Joi.object({
        orderBy: Joi.string().optional(),
        services: Joi.array().items(
              Joi.object({
                id: Joi.number(),
                name: Joi.string().optional(),
              })
            )
          });
      const error = await validation.check(orderSchema, body);
      if (lodash.isBoolean(error) && !error) {
        const result = await orderDao.updateById({ _id: id }, body);
        if (!result) {
          return res.status(400).json(utils.prepareRes(400, { error: "order not found" }));
        } else if (result.error) {
          return res.status(400).json(utils.prepareRes(400, result));
        } else {
          req.res = utils.prepareRes(200, {
            message: "order updated successfully",
            ...result._doc,
          });
          return res.status(200).json(utils.prepareRes(200, result));
        }
      } else {
        return res.status(400).json(utils.prepareRes(400, error));
      }
    } catch (error) {
      if (lodash.isObject(error) && !Array.isArray(error))
      return res.status(400).json(utils.prepareRes(400, error.message));
    }
  }

  async getAllOrder(req, res, next){
    const result = await orderDao.getAllOrder();
    if (!result) {
        return res.status(400).json(utils.prepareRes(400, { error: "order not found" }));
    } else {
        return res.status(200).json(utils.prepareRes(200, result));
    }
    
  }

}
module.exports = Order;