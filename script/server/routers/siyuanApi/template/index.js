const express = require('express');
const router = express.Router();
const {middlewares} =naive
const {auth,syProxy}= middlewares
const { apiProxy} =syProxy

router.post("/render", atuh(), apiProxy)
router.post("/docSaveAsTemplate", atuh(), apiProxy)
module.exports=router