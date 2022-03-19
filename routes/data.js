const express = require('express')
const Data = require('../controllers/dataController')






const router = express.Router()
router.get("/",Data.getCsv )




module.exports = router


