// routes/job.routes.js
const express = require("express");
const router = express.Router();
const JOB = require("./JobModel");

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await JOB.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

// GET job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await JOB.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Error fetching job details" });
  }
});

// POST new job
router.post("/", async (req, res) => {
  try {
    const newJob = new JOB(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: "Error saving job", error: err.message });
  }
});

// DELETE job by ID
router.delete("/:id", async (req, res) => {
  try {
    await JOB.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting job" });
  }
});

module.exports = router;
