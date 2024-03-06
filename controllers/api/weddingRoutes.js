// import files
const router = require("express").Router();
const { Wedding } = require("../../models/");

// create new wedding
router.post("/", async (req, res) => {
  try {
    const newWedding = await Wedding.create({
      event_title: req.session.event_title,
      date: req.session.date,
      time: req.session.time,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWedding);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit an existing wedding
router.put("/:id", async (req, res) => {
  try {
    const updatedWedding = await Wedding.update(
      {
        event_title: req.session.event_title,
        date: req.session.date,
        time: req.session.time,
        user_id: req.session.user_id,
      },
      {
        where: req.params.id,
      }
    );
    if (!updatedWedding) {
      res.status(404).json({ message: "No wedding with that ID exists!" });
    }
    res.status(200).json({ message: `${updatedWedding} has been updated!` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a wedding
router.delete("/:id", async (req, res) => {
  try {
    const weddingData = await Wedding.destroy({
      where: { id: req.params.id },
    });
    if (!weddingData) {
      res.status(404).json({ message: "No wedding with that ID exists!" });
    }
    res.status(200).json({ message: `${weddingData} has been deleted!` });
  } catch (err) {
    res.status(500).json(err);
  }
});


// export module
module.exports = router;