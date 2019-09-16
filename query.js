//Pakete laden
var pg = require('pg');
var format = require('pg-format');

//Neuen Connection Pool anlegen und mit entsprechenden Credentials mit DB verbinden
var pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "secret",
  database: "myDB"
});

//Query Definieren
var query = 'INSERT INTO public. \"Table1\" (\"ID\", \"Vorname\", \"Nachname\", \"Alter\") VALUES %L'

//Werte für Insert definieren
var values = [
	[6, 'Alexander','Hut',64],
	[7,'Maria','Winter',32]
];

//Aufrufen der Query Funktion und ergebnis des Query entgegennehmen
queryDB(format(query,values)).then(function(result) {
console.log(result.rowCount);
});

//Query auf DB ausführen und auf CVallback warten
function queryDB(query) {
  return new Promise(function(resolve, reject) {
    pool.connect(function(err, client, done) {
      client.query(query, (err, result) => {
        if (err === null) {
          resolve(result);
        } else {
          reject(err);
        }
        client.release();
      });
    });
  });
}
