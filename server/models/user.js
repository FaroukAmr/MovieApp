import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi  from "joi"
import passwordComplexity from "joi-password-complexity"
const userSchema = mongoose.Schema({
    email:{type:String,require:true},
    username:{type:String,require:true},
    password:{type:String,require:true}
})
userSchema.methods.generateAuthToken=function(){
    const token= jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token;
}

const User = mongoose.model("user",userSchema)
const validate=(data)=>{
    const schema=Joi.object({
      username:Joi.string().required().label("Username"),
      email:Joi.string().email().required().label("Email"),
      password:passwordComplexity().required().label("Password"),

    });
    return schema.validate(data);
  };

export {User,validate};
