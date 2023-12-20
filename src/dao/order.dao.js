const orderModel = require('../model/order.model');
const DBConnection=new (require("../commonServices/db.connection"))();
const commonService=new (require("../commonServices/commonService"))();

class orderDao {
  async create(data) {
    try {
      await DBConnection.dbConnect();
      const nbody=await commonService.updateBodyFormat(data)
      const result = await (new orderModel(nbody)).save();
      return result;
    } catch (error) {
      if (error.name === 'CastError' || error.name === 'ValidationError') return { error: error.message };
      throw error;
    }
  }

  async getById(query) {
    try {
      await DBConnection.dbConnect();
      const result = await orderModel.findOne(query);

      return result;
    } catch (error) {
      if (error.name === 'CastError' || error.name === 'ValidationError') return { error: error.message };
      throw error;
    }
  }

  async deleteById(query) {
    try {
      await DBConnection.dbConnect();
      const result = await orderModel.deleteOne(query);

      return result;
    } catch (error) {
      if (error.name === 'CastError' || error.name === 'ValidationError') return { error: error.message };
      throw error;
    }
  }

  async updateById(query, data) {
    try {
      await DBConnection.dbConnect();
      const predata=await this.getById(query)
      const nbody=await commonService.updateBodyFormat(data)
      if(predata){
        const newTime=nbody.datetime.getTime();
        const oldTime=predata._doc.datetime.getTime();
        if(newTime-oldTime < (3*60*60*1000)){
          throw new Error(" error on creation/updating an order within 3 hrs of a pre-existing order.");
        }else{
          const result = await orderModel.findOneAndUpdate(query, nbody);
          return result;
        }
      }else{
        throw new Error("Product does not exist");
      }
    } catch (error) {
      if (error.name === 'CastError' || error.name === 'ValidationError') return { error: error.message };
      throw error;
    }
  }

  async getAllOrder() {
    try {
      await DBConnection.dbConnect();
      const result = orderModel.find().lean();
      return result;
    } catch (error) {
      if (error.name === 'CastError' || error.name === 'ValidationError') return { error: error.message };
      throw error;
    }
  }
}

module.exports = orderDao;