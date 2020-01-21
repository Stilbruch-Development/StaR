const Expander = require("../models/Expander");

exports.getExpander = function(req, res) {
  // get all user specific expanders and respond with a json objec
  Expander.find()
    .then(userExpander => {
      res.json(userExpander);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.setExpanderItem = function(req, res) {
  // post information to create a new expander item
  const newExpanderItem = req.body;
  // newExpanderItem.author = {
  //   id: req.user._id,
  //   email: req.user.email
  // };
  console.log(newExpanderItem);

  Expander.create(newExpanderItem)
    .then(() => {
      res.send(newExpanderItem);
    })
    .catch(err => {
      res.send(err);
    });
};

// exports.getOneBloc = function(req, res) {
//   // get one bloc by its ObjectId
//   db.Blocs.find({
//     _id: req.params.blocId,
//     author: { id: req.user._id, email: req.user.email }
//   })
//     .then(foundBloc => {
//       res.json(foundBloc);
//     })
//     .catch(err => {
//       res.send(err);
//     });
// };

// exports.deleteBloc = function(req, res) {
//   // delete one bloc by its ObjectId
//   db.Blocs.deleteOne({ _id: req.params.blocId })
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => {
//       res.send(err);
//     });
// };

// exports.editBloc = function(req, res) {
//   const editedBloc = req.body;
//   // update one bloc by its ObjectId
//   db.Blocs.findOneAndUpdate({ _id: req.params.blocId }, editedBloc, {
//     new: true
//   }).then(data => {
//     res.json(data);
//   });
// };
