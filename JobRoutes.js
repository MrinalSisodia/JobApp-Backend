const express = require("express");
const router = express.Router();
const JOB = require("./JobModel");

router.get("/", async (req, res) => {
  try {
    const jobs = await JOB.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await JOB.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Error fetching job details" });
  }
});

router.get("/search/:title", async (req,res) => {
    try {
        const jobsByTitle = await JOB.find( {title: { $regex: title, $options: "i" }})
         if (!jobsByTitle.length) {
      return res.status(404).json({ message: "No matching jobs found" });
    }

    res.json(jobsByTitle);
    } catch (err) {
        console.error("Error searching jobs:", err);
    res.status(500).json({ message: "Error searching jobs" });
    }
})


router.post("/", async (req, res) => {
  try {
    const newJob = new JOB(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: "Error saving job", error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await JOB.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting job" });
  }
});

module.exports = router;
