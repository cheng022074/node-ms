const {
    datasource
} = require('../../../../../lib');

const Storage = datasource('storage') ;

module.exports = key => Storage.getItem(key) ;