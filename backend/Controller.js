const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// ============ Allow Requests from a Browser ==========
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.get('/', (req, res) => {
  res.status(200)
  res.contentType('application/json')
  res.json({ response: 'hello world',
method:"GET" })
  console.log("Get request at path '/'")
})

let port = 80
app.listen(port, () => { 'backend started on port', port })

module.exports = app;
