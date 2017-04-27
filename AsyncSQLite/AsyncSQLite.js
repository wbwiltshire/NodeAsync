var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('Customer.db3');

function Select(db, sql) {
		return new Promise(function (resolve, reject) {
			db.all(sql, function cb(err, rows)
			{
				if (err) {
					console.log('error: ', err);
					reject(err);
				}
				else {
					resolve(rows);
				}
			});
		});
}

async function FindAll(db) {
	var count = 0;
	
	try {
		var rows = await Select(db, 'SELECT [Id],[FirstName],[LastName],[Address1],[Address2],[Notes],[ZipCode],[HomePhone],[WorkPhone],[CellPhone],[EMail],[CityId],[Active],[ModifiedDt],[CreateDt] FROM Contact;');
		//var rows = await db.all('SELECT [Id],[FirstName],[LastName],[Address1],[Address2],[Notes],[ZipCode],[HomePhone],[WorkPhone],[CellPhone],[EMail],[CityId],[Active],[ModifiedDt],[CreateDt] FROM Contact;');
		//console.log("rows: ", rows);
		for (row of rows) {
			count++;
			console.log('Name: ' + row.LastName + ', ' + row.FirstName + '(' +  row.Id + ')');
		}
	}
	catch (e)
	{
		console.log('Exception: ', e);
	}
	return count;	
}

FindAll(db).then( f => { console.log();console.log('Row count: ', f); });

db.close();