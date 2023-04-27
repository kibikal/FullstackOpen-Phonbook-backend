const mongoose = require("mongoose")

mongoose.set("strictQuery", false)
const url = process.env.MONGODB_URI;

mongoose.connect(url).then(()=>{
    console.log("Connected to Database!");
})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

personSchema.set("toJSON", {
    transform: (document, returnedPerson)=>{
        returnedPerson.id = returnedPerson._id.toString();
        delete returnedPerson._id
        delete returnedPerson.__v
    }
})



module.exports= mongoose.model("Person", personSchema);
