// MongoDB SCHEMA SETUP
const mongoose = require("mongoose");

const ExpanderSchema = new mongoose.Schema({
  short: {
    type: String,
    required: "Please provide short phrase."
  },
  long: {
    type: Object,
    required: "Please provide longe phrase."
  },
  category: {
    type: String
  },
  path: {
    isPath: {
      type: Boolean,
      default: false
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Path"
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Expander", ExpanderSchema);
