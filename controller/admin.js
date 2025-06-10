    let ADMIN = require('../model/admin')
    let bcrypt = require('bcryptjs')
    let jwt = require('jsonwebtoken')

    exports.signup = async function(req, res, next) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            let userdata = await ADMIN.create(req.body);

            res.status(201).json({
                status: 'success',
                message: 'User signed up successfully',
                data: userdata
            });

        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error.message,
            });
        }
    };

    exports.login = async function(req, res, next) {
        try {
            
            let userdata = await ADMIN.findOne({email : req.body.email})
            if(!userdata)
            {
                throw new Error('user not found!')
            }
            let checkpass = await bcrypt.compare(req.body.password,userdata.password)
            if(!checkpass)
            {
                throw new Error('incorrect Password!')
            }
            let token = jwt.sign({id : userdata._id}, process.env.JWT_SECRET)
            
            res.status(201).json({
                status : 'success',
                message : 'user login successful',
                data : userdata,
                token 
            })
        } catch (error) {
            res.status(404).json({
                status : 'fail',
                message : error.message,
            })
        }
    };  
