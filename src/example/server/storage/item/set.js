const {
    datasource
} = require('../../../../../lib');

const Storage = datasource('storage') ;

module.exports = (key , value) => Storage.setItem(key , value) ;