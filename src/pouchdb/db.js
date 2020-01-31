// import Dexie from "dexie";
import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
PouchDB.plugin(PouchDBFind);

// const db = new Dexie("StaR_DB");

// db.version(1).stores({
//   users:
//     "_id, email, password, first_name, last_name, role, privacy_policy_approval, privacy_policy_approval_date, created_date",
//   expanders: "_id, user, short, long, category, date, path"
// });

// // Open the database
// db.open().catch(function(e) {
//   console.error("Open failed: " + e);
// });

// db.users.put({
// _id: "1",
// email: "admin",
// first_name: "Admin",
// password: "$2y$12$VgcgxTY.At3i8mTQyFF7Lu6xuzZdfuiuo6dKuiSLF8rj26VqQXb1a",
// role: 1
// });
const admin_user = {
  _id: "1",
  email: "admin",
  first_name: "Admin",
  password: "$2y$12$VgcgxTY.At3i8mTQyFF7Lu6xuzZdfuiuo6dKuiSLF8rj26VqQXb1a",
  role: 1
};

const user_db = new PouchDB("UserDB");
const expander_db = new PouchDB("ExpanderDB");

const setAdmin = async () => {
  try {
    await user_db.get("1");
  } catch (err) {
    if (err.name === "not_found") {
      try {
        await user_db.put(admin_user);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

setAdmin();

export { user_db, expander_db };
