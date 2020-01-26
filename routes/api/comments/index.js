const router = require("express").Router();
const byHouseRoutes = require("./byhouse");
const byUserRoutes = require("./byuser");

// Routes
router.use("/byhouse", byHouseRoutes);
router.use("/byuser", byUserRoutes);


module.exports = router;