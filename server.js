const express = require('express')
const Student = require('./models/student')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const app = express();
app.use(express.json())

const port = process.env.port || 3000
const MongoUrl = process.env.mongo_url

try{
    mongoose.connect(MongoUrl)
    console.log("mongodb connected")
}catch{
    console.log("mongodb connection error")
}

app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📥 Get all students
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// 🔍 Get student by ID
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🛠️ Update student
app.put('/students/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Student not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete student
app.delete('/students/:id', async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Student not found' });
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.listen(port,()=>{
    console.log(`the server is running at http://localhost:${port}`)
})