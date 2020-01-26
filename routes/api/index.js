const router = require("express").Router();
const houseRoutes = require("./houses");
const userRoutes = require("./users");
const commentRoutes = require("./comments");

// Routes
router.use("/houses", houseRoutes);
router.use("/users", userRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
