var GoogleSpreadsheet = require('google-spreadsheet');

// uses google sheets id; see google sheets docs.
var doc = new GoogleSpreadsheet(// sheetId);

doc.getInfo(function(err, info) {
  if (err) {
    console.log(err);
  }

  console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
  sheet = info.worksheets[0];
  console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);

  // make separate call to sheet and check rows
  // offest is the row the search begins at, limit is how many rows to check
  sheet.getRows({ offset: 1, limit: 10 }, function( err, rows ){
    console.log('Read '+ rows.length +' rows');
    console.log(rows);
  });
});
