import express  from "express"
const router = express.Router()
import {Favs} from "../models/favs.js"

router.post("/", async (req, res) => {
    let poster= req.body.poster_path
    const findOne = await Favs.find({poster_path:poster});
    if(findOne.length!=0){
        return res.status(300).send({ message: "Movie already in favorites" });
    }else{
    try{
        await new Favs({...req.body}).save();
        res.status(201).send({ message: "Movie added to favs" });
    }catch(error){
        res.status(500).send(error);
    }
}

})

router.get("/", async (req, res) => {
    try{
        let  params = req.query.userid
    const fav = await Favs.find({userid:params});
    res.status(201).send(fav);
    }catch{
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.delete("/", async (req, res) => {
    try{
        let paramID = req.query.userid
        let paramtitle = req.query.title
        const fav = await Favs.deleteOne({userid:paramID,title:paramtitle});
        console.log(fav)
        res.status(201).send(fav);
        }catch{
            res.status(500).send({ message: "Internal Server Error" });
        }
})

export default router