const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.post('/create',userController.create);
router.post('/login',userController.login);
router.use(userController.protect);
router.put('/edit-profile',userController.editProfile);

module.exports = router;