const {
    server
} = require('node-ms/client') ;

module.exports = key => server('/api/storage/item/get' , {
    params:{
        key
    }
});