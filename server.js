// Srikar Reddy
//Meant for server-side routing by express.js
const express = require('express');
const axios = require('axios');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const users = [];
var cors = require('cors')
var decycle = require('json-decycle').decycle

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/my-app/dist/angular-nodejs-example/"));

app.get('/api/users', (req, res ) => {
  console.log("In the Express and you have requested the users");
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  users.push(user);
  console.log("Current users in the DB are : "+ users);
  res.json(users);
});

app.get('/test', (req,res) => {
  console.log("TEst working");
  res.send("test working");
});

app.post('/api/putRecord', (req, res) => {
  //Make the putRecord POST to the DB from survey ( From survey)
  console.log("In the Express : putRecord");
 var data = JSON.stringify(req.body.data);
  console.log("Data got : "+ data);
  

  var ress = "";
  axios
  .post('http://localhost:8080/swe_api_1_war/rest/api/putRecord', {
    data: data,
  })
  .then((res1) => {
    console.log(`statusCode: ${res.status}`);
    console.log('Got response '+ res1.data[0] );

   res.send(res1.data);
  })
  .catch((error) => {
    console.error("error!"+ error);
  })
});

app.get('/api/getStudentsID', (req, res) => {
  //Make the getStudentsID GET to the DB from survey ( From Acknowledge)
console.log("In the Express : getStudentsID");
var ress = "";
axios
.get('http://localhost:8080/swe_api_1_war/rest/api/getStudentsID')
.then((res1) => {
  console.log('Got response in getStudentsID '+ res1);

 res.send(res1.data);
})
.catch((error) => {
  console.error("error!"+ error);
});
});

app.post('/api/getStudentData', (req, res) => {
  //Make the getStudentData POST to the DB from survey ( From read-survey)
 var data = JSON.stringify(req.body.data);
  console.log("In the Express : getStudentsData and data "+ data);

  var ress = "";
  axios
  .post('http://localhost:8080/swe_api_1_war/rest/api/getStudentData', {
    data: data,
  })
  .then((res1) => {
    console.log(`statusCode: ${res.status}`);
    console.log('Got response '+ res1.data[0]);
    res.send(res1.data);
  })
  .catch((error) => {
    console.error("error!"+ error);
  });
});


app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/my-app/dist/angular-nodejs-example/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});


