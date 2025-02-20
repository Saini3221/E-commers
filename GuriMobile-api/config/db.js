const mongoose = require("mongoose")


async function ConnectedDB(){

    mongoose.connect("mongodb+srv://sainirakesh3221:Saini3221@gurimobilegarage.z39ii.mongodb.net/")
    .then(()=>
        console.log("connect to data base")
    )
    .catch((e)=>{
    console.log(e)
    }
    )
}

module.exports=ConnectedDB