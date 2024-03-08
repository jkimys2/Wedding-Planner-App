// import files
const router = require("express").Router();
const { Invitees } = require("../../models/");

// create new invitee
router.post("/", async (req, res) => {
  try {
    const newInvitee = await Invitees.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      plus_one: req.body.plus_one,
      accepted: req.body.accepted,
      food_choice: req.body.food_choice,
      wedding_id: req.body.wedding_id,
    });
    res.status(200).json(newInvitee);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit an existing invitee
router.put("/:id", async (req, res) => {
  try {
    const updatedInvitee = await Invitees.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        plus_one: req.body.plus_one,
        accepted: req.body.accepted,
        food_choice: req.body.food_choice,
        wedding_id: req.body.wedding_id,
      },
      {
        where: req.params.id,
      }
    );
    if (!updatedInvitee) {
      res.status(404).json({ message: "No invitee with that ID exists!" });
    }
    res.status(200).json({ message: `${updatedInvitee} has been updated!` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete an invitee
router.delete("/:id", async (req, res) => {
  try {
    const inviteeData = await Invitees.destroy({
      where: { id: req.params.id },
    });
    if (!inviteeData) {
      res.status(404).json({ message: "No invitee with that ID exists!" });
    }
    res.status(200).json({ message: `${inviteeData} has been deleted!` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// export module
module.exports = router;
