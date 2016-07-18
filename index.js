var GoogleSpreadsheet = require('google-spreadsheet');

// uses google sheets id; see google sheets docs.
var doc = new GoogleSpreadsheet('1GtgJwQj8Z5TfCjtJEbU2ZfMlcXiTzvr_TMYgfyeJ898');

doc.getInfo(function(err, info) {
  if (err) {
    console.log(err);
  }

  console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
  sheet = info.worksheets[0];
  console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + ' rows long, ' + sheet.colCount + ' columns.');

  var batches = Array.from(Array(Number(Math.ceil(sheet.rowCount/1000))).keys());

  var getOffset = 1;
  var getLimit = 1000

  batches.forEach(function(batch, index) {
    if (index === batches.length -1) {
      var remainder = sheet.rowCount % 1000;
      if (remainder === 0) {
        getLimit = 1000;
      } else {
        getLimit = remainder;
      }
    }

    sheet.getRows({ offset: getOffset, limit: getLimit }, function( err, rows ){
      console.log('Read '+ rows.length +' rows, batch #' + index);
    });

    getOffset += 1000;
  });

});
