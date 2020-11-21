const mongoose = require('mongoose');
module.exports = {
    connectMongo: ()=>{
        mongoose.connect(process.env.MONGO,{useNewUrlParser:true,useUnifiedTopology: true})
            .then(() => {
                console.log("Connected to Mongo database!");
            })
            .catch((err) => {
                console.error("Connection to Mongo database failed! ==>" + err);
            });
    }
}


