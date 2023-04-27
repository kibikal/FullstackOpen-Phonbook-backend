const mongoose = require("mongoose");

if(process.argv.length<3){
    console.log("Provide password as an argument in the command line");
}

const password = process.argv[2];

const url = `mongodb+srv://nimoakk:${password}@cluster0.srg28nb.mongodb.net/?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name:String,
    number: Number
})

const Person = mongoose.model("Person",personSchema);

if(process.argv.length>3){
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    
    newPerson.save().then(result=>{
        console.log(`Added ${result.name} number ${result.number} to phonebook`);
        console.log(result)
        mongoose.connection.close()
    })
}

if(process.argv.length===3){
    Person.find({}).then(result=>{
        console.log(result)
        mongoose.connection.close()
    })
}