const {
    resolve
} = require('path') ;

module.exports = {
    port:8080,
    datasources:{
        storage:{
            type:'storage.memory',
            config:{
                storagePath:resolve('data/storage.json')
            }
        }
    },
    server:{
        '/api/storage/item/set':{
            method:'post',
            params:[
                'key',
                'value'
            ],
            source:'./example/server/storage/item/set.js'
        },
        '/api/storage/item/get':{
            params:[
                'key'
            ],
            source:'./example/server/storage/item/get.js'
        }
    }
} ;