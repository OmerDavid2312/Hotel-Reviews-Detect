const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');

exports.getUserDetails = async (req,res,next)=>{
    try {
        const user = await User.findById(req.userData._id).select('email name');
        if(user) {
            res.status(200).json({name:user.user});
        }
    } catch (error) {
        res.status(500).json({message:'faild retirve user detail'});
    }

}

exports.login = async (req,res,next)=>{

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        //Check if email exists
        const user = await User.findOne({email:email});
        if(!user) return res.status(401).json({message:'Email or Password is wrong'});

        //Check valid password
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword) return res.status(401).json({message:'Email or Password is wrong'});

        //Token
        const token = jwt.sign({_id:user._id,email:email},process.env.SECRET_TOKEN,{expiresIn:'1h'});

        res.status(200).json({ token: token ,user:user.name });
        

    } catch (error) {
        res.status(401).json({message:'Login Faild'});
    }

};

exports.register = async (req,res,next)=>{
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const {email, password, name} = req.body;
    try {
        //Check if email exists
        const emailExist = await User.findOne({email:email});
        if(emailExist) return res.status(401).json({message:'Email already exists'});
        
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const user = await new User({
            email:email,
            password:hashedPassword,
            name:name
        });
        const savedUser = await user.save();
        res.status(201).json({_id:savedUser._id});
    } catch (error) {
        res.status(401).json({message:'Register Faild'});
    }
};