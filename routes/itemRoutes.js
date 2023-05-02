const express = require("express")
const itemsController = require("../controller/itemsController")

const router = express.Router()

router.get("/", itemsController.getItems)
router.get("/members", itemsController.getGroupMembers)
router.post("/", itemsController.addItem)
router.delete("/:item_id", itemsController.deleteItem)
router.delete("/members/:name", itemsController.deleteItemByName)

module.exports = router

