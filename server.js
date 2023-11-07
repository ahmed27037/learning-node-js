const express = require("express")
const app = express()
const PORT = 5505;


// middleware

app.use(express.json())
app.use(express.static('public'))

// TEMP DATABASE
const db = []



app.post('/api/info', (req,res) => {
  const {information} = req.body;
  res.status(201).json({"Your Message" : information})
  db.push(information)
  console.log("DB : ", db)
  console.log("You sent a Post request which is : ", information)

})

app.put('/api', (req,res) => {
  const {hey, how} = req.query;
  console.log(hey, how);
  res.sendStatus(200);
})



app.delete('/delete/:id/:name', (req, res) => {
  const {id, name} = req.params
  console.log('You came using a delete request', name, id)
  res.sendStatus(200);
});


app.listen(PORT, () => console.log(`Server has started on port : ${PORT}`) )


