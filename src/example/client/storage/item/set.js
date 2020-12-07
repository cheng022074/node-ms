const {
    server
} = require('node-ms/client') ;

module.exports = (key , value) => server('/api/storage/item/set' , {
    method:'post',
    params:{
        key,
        value
    }
});