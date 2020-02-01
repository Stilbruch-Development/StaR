import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);

const admin_user = {
  _id: "1",
  email: "admin",
  first_name: "Admin",
  password: "$2y$12$VgcgxTY.At3i8mTQyFF7Lu6xuzZdfuiuo6dKuiSLF8rj26VqQXb1a",
  role: 1
};

const user_db = new PouchDB("user_db");
const user_db_remote = new PouchDB(
  "https://c8899f2c-6d46-4ad1-8a77-bfce08aa8acc-bluemix.cloudant.com/user_db_remote"
);
const expander_db = new PouchDB("expander_db");
const expander_db_remote = new PouchDB(
  "https://c8899f2c-6d46-4ad1-8a77-bfce08aa8acc-bluemix.cloudant.com/expander_db_remote"
);

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

const syncDB = () => {
  // sync local pouchdb to remote IBM Cloudant
  user_db
    .sync(user_db_remote)
    .on("complete", function() {
      console.log("sync of user_db/ user_db_remote completed");
    })
    .on("error", function(err) {
      console.log("sync error user_db/ user_db_remote");
    });

  expander_db
    .sync(expander_db_remote)
    .on("complete", function() {
      console.log("sync of expander_db/ expander_db_remote completed");
    })
    .on("error", function(err) {
      console.log("sync error expander_db/ expander_db_remote");
    });
};

syncDB();

export { user_db, expander_db, syncDB };