import Dexie from "dexie";

const db = new Dexie("StaR_DB");

db.version(1).stores({
  users:
    "id, email, password, first_name, last_name,privacy_policy_approval, privacy_policy_approval_date, created_date",
  expanders: "id, user_id, short, long, category, date, path"
});

// Open the database
db.open().catch(function(e) {
  console.error("Open failed: " + e);
});

export default db;
