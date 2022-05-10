const express = require('express');
const router = express.Router();

//SET STORAGE
const multer = require('multer');

const fs = require('fs')
const path = require('path')

//midleware
const verifyToken = require('./../routes/validatetoken');

//import controller

const parametrosController = require('./../controllers/ParametrosController');

//PARAMETROS
router.get('/parametros/all', parametrosController.all );
router.post('/parametros/register', parametrosController.create );
router.put('/parametros', parametrosController.update );
router.get('/parametros/id', parametrosController.selectById );
router.delete('/parametros', parametrosController.destroy );


module.exports = router;