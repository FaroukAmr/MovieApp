import mongoose from "mongoose";
const Schema = mongoose.Schema;

const favsSchema = new Schema({
    userid:{
        type:String,
        required:true
    },
   title:{
    type:String,
    required:true,
   },
   poster_path:{
    type:String,
    required:true,
   },
   overview:{
    type:String,
    required:true,
   },
   vote_average:{
    type:String,
    required:true,
   }


})
const Favs = mongoose.model('Favs',favsSchema);
export {Favs}