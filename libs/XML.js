const xml2js = require('xml2js');
const parser = new xml2js.Parser({explicitArray: false});
const bluebird = require('bluebird');
bluebird.promisifyAll(parser);
const builder = new xml2js.Builder();

module.exports = {
    parser,
    builder
};