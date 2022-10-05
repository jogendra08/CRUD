const mongoose = require ('mongoose');

const mongoUri="mongodb://localhost:27017/test"

const connectToMongo=()=>{
    mongoose.connect(mongoUri, ()=>{
        console.log("connected to mongo successfully");
    })
}

module.exports= connectToMongo;