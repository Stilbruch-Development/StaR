import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

let user_db_remote_url;
let expander_db_remote_url;
let user_db_name;
let expander_db_name;

PouchDB.plugin(PouchDBFind);

if (process.env.NODE_ENV === "development" || "test") {
  user_db_name = "dev_user_db";
  expander_db_name = "dev_expander_db";
  user_db_remote_url = process.env.REACT_APP_USER_DB_DEV;
  expander_db_remote_url = process.env.REACT_APP_EXPANDER_DB_DEV;
} else {
  user_db_name = "user_db";
  expander_db_name = "expander_db";
  user_db_remote_url = process.env.REACT_APP_USER_DB;
  expander_db_remote_url = process.env.REACT_APP_EXPANDER_DB;
}

const admin_user = {
  _id: "1",
  email: "admin",
  first_name: "Admin",
  password: "$2y$12$VgcgxTY.At3i8mTQyFF7Lu6xuzZdfuiuo6dKuiSLF8rj26VqQXb1a",
  role: 1
};

const user_db = new PouchDB(user_db_name);
const user_db_remote = new PouchDB(user_db_remote_url);
const expander_db = new PouchDB(expander_db_name);
const expander_db_remote = new PouchDB(expander_db_remote_url);

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
      console.log(
        `sync of ${user_db_name} and ${user_db_name}_remote successfully completed`
      );
    })
    .on("error", function(err) {
      console.log(
        `sync of ${user_db_name} and ${user_db_name}_remote failed with error: ${err}`
      );
    });

  expander_db
    .sync(expander_db_remote)
    .on("complete", function() {
      console.log(
        `sync of ${expander_db_name} and ${expander_db_name}_remote successfully completed`
      );
    })
    .on("error", function(err) {
      console.log(
        `sync of ${expander_db_name} and ${expander_db_name}_remote failed with error: ${err}`
      );
    });
};

export { user_db, expander_db, syncDB };
