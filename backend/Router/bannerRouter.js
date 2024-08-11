const express = require('express');
const router = express.Router();
const {getBanner} = require('../controller/bannerController')

// setup routes
router.route('/get-banner').get(getBanner);
module.exports = router