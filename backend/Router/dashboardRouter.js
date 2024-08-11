const express = require('express');
const router = express.Router();
const {createBanner,updateBanner,getBanner} = require('../controller/dashboardController')
const reqValdation = require('../validation/reqValidation')
const {validationSchema} = require('../utils/validationSchema')
// setup routes
router.route('/create-banner').post(reqValdation.validate(validationSchema.createBanner),createBanner);
router.route('/update-banner').put(reqValdation.validate(validationSchema.updateBanner),updateBanner);
router.route('/get-banner').get(getBanner);

module.exports = router