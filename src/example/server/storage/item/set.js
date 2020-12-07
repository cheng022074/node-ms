const {
    datasource
} = require('node-ms');

const Storage = datasource('storage') ;

module.exports = (key , value) => Storage.setItem(key , value) ;