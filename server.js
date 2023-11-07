const express = require("express")
const app = express()
const PORT = 5505;


// middleware

app.use(express.json())
app.use(express.static('public'))
app.use(require('cors')())
app.use(mw)

function mw(req, res, next) {
  console.log('HIT you some MIDDLEWARE')
  const {id} = req.query
  console.log('ID: ', id)
  if (id != 8) {
   return res.sendStatus(403)
  } 
  next()
}
// TEMP DATABASE
const db = []

// SCHEDULER
function cron(ms, fn){
  async function cb(){
    clearTimeout(timeout)
    await fn()
    timeout = setTimeout(cb, ms)
  }
  let timeout = setTimeout(cb, ms)
  return () => { }
}


function consoleDB(){
  console.log('DB = ', db)
}

cron(1000, consoleDB)


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

app.delete('/', mw, (req, res) => {
  console.log("You came to the delete using you home route")
  res.sendStatus(200);
});


app.delete('/delete/', mw, (req, res) => {
  const { id } = req.params
  console.log('You came using a delete request', id)
  res.sendStatus(200);
});


app.listen(PORT, () => console.log(`Server has started on port : ${PORT}`) )


