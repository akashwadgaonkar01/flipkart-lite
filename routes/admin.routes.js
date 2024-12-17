const {
  getProducts,
  addProduct,
  updateProducts,
  deleteProducts,
  fetchAdminOrders,
  adminUpdateOrderStatus,
  adminCustomerFetch,
  adminBlockUnblockCustomer,
} = require("../controllers/admin.controller");

const router = require("express").Router();

router
  .get("/product", getProducts)
  .post("/product/add", addProduct)
  .put("/product/update/:productId", updateProducts)
  .delete("/product/delete/:productId", deleteProducts)

  .get("/orders", fetchAdminOrders)
  .put("/order/update/:oid", adminUpdateOrderStatus)

  .get("/customer/fetch", adminCustomerFetch)
  .put("/customer/block/:cid", adminBlockUnblockCustomer);

module.exports = router;
