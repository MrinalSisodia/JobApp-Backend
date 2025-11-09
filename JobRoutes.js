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
         const { title } = req.params;
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
    let { title, company, location, salary, type, description, qualifications } = req.body;


    if (!title || !company || !location || !salary || !type || !description || !qualifications) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (title.length < 3 || title.length > 100) {
      return res.status(400).json({ message: "Title must be 3–100 characters long." });
    }

    if (company.length < 2 || company.length > 100) {
      return res.status(400).json({ message: "Company name must be 2–100 characters long." });
    }

    if (isNaN(salary) || salary <= 0) {
      return res.status(400).json({ message: "Salary must be a valid positive number." });
    }

    const job = await JOB.create({
      title,
      company,
      location,
      salary,
      type,
      description,
      qualifications,
    });

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating job." });
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
