require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors")
const Person = require("./models/persons");

const requestLogger=(req, res, next)=>{
  console.log(`Method: ${req.method}`)
  console.log(`Path: ${req.path}`)
  console.log(`Body: ${req.body}`)
  console.log("---------");
  next()
}

const errorHandler = (err, req, res, next)=>{
  console.log(err.message)
  if(err.name === "castError" ){
    return res.status(400).send({error: "malformatted id"})
  }
  next(err)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(requestLogger)
app.use(express.json());
app.use(cors())
app.use(express.static("build"))



app.get("/", (req, res) => {
  res.send("<h1>Hello World!!</h1>");
});




const generateId = (arr)=>{
  const maxId = arr.length>0 
  ? Math.max(...arr.map(n=>n.id)) 
  : 0;
  return maxId + 1
}



app.get("/api/persons", (req, res)=>{
  Person.find({}).then(persons=>{
    res.json(persons)
  })
  
})

app.post("/api/persons", (req,res)=>{
  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  })

const allPersons = Person.find({}).then(persons=>{ return persons.map(p=>p.name)});

if(allPersons.includes(newPerson.name)){
  app.put("/api/notes/", (req,res)=>{
    
  })
}



  newPerson.save().then(result=>{
    console.log(req.body)
  res.json(newPerson)
  }).catch(err=>{
    console.log(`Couldn't save person: ${err}`);
  })
  
})

app.delete("/api/persons/:id", (req,res)=>{
Person.findByIdAndDelete(req.params.id).then(deletedPerson=>{
  console.log(`Removed ${deletedPerson.name}`)
}).catch(error=>{
 console.log(error)
})
})

app.put("/api/persons/:id", (req,res)=>{
  persons = persons.map(p=>{
    p.id===Number(req.params.id) ?
      {
        ...p,
        name: req.body.name,
        number: req.body.number
      }
      : p
    }) 
  res.json(persons)
})


app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT;

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
