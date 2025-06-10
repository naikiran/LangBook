let ADMIN = require('../model/admin');
let jwt = require('jsonwebtoken');


// exports.Auth = async function(req, res, next) {
//     console.log('hello');
    
//     try {
//         let token = req.headers.authorization;
//         if (!token) {
//             throw new Error('Please Attach token');
//         }
//         let decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (!decoded) {
//             throw new Error('Invalid token');        
//         }
//         let admin = await ADMIN.findById(decoded.id);
        
//         if (!admin) {
//             throw new Error('Admin not found');
//         }
//         // req.admin = admin;
//         next();
//     } catch (error) {
//         res.status(401).json({
//             status: 'fail',
//             message: error.message,
//         });
//     }
// }

exports.Auth = async function (req,res,next) {
    console.log('hello');

    try {
        // let token = req.headers.authorization
        // // console.log(token);
        // if (!token) throw new Error("Please Attech Token");

        // let tokenVarify = jwt.verify(token,process.env.JWT_SECRET)
        // // console.log(tokenVarify);
        // if(!tokenVarify) throw new Error("Please Enter Valid Token");

        // let adminVerify = await ADMIN.findById(tokenVarify.id)
        // if (!adminVerify) {
        //     throw new Error("Admin Not Found");
        // }
        next()
    } catch (error) {
        res.status(404).json({
            status :"Fail",
            message : error.message
        })
    }
    
}