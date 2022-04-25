const express = require('express');
const { v4: createId } = require('uuid');

const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/student/:id', (req, res) => {
  res.sendFile(__dirname + '/public/student.html');
});

app.get('/api/students', (req, res) => {
  fs.readFile(__dirname + '/data/students.json', 'utf-8', (err, data) => {
    if (err) return res.json(err);
    const students = JSON.parse(data);
    console.log(students);
    res.json(students);
  });
  //desired
});

app.get('/api/students/:id', (req, res) => {
  fs.readFile(__dirname + '/data/students.json', 'utf-8', (err, data) => {
    if (err) return res.json(err);
    const students = JSON.parse(data);
    const foundStudent = students.find(student => student.id === req.params.id);
    console.log(foundStudent);
    res.json(foundStudent);
  });
  //desired
});

app.post('/api/students', (req, res) => {
  console.log(req.body);
  req.body.id = createId();
  fs.readFile(__dirname + '/data/students.json', 'utf-8', (err, data) => {
    if (err) return res.json(err);
    const students = JSON.parse(data);
    students.push(req.body);
    console.log(students);
    fs.writeFile(
      __dirname + '/data/students.json',
      JSON.stringify(students, null, 2),
      (err) => {
        if (err) return res.json(err);
        console.log('Updated students data store!');
        res.status(200).send(req.body);
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
