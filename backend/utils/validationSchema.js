const Joi = require('joi');

const validationSchema = {
    // registraction validation
    createBanner :Joi.object().keys({
        title: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(10).required(),
        image_url: Joi.string().uri().required(),
        active: Joi.boolean().optional(),
        priority: Joi.number().integer().min(0).optional(),
        time_remaning:Joi.number().integer().min(0).required()
    }),
    updateBanner : Joi.object().keys({
        title: Joi.string().min(3).max(255).optional(),
        description: Joi.string().min(10).optional(),
        image_url: Joi.string().uri().optional(),
        active: Joi.boolean().optional(),
        priority: Joi.number().integer().min(0).optional(),
        bannerId:Joi.number().integer().min(0).required(),
        time_remaning:Joi.number().integer().min(0).optional()
    })
}


module.exports = {validationSchema};