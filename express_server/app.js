module.exports = function() {
  const connectDB = require("./models/db");

  const express = require("express");

  const app = express();

  const cors = require("cors");

  /* +++++++++++++++++++++++++++ APP CONFIGURATION +++++++++++++++++++++++++++ */
  app.use(express.json({ extended: false }));

  app.use(cors());

  /* +++++++++++++++++++++++++++ CONNECT DATABASE +++++++++++++++++++++++++++ */
  connectDB();
  /* ++++++++++++++++++++++++++++++++++ API ROUTING ++++++++++++++++++++++++++ */
  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/user", require("./routes/user"));
  app.use("/api/expander", require("./routes/newexpander"));

  /* ++++++++++++++++++++++++++++++ APP ROUTING ++++++++++++++++++++++++++++++ */

  /* +++++++++++++++++++++++++++ APP LISTEN +++++++++++++++++++++++++++ */

  app.listen(process.env.PORT || 2000, process.env.ID, () =>
    console.log("Node- Server started on port 2000 ...")
  );
};
