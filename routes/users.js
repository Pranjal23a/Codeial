const express= require('express');
const router= express.Router();

const userController= require('../controllers/users_controller');

router.get('/profile', userController.profile);
router.get('/signUp', userController.signUp);
router.get('/signIn', userController.signIn);
router.post('/create', userController.create);

module.exports= router;