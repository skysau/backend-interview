
const { Router } = require('express');
const orderController = new(require('../contoller/order.controller'))();
const router = new Router();

 
router.post('/create-order', orderController.create);

router.get('/get-order', orderController.getById);

router.delete('/delete-order', orderController.deleteById);

router.put('/edit-order', orderController.updateById);

router.get('/allOrder', orderController.getAllOrder);

module.exports = router;