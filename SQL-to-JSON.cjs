// TODO make actual SQL to JSON from existing MySQL dump file

// Step 1: import MySQL file and split up line by line to extract SQL statements, Ref: https://www.sqlitetutorial.net/sqlite-nodejs/
// Step 2: Run statements in memory to create and populate database
// Step 3: Create and run SQL statements to select data and convert to JSON
// Step 4: Final statement should be written to file, ie SELECT JSON_PRETTY(@json_alpacas_keeper);

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run("CREATE TABLE lorem (info TEXT)");

  const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (let i = 0; i < 10; i++) {
    stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
    console.log(row.id + ": " + row.info);
  });
});

db.close();
