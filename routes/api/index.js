const router = require("express").Router();
const houseRoutes = require("./houses");
const userRoutes = require("./users");

// Routes
router.use("/houses", houseRoutes);
router.use("/users", userRoutes);

module.exports = router;
