/**
 * Write last change date (current day)
 * to the main _data.json file.
 * It will appear in the header of the Styleguide.
 *
 * Additional date formats should be configured here.
 */
var fs = require('fs'),
  basePath = require('./utils').basePath;

function formatDate(language) {
  var finalDate,
    date = new Date();

  switch (language) {
    case 'en_US' :
      finalDate = date.getFullYear() + '/' + (parseInt(date.getMonth(), 10) + 1) + '/' + date.getDate();
      break;
    case 'pt_BR' :
      finalDate = date.getDate() + '/' + (parseInt(date.getMonth(), 10) + 1) + '/' + date.getFullYear();
      break;
    default :
      finalDate = date.getFullYear() + '/' + (parseInt(date.getMonth(), 10) + 1) + '/' + date.getDate();
  }

  return finalDate;
}

module.exports = function() {
  var data = JSON.parse(fs.readFileSync(basePath + '/styleguide/_data.json'));

  if (data && typeof data.clientName !== 'undefined') {
    data.date = formatDate(data.language);
    fs.writeFileSync(basePath + '/styleguide/_data.json', JSON.stringify(data, null, 2));
  }
};
