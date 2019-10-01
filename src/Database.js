import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "PycoRN.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 100000;

export default class Database {

    initDB() {
        let db;
        return new Promise((resolve) => {
          console.log("Plugin integrity check ...");
          SQLite.echoTest()
            .then(() => {
              console.log("Integrity check passed ...");
              console.log("Opening database ...");
              SQLite.openDatabase(
                database_name,
                database_version,
                database_displayname,
                database_size
              )
                .then(DB => {
                  db = DB;
                  console.log("Database OPEN");
                  db.executeSql('SELECT 1 FROM PycoRecord LIMIT 1').then(() => {
                      console.log("Database is ready ... executing query ...");
                  }).catch((error) =>{
                      console.log("Received error: ", error);
                      console.log("Database not yet ready ... populating data");
                      db.transaction((tx) => {
                          tx.executeSql('CREATE TABLE IF NOT EXISTS PycoRecord (seed, user, version)');
                      }).then(() => {
                          console.log("Table created successfully");
                      }).catch(error => {
                          console.log(error);
                      });
                  });
                  resolve(db);
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log("echoTest failed - plugin not functional");
            });
          });
      };

      closeDatabase(db) {
        if (db) {
          console.log("Closing DB");
          db.close()
            .then(status => {
              console.log("Database CLOSED");
            })
            .catch(error => {
              this.errorCB(error);
            });
        } else {
          console.log("Database was not OPENED");
        }
      };

      getPycoUsers() {
        return new Promise((resolve) => {
          const pycoUser = [];
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT p.seed, p.user, p.version FROM PycoRecord p', []).then(([tx,results]) => {
                console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  let user = JSON.parse(row.user)
                  console.log(`Record ID: ${row.seed}, Prod Name: ${user.name.first + ' ' + user.name.last}`)
                  const { seed, version } = row;
                  pycoUser.push({
                    seed,
                    user,
                    version
                  });
                }
                console.log(pycoUser);
                resolve(pycoUser);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

      addPycoUser(data) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
              let stringtifyUser = JSON.stringify(data.user)
            db.transaction((tx) => {
              tx.executeSql('INSERT INTO PycoRecord VALUES (?, ?, ?)', [data.seed, stringtifyUser, data.version]).then(([tx, results]) => {
                console.log('Add Succesfully')
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }
}