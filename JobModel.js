const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
 title: { type: String, required: true}, 
 company: { type: String, required: true },
 location: {type: String, required: true}, 
 salary: {type: Number, required: true}, 
 type: {type: String,
    enum: ["Full-time (On-site)", "Part-time (On-site)", "Full-time (Remote)", "Part-time (Remote)"],
    required: true
 },
 description:{type: String, required: true}, 
   qualifications: [{type: String, required: true}],
 createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JOB', jobSchema);