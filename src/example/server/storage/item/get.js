const {
    datasource
} = require('node-ms');

const Storage = datasource('storage') ;

module.exports = key => Storage.getItem(key) ;