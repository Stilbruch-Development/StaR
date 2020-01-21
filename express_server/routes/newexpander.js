const express = require("express");
const router = express.Router();
const auth = require("./middleware/auth");
const { check, validationResult } = require("express-validator");

const Expander = require("../models/Expander");

router.get("/", auth, async (req, res) => {
  try {
    const expander = await Expander.find({ user: req.user.id });
    res.json(expander);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("short", "Bitte ein Abkürzung eingeben!")
        .not()
        .isEmpty(),
      check("long", "Bitte eine Langform eingeben!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { short, long, category, path } = req.body;

    try {
      const newExpanderItem = new Expander({
        short,
        long,
        category,
        path,
        user: req.user.id
      });
      const expander = await newExpanderItem.save();
      res.json(expander);
    } catch (err) {
      console.log(err);
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  const { short, long, categories, path } = req.body;

  const expanderFields = {};
  if (short) expanderFields.short = short;
  if (long) expanderFields.long = long;
  if (categories) expanderFields.categories = categories;
  if (path) expanderFields.path = path;

  try {
    let expanderItem = await Expander.findById(req.params.id);

    if (!expanderItem)
      return res
        .status(404)
        .json({ msg: "Kein solcher Expander-Eintrag vorhanden." });

    if (expanderItem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Nicht autorisiert!" });
    }

    expanderItem = await Expander.findByIdAndUpdate(
      req.params.id,
      { $set: expanderFields },
      { new: true }
    );

    res.json(expanderItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let expanderItem = await Expander.findById(req.params.id);

    if (!expanderItem)
      return res
        .status(404)
        .json({ msg: "Kein solcher Expander-Eintrag vorhanden." });

    if (expanderItem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Nicht autorisiert!" });
    }

    await Expander.findByIdAndRemove(req.params.id);

    res.json({ msg: "Expander-Eintrag wurde gelöscht." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
