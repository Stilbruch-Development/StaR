import Dexie from "dexie";
import uuid4 from "uuid/v4";

const db = new Dexie("StaR_DB");

db.version(1).stores({
  users:
    "_id, email, password, first_name, last_name,privacy_policy_approval, privacy_policy_approval_date, created_date",
  expanders: "_id, user, short, long, category, date, path"
});

// Open the database
db.open().catch(function(e) {
  console.error("Open failed: " + e);
});

export default db;
