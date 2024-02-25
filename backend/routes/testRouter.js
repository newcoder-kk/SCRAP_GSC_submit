const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const userController = require('../controllers/userController');

router.use(userController.protect)
router.post('/score', testController.addScore);
router.get('/score', testController.getScore);
router.get('/questions', testController.getQuestions);
router.post('/questions', testController.addMultipleQuestion);
router.post('/question', testController.addQuestion);

module.exports = router;