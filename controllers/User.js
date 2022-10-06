const User = require('../models/User')
const bcrypt = require('bcrypt')
const Joi = require('joi')

module.exports = class UserController {
    static async register(req, res) {
        try {

            const schema = Joi.object({
                name: Joi.string().min(4).required(),
                email: Joi.string().email().min(4).required(),
                password: Joi.string().min(4).required(),
            });

            const { error } = schema.validate(req.body);

            if (error)
            return res.status(400).send({
                error: {
                    message: error.details[0].path + ' failed, please check again   ',
                },
            }); 
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const data = new User({
                name:req.body.name,
                email:req.body.email,
                password:hashedPassword
            })
            const result = await data.save()
    
            res.status(201).send({
                meta:{
                    status:"Success",
                    code:201
                },
                response:{
                    _id:result._id,
                    name:result.name,
                    email:result.email
                }
            })
        } catch (error) {
            res.status(400).send({
                status:"failed",
                error
            })
        }
    }

    static async getUser(req, res) {
        try {
            const result = await User.findById(req.params.id)


            res.status(200).send({
                meta:{
                    status:"Success",
                    code:200
                },
                response:{
                    _id:result._id,
                    name:result.name,
                    email:result.email
                }
            })
        } catch (error) {
            res.status(404).send({
                status:"failed",
                error
            })
        }
    }

    static async getsUser(req, res) {
        try {
            const result = await User.find().select(-'password')

            if(result.length == 0){
                return res.status(404).send({
                    meta:{
                        status:"failed",
                        code:404
                    },
                    response:{
                        message:"Data not found"
                    }
                })
            }
    
            res.status(200).send({
                meta:{
                    status:"Success",
                    code:201
                },
                response:result
            })
        } catch (error) {
            console.log(error);
            res.status(400).send({
                status:"failed",
                error
            })
        }
    }
    
    static async updateUser(req, res) {
        try {

            const schema = Joi.object({
                name: Joi.string().min(4).required(),
                email: Joi.string().email().min(4).required()
            });

            const { error } = schema.validate(req.body);

            if (error)
            return res.status(400).send({
                error: {
                    message: error.details[0].path + ' failed, please check again   ',
                },
            }); 
    

            await User.updateOne({_id:req.params.id}, {$set:req.body})

            res.status(201).send({
                meta:{
                    status:"Success",
                    code:201
                },
                response:{
                    message:'Update User Succesfull'
                }
            })
        } catch (error) {
            res.status(400).send({
                status:"failed",
                error
            })
        }
    }

    static async deleteUser(req, res) {
        try {
            await User.deleteOne({_id:req.params.id})
    
            res.status(200).send({
                meta:{
                    status:'Success',
                    code:201
                }
            })
    
        } catch (error) {
            res.status(500).send({
                status:"failed",
                error
            })
        }
    }
}
