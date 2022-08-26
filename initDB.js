db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [
      {
        role: "readWrite",
        db: "users"
      }
    ]
  }
);


testsDB = db.getSiblingDB('users');

testsDB.createUser(
  {
    user: "user",
    pwd: "password",
    roles: [
      {
        role: "readWrite",
        db: "users"
      }
    ]
  }
);

